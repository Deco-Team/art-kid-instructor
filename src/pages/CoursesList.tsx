/* eslint-disable react-hooks/exhaustive-deps */
import { Delete, Edit, Visibility } from '@mui/icons-material'
import { Chip, IconButton } from '@mui/material'
import { MaterialReactTable, MRT_ColumnDef, MRT_PaginationState, useMaterialReactTable } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Level, Status } from '~/enums/course.enum'
import useCourse from '~/hooks/api/useCourse'
import { IPagination } from '~/interfaces'
import { ICourseColumn, ICourseResponse } from '~/interfaces/course.interface'

const CoursesList = () => {
  const initialData = {
    docs: [],
    totalDocs: 0,
    offset: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  }

  const navigate = useNavigate()
  const { getAllCourses } = useCourse()
  const [data, setData] = useState<IPagination<ICourseResponse>>(initialData)
  const [isFetching, setIsFetching] = useState(false)
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5 //customize the default page size
  })
  const columns = useMemo<MRT_ColumnDef<ICourseColumn>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        muiTableBodyCellProps: {
          align: 'left'
        }
      },
      {
        accessorKey: 'price',
        header: 'Price',
        Cell({ row }) {
          return `${row.original.price.toLocaleString()} VND`
        }
      },
      {
        accessorKey: 'duration',
        header: 'Duration'
      },
      {
        accessorKey: 'level',
        header: 'Level',
        Cell({ row }) {
          switch (row.original.level) {
            case Level.EASY:
              return <Chip color='success' variant='outlined' label={row.original.level} />
            case Level.MEDIUM:
              return <Chip color='warning' variant='outlined' label={row.original.level} />
            default:
              return <Chip color='error' variant='outlined' label={row.original.level} />
          }
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell({ row }) {
          switch (row.original.status) {
            case Status.DELETED:
              return <Chip color='error' variant='outlined' label={row.original.status} />
            case Status.PENDING:
              return <Chip color='warning' variant='outlined' label={row.original.status} />
            case Status.PUBLISHED:
              return <Chip color='success' variant='outlined' label={row.original.status} />
            default:
              return <Chip color='error' variant='outlined' label={row.original.status} />
          }
        }
      },
      {
        header: 'Action',
        Cell({ row }) {
          return (
            <>
              <IconButton onClick={() => navigate(`/course/${row.original._id}`)}>
                <Visibility color='warning' />
              </IconButton>
              <IconButton>
                <Edit color='info' />
              </IconButton>
              <IconButton>
                <Delete color='error' />
              </IconButton>
            </>
          )
        }
      }
    ],
    []
  )

  useEffect(() => {
    document.title = 'Course'
    return () => {}
  }, [])

  const getAllData = async () => {
    try {
      setIsFetching(true)
      const response = await getAllCourses(pagination.pageIndex + 1, pagination.pageSize)
      if (response) {
        setData(response || initialData)
        setIsFetching(false)
      }
    } catch (error) {
      console.error()
    }
  }

  useEffect(() => {
    getAllData()
    return () => {}
  }, [pagination])

  const table = useMaterialReactTable({
    columns: columns,
    data: data.docs,
    // enableTopToolbar: false,
    rowCount: data.totalDocs,
    pageCount: data.totalPages,
    manualPagination: true,
    muiTableHeadCellProps: {
      align: 'center'
    },
    muiTableBodyCellProps: {
      align: 'center'
    },
    initialState: {
      pagination
    },
    muiTablePaperProps: {
      style: {
        width: '100%',
        margin: '1rem'
      }
    },
    state: {
      pagination,
      isLoading: isFetching,
      showProgressBars: isFetching
    },
    onPaginationChange: setPagination
  })

  return <MaterialReactTable table={table} />
}

export default CoursesList
