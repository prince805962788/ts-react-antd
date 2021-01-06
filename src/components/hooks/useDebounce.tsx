import { useState, useEffect } from 'react'
function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler) //当useEffect返回一个函数的时候，表示一个清楚操作，在下次update的时候清除掉
    }
  }, [value, delay])
  return debouncedValue
}
export default useDebounce