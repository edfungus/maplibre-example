import { StyleSheet, ColorSchemeName, ColorValue, Dimensions } from "react-native"
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

export const initialSnapPoint = 1
export const topScreenPadding = 40

export interface theme {
    backgroundColor: ColorValue;
    contrastBackgroundColor: ColorValue;
    primaryFontColor: ColorValue;
    secondaryFontColor: ColorValue;
    accentColor: ColorValue;

    insets: EdgeInsets;

    navigationBarHeight: number;

    sheetSnapPoints: number[];

    mapCenterOffset: number;
}

export function getTheme(s: ColorSchemeName): theme {
    const insets = useSafeAreaInsets()
    const navigationHeight = 50
    const snapPoints = [50 + navigationHeight, 325 + navigationHeight, Dimensions.get('window').height - insets.top - topScreenPadding - navigationHeight] // 10: margin, 44: above sheet heigh
    let t = {
        insets: insets,
        navigationBarHeight: navigationHeight,
        sheetSnapPoints: snapPoints,
        mapCenterOffset: (Dimensions.get('window').height - insets.top - insets.bottom - snapPoints[1]!),
        accentColor: "#E933E3",//"#3CB371",
    }
    if (s == 'dark') {
        return {
            backgroundColor: '#3B3B3E',
            contrastBackgroundColor: 'rgba(255,255,255,.06)',
            primaryFontColor: 'white',
            secondaryFontColor: 'rgb(80,80,80)',
            ...t
        }
    }
    return {
        backgroundColor: 'white',
        contrastBackgroundColor: 'rgba(0,0,0,.06)',
        primaryFontColor: 'black',
        secondaryFontColor: 'rgb(175,175,175)',
        ...t
    }
}

export const changeRgbaOpacity = (rgbaColor: string, opacity: number): ColorValue => {
    const s = rgbaColor.split(",")
    if (s.length == 3) {
        return `rgba(${s[0].split("(")[1]},${s[1]},${s[2].split(")")[0]},${opacity})`
    }
    if (s.length == 4) {
        return `${s[0]},${s[1]},${s[2]},${opacity})`
    }
    return rgbaColor
};

export const sharedStyles = StyleSheet.create({
    fullWidth: {
        width: Dimensions.get('window').width,
    },
    almostFullWidth: {
        width: Dimensions.get('window').width - 10,
        marginHorizontal: 5,
    },
    // https://ethercreative.github.io/react-native-shadow-generator/
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})