const XSS_PATTERNS = [
    /<\s*script\b/i,
    /<\s*\/?\s*(iframe|object|embed|svg|img|link|meta|style)\b/i,
    /\bon\w+\s*=/i,
    /\bjavascript\s*:/i,
    /\bvbscript\s*:/i,
    /\bdata\s*:\s*text\/html/i,
    /%3c\s*(script|iframe|img|svg|object)/i,
]

const SQL_INJECTION_PATTERNS = [
    /\bunion\s+select\b/i,
    /\bdrop\s+table\b/i,
    /\binsert\s+into\b/i,
    /\bdelete\s+from\b/i,
    /\bupdate\s+\w+\s+set\b/i,
    /\b(?:or|and)\b\s+['"(]?\s*\d+\s*=\s*\d+/i,
    /;\s*(drop|delete|insert|update|select|union|alter|create|exec)\b/i,
]

export function normalizeInputValue(value, trim = true) {
    if (typeof value !== 'string') {
        return value
    }

    const normalizedValue = value
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
        .replace(/[\u200B-\u200D\uFEFF]/g, '')

    return trim ? normalizedValue.trim() : normalizedValue
}

export function validateSecureField({ label, value, checkSql = true }) {
    if (typeof value !== 'string') {
        return null
    }

    const normalizedValue = normalizeInputValue(value)

    if (normalizedValue === '') {
        return null
    }

    if (XSS_PATTERNS.some((pattern) => pattern.test(normalizedValue))) {
        return `${label} มีรูปแบบข้อมูลที่ไม่ปลอดภัย`
    }

    if (checkSql && SQL_INJECTION_PATTERNS.some((pattern) => pattern.test(normalizedValue))) {
        return `${label} มีรูปแบบข้อมูลที่อาจไม่ปลอดภัย`
    }

    return null
}

export function validateFormSecurity(fields = []) {
    for (const field of fields) {
        const errorMessage = validateSecureField(field)

        if (errorMessage) {
            return errorMessage
        }
    }

    return null
}
