'use client'

import { useIsClient } from '~/hooks/use-client'
import { useBearStore } from '~/store/bear'

export function StoreDemo() {
  const bears = useBearStore((state) => state.bears)
  const addABear = useBearStore((state) => state.addABear)

  const isClient = useIsClient()

  if (!isClient) {
    return <div className='h-5' />
  }

  return (
    <div className='flex h-5 items-center gap-4'>
      <div>{bears}</div>
      <button
        type='button'
        onClick={addABear}
        className='rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      >
        Add a Bear
      </button>
    </div>
  )
}
