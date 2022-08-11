import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Select } from 'antd'
import { createAccount, getTasks, updateAccount } from '../services'
import { Account } from '../types'

interface CreateData extends Account {
  taskIds?: number[]
}

interface AccountFormProps {
  initialValues?: Partial<CreateData>
  onFinish?: () => void
}

export default function AccountForm({
  initialValues,
  onFinish,
}: AccountFormProps) {
  const { data: tasks } = useQuery(['getTasks'], getTasks)

  const [form] = Form.useForm()

  const queryClient = useQueryClient()

  const { mutate: handleCreate } = useMutation(createAccount, {
    onSuccess() {
      onFinish && onFinish()
      queryClient.refetchQueries(['getAccounts'])
      queryClient.refetchQueries(['getProjects'])
    },
  })

  const { mutate: handleUpdate } = useMutation(updateAccount, {
    onSuccess() {
      onFinish && onFinish()
      queryClient.refetchQueries(['getAccounts'])
      queryClient.refetchQueries(['getProjects'])
    },
  })

  console.log(initialValues, 'initialValues')

  return (
    <div className="py-4 px-8">
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={initialValues}
        form={form}
        onFinish={initialValues?.id ? handleUpdate : handleCreate}
      >
        <Form.Item hidden name="id">
          <Input type="number" />
        </Form.Item>

        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>

        <Form.Item label="简介" name="description">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="cookie" name="cookie" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="关联任务" name="taskIds">
          <Select mode="multiple">
            {tasks?.map((task) => (
              <Select.Option key={task.id} value={task.id}>
                {task.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
