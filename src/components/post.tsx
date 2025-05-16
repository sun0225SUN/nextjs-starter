'use client'

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { api } from '~/trpc/react'

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery()

  const utils = api.useUtils()
  const [name, setName] = useState('')
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate()
      setName('')
    },
  })

  return (
    <div className='w-full max-w-xs'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createPost.mutate({ name })
        }}
        className='flex flex-col gap-4'
      >
        {latestPost ? (
          <p className='truncate'>Your most recent post: {latestPost.name}</p>
        ) : (
          <p>You have no posts yet.</p>
        )}
        <Input
          type='text'
          placeholder='Title'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button
          type='submit'
          disabled={createPost.isPending}
        >
          {createPost.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  )
}
