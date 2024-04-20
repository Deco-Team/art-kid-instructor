import { useCallback } from 'react'
import useApi from './useApi'
import { notifyError } from '~/utils/toastify'
import { ICourseRequest, ICourseResponse } from '~/interfaces/course.interface'
import { IPagination } from '~/interfaces'

const useCourse = () => {
  const callApi = useApi()
  const rootEndpoint = 'courses/provider'

  const getAllCourses = useCallback(
    async (page = 1, pageSize = 10) => {
      try {
        const response = await callApi<{ data: IPagination<ICourseResponse> }>(
          'get',
          rootEndpoint,
          {},
          {
            page,
            limit: pageSize
          }
        )
        return response.data.data
      } catch (error) {
        notifyError('Error!')
      }
    },
    [callApi]
  )

  const getCourseDetail = useCallback(
    async (id: string) => {
      try {
        const response = await callApi<{ data: ICourseResponse }>('get', `${rootEndpoint}/${id}`)
        return response.data
      } catch (error) {
        notifyError('Error!')
      }
    },
    [callApi]
  )

  const createCourse = useCallback(
    async (data: ICourseRequest) => {
      try {
        const response = await callApi('post', rootEndpoint, {}, {}, data)
        return response.data
      } catch (error) {
        notifyError('Error!')
      }
    },
    [callApi]
  )

  return { getAllCourses, getCourseDetail, createCourse }
}

export default useCourse
