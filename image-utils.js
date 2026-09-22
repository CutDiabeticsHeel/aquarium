export function withWidth(url, width) {
    if (!url || url === '/img/null') return url;

    const dotIndex = url.lastIndexOf('.');
    if (dotIndex === -1) return url;

    return `${url.slice(0, dotIndex)}-${width}.webp`;
}

export const SIZES = [375, 768, 1024];
