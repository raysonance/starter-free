import AsyncStorage from '@react-native-async-storage/async-storage'
// import { useLocationStore } from './store'

export const ASYNCKEY = 'locations' // Replace with your desired key name

// await storeData("site", data.siteName);

export const storeData = async (key: string, value: string) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(e)
  }
}

export const loadValue = async (key: string) => {
  try {
    const JsonString = await AsyncStorage.getItem(key)
    const JsonValue = JsonString != null ? JSON.parse(JsonString) : null
    return JsonValue
  } catch (e) {
    // error reading value
    console.log(e)
    return null
  }
}

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.log(e)
  }
}

export const getKeys = async () => {
  let keys
  try {
    keys = await AsyncStorage.getAllKeys()
    return keys
  } catch (e) {
    console.log(e)
    return []
  }
}

interface Coordinate {
  lat: string
  long: string
}

interface Coordinate {
  lat: string
  long: string
}

// export function appendCoordinates(
//   jsonString: string | Coordinate[],
//   latitude: string | undefined,
//   longitude: string | undefined
// ): string {
//   // Parse the input JSON string or JavaScript object
//   let coordinates: Coordinate[]
//   if (typeof jsonString === 'string') {
//     coordinates = JSON.parse(jsonString)
//   } else {
//     coordinates = jsonString
//   }

//   // Ensure that the input is an array
//   if (!Array.isArray(coordinates)) {
//     throw new Error('Input must be a valid JSON string or JavaScript object representing an array')
//   }

//   // Check if the provided latitude and longitude already exist
//   const existingCoordinate = coordinates.find(
//     (coord) => coord.lat === latitude && coord.long === longitude
//   )

//   if (existingCoordinate) {
//     console.log(`Coordinate with latitude ${latitude} and longitude ${longitude} already exists.`)
//     return JSON.stringify(coordinates)
//   }

//   if (latitude && longitude)
//     // Append the new coordinates to the array
//     coordinates.push({ lat: latitude, long: longitude })

//   // Convert the updated array back to a JSON string
//   const updatedJsonString = JSON.stringify(coordinates)

//   return updatedJsonString
// }

export async function initializeStorage() {
  try {
    // Check if the key exists in AsyncStorage
    const existingValue = await AsyncStorage.getItem(ASYNCKEY)

    if (existingValue === null) {
      // Key doesn't exist, create it with an empty array value
      await AsyncStorage.setItem(ASYNCKEY, JSON.stringify([]))
      console.log(`Key "${ASYNCKEY}" created with an empty array value`)
    } else {
      console.log(`Key "${ASYNCKEY}" already exists with value: ${existingValue}`)
    }
  } catch (error) {
    console.error('Error initializing AsyncStorage:', error)
  }
}
