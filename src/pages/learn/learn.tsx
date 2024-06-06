import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons'
import {
  useGetDeckByIdQuery,
  useLearnRandomCardQuery,
  useUpdateRandomCardMutation,
} from '@/services/decks/decks.service'
import { NewGradeData } from '@/services/decks/decks.types'
import { Button, Card, Page, RadioGroup, Typography } from '@/shared'

import s from './learn.module.scss'

export const Learn = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const { data, refetch } = useLearnRandomCardQuery({ id: deckId ?? '' })
  const { data: deckData } = useGetDeckByIdQuery({ id: deckId ?? '' })
  const [answerVisible, setAnswerVisible] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState('')
  const [updateCardGrade] = useUpdateRandomCardMutation()

  const radioGroupData = useMemo(
    () => [
      { label: `Didn't know`, value: '1' },
      { label: `Forgot`, value: '2' },
      { label: `A lot of thoughts`, value: '3' },
      { label: `Confused`, value: '4' },
      { label: `Knew the answer`, value: '5' },
    ],
    []
  )

  const handleClick = () => {
    setAnswerVisible(!answerVisible)
  }

  const handleNextQuestionQuery = async () => {
    if (!deckId || !data) {
      console.error('deckId or data is not defined')

      return
    }

    const newData: NewGradeData = {
      cardId: data.id,
      grade: parseInt(selectedGrade) || 5,
    }

    await updateCardGrade({ id: deckId, ...newData })
    await refetch()
    setAnswerVisible(false)
    setSelectedGrade('')
  }

  return (
    <Page className={s.wrapper} mt={'24px'}>
      <div className={s.navigation}>
        <div className={s.linkWrapper}>
          <Typography as={Link} className={s.link} option={'body2'} to={'/decks'}>
            <ArrowBackOutline />
            Back to Decks Lists
          </Typography>
        </div>
      </div>
      <Card className={s.card}>
        <div className={s.textWrapper}>
          <Typography className={s.header} option={'h1'}>
            Learn {deckData?.name}
          </Typography>
          <Typography className={s.subtitle} option={'subtitle'}>
            Question: {data?.question}
          </Typography>
          {data?.questionImg && (
            <img alt={'img of questionCard'} className={s.image} src={data.questionImg}></img>
          )}
          {/*<img alt={'img of questionCard'} className={s.image} src={learnCardImage}></img>*/}
          <Typography
            className={s.subtitle2}
            option={'subtitle2'}
          >{`Количество попыток ответов на вопрос: ${data?.shots}`}</Typography>
          {!answerVisible && (
            <Button className={s.btn} fullWidth onClick={handleClick}>
              Show Answer
            </Button>
          )}
          {answerVisible && (
            <>
              <Typography className={s.subtitle} option={'subtitle'}>
                Answer: {data?.answer}
              </Typography>
              {data?.answerImg && (
                <img alt={'img of answerCard'} className={s.image} src={data.answerImg}></img>
              )}
              {/*<img alt={'img of answerCard'} className={s.image} src={learnCardImage}></img>*/}
              <Typography className={s.subtitle} option={'subtitle'}>
                Rate yourself :
              </Typography>
              <RadioGroup
                onValueChange={setSelectedGrade}
                options={radioGroupData}
                value={selectedGrade || data?.grade.toString()}
              ></RadioGroup>
              <Button className={s.btn} fullWidth onClick={handleNextQuestionQuery}>
                Next Question
              </Button>
            </>
          )}
        </div>
      </Card>
    </Page>
  )
}
