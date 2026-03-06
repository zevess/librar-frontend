import { apiPrivate } from '@/shared/api'
import { API_URL } from '@/shared/config'
import { useMutation } from '@tanstack/vue-query'

export const useFileUpload = () => {
  const {
    mutate: upload,
    data: uploadedFile,
    isPending: isFileUploading,
    error,
  } = useMutation({
    mutationKey: ['upload file'],
    mutationFn: async (data: FormData) => {
      const response = await apiPrivate({
        url: API_URL.uploadImage(),
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        data,
      })
      return response
    },
  })

  return { upload, uploadedFile, isFileUploading, error }
}
