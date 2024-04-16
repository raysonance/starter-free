import { Button, Card, Image, Paragraph, SearchBar, Spinner, View, XStack, YStack } from '@my/ui'
import { ChevronLeft, LocateFixed, Plus } from '@tamagui/lucide-icons'
import React, { useEffect, useState } from 'react'
import { useLink } from 'solito/link'
import { FlatList, useColorScheme } from 'react-native'
import { fetchWeather } from '../apis/LocationCardApi'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder'

type CoordinateType = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

export function LocationScreen() {
  const [region, setRegion] = useState<CoordinateType>()
  const [city, setCity] = useState('')

  // const link = useLink({
  //   href: '/',
  // })

  const linkLocation = useLink({
    href: `/location/${region?.latitude},${region?.longitude}`,
  })

  return (
    <View f={1} width={'100%'}>
      <XStack
        als="center"
        $platform-native={{ marginHorizontal: '$3' }}
        $platform-web={{ maxWidth: '100%' }}
      >
        <SearchBar cityHandler={setCity} regionHandler={setRegion} />
      </XStack>

      {region && (
        <YStack ai="center" gap="$4" mt={'$4'}>
          <Button {...linkLocation} icon={LocateFixed}>
            Check weather for{city}
          </Button>
        </YStack>
      )}

      <FlatList
        data={[{ title: 'Title Text', key: 'item1' }]}
        renderItem={({ item, index, separators }) => <LocationCard />}
      />
      <Paragraph ta="center" fow="700">
        Locations
      </Paragraph>
    </View>
  )
}

type Props = {}

const LocationCard = (props: Props) => {
  const { data: weather, isLoading } = fetchWeather('48.8567', '2.3508')
  if (isLoading) {
    return <Spinner />
  }
  return (
    <Card
      size={'$4'}
      mt={'$4'}
      $platform-web={{ width: '70%' }}
      $sm={{ width: '90%' }}
      als={'center'}
      py={'$3'}
      elevate
    >
      <XStack jc={'space-between'} px="$5">
        <YStack jc={'center'}>
          <Paragraph size={'$1'} color={'$gray10Light'}>
            {weather?.location.localtime.split(' ')[1]}
          </Paragraph>
          <Paragraph>{weather?.location.country}</Paragraph>
          <Paragraph>{weather?.current.condition.text}</Paragraph>
        </YStack>

        <XStack ai={'center'}>
          <YStack jc={'center'}>
            <Paragraph>{weather?.current.temp_c}°</Paragraph>
            <Paragraph size={'$1'} color={'$gray10Light'}>
              uvi: {weather?.current.uv}
            </Paragraph>
          </YStack>
          <Image
            ml={'$2'}
            source={{
              width: 64,
              height: 64,
              uri: 'https:' + `${weather?.current.condition.icon}`,
            }}
            resizeMode="cover"
          />
        </XStack>
      </XStack>
    </Card>
  )
}
