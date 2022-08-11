import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services'

interface FormInputs {
  username: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation(login, {
    onSuccess(res) {
      localStorage.setItem('token', res.accessToken)
      navigate('/', { replace: true })
    },
  })

  const onSubmit = (data: FormInputs) => mutate(data)

  const [form] = Form.useForm<FormInputs>()

  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-12">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-gray-800">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="login"
            />
          </div>
          <div className="md:w-8/12 lg:ml-20 lg:w-5/12">
            <Form form={form} onFinish={onSubmit}>
              <Form.Item name="username">
                <Input placeholder="请输入用户名"></Input>
              </Form.Item>
              <Form.Item name="password" required>
                <Input type="password" placeholder="请输入密码"></Input>
              </Form.Item>

              <div className="mb-2 text-right">
                <Link to="/">忘记密码？</Link>
              </div>

              <Form.Item>
                <Button
                  loading={isLoading}
                  type="primary"
                  className="w-full"
                  htmlType="submit"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
