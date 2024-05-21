import { LoadingType } from '@/shared/store/appSlice.types'

import s from './linearProgress.module.scss'

type Props = {
  isLoading: LoadingType
}

export const LinearProgress = ({ isLoading }: Props) => {
  return isLoading === 'loading' ? (
    <div className={s.linearProgressContainer}>
      <div className={s.linearProgressBar}>
        <div className={s.linearProgressBarInner}></div>
      </div>
    </div>
  ) : (
    <div className={s.stub}></div>
  )
}
