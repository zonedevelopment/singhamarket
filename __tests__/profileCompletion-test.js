import { getIncompleteProfile } from '../utils/profileCompletion'

const commonProfile = {
    partners_id: '1',
    phone: '0812345678',
    email: 'user@example.com',
    address: '99 Test Road',
    province_id: '10',
    district_id: '1001',
    subdistrict_id: '100101',
    zipcode: '10100',
    product_type: { type_id: '1' },
    product: [{ product_id: '10' }],
}

describe('getIncompleteProfile', () => {
    it('accepts a complete personal profile', () => {
        const result = getIncompleteProfile({
            ...commonProfile,
            partners_type: '1',
            name: 'Test',
            lastname: 'User',
            idcard: '1234567890123',
        })

        expect(result.complete).toBe(true)
        expect(result.missingFields).toEqual([])
    })

    it('accepts API aliases for a complete company profile', () => {
        const result = getIncompleteProfile({
            ...commonProfile,
            partners_type: '2',
            company_name: 'Test Company',
            tax_id: '1234567890123',
            contact_name: 'Contact',
            branch_code: '00000',
            branch_name: 'Head Office',
            account_name: 'Account',
            account_phone: '021234567',
        })

        expect(result.complete).toBe(true)
        expect(result.missingFields).toEqual([])
    })

    it('treats an empty JSON product array as incomplete', () => {
        const result = getIncompleteProfile({
            ...commonProfile,
            partners_type: '1',
            name: 'Test',
            lastname: 'User',
            idcard: '1234567890123',
            product: '[]',
        })

        expect(result.missingFields).toContain('สินค้าที่เลือก')
    })

    it('does not use a category id as the product type id', () => {
        const result = getIncompleteProfile({
            ...commonProfile,
            partners_type: '1',
            name: 'Test',
            lastname: 'User',
            idcard: '1234567890123',
            product_type: { cate_id: '2' },
        })

        expect(result.missingFields).toContain('ประเภทสินค้า')
    })
})
