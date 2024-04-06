import { Button, Card, Image, Paragraph, View, XStack, YStack } from '@my/ui'
import { ChevronLeft, Plus } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { SearchBar } from './SearchBar'
import { FlatList } from 'react-native'

type CoordinateType = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

export function LocationScreen() {
  const [region, setRegion] = useState<CoordinateType>()

  const [city, setCity] = useState('')

  const link = useLink({
    href: '/',
  })

  return (
    <View f={1} width={'100%'}>
      <XStack als="center" $platform-web={{ maxWidth:'100%'}}>
        <SearchBar cityHandler={setCity} regionHandler={setRegion} />
      </XStack>
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
  return (
    <Card
      size={'$4'}
      $platform-web={{ width: '70%' }}
      $sm={{ width: '90%' }}
      als={'center'}
      elevate
    >
      <XStack jc={'space-between'} px="$5">
        <YStack jc={'center'}>
          <Paragraph size={'$1'} color={'$gray10Light'}>
            12:05
          </Paragraph>
          <Paragraph>Lagos</Paragraph>
          <Paragraph>Cloudy</Paragraph>
        </YStack>

        <XStack ai={'center'}>
          <YStack jc={'center'}>
            <Paragraph>12°</Paragraph>
            <Paragraph size={'$1'} color={'$gray10Light'}>
              uvi: 0.16
            </Paragraph>
          </YStack>
          <Image
            source={{
              width: 100,
              height: 100,
              uri: 'https://openweathermap.org/img/wn/10d@2x.png',
            }}
            resizeMode="contain"
          />
        </XStack>
      </XStack>
    </Card>
  )
}
