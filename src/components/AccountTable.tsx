import { TagOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Card,
  Popconfirm,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import { deleteAccount, getAccounts } from '../services'
import { Account } from '../types'
import AccountForm from './AccountForm'
import ModalForm from './ModalForm'

function Action(account: Account) {
  const queryClient = useQueryClient()

  const { mutate: handleDelete } = useMutation(deleteAccount, {
    onSuccess() {
      queryClient.refetchQueries(['getAccounts'])
      queryClient.refetchQueries(['getProjects'])
    },
  })

  return (
    <div className="space-x-2">
      <ModalForm
        title="编辑账号"
        trigger={<Button type="primary">编辑</Button>}
      >
        <AccountForm
          initialValues={Object.assign({}, account, {
            taskIds: account.tasks.map((t) => t.id),
          })}
        />
      </ModalForm>

      <Popconfirm
        onConfirm={() => handleDelete(account.id)}
        title="你确定要删除该账号吗？"
        okText="是"
        cancelText="否"
      >
        <Button danger>删除</Button>
      </Popconfirm>
    </div>
  )
}

function Title() {
  return (
    <div className="flex items-center justify-between">
      <div>账号管理</div>

      <div>
        <ModalForm
          title="新增账号"
          trigger={<Button type="primary">新增</Button>}
        >
          <AccountForm />
        </ModalForm>
      </div>
    </div>
  )
}

export default function AccountTable() {
  const { data: accounts, isLoading } = useQuery(['getAccounts'], getAccounts)

  const columns: TableColumnsType<Account> = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      render(text) {
        return <Tag icon={<UserOutlined />}>{text}</Tag>
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
      title: 'cookie',
      dataIndex: 'cookieHash',
      render(_, account) {
        const hash = account.cookieHash
        return (
          <Tooltip title={hash}>
            <Typography.Text
              copyable={{
                text: hash,
              }}
            >
              {hash.slice(0, 7)}
            </Typography.Text>
          </Tooltip>
        )
      },
    },
    {
      title: '关联任务',
      render(_, account) {
        return (
          <>
            {account.tasks.map((t) => (
              <Tag icon={<TagOutlined />} key={t.id}>
                {t.name}
              </Tag>
            ))}
          </>
        )
      },
    },
    {
      title: '创建于/更新于',
      render(_, account) {
        return (
          <div>
            {dayjs(account.createdAt).format('YYYY-MM-DD')}
            <span className="mx-2">/</span>
            {dayjs(account.updatedAt).format('YYYY-MM-DD')}
          </div>
        )
      },
    },
    {
      title: '操作',
      render(_, account) {
        return <Action {...account} />
      },
    },
  ]

  return (
    <Card title={<Title />} className="container mx-auto bg-white p-5">
      <Table
        loading={isLoading}
        rowKey="id"
        columns={columns}
        dataSource={accounts}
      />
    </Card>
  )
}
