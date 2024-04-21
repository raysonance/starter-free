import { Paragraph, View, XStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
// import React from 'react'
import { useRouter } from 'solito/router'
// import { router } from 'expo-router';

type Props = {
  t?: string
  r: string
  onPress?: () => void
  back?: boolean
}
export function CustomHeader(props: Props) {
  const { t = 'Header', r, onPress, back=true } = props
  const router = useRouter()

  return (
    <XStack mx={'$3'} my={'$1'} jc={'space-between'}>
      <View onPress={() => router.back()}>
        {back ? (    <ChevronLeft size={'$2'} />) : null}
    
      </View>
      <Paragraph size={'$5'}>{t}</Paragraph>
      <Paragraph
        animation="bouncy"
        hoverStyle={{
          scale: 1.2,
        }}
        pressStyle={{
          scale: 0.9,
        }}
        cursor="pointer"
        color={'$color.orange11Dark'}
        onPress={onPress}
      >
        {r}
      </Paragraph>
    </XStack>
  )
}
