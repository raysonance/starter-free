import { Paragraph, View, XStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import React from 'react'
import { useColorScheme } from 'react-native'
import { useRouter } from 'solito/router'
// import { router } from 'expo-router';

type Props = {
  t?: string
  r: string
  onPress?: () => {}
}
export function CustomHeader(props: Props) {
  const { t='Header', r, onPress } = props
  const router = useRouter()

  return (
    <XStack mx={'$3'} jc={'space-between'}>
      <View onPress={() => router.back()}>
        <ChevronLeft size={'$2'} />
      </View>
      <Paragraph size={'$5'}>{t}</Paragraph>
      <Paragraph color={'$color.orange11Dark'} onPress={onPress}>
        {r}
      </Paragraph>
    </XStack>
  )
}
