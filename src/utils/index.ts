export function convertMinutes(mins: number) {
  const hours = Math.floor(mins / 60)
  const minutes = mins % 60
  return minutes === 0 ? `${hours} hour(s)` : `${hours} hour(s) ${minutes} minute(s)`
}
export function cloudinaryURLConvert(publicId: string, type: 'image' | 'video') {
  return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${type}/upload/${publicId}`.trim()
}
