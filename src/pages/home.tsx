import AccountTable from '../components/AccountTable'
import ProjectTable from '../components/ProjectTable'
import TaskTable from '../components/TaskTable'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center space-y-10 bg-gray-200">
      <TaskTable />
      <AccountTable />
      <ProjectTable />
    </div>
  )
}
