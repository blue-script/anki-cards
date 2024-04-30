import { Checkbox } from '@/components/ui/checkbox'

export function App() {
  //return <div>Hello</div>
  return (
    <div>
      <div>
        <Checkbox />
      </div>
      <div>
        <Checkbox label={'Check-box'} />
      </div>
      <div>
        <Checkbox checked disabled />
      </div>
      <div>
        <Checkbox checked disabled label={'Check-box'} />
      </div>
    </div>
  )
}
