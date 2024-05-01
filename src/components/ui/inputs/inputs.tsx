import { ComponentPropsWithoutRef, useState } from 'react'

import SvgCloseOutline from '@/assets/icons/CloseOutline'
import SvgEyeOutline from '@/assets/icons/EyeOutline'
import SvgSearchOutline from '@/assets/icons/SearchOutline'
import clsx from 'clsx'

import s from './inputs.module.scss'

export type InputsProps = {
  className?: string
  disabled?: boolean
  errorMessage?: string
  fullWidth?: boolean
  variant?: 'input' | 'password' | 'search'
} & ComponentPropsWithoutRef<'input'>

export const Inputs = ({
  className,
  disabled,
  errorMessage,
  fullWidth,
  variant = 'input',
  ...rest
}: InputsProps) => {
  let icon = null
  const finalInputClassName = clsx(
    s.input,
    s[variant],
    fullWidth && s.fullWidth,
    errorMessage && s.error,
    disabled && s.disabled,
    variant === 'search' ? s.inputSearch : '',
    className
  )
  const [focus, setFocus] = useState(false)
  const finalAboveInput = clsx(s.textAboveInput, disabled && s.disabled)
  const finalInputContainer = clsx(s.inputContainer, fullWidth && s.fullWidth)
  let placeholderText = 'input'
  let inputText = 'input'

  if (variant === 'search') {
    placeholderText = 'input search'
    inputText = ''
    icon = focus && <SvgCloseOutline className={s.positionRightIconSearch} color={'white'} />
  }
  if (variant === 'password') {
    icon = <SvgEyeOutline className={s.positionIconPassword} color={'white'} />
  }
  if (errorMessage) {
    placeholderText = errorMessage
  }
  const onFocusHandler = () => {
    setFocus(true)
  }
  const onBlurHandler = () => {
    setFocus(false)
  }

  return (
    <div className={s.inputWrapper}>
      <span className={finalAboveInput}>{inputText}</span>
      <div className={finalInputContainer}>
        {variant === 'search' && (
          <span className={disabled ? s.disabled : ''}>
            <SvgSearchOutline className={s.positionLeftIconSearch} color={'white'} />
          </span>
        )}
        {/* Иконка внутри input */}
        <input
          className={finalInputClassName}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          placeholder={placeholderText}
          {...rest}
        />
        <span className={disabled ? s.disabled : ''}>{icon}</span> {/* Иконка внутри input */}
      </div>
      <span className={s.textError}>{errorMessage}</span>
    </div>
  )
}
