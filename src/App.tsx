import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { noop } from 'lodash'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'

const queryClient = new QueryClient({
  logger: {
    error: noop,
    log: noop,
    warn: noop,
  },
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
  },
})

export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes />
        </Router>
      </QueryClientProvider>
    </ConfigProvider>
  )
}
