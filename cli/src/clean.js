#!/usr/bin/env node

import { stat, writeFile } from 'fs/promises'
import { cleanFolder } from './func/clean.js'
import { join } from 'path'

// تحديد مسار مجلد types
const typesPath = join(process.cwd(), 'types')
// الحصول على معلومات حول المجلد المحدد
const stats = await stat(typesPath)

// التحقق مما إذا كان المجلد موجودًا وهو مجلد فعلاً
if (stats && stats.isDirectory()) {
  // تنظيف المجلد والحصول على خريطة الملفات
  const fileMap = await cleanFolder(typesPath)

  // كتابة البيانات الجديدة إلى الملفات
  for (const file of fileMap) {
    const [path, data] = file
    await writeFile(path, data, 'utf8')
  }
} else console.error('No types folder found') // طباعة رسالة خطأ إذا لم يتم العثور على المجلد
