import { LinkOutlined, TagOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Card, Table, TableColumnsType, Tag } from 'antd'
import dayjs from 'dayjs'
import { getTasks } from '../services'
import { Task } from '../types'

export default function TaskTable() {
  const { data: tasks, isLoading } = useQuery(['getTasks'], getTasks)

  const columns: TableColumnsType<Task> = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      render(text) {
        return <Tag icon={<TagOutlined />}>{text}</Tag>
      },
    },
    {
      title: '简介',
      dataIndex: 'description',
      render(text) {
        return <div>{text || '-'}</div>
      },
    },
    {
      title: '域名',
      dataIndex: 'domain',
      render(text) {
        return <Tag icon={<LinkOutlined />}>{text}</Tag>
      },
    },
    {
      title: '创建于/更新于',
      render(_, task) {
        return (
          <div>
            {dayjs(task.createdAt).format('YYYY-MM-DD')}
            <span className="mx-2">/</span>
            {dayjs(task.updatedAt).format('YYYY-MM-DD')}
          </div>
        )
      },
    },
  ]

  return (
    <Card title="任务列表" className="container mx-auto bg-white p-5">
      <Table
        loading={isLoading}
        rowKey="id"
        columns={columns}
        dataSource={tasks}
      />
    </Card>
  )
}
