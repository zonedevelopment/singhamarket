const hasValue = (value) => {
    if (Array.isArray(value)) {
        return value.length > 0
    }

    if (value && typeof value === 'object') {
        return Object.keys(value).length > 0
    }

    const normalized = `${value ?? ''}`.trim().toLowerCase()
    return normalized !== '' && normalized !== 'null' && normalized !== 'undefined' && normalized !== '-'
}

const firstValue = (userInfo, keys) => {
    const key = keys.find((item) => hasValue(userInfo[item]))
    return key ? userInfo[key] : null
}

export const isAuthenticatedUser = (userInfo = {}) => hasValue(userInfo.partners_id)

export const getIncompleteProfile = (userInfo = {}) => {
    const isCompany = `${userInfo.partners_type}` === '2'
    const commonFields = [
        { label: 'เบอร์โทรศัพท์', keys: ['phone'] },
        { label: 'อีเมล', keys: ['email'] },
        { label: 'ที่อยู่', keys: ['address', 'compAddr'] },
        { label: 'จังหวัด', keys: ['province', 'province_id'] },
        { label: 'อำเภอ', keys: ['ampure', 'district_id'] },
        { label: 'ตำบล', keys: ['district', 'subdistrict_id'] },
        { label: 'รหัสไปรษณีย์', keys: ['zipcode'] },
    ]
    const typeFields = isCompany ? [
        { label: 'ชื่อนิติบุคคล', keys: ['name_customer', 'compname'] },
        { label: 'เลขประจำตัวผู้เสียภาษี', keys: ['numbertax', 'compid'] },
        { label: 'ชื่อผู้ติดต่อ', keys: ['name'] },
        { label: 'รหัสสาขา', keys: ['branch_code'] },
        { label: 'ชื่อสาขา', keys: ['branch_name'] },
        { label: 'ชื่อเจ้าหน้าที่บัญชี', keys: ['accountname', 'accountName'] },
        { label: 'เบอร์โทรศัพท์เจ้าหน้าที่บัญชี', keys: ['accountphone', 'accountPhone'] },
    ] : [
        { label: 'ชื่อ', keys: ['name'] },
        { label: 'นามสกุล', keys: ['lastname'] },
        { label: 'เลขประจำตัวประชาชน', keys: ['citizenid', 'idcard'] },
    ]
    const missingFields = [...typeFields, ...commonFields]
        .filter((field) => !hasValue(firstValue(userInfo, field.keys)))
        .map((field) => field.label)

    const productType = userInfo.product_type || {}
    if (!hasValue(firstValue(productType, ['type_id', 'TypeID', 'cate_id']))) {
        missingFields.push('ประเภทสินค้า')
    }
    if (!hasValue(userInfo.product)) {
        missingFields.push('หมวดหมู่สินค้า')
    }

    return {
        complete: missingFields.length === 0,
        missingFields,
        profileRoute: isCompany ? 'Company' : 'Personal',
    }
}
