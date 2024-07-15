import { readFile } from 'fs/promises'
import { readFolder, readImport } from './read.js'
import { writeImports } from './write.js'

/**
 * دالة تقوم بتنظيف جميع الملفات في المجلد المحدد
 * @param {string} path - مسار المجلد الذي سيتم تنظيفه
 * @returns {Promise<Map<string, string>>} خريطة تحتوي على مسارات الملفات المطلقة وبيانات الملفات (Map<fileAbsolutePath, fileData>)
 * @async
 */
export async function cleanFolder(path) {
  // قراءة جميع مسارات الملفات في المجلد
  const filePaths = await readFolder(path)
  // قراءة بيانات جميع الملفات في المجلد
  const filesData = await Promise.all(filePaths.map((x) => readFile(x, 'utf8')))

  // خريطة لتخزين الملفات الجديدة بعد التنظيف
  const newFiles = new Map()

  // تنظيف كل ملف وتخزينه في الخريطة
  for (let i = 0; i < filePaths.length; i++)
    newFiles.set(filePaths[i], cleanFile(filesData[i]))

  return newFiles
}

/**
 * دالة تقوم بتنظيف بيانات الملف
 * @param {string} data - بيانات الملف
 * @returns {string} - بيانات الملف بعد التنظيف
 */
export function cleanFile(data) {
  // تنظيف الواردات إذا كانت موجودة
  if (data.includes('import(')) data = cleanImports(data)

  // استبدال الأنماط غير المرغوب فيها بأنماط جديدة
  data = data
    .replace(
      /\.\.\.([_a-zA-Z0-9]+): (([_a-zA-Z0-9]+)(\[[_a-zA-Z0-9]*\])?)\[\]/g,
      '...$1: $2'
    )
    .replace(
      /\n?(export type (\w+) = \2;|\/\*\* @typedef {(\w+)} \3 \*\/)/g,
      ''
    )
    .replace(/export(?!s)(?!\s+(\*|declare|=|{))/g, 'export declare')
    .replace(/export(?!s)(\s+=)/g, 'export default')

  return data
}

/**
 * دالة تقوم بتنظيف الواردات في بيانات الملف
 * @param {string} data - بيانات الملف
 * @returns {string} - بيانات الملف بعد تنظيف الواردات
 */
export function cleanImports(data) {
  // خريطة لتخزين الواردات
  const imports = new Map()

  let path
  let type

  let count = 0
  const threshold = 10000

  // حلقة لتنظيف الواردات حتى الوصول إلى الحد الأقصى
  while (count < threshold) {
    const result = readImport(data)

    path = result[1]
    type = result[2]
    if (path === null && type === null) break

    data = result[0]
    const arr = imports.get(path) || []
    if (!arr.includes(type)) {
      arr.push(type)
      imports.set(path, arr)
    }

    count++
  }

  // تحذير إذا تم الوصول إلى الحد الأقصى للحلقات
  if (count === threshold)
    console.warn(`Reached threshold of ${threshold} loops`)

  // إذا كانت هناك واردات، يتم كتابتها وإضافتها إلى البيانات
  if (imports.size > 0) return writeImports(imports) + '\n' + data
  else return data
}
