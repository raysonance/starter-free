import { View, Text } from 'react-native'
import React, { Children, Dispatch, SetStateAction, useEffect } from 'react'
import * as PermissionsHelper from 'expo-permissions'
import { Alert, FlatList, Linking, Platform } from 'react-native'
import * as Location from 'expo-location'
import { Button } from '@my/ui'

type Props = {
  setLocation: Dispatch<
    SetStateAction<{
      latitude: any
      longitude: any
    }>
  >
}

const LocationHelper = (props: Props) => {
  const { setLocation } = props
  const requestLocationPermission = async () => {
    if (Platform.OS === 'web') {
      const handlePermission = (permission: GeolocationPositionError | null) => {
        if (permission === null) {
          console.log('Location permission granted')
          getLocation()
          // You can now get the user's location
        } else {
          console.log('Location permission denied')
          console.error(permission)
          alert(
            'User denied Geolocation. Please grant location permissions in settings or url to continue.'
          )
        }
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => handlePermission(null),
          (error) => handlePermission(error)
        )
      } else {
        console.log('Geolocation is not supported by this browser.')
      }
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status === PermissionsHelper.PermissionStatus.GRANTED) {
        console.log('Location permission granted')
        getLocation()
        // You can now get the user's location
      } else if (status === PermissionsHelper.PermissionStatus.DENIED) {
        console.log('Location permission denied')
        Alert.alert(
          'Location Permission Denied',
          'Please grant location permissions in your device settings to continue.',
          [
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
            { text: 'Cancel', style: 'cancel' },
          ]
        )
      } else if (status === PermissionsHelper.PermissionStatus.UNDETERMINED) {
        console.log('Location permission undetermined')
      }
    }
  }
  async function getLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      console.log('Permission to access location was denied')
      return
    }

    const location = await Location.getCurrentPositionAsync({})
    const { longitude, latitude } = location.coords
    setLocation({ latitude, longitude })
    console.log(`Longitude: ${longitude}, Latitude: ${latitude}`)
  }

  useEffect(() => {
    getLocation()
  }, [])

  return <Button onPress={requestLocationPermission}>Enable Location</Button>
}

export default LocationHelper
