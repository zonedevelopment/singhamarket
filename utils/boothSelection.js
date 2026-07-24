export const normalizeBoothList = (list) => {
    if (!Array.isArray(list)) {
        return []
    }

    return list.map((item) => ({
        ...item,
        checked: item.checked === true
            || item.checked === 1
            || item.checked === '1'
            || item.checked === 'true'
            || item.checked === 'Y',
    }))
}

export const updateBoothChecked = (list, boothDetailId, checked) => (
    list.map((item) => (
        item.booth_detail_id == boothDetailId ? { ...item, checked } : item
    ))
)
