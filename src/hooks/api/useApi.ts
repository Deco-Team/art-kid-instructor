import { AxiosError } from 'axios'
import { useCallback } from 'react'
import { DELETE, GET, PATCH, POST, PUT } from '~/utils/api.caller'
import { notifyError } from '~/utils/toastify'
import useAuth from '../useAuth'

export interface IApiOptions {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  endpoint: string
  headers?: object
  params?: object
  body?: object
}

const useApi = () => {
  const { idToken, logout } = useAuth()

  const handleError = useCallback(
    async (error: unknown) => {
      let message = ''
      if (error instanceof AxiosError) {
        const errorStatusCode = error.response?.status
        if (errorStatusCode === 401) {
          await logout()
        }
        if (errorStatusCode === 403) {
          message = 'Không có quyền truy cập'
        }
      }
      if (message) {
        notifyError(message)
      }
    },
    [logout]
  )

  /**
   * This function makes an API call based on the provided options.
   * It's wrapped in a useCallback to prevent unnecessary re-renders.
   *
   * @async
   * @function callApi
   * @template T
   * @param {IApiOptions} options - The options for the API call.
   * @param {string} options.method - The HTTP method for the API call.
   * @param {string} options.endpoint - The endpoint for the API call.
   * @param {Object} [options.headers={}] - The headers for the API call.
   * @param {Object} [options.params={}] - The parameters for the API call.
   * @param {Object} [options.body={}] - The body of the request for the API call.
   * @returns {Promise<{ data: T }>} - Returns a promise that resolves with the data from the response.
   */
  const callApi = useCallback(
    async <T>({ method, endpoint, headers = {}, params = {}, body = {} }: IApiOptions): Promise<{ data: T }> => {
      try {
        const headersDefault = { accept: 'application/json', Authorization: `Bearer ${idToken}` }
        Object.assign(headersDefault, headers)
        let response
        switch (method) {
          case 'post': {
            response = await POST(endpoint, body, params, headers)
            break
          }
          case 'put': {
            response = await PUT(endpoint, body, params, headers)
            break
          }
          case 'delete': {
            response = await DELETE(endpoint, body, params, headers)
            break
          }
          case 'patch': {
            response = await PATCH(endpoint, body, params, headers)
            break
          }
          default: {
            response = await GET(endpoint, params, headers)
          }
        }
        return response
      } catch (error) {
        throw handleError(error)
      }
    },
    [handleError, idToken]
  )

  return callApi
}

export default useApi
