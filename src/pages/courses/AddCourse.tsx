/* eslint-disable @typescript-eslint/no-explicit-any */
import { Add, ArrowBack, Close, Delete, Image, Movie } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { MuiFileInput } from 'mui-file-input'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Level, Type } from '~/enums/course.enum'
import useCloudinaryApi from '~/hooks/api/useCloudinaryApi'
import useCourse from '~/hooks/api/useCourse'
import { ICourseRequest, ILesson } from '~/interfaces/course.interface'
import { notifyError, notifyLoading, notifySuccess } from '~/utils/toastify'
import { v4 } from 'uuid'
import { cloudinaryURLConvert } from '~/utils'
import { ScreenPath } from '~/enums/screenpath.enum'

const initialLessonData: ILesson = {
  id: 0,
  title: '',
  description: '',
  objective: '',
  video: '',
  type: Type.FREE
}

const initialCourseData: ICourseRequest = {
  title: '',
  description: '',
  duration: 0,
  lessons: [initialLessonData],
  level: Level.EASY,
  objective: '',
  price: 0,
  thumbnail: '',
  type: Type.FREE
}

const AddCourse = () => {
  const { register, handleSubmit, control, getValues } = useForm<ICourseRequest>({
    defaultValues: initialCourseData
  })

  const { createCourse } = useCourse()
  const { uploadCloudinary } = useCloudinaryApi()

  const navigate = useNavigate()
  const [lessons, setLessons] = useState<ILesson[]>([initialLessonData])
  const [lessonNumber, setLessonNumber] = useState(1)

  const handleAddLesson = () => {
    setLessonNumber(lessonNumber + 1)
    setLessons((oldLessons) => [
      ...oldLessons,
      {
        id: lessonNumber,
        title: '',
        description: '',
        objective: '',
        video: '',
        type: Type.FREE
      }
    ])
  }

  const handleLessonChange = (index: number, name: string, value: any) => {
    setLessons((oldLessons) =>
      oldLessons.map((lesson) => {
        if (lesson.id === index) {
          return { ...lesson, [name]: value }
        } else {
          return lesson
        }
      })
    )
  }

  const handleDeleteLesson = (index: number) => {
    setLessons(lessons.filter((value) => value.id !== index))
  }

  const uploadFile = async (file: File, publicIds: string) => {
    try {
      await uploadCloudinary([file], [publicIds])
    } catch (error) {
      notifyError('Error!')
    }
  }

  const createData = async (request: ICourseRequest) => {
    notifyLoading()
    try {
      const response = await createCourse(request)
      if (response) {
        notifySuccess('Course added')
      }
    } catch (error) {
      notifyError('Error!')
    }
  }

  const convertVideoToLink = (lesson: ILesson[]) =>
    lesson.map((value) => {
      const uuid = v4()
      if (!(typeof value.video === 'string')) uploadFile(value.video, uuid)
      return {
        title: value.title,
        description: value.description,
        objective: value.objective,
        type: value.type,
        video: cloudinaryURLConvert(uuid, 'video')
      }
    })

  const submitData = (data: ICourseRequest) => {
    const uuid = v4()
    uploadFile(data.thumbnail, uuid)
    const request = {
      ...data,
      duration: Number(data.duration),
      price: getValues('type') === Type.FREE ? 0 : Number(data.price),
      thumbnail: cloudinaryURLConvert(uuid, 'image'),
      lessons: convertVideoToLink(lessons)
    }
    createData(request)
    navigate(ScreenPath.COURSE)
  }

  return (
    <Box sx={{ width: '100%', m: 2 }}>
      <Button variant='outlined' sx={{ my: 1 }} onClick={() => navigate(-1)} startIcon={<ArrowBack />}>
        Back
      </Button>
      <Typography marginBottom={5} variant='h4' fontWeight={700}>
        Add new course
      </Typography>
      <form onSubmit={handleSubmit(submitData)}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box sx={{ width: '45%' }}>
              <Typography variant='h6' marginBottom={3}>
                Course information
              </Typography>
              <TextField required {...register('title')} margin='normal' fullWidth label='Title' />
              <TextField
                required
                {...register('description')}
                margin='normal'
                fullWidth
                label='Description'
                rows={4}
                maxRows={4}
                multiline
              />
              <TextField required {...register('objective')} margin='normal' fullWidth label='Objective' />
              <TextField
                required
                {...register('duration')}
                inputProps={{ min: 0, max: 100000000, step: 1 }}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>min</InputAdornment>
                }}
                margin='normal'
                fullWidth
                label='Duration (minute)'
                type='number'
              />
              <FormControl required margin='normal' fullWidth>
                <InputLabel>Level</InputLabel>
                <Select defaultValue={Level.EASY} {...register('level')} label='Level'>
                  {Object.keys(Level).map((value, i) => (
                    <MenuItem key={i} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl required margin='normal' fullWidth>
                <InputLabel>Type</InputLabel>
                <Select defaultValue={Type.FREE} {...register('type')} label='Level'>
                  {Object.keys(Type).map((value, i) => (
                    <MenuItem key={i} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                disabled={getValues('type') === Type.FREE}
                required
                {...register('price')}
                inputProps={{ min: 0, max: 100000000, step: 1 }}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>VND</InputAdornment>
                }}
                margin='normal'
                fullWidth
                label='Price'
                type='number'
              />
              <Controller
                name='thumbnail'
                control={control}
                render={({ field, fieldState }) => (
                  <MuiFileInput
                    required
                    {...field}
                    helperText={fieldState.invalid ? 'File is invalid' : ''}
                    error={fieldState.invalid}
                    clearIconButtonProps={{
                      title: 'Remove',
                      children: <Close fontSize='small' />
                    }}
                    placeholder='Insert a image'
                    fullWidth
                    inputProps={{ accept: '.png, .jpeg, .jpg' }}
                    margin='normal'
                    label='Thumbnail'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Image />
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ width: '45%' }}>
              <Typography variant='h6' marginBottom={3}>
                Lessons
              </Typography>
              <Button onClick={handleAddLesson} sx={{ mb: 2 }} variant='outlined' startIcon={<Add />}>
                Add lesson
              </Button>
              {lessons.map((value) => (
                <Card
                  key={value.id}
                  sx={{
                    my: 2,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                  }}
                >
                  <Box sx={{ width: '75%' }}>
                    <TextField
                      required
                      margin='normal'
                      fullWidth
                      label='Title'
                      name='title'
                      onChange={(event) => handleLessonChange(value.id, event.target.name, event.target.value)}
                    />
                    <TextField
                      name='description'
                      onChange={(event) => handleLessonChange(value.id, event.target.name, event.target.value)}
                      required
                      margin='normal'
                      fullWidth
                      label='Description'
                      rows={4}
                      maxRows={4}
                      multiline
                    />
                    <TextField
                      name='objective'
                      onChange={(event) => handleLessonChange(value.id, event.target.name, event.target.value)}
                      required
                      margin='normal'
                      fullWidth
                      label='Objective'
                    />
                    <FormControl required margin='normal' fullWidth>
                      <InputLabel>Type</InputLabel>
                      <Select
                        name='type'
                        onChange={(event) => handleLessonChange(value.id, event.target.name, event.target.value)}
                        label='Type'
                      >
                        {Object.keys(Type).map((value, i) => (
                          <MenuItem key={i} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <MuiFileInput
                      required
                      clearIconButtonProps={{
                        title: 'Remove',
                        children: <Close fontSize='small' />
                      }}
                      value={value.video}
                      onChange={(file: File | null) => {
                        handleLessonChange(value.id, 'video', file)
                      }}
                      placeholder='Insert a video'
                      fullWidth
                      inputProps={{ accept: '.mp4, .mkv' }}
                      margin='normal'
                      label='Video'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Movie />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                  <IconButton
                    disabled={lessons.length === 1}
                    onClick={() => handleDeleteLesson(value.id)}
                    color='error'
                  >
                    <Delete />
                  </IconButton>
                </Card>
              ))}
            </Box>
          </Box>
          <Button size='large' color='success' variant='outlined' sx={{ my: 3 }} type='submit'>
            Submit
          </Button>
        </Paper>
      </form>
    </Box>
  )
}

export default AddCourse
