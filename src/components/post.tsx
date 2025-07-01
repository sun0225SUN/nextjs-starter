'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { api } from '~/trpc/react'

export function LatestPost() {
  const t = useTranslations('Post')
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
    <div className='flex w-full flex-col items-center justify-center'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createPost.mutate({ name })
        }}
        className='flex flex-col gap-6 text-center'
      >
        {latestPost ? (
          <p className='truncate'>
            {t('latestPost', { name: latestPost.name })}
          </p>
        ) : (
          <p>{t('noPost')}</p>
        )}
        <Input
          type='text'
          placeholder={t('titlePlaceholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button
          type='submit'
          disabled={createPost.isPending}
        >
          {createPost.isPending ? t('submitting') : t('submit')}
        </Button>
      </form>
    </div>
  )
}
