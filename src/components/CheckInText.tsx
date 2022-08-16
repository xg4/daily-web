import { ReloadOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Spin } from 'antd'
import { getLatestStatus } from '../services'
import { Project } from '../types'

export default function CheckInText({ accountId, taskId }: Project) {
  const {
    data: isCheckIn,
    isLoading,
    refetch,
  } = useQuery(['getLatestStatus', { accountId, taskId }], () =>
    getLatestStatus({ accountId, taskId })
  )

  if (isLoading) {
    return <Spin size="small" />
  }

  return (
    <div>
      {isCheckIn ? '已签到' : '未签到'}
      {!isCheckIn && (
        <Button
          onClick={() => refetch()}
          size="small"
          type="link"
          icon={<ReloadOutlined />}
        ></Button>
      )}
    </div>
  )
}
