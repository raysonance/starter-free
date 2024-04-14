import { LocationDetailScreen } from 'app/features/location/location-detail'
import { Stack } from 'expo-router'
import { createParam } from 'solito'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: `Location`,
        }}
      />
      <LocationDetailScreen />
    </>
  )
}
