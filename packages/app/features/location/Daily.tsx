import { ColorTokens, Image, Paragraph, Progress, SizeTokens, View, XStack, YStack } from '@my/ui'
import React, { useEffect, useState } from 'react'
import { WeatherData } from '../apis/LocationCardApi'
import { FlatList } from 'react-native'
import { format, parseISO } from 'date-fns'
import { formatDate } from './WeatherCard'
import { DialogDemo } from './WeatherDialog'
// import { router } from 'expo-router';

interface renderProps {
  item: WeatherData['forecast']['forecastday'][0] | undefined
  index: number
}

type Props = { weather?: WeatherData }
export function Daily(props: Props) {
  const { weather } = props

  const renderItem = ({ item, index }: renderProps) => {
    return <DialogDemo daily={item} />
  }
  //   daily={item}
  return (
    <XStack jc={'space-between'}>
      <FlatList
        data={weather?.forecast.forecastday}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        style={{ width: '100%' }}
      />
    </XStack>
  )
}

type DailyProps = {
  daily: WeatherData['forecast']['forecastday'][0] | undefined
  onPress?: () => {}
}

const DailyComponent = (props: DailyProps) => {
  const { daily, onPress } = props
  const [color, setColor] = useState('$gray10Dark')
  const [size, setSize] = useState(1)
  const [progress, setProgress] = useState(0)
  const sizeProp = `$${size}` as SizeTokens
  const colorProp = `$${color}` as ColorTokens

  useEffect(() => {
    const timer = setTimeout(() => {
      if (daily?.day.avgtemp_c !== undefined) {
        setProgress(daily.day.avgtemp_c)
        setColor(
          daily.day.avgtemp_c > 30
            ? '#FF0000'
            : daily.day.avgtemp_c >= 20
            ? '#FF6347'
            : daily.day.avgtemp_c <= 10
            ? '#6495ED'
            : '#9ACD32'
        )
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [daily?.day.avgtemp_c])

  return (
    <XStack
      p={'$5'}
      jc={'space-between'}
      hoverStyle={{ backgroundColor: '$backgroundFocus' }}
      onPress={onPress}
    >
      <XStack>
        <YStack bc={'$backgroundFocus'} br={'$6'} ai={'center'} jc={'center'}>
          <Image
            source={{
              width: 50,
              height: 50,
              uri: 'https:' + `${daily?.day.condition.icon}`,
            }}
            resizeMode="contain"
          />
        </YStack>
        <YStack jc={'center'} ml={'$3'}>
          <Paragraph $sm={{ size: '$2' }}>{formatDate(daily?.date, '1')}</Paragraph>
          <Paragraph $sm={{ size: '$2' }} color={'$gray10Light'}>
            {daily?.day.condition.text}
          </Paragraph>
        </YStack>
      </XStack>
      <YStack jc={'center'} f={1} $sm={{ ml: '$5' }} $platform-web={{ maxWidth: '30%' }}>
        <XStack jc={'space-between'} mb={'$2'}>
          <Paragraph $sm={{ size: '$2' }} color={'$gray10Light'}>
            {daily?.day.mintemp_c}°
          </Paragraph>
          <Paragraph $sm={{ size: '$2' }}>{daily?.day.maxtemp_c}°</Paragraph>
        </XStack>
        <YStack ai={'center'} jc={'center'} mt={'$2'}>
          <Progress size={sizeProp} value={progress} max={45}>
            <Progress.Indicator animation="bouncy" bc={color} />
          </Progress>
        </YStack>
      </YStack>
    </XStack>
  )
}

export default DailyComponent
