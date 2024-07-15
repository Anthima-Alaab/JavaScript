#!/usr/bin/env node

import { Application } from 'typedoc'

// تهيئة تطبيق Typedoc مع الإضافات
const app = await Application.bootstrapWithPlugins()
// تحويل المشروع باستخدام تطبيق Typedoc
const project = await app.convert()

// التحقق مما إذا تم تحويل المشروع بنجاح
if (project)
  await app.generateDocs(
    project,
    'docs'
  ) // إذا تم تحويل المشروع، يتم توليد الوثائق في مجلد 'docs'
else console.error('No project found') // إذا لم يتم العثور على المشروع، يتم طباعة رسالة خطأ
