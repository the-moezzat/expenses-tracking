import { hc } from 'hono/client'
import { queryOptions } from '@tanstack/react-query'
import { type ApiRoutes } from '@server/app'

export const client = hc<ApiRoutes>('/')

export const api = client.api

async function getUser() {
  try {const user = await api.me.$get()
  if (!user.ok) return
  return await user.json()

  }catch (error) {
    console.error(error)
  } 
}

export const authOptions = queryOptions({
  queryKey: ['auth'],
  queryFn: getUser,
  staleTime: Infinity
})
