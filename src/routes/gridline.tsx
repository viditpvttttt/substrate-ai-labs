import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gridline')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/gridline"!</div>
}
