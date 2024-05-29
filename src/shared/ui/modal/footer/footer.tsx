import { Button } from '@/shared'
import clsx from 'clsx'

import s from '@/shared/ui/modal/footer/footer.module.scss'

export enum CountButton {
  One = 1,
  Two = 2,
}

type Props = {
  countButton: CountButton
  firstButtonHandler?: () => void
  firstButtonName?: string
  firstButtonType?: 'button' | 'reset' | 'submit'
  secondButtonHandler?: () => void
  secondButtonName?: string
}

export const Footer = (props: Props) => {
  const {
    countButton,
    firstButtonHandler,
    firstButtonName,
    firstButtonType,
    secondButtonHandler,
    secondButtonName,
  } = props

  return countButton === CountButton.One ? (
    <div className={clsx(s.footer, s.oneButton)}>
      <button className={s.primaryButton} onClick={firstButtonHandler}>
        {firstButtonName}
      </button>
    </div>
  ) : (
    <div className={s.footer}>
      <Button onClick={secondButtonHandler} type={'reset'} variant={'secondary'}>
        {secondButtonName}
      </Button>
      <Button onClick={firstButtonHandler} type={firstButtonType}>
        {firstButtonName}
      </Button>
    </div>
  )
}
