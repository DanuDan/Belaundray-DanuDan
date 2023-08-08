export default function autoNumber(meta, index) {
    const page = meta.page.page
    const number = (page - 1) * meta.page.per_page
    return page > 1 ? number + (index + 1) : (index + 1)
}