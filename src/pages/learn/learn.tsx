import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons'
import { useGetRandomCardQuery } from '@/services/decks/decks.service'
import { Button, Card, Page, RadioGroup, Typography } from '@/shared'

import s from './learn.module.scss'

const radioGroupData = [
  { label: `Didn't know`, value: '1' },
  { label: `Forgot`, value: '2' },
  {
    label: `A lot of thoughts`,
    value: '3',
  },
  { label: `Confused`, value: '4' },
  { label: `Knew the answer`, value: '5' },
]

export const Learn = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const { data, refetch } = useGetRandomCardQuery({ id: deckId ?? '' })
  const [answer, showAnswer] = useState<boolean>(false)
  const [textGrade, setTextGrade] = useState<string>('')

  const handleClick = () => {
    showAnswer(!answer)
  }

  const handleNextQuestionQuery = async () => {
    await refetch()
    showAnswer(false)
  }

  console.log(data)

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
            Learn {data?.deckId}
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
          {!answer && (
            <Button className={s.btn} fullWidth onClick={handleClick}>
              Show Answer
            </Button>
          )}
          {answer && (
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
                onValueChange={setTextGrade}
                options={radioGroupData}
                value={textGrade || data?.grade.toString()}
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
