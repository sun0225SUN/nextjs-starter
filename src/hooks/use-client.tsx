import { useEffect, useState } from 'react'

export const useIsClient = () => {
  const [isClient, setIsClient] = useState<boolean>(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}
