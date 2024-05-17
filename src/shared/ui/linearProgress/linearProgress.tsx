import s from './linearProgress.module.scss'

type Props = {
  isLoading: boolean
}

export const LinearProgress = ({ isLoading }: Props) => {
  return isLoading ? (
    <div className={s.linearProgressContainer}>
      <div className={s.linearProgressBar}>
        <div className={s.linearProgressBarInner}></div>
      </div>
    </div>
  ) : (
    <div className={s.stub}></div>
  )
}
