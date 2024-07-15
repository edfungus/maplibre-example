import React, { useEffect } from 'react';
import { setGPSLocation, useLocationStore } from '../../state/location';
import { Mappy } from './mappy';
import { Display } from './sheet';
// import { StatusBar } from 'expo-status-bar';
import { CenteredDot } from '../../components/map/locationDot';
import HandleLocationPermissions from '../../permissions/location';

export function HomeScreen() {
  const { locationPermissionGranted, location } = useLocationStore()

  // when we have location permissions granted, we should set the gps location. 
  // This should be the first location load and happen only once per app load
  useEffect(() => {
    if (locationPermissionGranted && location == undefined) {
      setGPSLocation()
    }
  }, [locationPermissionGranted, location])

  return (

    <>
      <HandleLocationPermissions />

      {/* This is the green does that appeas when the boolean is set */}
      <CenteredDot />

      {/* The bottom sheet */}
      <Display />

      {/* The map */}
      <Mappy />
    </>
  )
}

