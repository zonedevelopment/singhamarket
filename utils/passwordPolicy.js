const PASSWORD_MIN_LENGTH = 10
const SPECIAL_CHARACTER_PATTERN = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/

export const PASSWORD_POLICY_HINT = 'รหัสผ่านต้องมีอย่างน้อย 10 ตัว และต้องมี A-Z, a-z, 0-9 และอักขระพิเศษ โดยห้ามใช้ชื่อผู้ใช้หรือเลขประจำตัว และห้ามมีตัวซ้ำ/ตัวเรียงกัน 3 ตัว'

function hasUppercase(password) {
    return /[A-Z]/.test(password)
}

function hasLowercase(password) {
    return /[a-z]/.test(password)
}

function hasNumber(password) {
    return /[0-9]/.test(password)
}

function hasSpecialCharacter(password) {
    return SPECIAL_CHARACTER_PATTERN.test(password)
}

function hasRepeatedCharacters(password, minLength = 3) {
    const normalizedPassword = String(password || '').toLowerCase()

    for (let index = 0; index <= normalizedPassword.length - minLength; index += 1) {
        const currentCharacter = normalizedPassword[index]

        if (!currentCharacter) {
            continue
        }

        let repeated = true

        for (let offset = 1; offset < minLength; offset += 1) {
            if (normalizedPassword[index + offset] !== currentCharacter) {
                repeated = false
                break
            }
        }

        if (repeated) {
            return true
        }
    }

    return false
}

function hasSequentialCharacters(password, minLength = 3) {
    const normalizedPassword = String(password || '').toLowerCase()

    for (let index = 0; index <= normalizedPassword.length - minLength; index += 1) {
        const chars = normalizedPassword.slice(index, index + minLength)
        const isLetters = /^[a-z]+$/.test(chars)
        const isNumbers = /^[0-9]+$/.test(chars)

        if (!isLetters && !isNumbers) {
            continue
        }

        let sequential = true

        for (let offset = 1; offset < chars.length; offset += 1) {
            if (chars.charCodeAt(offset) !== chars.charCodeAt(offset - 1) + 1) {
                sequential = false
                break
            }
        }

        if (sequential) {
            return true
        }
    }

    return false
}

function sanitizeValue(value) {
    return String(value || '').trim().toLowerCase()
}

function sanitizeDigits(value) {
    return String(value || '').replace(/[^0-9]/g, '')
}

function containsForbiddenValue(password, values = []) {
    const normalizedPassword = sanitizeValue(password)
    const normalizedPasswordDigits = sanitizeDigits(password)

    return values.some((value) => {
        const normalizedValue = sanitizeValue(value)
        const digitsOnlyValue = sanitizeDigits(value)

        if (normalizedValue.length >= 3 && normalizedPassword.includes(normalizedValue)) {
            return true
        }

        if (digitsOnlyValue.length >= 3 && normalizedPasswordDigits.includes(digitsOnlyValue)) {
            return true
        }

        return false
    })
}

export function validatePasswordPolicy({ password, username, idcard, compid }) {
    if (String(password || '').length < PASSWORD_MIN_LENGTH) {
        return 'รหัสผ่านต้องมีอย่างน้อย 10 ตัวอักษร'
    }

    if (!hasUppercase(password)) {
        return 'รหัสผ่านต้องมีอักษรภาษาอังกฤษตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว'
    }

    if (!hasLowercase(password)) {
        return 'รหัสผ่านต้องมีอักษรภาษาอังกฤษตัวพิมพ์เล็กอย่างน้อย 1 ตัว'
    }

    if (!hasNumber(password)) {
        return 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว'
    }

    if (!hasSpecialCharacter(password)) {
        return 'รหัสผ่านต้องมีอักขระพิเศษอย่างน้อย 1 ตัว'
    }

    if (containsForbiddenValue(password, [username, idcard, compid])) {
        return 'รหัสผ่านห้ามมีชื่อผู้ใช้หรือเลขประจำตัวผู้ใช้งาน'
    }

    if (hasRepeatedCharacters(password)) {
        return 'รหัสผ่านห้ามมีตัวอักษรหรือตัวเลขซ้ำกันติดกัน 3 ตัว'
    }

    if (hasSequentialCharacters(password)) {
        return 'รหัสผ่านห้ามมีตัวอักษรหรือตัวเลขเรียงกัน 3 ตัว'
    }

    return null
}
