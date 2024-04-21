import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ASYNCKEY } from './storage'

interface Coordinate {
  lat: string
  long: string
  name: string
}

interface CoordinatesState {
  coordinates: Coordinate[]
  fetchCoordinates: () => Promise<void>
  appendCoordinate: (latitude: string | undefined, longitude: string | undefined, name: string | undefined) => void
  renameCoordinate: (latitude: string | undefined, longitude: string | undefined, name: string) => void
  deleteCoordinate: (latitude: string | undefined, longitude: string | undefined) => void

//   reorderData: (newOrder: Coordinate[]) => void
}

const KEY = ASYNCKEY

const useCoordinatesStore = create<CoordinatesState>((set, get) => ({
  coordinates: [],
  fetchCoordinates: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEY)
      if (jsonValue !== null) {
        set({ coordinates: JSON.parse(jsonValue) })
      } else {
        await AsyncStorage.setItem(KEY, JSON.stringify([]))
        set({ coordinates: [] })
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error)
    }
  },
  appendCoordinate: (latitude, longitude, name) => {
    const existingCoordinate = get().coordinates.find(
      (coord) => coord.lat === latitude && coord.long === longitude
    )

    if (existingCoordinate) {
      console.log(`Coordinate with latitude ${latitude} and longitude ${longitude} already exists.`)
      return
    }
    if (latitude && longitude && name) {
      const newCoordinates = [...get().coordinates, { lat: latitude, long: longitude, name: name }]

      set({ coordinates: newCoordinates })
      AsyncStorage.setItem(KEY, JSON.stringify(newCoordinates))
    }
  },
  renameCoordinate: (latitude, longitude, name) => {
    const existingCoordinateIndex = get().coordinates.findIndex(
      (coord) => coord.lat === latitude && coord.long === longitude
    );
  
    if (existingCoordinateIndex !== -1) {
      const updatedCoordinates = [...get().coordinates];
      updatedCoordinates[existingCoordinateIndex] = {
        ...updatedCoordinates[existingCoordinateIndex],
        name: name,
      };
  
      set({ coordinates: updatedCoordinates });
      AsyncStorage.setItem(KEY, JSON.stringify(updatedCoordinates));
    } else if (latitude && longitude && name) {
      const newCoordinates = [...get().coordinates, { lat: latitude, long: longitude, name: name }];
      set({ coordinates: newCoordinates });
      AsyncStorage.setItem(KEY, JSON.stringify(newCoordinates));
    } else {
      console.log('Invalid coordinates or name');
    }
  },
//   reorderData: (newOrder: Coordinate[]) => {
//     set((state) => ({
//       data: newOrder.map((id) => state.data.find((item) => item.id === id)!),
//     }));
//   },
deleteCoordinate: (latitude, longitude) => {
  const existingCoordinateIndex = get().coordinates.findIndex(
    (coord) => coord.lat === latitude && coord.long === longitude
  );

  if (existingCoordinateIndex !== -1) {
    const updatedCoordinates = [...get().coordinates];
    updatedCoordinates.splice(existingCoordinateIndex, 1);

    set({ coordinates: updatedCoordinates });
    AsyncStorage.setItem(KEY, JSON.stringify(updatedCoordinates));
  } else {
    console.log(`Coordinate with latitude ${latitude} and longitude ${longitude} does not exist.`);
  }
},
  updateData: (newData: Coordinate[]) => set({ coordinates: newData }),
}))

export default useCoordinatesStore
