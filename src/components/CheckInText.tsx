import { useQuery } from '@tanstack/react-query'
import { Spin } from 'antd'
import { getLatestStatus } from '../services'
import { Project } from '../types'

export default function CheckInText({ accountId, taskId }: Project) {
  const { data: isCheckIn, isLoading } = useQuery(
    ['getLatestStatus', { accountId, taskId }],
    () => getLatestStatus({ accountId, taskId })
  )

  if (isLoading) {
    return <Spin size="small" />
  }

  return <div>{isCheckIn ? '已签到' : '未签到'}</div>
}
