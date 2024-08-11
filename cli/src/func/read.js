import { readdir, stat } from 'fs/promises'
import { resolve } from 'path'

/**
 * قراءة جميع الملفات في المجلد والمجلدات الفرعية كمسارات كاملة.
 * @param {string} folderPath مسار مطلق إلى المجلد المراد قراءته
 * @returns {Promise<string[]>} مسارات الملفات الكاملة
 * @async
 */
export async function readFolder(folderPath) {
  const cwd = process.cwd() // الحصول على الدليل الحالي
  const files = [] // مصفوفة لتخزين مسارات الملفات

  // قراءة أسماء الملفات في المجلد
  const fileNames = await readdir(folderPath)
  for (let i = 0; i < fileNames.length; i++) {
    const name = fileNames[i]
    files.push(resolve(cwd, folderPath, name)) // إضافة المسار الكامل للملف إلى المصفوفة
  }

  // الحصول على معلومات حول الملفات
  const stats = await Promise.all(files.map((x) => stat(x)))
  const paths = [] // مصفوفة لتخزين مسارات الملفات النهائية

  // التحقق مما إذا كان العنصر ملفًا أو مجلدًا
  for (let i = 0; i < files.length; i++) {
    const f = files[i]
    const s = stats[i]

    if (s.isFile()) paths.push(f) // إذا كان ملفًا، أضفه إلى المصفوفة النهائية
    else paths.push(...(await readFolder(f))) // إذا كان مجلدًا، اقرأ محتوياته بشكل متكرر
  }

  return paths
}

/**
 * قراءة الواردات من نص معين.
 * @param {string} str النص الذي يحتوي على الواردات
 * @returns {[string, string | null, string | null]} [data, path, type] البيانات، المسار، النوع
 */
export function readImport(str) {
  let data = ''

  const bWord = /typeof import\(("|'|`)/ // نمط للبحث عن الواردات من نوع typeof
  const sWord = /import\(("|'|`)/ // نمط للبحث عن الواردات
  const eWord = /("|'|`)\)\./ // نمط لنهاية الواردات

  const before = str.search(bWord)
  let start = str.search(sWord)

  if (start === -1) return [str, null, null] // إذا لم يتم العثور على واردات، أعد النص الأصلي

  if (before !== -1 && before < start) {
    const breakIndex = str.search(/("|'|`)\)/) + 2
    data += str.substring(0, breakIndex)
    str = str.substring(breakIndex)

    start = str.search(sWord)
    if (start === -1) return [data + str, null, null] // إذا لم يتم العثور على واردات بعد التحديث، أعد النص المحدث
  }

  data += str.substring(0, start)
  str = str.substring(start + 8 /** sWord.length */)

  const end = str.search(eWord)
  const path = str.substring(0, end)

  str = str.substring(end + 3 /** eWord.length */)
  data += str
  const type = str.substring(0, getEndIndex(str))

  return [data, path, type]

  /**
   * الحصول على نهاية الواردات في النص.
   * @param {string} str النص الذي يحتوي على الواردات
   * @returns {number} الفهرس الذي ينتهي عنده الوارد
   * @throws {Error} إذا لم يتم العثور على فهرس صالح
   */
  function getEndIndex(str) {
    const ends = [' ', '}', ')', '|', '[', ']', '<', '>', '\r', '\n', ',', ';']
    for (let i = 0; i < str.length; i++) {
      const char = str[i]
      if (ends.some((x) => x === char)) return i
    }

    throw new Error("Shouldn't be here") // إذا لم يتم العثور على فهرس صالح، ألقِ خطأ
  }
}
