import { TagOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Card,
  message,
  Popconfirm,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
} from 'antd'
import dayjs from 'dayjs'
import {
  checkIn,
  checkInAll,
  deleteProject,
  getLatestStatus,
  getProjects,
} from '../services'
import { Project } from '../types'
import CheckInText from './CheckInText'

function Action({ accountId, taskId }: Project) {
  const { mutate: handleCheckIn, isLoading: checkInLoading } = useMutation(
    checkIn,
    {
      onSuccess(msg) {
        message.success(msg)
      },
    }
  )

  const { data: isCheckIn, isLoading } = useQuery(
    ['getLatestStatus', { accountId, taskId }],
    () => getLatestStatus({ accountId, taskId })
  )

  const queryClient = useQueryClient()

  const { mutate: handleDelete } = useMutation(deleteProject, {
    onSuccess() {
      queryClient.refetchQueries(['getProjects'])
    },
  })

  return (
    <div className="space-x-2">
      <Button
        disabled={isCheckIn}
        loading={checkInLoading || isLoading}
        onClick={() => handleCheckIn({ accountId, taskId })}
        type="primary"
      >
        签到
      </Button>
      <Popconfirm
        onConfirm={() => handleDelete({ accountId, taskId })}
        title="你确定要删除该账号吗？"
        okText="是"
        cancelText="否"
      >
        <Button danger>删除</Button>
      </Popconfirm>
    </div>
  )
}

export default function ProjectTable() {
  const { data: projects, isLoading } = useQuery(['getProjects'], getProjects)

  const columns: TableColumnsType<Project> = [
    {
      title: '#',
      render(_, project) {
        return project.accountId + '-' + project.taskId
      },
    },
    {
      title: '任务',
      render(_, project) {
        return (
          <Tooltip title={project.task.description}>
            <Tag icon={<TagOutlined />}>{project.task.name}</Tag>
          </Tooltip>
        )
      },
    },
    {
      title: '账号',
      render(_, project) {
        return (
          <Tooltip title={project.account.description}>
            <Tag icon={<UserOutlined />}>{project.account.name}</Tag>
          </Tooltip>
        )
      },
    },
    {
      title: '签到',
      render(_, project) {
        return <CheckInText {...project} />
      },
    },
    {
      title: '创建于',
      render(_, project) {
        return dayjs(project.createdAt).format('YYYY-MM-DD')
      },
    },
    {
      title: '操作',
      render(_, project) {
        return <Action {...project} />
      },
    },
  ]

  return (
    <Card title={<Title />} className="container mx-auto bg-white p-5">
      <Table
        loading={isLoading}
        rowKey={(record) => record.accountId + '-' + record.taskId}
        columns={columns}
        dataSource={projects}
      />
    </Card>
  )
}

function Title() {
  const { mutate, isLoading } = useMutation(checkInAll, {
    onSuccess(msg) {
      message.success(msg)
    },
  })

  return (
    <div className="flex items-center justify-between">
      <div>签到管理</div>

      <div className="space-x-2">
        <Button type="primary" onClick={() => mutate()} loading={isLoading}>
          签到
        </Button>
      </div>
    </div>
  )
}
