import { Typography } from '@/components/ui/Typography'

export function App() {
  return (
    <>
      <Typography as={'p'} color={'light'} option={'body1'}>
        Body1_Text
      </Typography>
      <Typography as={'h2'} color={'light'} option={'h1'}>
        H2_Text
      </Typography>
      <Typography as={'p'} color={'light'} option={'body2'}>
        Body2_Text
      </Typography>
    </>
  )
}
