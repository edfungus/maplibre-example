export default {
  expo: {
    name: process.env.ABR_SOON ? "A Better Ride (soon)" : process.env.ABR_TEST ? "A Better Ride (test)" : "A Better Ride",
    slug: process.env.ABR_SOON ? "abetterride-preview" : process.env.ABR_TEST ? "abetterride-test" : "abetterride",
    scheme: "abetterride",
    version: "3.1.1",
    orientation: "portrait",
    icon: process.env.ABR_SOON ? "./assets/iconi.png" : "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#000000"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    plugins: [
      "expo-font",
      "expo-router", // doctor wanted this but I don't think we use it?
      [
        "react-native-permissions",
        {
          "iosPermissions": [
            "LocationAccuracy",
            "LocationAlways",
            "LocationWhenInUse",
          ]
        },
      ],
      "@maplibre/maplibre-react-native",
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: process.env.ABR_SOON ? "com.abetterride.app.preview" : process.env.ABR_TEST ? "com.abetterride.app.test" : "com.abetterride.app",
      infoPlist: {
        "NSLocationAlwaysAndWhenInUseUsageDescription": "App uses your location to get transit information around you.",
        "NSLocationWhenInUseUsageDescription": "App uses your location to get transit information around you.",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: process.env.ABR_SOON ? "./assets/iconi.png" : "./assets/icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: process.env.ABR_SOON ? "com.abetterride.app.preview" : process.env.ABR_TEST ? "com.abetterride.app.test" : "com.abetterride.app"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
      }
    },
    owner: "edfungus"
  }
};