import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { authOptions } from '@/lib/api.ts'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_auth/profile')({
  component: Profile
})

function Profile() {
  const { data, isLoading } = useQuery(authOptions)
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className="p-2">
      <h1>Hello {data.given_name}</h1>
      <a href="/api/logout">
        <Button variant={'destructive'}>Logout</Button>
      </a>
    </div>
  )
}
