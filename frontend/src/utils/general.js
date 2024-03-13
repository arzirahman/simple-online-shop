export const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0 
    }).format(price)
}

export const formatRating = (rating) => {
    return `${rating.toLocaleString('id-ID', { minimumFractionDigits: 1 })}`.replace(",", ".")
}

export const formatSold = (sold) => {
    return sold >= 1000 ? `${(sold / 1000).toFixed(1)}K+` : sold
}

export const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}