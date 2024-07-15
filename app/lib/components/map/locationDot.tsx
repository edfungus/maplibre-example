import { PointAnnotation } from "@maplibre/maplibre-react-native";
import { Fragment } from "react";
import { ColorValue, Dimensions, useColorScheme, View } from "react-native";
import { useLocationStore } from "../../state/location";
import { LocationDots, useMapStore } from "../../state/map";
import { ScreensWithDestination, useNavigationStore } from "../../state/navigation";
import { getTheme } from "../../visual/theme";
import Ionicons from "react-native-vector-icons/Ionicons";

const dotSize = 21

export function CenteredDot() {
    const { showLocationSelectionDot } = useMapStore()
    const theme = getTheme(useColorScheme())

    return <View style={{
        position: 'absolute',
        top: Dimensions.get('window').height / 2 - theme.mapCenterOffset / 2,
        left: Dimensions.get('window').width / 2,
        display: showLocationSelectionDot != LocationDots.None ? 'flex' : 'none',
        zIndex: 100,
    }}>
        {showLocationSelectionDot == LocationDots.Custom && <Dot color={CustomColors} />}
        {showLocationSelectionDot == LocationDots.Destination && <Dot square color={DestinationColors} />}
    </View>

}

export function UserLocationDot() {
    const { userLocation } = useLocationStore()

    if (userLocation) {
        return <PointAnnotation
            id="userLocation"
            coordinate={[userLocation.coords.longitude, userLocation.coords.latitude]}
            draggable={false}
            selected={false}
        >
            <>
                <Dot color={GPSColors} />
            </>
        </PointAnnotation>
    }

    return <Fragment />
}


export interface DotColors {
    center: ColorValue
    shadow: ColorValue
}

export const CustomColors: DotColors = {
    center: 'mediumspringgreen',
    shadow: 'lime',
}

export const GPSColors: DotColors = {
    center: 'rgba(10,128,255,1)',
    shadow: 'lightskyblue',
}

export const DestinationColors: DotColors = {
    center: 'orange',
    shadow: 'gold',
}

export interface DotProps {
    color?: DotColors
    square?: boolean
    small?: boolean
}

export function Dot(props: DotProps) {
    let size = dotSize
    if (props.small) {
        size = dotSize * .9
    }
    let color = props.color ? props.color : CustomColors
    return (
        <View style={{
            position: 'absolute',
            top: -size / 2,
            left: -size / 2,
            pointerEvents: 'none'
        }}>
            <View style={{
                width: size,
                height: size,
                backgroundColor: color.center,
                borderColor: 'white',
                borderWidth: 3.2,
                borderRadius: props.square ? 6 : size,

                shadowColor: color.shadow,
                shadowOpacity: props.small ? .3 : .6,
                shadowRadius: props.small ? 5 : 10,
                shadowOffset: { width: 0, height: -1 }
            }} />
        </View>
    )
}
