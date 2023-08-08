export default function formData(raw) {
    const formData = new FormData()
    Object.entries(raw).forEach((value) => {
        const key = value[0];
        const val = value[1] ?? null;
        val && formData.append(key, val)
    })
    return formData
}