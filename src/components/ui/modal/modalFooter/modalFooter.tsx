import clsx from 'clsx'

import s from '@/components/ui/modal/modalFooter/modalFooter.module.scss'

export enum CounButton {
  One = 1,
  Two = 2,
}

type FooterModalProps = {
  countButton: CounButton
  firstButtonHandler?: () => void
  firstButtonName?: string
  secondButtonHandler?: () => void
  secondButtonName?: string
}

export const ModalFooter = (props: FooterModalProps) => {
  const {
    countButton,
    firstButtonHandler,
    firstButtonName,
    secondButtonHandler,
    secondButtonName,
  } = props

  return countButton === CounButton.One ? (
    <div className={clsx(s.footer, s.oneButton)}>
      <button className={s['primary-button']} onClick={firstButtonHandler}>
        {firstButtonName}
      </button>
    </div>
  ) : (
    <div className={s.footer}>
      <button className={s['secondary-button']} onClick={secondButtonHandler}>
        {secondButtonName}
      </button>
      <button className={s['primary-button']} onClick={firstButtonHandler}>
        {firstButtonName}
      </button>
    </div>
  )
}
