export const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-MX');
}
