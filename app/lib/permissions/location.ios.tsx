import { useLocationStore } from '../state/location';
import { useEffect } from 'react';
import { PERMISSIONS, RESULTS, check, request, PermissionStatus } from 'react-native-permissions'


const HandleLocationPermissions = () => {
    const { setLocationPermissions } = useLocationStore()

    useEffect(() => {
        check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((checkResponse: PermissionStatus) => {
            if (checkResponse === RESULTS.GRANTED) {
                setLocationPermissions(true)
            } else if (checkResponse === RESULTS.DENIED) {
                request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((requestResponse: PermissionStatus) => {
                    setLocationPermissions(requestResponse === RESULTS.GRANTED)
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