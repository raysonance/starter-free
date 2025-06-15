import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity, useColorScheme } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { XCircle, Compass, X } from '@tamagui/lucide-icons'
import { View, useTheme } from 'tamagui'

export const SearchBar = ({ cityHandler, regionHandler }) => {
  const onPress = (data, details) => {
    const city = data.description.split(',')[0]
    cityHandler(city)
    regionHandler({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    })
  }
  const theme = useTheme()
  const scheme = useColorScheme()

  // console.log(theme.backgroundFocus.val)

  // on the web this is something like var(--background) and will avoid re-renders
  // on native it will be something like #fff and will re-render

  const ref = useRef(null)

  const clear = () => {
    if (ref.current) {
      // Use type assertion to tell TypeScript that ref.current has the expected type
      const refCurrent = ref.current as {
        setAddressText: (text: string) => void
      }

      // Now TypeScript knows that refCurrent has setAddressText method
      refCurrent.setAddressText('')
    }
  }
  const [background, setBackground] = useState('')

  useEffect(() => {
    setBackground(theme.backgroundFocus.val)
  }, [theme.backgroundFocus.val])

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      GooglePlacesDetailsQuery={{
        fields: 'geometry',
      }}
      fetchDetails={true}
      query={{ key: 'AIzaSyDPs-fJP4s8GJGqAhca0q07cYBaM7PKTjs' }}
      onPress={onPress}
      placeholder="Search"
      textInputProps={{
        placeholderTextColor: 'gray',
        returnKeyType: 'search',
      }}
      styles={{
        textInput: {
          color: theme.colorFocus.val,
          backgroundColor: 'transparent',
          borderRadius: 20,
          fontWeight: '700',
          marginTop: 7,
        },

        textInputContainer: {
          backgroundColor: background,
          padding: 8,
          width: '100%',
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
        },
      }}
      renderLeftButton={() => (
        <View>
          <Compass size="$4" />
        </View>
      )}
      requestUrl={{
        url: 'https://starter-free-next.vercel.app/https://maps.googleapis.com/maps/api',
        useOnPlatform: 'web',

        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      }}
      onFail={(error) => console.error(error)}
      renderRightButton={() => (
        <View onPress={() => clear()}>
          <X size="$3" />
        </View>
      )}
    />
  )
}
