'use client'

import { Button } from '~/components/ui/button'
import { useBearStore } from '~/store/bear'

export function Bear() {
  const { bears, addABear, removeABear } = useBearStore()
  return (
    <>
      {bears}
      <div className='flex gap-10'>
        <Button
          className='cursor-pointer'
          onClick={addABear}
        >
          Add A Bear
        </Button>
        <Button
          className='cursor-pointer'
          onClick={removeABear}
        >
          Remove A Bear
        </Button>
      </div>
    </>
  )
}
