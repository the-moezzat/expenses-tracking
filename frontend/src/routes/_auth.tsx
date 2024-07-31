// src/routes/_authenticated.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { authOptions } from '@/lib/api.ts'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const user = await queryClient.fetchQuery(authOptions)

    return { user }
  },
  component: Component
})

function Component() {
  const { user } = Route.useRouteContext()
  if (!user) {
    return <Login />
  }

  return <Outlet />
}

function Login() {
  return (
    <div>
      <h1>You must have an account</h1>
      <Button>
        <a href="/api/login">login</a>
      </Button>
    </div>
  )
}
