/* eslint-disable @typescript-eslint/no-explicit-any */
import { Level, Type } from '~/enums/course.enum'

export interface ICourseRequest {
  title: string
  description: string
  objective: string
  thumbnail: any
  duration: number
  price: number
  level: Level
  type: Type
  lessons: ILessonRequest[]
}

export interface ILesson {
  id: number
  title: string
  description: string
  objective: string
  video: any
  type: Type
}

export interface ILessonRequest {
  title: string
  description: string
  objective: string
  video: any
  type: Type
}

export interface ICourseColumn {
  _id: string
  title: string
  price: number
  duration: number
  level: string
  status: string
}

export interface ICourseResponse {
  _id: string
  title: string
  description: string
  objective: string
  thumbnail: string
  duration: number
  price: number
  level: string
  status: string
  lessons: ILesson[]
  providerId: string
}
