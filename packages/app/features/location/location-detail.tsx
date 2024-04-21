import { FullScreenLoading, View, useToastController } from '@my/ui'
import React from 'react'
import { createParam } from 'solito'
import { fetchWeather } from '../apis/LocationCardApi'
import Hourly from './Hourly'
import { CustomHeader } from '@my/ui'
import WeatherCard, { WeatherData } from './WeatherCard'
import { FlatList } from 'react-native'
import useCoordinatesStore from '../../utils/store'
import { DialogDemo } from './WeatherDialog'

interface renderProps {
  item: WeatherData['forecast']['forecastday'][0] | undefined
  index: number
}

const { useParam } = createParam<{ id: string }>()

export function LocationDetailScreen() {
  //id from last screen
  const [id] = useParam('id')
  //show toast
  const toast = useToastController()
  //for add cordinates to the store
  const { appendCoordinate } = useCoordinatesStore()

  const { data: weather, isLoading } = fetchWeather(id?.split(',')[0], id?.split(',')[1])


  if (isLoading) {
    return <FullScreenLoading />
  }

  //add coordinates
  const Add = async () => {
    appendCoordinate(id?.split(',')[0], id?.split(',')[1], weather?.location.region)

    toast.show('Location Added!', {
      message: 'Location has been saved...',
    })
  }

  const renderItem = ({ item, index }: renderProps) => {
    return <DialogDemo daily={item} />
  }

  const renderSectionHeader = () => (
    <View>
      <CustomHeader t={weather?.location.region} r="Add" onPress={Add} />
      <WeatherCard weather={weather} />
      <Hourly
        weather={weather?.forecast.forecastday[0].hour}
        astro={weather?.forecast.forecastday[0].astro}
      />
    </View>
  )

  return (
    <FlatList
      data={weather?.forecast.forecastday}
      renderItem={renderItem}
      ListHeaderComponent={renderSectionHeader}
    />
  )
}
