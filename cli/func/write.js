/**
 * تحويل بيانات الواردات كخريطة إلى سلسلة نصية من الواردات النوعية
 * @param {Map<string, string[]>} imports بيانات الواردات كخريطة <المسار، الأنواع[]>
 * @returns {string | void} سلسلة نصية للواردات النوعية
 */
export function writeImports(imports) {
  // إذا كانت الخريطة فارغة، أعد لا شيء
  if (imports.size === 0) return

  let lines = '' // سلسلة لتخزين الواردات النوعية
  for (const [path, types] of imports) {
    // إضافة الواردات النوعية إلى السلسلة
    lines += `import type { ${types.join(', ')} } from "${path}";\n`
  }

  return lines // إرجاع السلسلة النهائية
}
