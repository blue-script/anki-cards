import { Card, Page, Typography } from '@/shared'

import s from '@/pages/decks/decksList/decksList.module.scss'

export const QuestionWithImg = () => {
  return (
    <Page className={s.wrapper} mt={'10px'}>
      <Card>
        <Typography option={'h1'}>{`Learn`}</Typography>
      </Card>
    </Page>
  )
}
