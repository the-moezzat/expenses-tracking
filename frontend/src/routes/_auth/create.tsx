import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Label } from '@/components/ui/label.tsx'
import { api } from '@/lib/api.ts'

export const Route = createFileRoute('/_auth/create')({
  component: Create
})

function Create() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      await api.expenses.$post({ json: value })
      await navigate({ to: '/expenses' })
    }
  })

  return (
    <div className={'max-w-3xl mx-auto'}>
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div>
          <form.Field
            name="title"
            children={field => (
              <>
                <Label htmlFor={field.name}>Title</Label>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
              </>
            )}
          />
          <form.Field
            name="amount"
            children={field => (
              <>
                <Label htmlFor={field.name}>Amount</Label>
                <Input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type={'number'}
                  onChange={e => field.handleChange(+e.target.value)}
                />
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Submit'}
            </Button>
          )}
        />
      </form>
    </div>
  )
}
