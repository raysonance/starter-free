import { Image, Paragraph, View, XStack, YStack } from '@my/ui'
import React from 'react'
import { WeatherData } from '../apis/LocationCardApi'
import { FlatList } from 'react-native'
import { format, parseISO } from 'date-fns'
// import { router } from 'expo-router';

function formatDate(dateString: string | undefined): string {
  if (dateString) {
    const date = parseISO(dateString)
    return format(date, 'EEE, dd MMMM')
  }
  return ''
}

interface renderProps {
  item: WeatherData['forecast']['forecastday'][0] | undefined
  index: number
}

type Props = { weather?: WeatherData }
export function Daily(props: Props) {
  const { weather } = props

  const renderItem = ({ item, index }: renderProps) => {
    return <DailyComponent daily={item} />
  }

  return (
    <XStack jc={'space-between'} my={'$5'}>
      <FlatList
        data={weather?.forecast.forecastday}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        style={{ width: '100%' }}
      />
    </XStack>
  )
}

type DailyProps = { daily: WeatherData['forecast']['forecastday'][0] | undefined }

const DailyComponent = (props: DailyProps) => {
  const { daily } = props
  return (
    <XStack mx={'$5'} jc={'space-between'}>
      <XStack>
        <YStack bc={'$backgroundFocus'} br={'$6'} ai={'center'} jc={'center'}>
          <Image
            source={{
              width: 90,
              height: 90,
              uri: 'https:' + `${daily?.day.condition.icon}`,
            }}
            resizeMode="contain"
          />
        </YStack>
        <YStack jc={'center'} ml={'$3'}>
          <Paragraph>{formatDate(daily?.date)}</Paragraph>
          <Paragraph color={'$gray10Light'}>{daily?.day.condition.text}</Paragraph>
        </YStack>
      </XStack>
      <YStack></YStack>
    </XStack>
  )
}

export default DailyComponent
