import { Text, View } from 'tamagui'
import { LocationScreen } from 'app/features/location/locations'

export default function TabTwoScreen() {
  return (
    <View flex={1} alignItems="center">
      <LocationScreen />
    </View>
  )
}
