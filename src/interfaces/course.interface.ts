export interface ICourseRequest {
  title: string
  description: string
  objective: string
  thumbnail: string
  duration: string
  price: number
  level: string
  lessons: ILesson[]
}

export interface ILesson {
  title: string
  description: string
  objective: string
  video: string
  type: string
}

export interface ICourseColumn {
  _id: string
  title: string
  price: number
  duration: string
  level: string
  status: string
}

export interface ICourseResponse {
  _id: string
  title: string
  description: string
  objective: string
  thumbnail: string
  duration: string
  price: number
  level: string
  status: string
  lessons: ILesson[]
  providerId: string
}
