import { Select } from '@/components'

export function App() {
  // return <div>Hello</div>
  return (
    <div style={{ padding: '10px' }}>
      <>
        <Select
          defaultValue={'Apple'}
          options={['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']}
        />
        sdfdsf
      </>
    </div>
  )
}
