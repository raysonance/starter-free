import { Image, Paragraph, View, XStack, YStack } from '@my/ui'
import React from 'react'
import { WeatherData } from '../apis/LocationCardApi'
import { FlatList } from 'react-native'
import { HourlyDemo } from './HourlyDialog'
// import { router } from 'expo-router';

interface renderProps {
  item: WeatherData['forecast']['forecastday'][0]['hour'][0] | undefined
  index: number
}

type Props = {
  weather?: WeatherData['forecast']['forecastday'][0]['hour']
  astro?: WeatherData['forecast']['forecastday'][0]['astro']
}
export function Hourly(props: Props) {
  const { weather, astro } = props

  const renderItem = ({ item, index }: renderProps) => {
    return <HourlyDemo hour={item} astro={astro} />
  }

  return (
    <XStack jc={'space-between'} my={'$5'}>
      <FlatList
        data={weather}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        style={{ width: '100%' }}
      />
    </XStack>
  )
}

type HourlyProps = {
  hour: WeatherData['forecast']['forecastday'][0]['hour'][0] | undefined
  onPress?: () => {}
}

export const HourlyComponent = (props: HourlyProps) => {
  const { hour, onPress } = props
  return (
    <YStack
      ai={'center'}
      jc={'center'}
      m={'$4'}
      animation={'bouncy'}
      hoverStyle={{ backgroundColor: '$backgroundFocus', scale: 1.2 }}
      onPress={onPress}
    >
      <YStack bc={'$backgroundFocus'} br={'$6'} ai={'center'} jc={'center'}>
        <Image
          source={{
            width: 90,
            height: 90,
            uri: 'https:' + `${hour?.condition.icon}`,
          }}
          resizeMode="contain"
        />
      </YStack>
      <Paragraph size={'$3'} color={'$gray10Light'}>
        {hour?.time.split(' ')[1]}
      </Paragraph>
      <Paragraph>{hour?.temp_c}°</Paragraph>
    </YStack>
  )
}

export default Hourly
