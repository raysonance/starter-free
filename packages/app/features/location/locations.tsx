import {
  Adapt,
  Button,
  Card,
  CustomHeader,
  Dialog,
  Fieldset,
  Image,
  Input,
  Label,
  Paragraph,
  SearchBar,
  Sheet,
  Spinner,
  Unspaced,
  View,
  XStack,
  YStack,
  useToastController,
} from '@my/ui'
import { Edit3, LocateFixed, MinusCircle, X } from '@tamagui/lucide-icons'
import React, { useEffect, useState } from 'react'
import { Link, useLink } from 'solito/link'
import { FlatList } from 'react-native'
import { fetchWeather } from '../apis/LocationCardApi'
import useCoordinatesStore from '../../utils/store'
import { useRouter } from 'solito/router'

type CoordinateType = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

export function LocationScreen() {
  const [region, setRegion] = useState<CoordinateType>()
  const [city, setCity] = useState('')
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState('Edit')

  const { coordinates } = useCoordinatesStore()
  console.log(coordinates)
  const linkLocation = useLink({
    href: `/location/${region?.latitude},${region?.longitude}`,
  })

  const Edit = () => {
    setEdit(!edit)
    setName(name == 'Edit' ? 'Done' : 'Edit')
  }

  return (
    <View f={1} width={'100%'}>
      <CustomHeader t={''} back={false} r={name} onPress={Edit} />
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
      {!edit ? (
        <FlatList
          data={coordinates}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item, index, separators }) => (
            <LocationCard lat={item.lat} long={item.long} name={item.name} />
          )}
        />
      ) : (
        <FlatList
          data={coordinates}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item, index, separators }) => (
            <DialogInstance lat={item.lat} long={item.long} name={item.name} index={index} />
          )}
        />
      )}
    </View>
  )
}

type Props = {
  lat: string
  long: string
  name?: string
}

const LocationCard = (props: Props) => {
  const { lat, long, name } = props
  const { data: weather, isLoading } = fetchWeather(lat, long)
  const router = useRouter()
  if (isLoading) {
    return <Spinner />
  }
  return (
    <Link href={`/location/${lat},${long}`}>
      <Card
        animation="bouncy"
        hoverStyle={{
          scale: 1.1,
        }}
        pressStyle={{
          scale: 0.9,
        }}
        onPress={() => router.push(`/location/${lat},${long}`)}
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
            <Paragraph>{name ? name : weather?.location.region}</Paragraph>
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
    </Link>
  )
}

interface DialogProp extends Props {
  index: number
}

function DialogInstance(props: DialogProp) {
  const { lat, long, name, index } = props
  const [newName, setNewName] = useState('')

  const { renameCoordinate, deleteCoordinate } = useCoordinatesStore()

  const toast = useToastController()
  //add coordinates
  const Edit = async () => {
    renameCoordinate(lat, long, newName)

    toast.show('Location Name Changed!', {
      message: 'Location name has been changed...',
    })
  }
  const Delete = async () => {
    deleteCoordinate(lat, long)

    toast.show('Location Deleted!', {
      message: 'Location has been deleted...',
    })
  }

  console.log(newName)
  return (
    <Dialog modal>
      <XStack als={'center'} ai="center" jc={'center'} width={'90%'}>
        <YStack
          mr={'$3'}
          hoverStyle={{
            scale: 1.3,
          }}
          cursor="pointer"
          pressStyle={{
            scale: 0.9,
          }}
          onPress={Delete}
        >
          <MinusCircle
            color={'red'}
            jc={'center'}
            animation="bouncy"
            hoverStyle={{
              scale: 1.1,
            }}
            pressStyle={{
              scale: 0.9,
            }}
          />
        </YStack>
        <Card
          jc={'center'}
          size={'$4'}
          mt={'$4'}
          $platform-web={{ width: '60%' }}
          $sm={{ width: '80%' }}
          py={'$3'}
          elevate
        >
          <XStack jc={'space-between'} px="$5">
            <YStack jc={'center'}>
              <Paragraph size={'$1'} color={'$gray10Light'}>
                lat {lat}
              </Paragraph>
              <Paragraph>{name}</Paragraph>
              <Paragraph size={'$1'} color={'$gray10Light'}>
                long {long}
              </Paragraph>
            </YStack>
            <Dialog.Trigger asChild>
              <YStack
                onPress={() => {}}
                jc={'center'}
                animation="bouncy"
                hoverStyle={{
                  scale: 1.3,
                }}
                cursor="pointer"
                pressStyle={{
                  scale: 0.9,
                }}
              >
                <Edit3 />
              </YStack>
            </Dialog.Trigger>
          </XStack>
        </Card>
      </XStack>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Rename Location</Dialog.Title>

          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="name">
              Name
            </Label>
            <Input
              flex={1}
              value={newName}
              onChangeText={setNewName}
              id={index.toString()}
              defaultValue={name}
            />
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close" onPress={Edit}>
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
