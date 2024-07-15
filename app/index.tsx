import 'react-native-gesture-handler';
import { HomeScreen } from './lib/screens/home/screen'
import { Stack } from 'expo-router'
import {
    GestureHandlerRootView,
    gestureHandlerRootHOC
} from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { enableMapSet } from 'immer';
import React from 'react';
import { PortalProvider } from '@gorhom/portal';

const ScreenWithGesture = gestureHandlerRootHOC(() => (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
            <PortalProvider>
                <Stack.Screen
                    options={{
                        header: () => null,
                        headerShown: false,
                    }}
                />
                <HomeScreen />
            </PortalProvider>
        </SafeAreaProvider>
    </GestureHandlerRootView>
))

export default function Screen() {
    enableMapSet() // for immer to support map and sets
    return (
        <ScreenWithGesture />
    )
}
