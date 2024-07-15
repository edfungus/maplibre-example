import { create } from 'zustand'
import Geolocation, { GeoPosition } from 'react-native-geolocation-service'

type Location = {
    locationPermissionGranted: boolean
    setLocationPermissions: (granted: boolean) => void

    // Location always gives the location the app should be using
    location: GeoPosition | undefined
    userLocation: GeoPosition | undefined
    isLocationOverridden: boolean
    setOverrideLocation: (location: GeoPosition) => void

    destinationLocation: GeoPosition | undefined
    setDesinationLocation: (location: GeoPosition) => void

    errorCode: Geolocation.PositionError | undefined
    errorMessage: string
}

export const useLocationStore = create<Location>()((set) => ({
    locationPermissionGranted: false,
    setLocationPermissions: (granted: boolean) => set((state) => ({ locationPermissionGranted: granted })),

    location: undefined,
    userLocation: undefined,
    isLocationOverridden: false,
    setOverrideLocation: (location: GeoPosition) => set((state) => ({ location: location, isLocationOverridden: true })),

    destinationLocation: undefined,
    setDesinationLocation: (location: GeoPosition) => set((state) => ({ destinationLocation: location })),

    errorCode: undefined,
    errorMessage: "",
}))

export interface positionWithChange {
    position: Geolocation.GeoPosition
    changed: boolean
    isLocationOverridden: boolean
}

export const setGPSLocation = async (forceGPS?: boolean): Promise<positionWithChange> => {
    return new Promise((resolve, reject) => {
        const { location, isLocationOverridden } = useLocationStore.getState()
        if (!forceGPS && location && isLocationOverridden) {
            resolve({
                position: location,
                changed: false,
                isLocationOverridden: isLocationOverridden,
            })
            return
        }
        getGPSLocation().then((position: Geolocation.GeoPosition) => {
            resolve({
                position: position,
                changed: false,
                isLocationOverridden: isLocationOverridden,
            })
        }).catch((reason: any) => {
            reject(reason)
        })
    })
}

export const getGPSLocation = async (): Promise<Geolocation.GeoPosition> => {
    return new Promise((resolve, reject) => {
        // if there is an overide locaiton, just return that. We will not update the use's location 
        const { locationPermissionGranted } = useLocationStore.getState()
        if (!locationPermissionGranted) {
            reject("location permission not granted")
            return
        }

        Geolocation.getCurrentPosition(
            position => {
                useLocationStore.setState({ location: position, userLocation: position, isLocationOverridden: false })
                useLocationStore.setState({ errorCode: undefined, errorMessage: '' })
                resolve(position)
            },
            error => {
                console.log(error.code, error.message);
                useLocationStore.setState({ errorCode: error.code, errorMessage: error.message })
                useLocationStore.setState({ location: undefined, userLocation: undefined, isLocationOverridden: false })
                reject(error)
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            },
        );
    })
}