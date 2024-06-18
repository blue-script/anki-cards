import { useEffect } from 'react'

type UseModalKeyEventsProps = {
  onEnter: () => void
  onEscape: () => void
  open: boolean
}

export const useModalKeyEvents = ({ onEnter, onEscape, open }: UseModalKeyEventsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape()
      } else if (event.key === 'Enter') {
        onEnter()
      }
    }

    if (open) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onEscape, onEnter])
}
