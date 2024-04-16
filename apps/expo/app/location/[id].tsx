import { LocationDetailScreen } from 'app/features/location/location-detail'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createParam } from 'solito'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={{flex: 1}}>
        <LocationDetailScreen />
      </SafeAreaView>
    </>
  )
}
