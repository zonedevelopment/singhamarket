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

const hasSelectedProducts = (value) => {
    if (Array.isArray(value)) {
        return value.length > 0
    }

    if (value && typeof value === 'object') {
        return Object.keys(value).length > 0
    }

    if (typeof value === 'string') {
        const normalized = value.trim()
        if (!normalized) {
            return false
        }

        try {
            return hasSelectedProducts(JSON.parse(normalized))
        } catch (error) {
            return hasValue(normalized)
        }
    }

    return false
}

export const isAuthenticatedUser = (userInfo = {}) => hasValue(userInfo.partners_id)

export const getIncompleteProfile = (userInfo = {}) => {
    const isCompany = `${userInfo.partners_type}` === '2'
    const commonFields = [
        { label: 'เบอร์โทรศัพท์', keys: ['phone', 'phoneNumber', 'telephone', 'tel', 'mobile'] },
        { label: 'อีเมล', keys: ['email', 'email_address'] },
        { label: 'ที่อยู่', keys: ['address', 'compAddr', 'company_address'] },
        { label: 'จังหวัด', keys: ['province', 'province_id', 'provinceId'] },
        { label: 'อำเภอ', keys: ['ampure', 'amphure', 'district_id', 'districtId'] },
        { label: 'ตำบล', keys: ['district', 'subdistrict', 'subdistrict_id', 'subDistrictId'] },
        { label: 'รหัสไปรษณีย์', keys: ['zipcode', 'zip_code', 'postal_code'] },
    ]
    const typeFields = isCompany ? [
        { label: 'ชื่อนิติบุคคล', keys: ['name_customer', 'compname', 'company_name'] },
        { label: 'เลขประจำตัวผู้เสียภาษี', keys: ['numbertax', 'compid', 'tax_id'] },
        { label: 'ชื่อผู้ติดต่อ', keys: ['name', 'contact_name', 'contactName'] },
        { label: 'รหัสสาขา', keys: ['branch_code'] },
        { label: 'ชื่อสาขา', keys: ['branch_name'] },
        { label: 'ชื่อเจ้าหน้าที่บัญชี', keys: ['accountname', 'accountName', 'account_name'] },
        { label: 'เบอร์โทรศัพท์เจ้าหน้าที่บัญชี', keys: ['accountphone', 'accountPhone', 'account_phone'] },
    ] : [
        { label: 'ชื่อ', keys: ['name', 'first_name', 'firstName'] },
        { label: 'นามสกุล', keys: ['lastname', 'last_name', 'lastName'] },
        { label: 'เลขประจำตัวประชาชน', keys: ['citizenid', 'idcard', 'citizen_id'] },
    ]
    const missingFields = [...typeFields, ...commonFields]
        .filter((field) => !hasValue(firstValue(userInfo, field.keys)))
        .map((field) => field.label)

    const rawProductType = userInfo.product_type || userInfo.productType || {}
    const productType = Array.isArray(rawProductType) ? (rawProductType[0] || {}) : rawProductType
    if (!hasValue(firstValue(productType, ['type_id', 'TypeID', 'product_type_id', 'productTypeId']))) {
        missingFields.push('ประเภทสินค้า')
    }

    const selectedProducts = [
        userInfo.product,
        userInfo.products,
        userInfo.product_list,
        userInfo.productList,
        productType.product,
        productType.products,
    ]
    if (!selectedProducts.some(hasSelectedProducts)) {
        missingFields.push('สินค้าที่เลือก')
    }

    return {
        complete: missingFields.length === 0,
        missingFields,
        profileRoute: isCompany ? 'Company' : 'Personal',
    }
}
