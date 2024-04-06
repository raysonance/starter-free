import { Link, Tabs } from 'expo-router'
import { Compass, Cloudy } from '@tamagui/lucide-icons'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0081f1',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Weather',
          tabBarIcon: ({ color }) => <Cloudy fill={color} size="$2" color={color} />,
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          title: 'My locations',
          tabBarIcon: ({ color }) => <Compass size="$2" color={color} />,
        }}
      />
    </Tabs>
  )
}
