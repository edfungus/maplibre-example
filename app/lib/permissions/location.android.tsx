import { useLocationStore } from '../state/location';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, request, PermissionStatus } from 'react-native-permissions'


// Note: look here for location updates: https://github.com/Agontuk/react-native-geolocation-service/blob/master/example/src/App.tsx

const HandleLocationPermissions = () => {
    const { setLocationPermissions } = useLocationStore()

    useEffect(() => {
        if (Platform.OS === 'android' && Platform.Version < 23) {
            setLocationPermissions(true)
        }
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((checkResponse: PermissionStatus) => {
            if (checkResponse === RESULTS.GRANTED) {
                setLocationPermissions(true)
            } else if (checkResponse === RESULTS.DENIED) {
                request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((requestResponse: PermissionStatus) => {
                    setLocationPermissions(requestResponse === RESULTS.GRANTED || requestResponse === RESULTS.LIMITED)
                }).catch((e) => {
                    console.log("error requesting location permissions", e)
                })
            }
        }).catch((e) => {
            console.log("error checking location permissions", e)
        })
    }, [])
    return (null)
}

export default HandleLocationPermissions;