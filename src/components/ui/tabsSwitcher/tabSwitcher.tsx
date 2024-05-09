import * as TabsSwitcher from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tabSwitcher.module.scss'

export type Tab = {
  disabled?: boolean
  text: string
  value: string
}

export type TabSwitcherProps = {
  className?: string
  label?: string
  onValueChange: (value: string) => void
  tabs: Tab[]
  value: string
}

export const TabSwitcher = ({ className, label, onValueChange, tabs, value }: TabSwitcherProps) => {
  const classes = clsx(s.label, className)

  return (
    <div className={classes}>
      {label}
      <TabsSwitcher.Root className={s.root} onValueChange={onValueChange} value={value}>
        <TabsSwitcher.List>
          {tabs.map(t => (
            <TabsSwitcher.Trigger
              className={s.trigger}
              disabled={t.disabled}
              key={t.value}
              value={t.value}
            >
              {t.text}
            </TabsSwitcher.Trigger>
          ))}
        </TabsSwitcher.List>
      </TabsSwitcher.Root>
    </div>
  )
}
