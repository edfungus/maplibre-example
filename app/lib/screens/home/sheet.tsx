import BottomSheet from '@gorhom/bottom-sheet';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, useColorScheme } from 'react-native';
import { LocationDots, useMapStore } from '../../state/map';
import { styles } from '../../visual/styles';
import { getTheme, initialSnapPoint, sharedStyles } from '../../visual/theme';

const Stack = createStackNavigator();

export function Display() {
    // theme
    const theme = getTheme(useColorScheme())

    const { setShowLocationSelectionDot } = useMapStore();



    return (
        <NavigationContainer
            independent={true}
            onStateChange={(state: NavigationState | undefined) => {
            }}>
            <BottomSheet
                index={initialSnapPoint}
                snapPoints={theme.sheetSnapPoints}
                style={{
                    ...sharedStyles.shadow,
                    ...sharedStyles.fullWidth,
                }}
                containerStyle={{
                    marginBottom: theme.navigationBarHeight,
                    zIndex: 50,
                }}
                handleStyle={{
                    ...styles.handle,
                    backgroundColor: theme.backgroundColor
                }}
                handleIndicatorStyle={{
                    ...styles.handleIndicator,
                    backgroundColor: theme.primaryFontColor
                }}
            >
                <Text>1. Move map to show blue dot (can zoom in)</Text>
                <Text>2. Set boolean (buttons below), blue dot detaches from map</Text>
                <Text>.</Text>
                <Text onPress={() => { setShowLocationSelectionDot(LocationDots.Custom) }}> -> Set Zustand boolean to "custom" which shows the green dot (CenterDot in screen.tsx) above map (not a map overlay)</Text>
                <Text>.</Text>
                <Text onPress={() => { setShowLocationSelectionDot(LocationDots.None) }}> -> Turn off CenterDot but problem persists</Text>
                <Text>.</Text>
                <Text>3. Remove DistanceRings from mappy.tsx and rerun. Issue no longer occurs</Text>
            </BottomSheet>
        </NavigationContainer >
    )
}
