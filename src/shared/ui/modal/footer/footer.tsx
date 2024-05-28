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
  secondButtonHandler?: () => void
  secondButtonName?: string
}

export const Footer = (props: Props) => {
  const {
    countButton,
    firstButtonHandler,
    firstButtonName,
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
      <button className={s.secondaryButton} onClick={secondButtonHandler} type={'reset'}>
        {secondButtonName}
      </button>
      <button className={s.primaryButton} onClick={firstButtonHandler}>
        {firstButtonName}
      </button>
    </div>
  )
}
