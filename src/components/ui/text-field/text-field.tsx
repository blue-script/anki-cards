import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { EyeOffOutline, EyeOutline, SearchOutline } from '@/assets/icons'
import SvgCloseOutline from '@/assets/icons/CloseOutline'
import clsx from 'clsx'

import s from './text-field.module.scss'

export type TextFieldProps = {
  className?: string
  clear?: () => void
  disabled?: boolean
  errorMessage?: string
  fullWidth?: boolean
  label?: string
  variant?: 'input' | 'password' | 'search'
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      clear,
      disabled,
      errorMessage,
      fullWidth,
      placeholder,
      variant = 'input',
      ...rest
    }: TextFieldProps,
    ref
  ) => {
    const finalInputClassName = clsx(
      s.input,
      s[variant],
      fullWidth && s.fullWidth,
      errorMessage && s.error,
      disabled && s.disabled,
      variant === 'search' ? s.inputSearch : '',
      className
    )
    const finalAboveInput = clsx(s.textAboveInput, disabled && s.disabled)
    const finalInputContainer = clsx(s.inputContainer, fullWidth && s.fullWidth)
    let placeholderText = placeholder ?? 'input'

    const displayClearButton = variant === 'search' && clear // && rest.value

    const [showPassword, setShowPassword] = useState(false)

    const showPasswordHandler = () => {
      setShowPassword(show => !show)
    }

    if (errorMessage) {
      placeholderText = errorMessage
    }

    return (
      <div className={s.inputWrapper}>
        <span className={finalAboveInput}>{rest.label}</span>
        <div className={finalInputContainer}>
          {variant === 'search' && (
            <SearchOutline className={clsx(s.iconSearch, disabled && s.disabled)} />
          )}
          <input
            className={finalInputClassName}
            placeholder={placeholderText}
            ref={ref}
            type={variant === 'password' && !showPassword ? 'password' : 'text'}
            {...rest}
          />
          {variant === 'password' && (
            <button className={s.button} onClick={showPasswordHandler}>
              {showPassword ? (
                <EyeOffOutline className={clsx(s.positionIconPassword, disabled && s.disabled)} />
              ) : (
                <EyeOutline className={clsx(s.positionIconPassword, disabled && s.disabled)} />
              )}
            </button>
          )}
          {displayClearButton && (
            <button className={s.button} onClick={clear}>
              <SvgCloseOutline
                className={clsx(s.positionRightIconSearch, disabled && s.disabled)}
                color={'white'}
              />
            </button>
          )}
        </div>
        <span className={s.textError}>{errorMessage}</span>
      </div>
    )
  }
)
