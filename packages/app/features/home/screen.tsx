import {
  CustomHeader,
  FullScreenLoading,
  H1,
  MyComponent,
  Paragraph,
  Separator,
  useToastController,
  View,
  XStack,
  YStack,
} from '@my/ui'
import { CloudSunRain } from '@tamagui/lucide-icons'
import { useState } from 'react'

import { FlatList } from 'react-native'
import WeatherCard from '../location/WeatherCard'
import Hourly from '../location/Hourly'
import { DialogDemo } from '../location/WeatherDialog'
import useCoordinatesStore from '../../utils/store'
import { fetchWeather, WeatherData } from '../apis/LocationCardApi'
import LocationHelper from '../location/LocationHelper'

interface renderProps {
  item: WeatherData['forecast']['forecastday'][0] | undefined
  index: number
}

export function HomeScreen() {
  const [locate, setLocation] = useState<{ latitude; longitude }>({ latitude: 0, longitude: 0 })

  console.log(locate, 'fff')

  const toast = useToastController()
  //for add cordinates to the store
  const { appendCoordinate, coordinates } = useCoordinatesStore()

  const { data: weather, isLoading } = fetchWeather(locate.latitude, locate.longitude)

  if (isLoading) {
    return <FullScreenLoading />
  }
  //add coordinates
  const Add = async () => {
    appendCoordinate(locate.latitude, locate.longitude, weather?.location.region)

    toast.show('Location Added!', {
      message: 'Location has been saved...',
    })
  }
  console.log(coordinates)
  const renderItem = ({ item, index }: renderProps) => {
    return <DialogDemo daily={item} />
  }

  const renderSectionHeader = () => (
    <View>
      <CustomHeader t={weather?.location.region} back={false} r="Add" onPress={Add} />
      <WeatherCard weather={weather} />
      <Hourly
        weather={weather?.forecast.forecastday[0].hour}
        astro={weather?.forecast.forecastday[0].astro}
      />
    </View>
  )

  return (
    <>
      {locate.latitude == 0 && locate.longitude == 0 ? (
        <YStack f={1} jc="center" ai="center" p="$4" gap="$4">
          <YStack gap="$4" bc="$background">
            <CloudSunRain size={'$10'} als={'center'} />
            <H1 ta="center">There's no bad weather, only bad clothes.</H1>
            <Paragraph ta="center">
              See weather all over the world. Save your favourite location
            </Paragraph>

            <Separator />
          </YStack>

          <XStack>
            <LocationHelper setLocation={setLocation} />
            <MyComponent />
          </XStack>
        </YStack>
      ) : (
        <FlatList
          data={weather?.forecast.forecastday}
          renderItem={renderItem}
          ListHeaderComponent={renderSectionHeader}
        />
      )}
    </>
  )
}
