import s from './linearProgress.module.scss'

const LinearProgress = () => {
  const isLoading = true

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

export default LinearProgress
