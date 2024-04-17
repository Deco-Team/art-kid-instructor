/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Level, Status, Type } from '~/enums/course.enum'
import useCourse from '~/hooks/api/useCourse'
import { ICourseResponse } from '~/interfaces/course.interface'

const CourseDetail = () => {
  const initialData = {
    _id: '',
    title: '',
    description: '',
    objective: '',
    thumbnail: '',
    duration: '',
    price: 0,
    level: '',
    status: '',
    lessons: [],
    providerId: ''
  }

  const { id } = useParams()
  const { getCourseDetail } = useCourse()
  const [data, setData] = useState<ICourseResponse>(initialData)
  const navigate = useNavigate()
  const getDataDetail = async (id: string) => {
    try {
      const response = await getCourseDetail(id)
      setData(response?.data || initialData)
    } catch (error) {
      console.error()
    }
  }

  const StyledChip = ({ value }: { value: string }) => {
    switch (value) {
      case Level.EASY:
      case Status.PUBLISHED:
        return <Chip color='success' label={value} />
      case Status.PENDING:
      case Level.MEDIUM:
        return <Chip color='warning' label={value} />
      default:
        return <Chip color='error' label={value} />
    }
  }

  const StyledChipType = ({ value }: { value: string }) => {
    switch (value) {
      case Type.TRIAL:
        return <Chip color='success' variant='outlined' label={value} />
      default:
        return <Chip color='warning' variant='outlined' label={value} />
    }
  }

  useEffect(() => {
    if (id) getDataDetail(id)
  }, [id])

  return (
    <Box sx={{ width: '100%', m: 2 }}>
      <Button variant='outlined' sx={{ my: 1 }} onClick={() => navigate(-1)} startIcon={<ArrowBack />}>
        Back
      </Button>
      <Typography marginBottom={5} variant='h4' fontWeight={700}>
        {data.title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <img style={{ borderRadius: '5px' }} width='49%' src={data.thumbnail} />
        <Paper elevation={3} sx={{ width: '49%', p: 4 }}>
          <Typography margin={1}>Duration: {data.duration}</Typography>
          <Typography margin={1}>Description: {data.description}</Typography>
          <Typography margin={1}>Objective: {data.objective}</Typography>
          <Typography margin={1}>Price: {data.price.toLocaleString()} VND</Typography>
          <Typography margin={1}>
            Status: <StyledChip value={data.status} />
          </Typography>
          <Typography margin={1}>
            Level: <StyledChip value={data.level} />
          </Typography>
        </Paper>
      </Box>
      <Typography marginTop={5} variant='h4' fontWeight={700}>
        Lessons
      </Typography>
      {data.lessons.map((items, i) => (
        <Card key={i} sx={{ m: 2, p: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box width='50%'>
                <embed width='100%' height='340' src={`${items.video}?rel=0`} />
              </Box>
              <Box width='45%'>
                <Typography variant='h5' fontWeight={700}>
                  {items.title}
                </Typography>
                <Typography margin={1}>Description: {items.description}</Typography>
                <Typography margin={1}>Objective: {items.objective}</Typography>
                <Typography margin={1}>
                  Type: <StyledChipType value={items.type} />
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default CourseDetail
