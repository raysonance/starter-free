import { Button, Paragraph, YStack } from '@my/ui'
import { ChevronLeft, Plus } from '@tamagui/lucide-icons'
import React from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'

const { useParam } = createParam<{ id: string }>()

export function UserDetailScreen() {
  const [id] = useParam('id')
  const link = useLink({
    href: '/',
  })

  return (
    <YStack f={1} jc="center" ai="center" gap="$4">
      <Paragraph ta="center" fow="700">{`User ID: ${id}`}</Paragraph>
      <Plus size="$4" />
      <Button {...link} icon={ChevronLeft}>
        Go Home
      </Button>
    </YStack>
  )
}
