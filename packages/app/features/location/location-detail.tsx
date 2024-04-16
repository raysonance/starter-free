import { Button, FullScreenLoading, Paragraph, View, YStack } from '@my/ui'
import React from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { fetchWeather } from '../apis/LocationCardApi'
import Hourly from './Hourly'
import { CustomHeader } from '@my/ui'
import WeatherCard from './WeatherCard'
import { Daily } from './Daily'

const { useParam } = createParam<{ id: string }>()

export function LocationDetailScreen() {
  const [id] = useParam('id')
  const link = useLink({
    href: '/',
  })
  console.log(id?.split(','))
  console.log(id?.split(',')[1])
  const { data: weather, isLoading } = fetchWeather(id?.split(',')[0], id?.split(',')[1])

  if (isLoading) {
    return <FullScreenLoading />
  }
  return (
    <View f={1} width={'100%'}>
      <CustomHeader t={weather?.location.region} r="Add" />
      <WeatherCard weather={weather} />
      <Hourly weather={weather} />
      <Daily weather={weather} />
    </View>
  )
}
