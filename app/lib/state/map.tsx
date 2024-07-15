import { CameraStop } from '@maplibre/maplibre-react-native/javascript/components/Camera';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';


export interface MapState {
    cameraSettings: CameraStop
}

export enum LocationDots {
    None = "none",
    Custom = "custom",
    Destination = "destination",
}

type MapStore = {
    // showLocationSelectionDot is the centered dot on the screen
    showLocationSelectionDot: LocationDots
    setShowLocationSelectionDot: (show: LocationDots) => void
}

export const useMapStore = create<MapStore>()(immer((set) => ({
    showLocationSelectionDot: LocationDots.None,
    setShowLocationSelectionDot: (dot: LocationDots) => set((state) => ({ showLocationSelectionDot: dot })),
})))
