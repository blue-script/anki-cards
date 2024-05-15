import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const idTimer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(idTimer)
  }, [value, delay])

  return debouncedValue
}
