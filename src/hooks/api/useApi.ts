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
   * @param {string} method - The HTTP method for the API call.
   * @param {string} endpoint - The endpoint for the API call.
   * @param {Object} [headers={}] - The headers for the API call.
   * @param {Object} [params={}] - The parameters for the API call.
   * @param {Object} [body={}] - The body of the request for the API call.
   * @returns {Promise<{ data: T }>} - Returns a promise that resolves with the data from the response.
   * @throws Will throw an error if the API call fails.
   */
  const callApi = useCallback(
    async <T>(method: string, endpoint: string, headers = {}, params = {}, body = {}): Promise<{ data: T }> => {
      try {
        const headersDefault = { accept: 'application/json', Authorization: `Bearer ${idToken}`, ...headers }
        let response
        switch (method) {
          case 'post': {
            response = await POST(endpoint, body, params, headersDefault)
            break
          }
          case 'put': {
            response = await PUT(endpoint, body, params, headersDefault)
            break
          }
          case 'delete': {
            response = await DELETE(endpoint, body, params, headersDefault)
            break
          }
          case 'patch': {
            response = await PATCH(endpoint, body, params, headersDefault)
            break
          }
          default: {
            response = await GET(endpoint, params, headersDefault)
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
