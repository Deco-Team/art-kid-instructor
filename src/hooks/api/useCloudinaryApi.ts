import { useCallback } from 'react'
import { notifyError } from '~/utils/toastify'

const useCloudinaryApi = () => {
  const uploadCloudinary = useCallback(async (files: File[], publicIds: string[]) => {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i])
      formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
      formData.append('public_id', publicIds[i])
      const contentRange = `bytes 0-${files[i].size - 1}/${files[i].size}`
      const headers = {
        'X-Unique-Upload-Id': publicIds[i],
        'Content-Range': contentRange
      }
      try {
        const response = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_API, {
          method: 'POST',
          body: formData,
          headers: headers
        })
        if (!response.ok) {
          notifyError('Error while uploading')
          return
        }
      } catch (error) {
        notifyError('Error!')
      }
    }
  }, [])

  return { uploadCloudinary }
}

export default useCloudinaryApi
