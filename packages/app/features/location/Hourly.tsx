import { Image, Paragraph, View, XStack, YStack } from '@my/ui'
import React from 'react'
import { WeatherData } from '../apis/LocationCardApi'
import { FlatList } from 'react-native'
// import { router } from 'expo-router';

interface renderProps {
  item: WeatherData['forecast']['forecastday'][0]['hour'][0] | undefined
  index: number
}

type Props = { weather?: WeatherData }
export function Hourly(props: Props) {
  const { weather } = props

  const renderItem = ({ item, index }: renderProps) => {
    return <HourlyComponent hour={item} />
  }

  return (
    <XStack jc={'space-between'}  my={'$5'}>
      <FlatList
        data={weather?.forecast.forecastday[0].hour}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        style={{ width: '100%' }}
      />
    </XStack>
  )
}

type HourlyProps = { hour: WeatherData['forecast']['forecastday'][0]['hour'][0] | undefined }

const HourlyComponent = (props: HourlyProps) => {
  const { hour } = props
  return (
    <YStack ai={'center'} jc={'center'} mx={'$4'}>
      <YStack bc={'$backgroundFocus'}  br={'$6'} ai={'center'} jc={'center'}>
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
