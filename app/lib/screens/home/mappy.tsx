import MapLibreGL, { LineLayer, PointAnnotation, ShapeSource } from "@maplibre/maplibre-react-native";
import circle from "@turf/circle";
import * as turf from '@turf/helpers';
import React, { Fragment } from "react";
import { StyleSheet, View } from 'react-native';
import { Dot, GPSColors } from "../../components/map/locationDot";
import { useLocationStore } from "../../state/location";
import { LocationDots, useMapStore } from "../../state/map";


// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.
MapLibreGL.setAccessToken(null);

export function Mappy() {
    const { location } = useLocationStore()

    return (
        <>
            <View id={'map'} style={styles.page}>
                <MapLibreGL.MapView
                    style={styles.map}
                    rotateEnabled={false}
                    logoEnabled={false}
                    compassEnabled={true}
                    styleURL="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                >
                    <MapLibreGL.Camera />

                    {/* Blue dot user location on the map */}
                    {location && <PointAnnotation
                        id="locationOverride"
                        coordinate={[location.coords.longitude, location.coords.latitude]}
                        draggable={false}
                        selected={false}
                    >
                        <Dot color={GPSColors} />
                    </PointAnnotation>}

                    {/* Problem doesn't seem to exist if this isn't here */}
                    {<DistanceRings />}

                </MapLibreGL.MapView>
            </View >
        </>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        flex: 1,
        alignSelf: 'stretch',
    },
});

// This is the problem component. If this is on the map, it will slow everything down causing the ShapeSource to detatch from the map
export function DistanceRings() {
    const { location } = useLocationStore()
    const { showLocationSelectionDot } = useMapStore()

    console.log("Rerender", showLocationSelectionDot, Date())

    if (location == undefined || showLocationSelectionDot != LocationDots.None) {
        return <Fragment />
    }

    const shapes = [0, 200, 400].filter((distance: number) => {
        return distance > 20
    }).map((distance: number, index: number) => {
        return circle([location.coords.longitude, location.coords.latitude], distance, {
            steps: 100,
            units: 'meters',
        });
    })

    return <ShapeSource key={`distance_rings}`} id={`distance_rings}`} shape={turf.featureCollection(shapes)}>
        <LineLayer id={`distance_rings}`} style={{
            lineColor: 'grey',
            lineWidth: 1,
            lineOpacity: .5,
        }} />
    </ShapeSource>
}