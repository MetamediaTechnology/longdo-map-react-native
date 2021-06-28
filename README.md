# Longdo Map Component for React Native 
![npm](https://img.shields.io/npm/v/longdo-map-react-native)
![npm](https://img.shields.io/npm/dt/longdo-map-react-native)
![npm](https://img.shields.io/npm/l/longdo-map-react-native)
- [Setting Up (Expo)](#setting-up-expo)
- [Setting Up (Native)](#setting-up-native)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
## Setting Up (Expo)
Install & init project
```
npm install -g expo-cli
expo init <project name>
cd <project name>
npm install longdo-map-react-native
```
### Config app.json
```
    "ios": {
      "bundleIdentifier": "BUNDLE_ID",
...
    "android": {
      "package": "PACKAGE_NAME",
```
Then, Register BUNDLE_ID, PACKAGE_NAME at https://map.longdo.com/api to obtain API_KEY

## Setting Up (Native)
Follow [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup) instruction and run
```
npm install react-native-webview longdo-map-react-native
```
### From app.json
```
  "name": PROJECT_NAME,
```
Register PROJECT_NAME at https://map.longdo.com/api to obtain API_KEY
## Getting Started
### Add MapView in App.js
```
import Longdo from 'longdo-map-react-native';
```
In main App function
```
Longdo.apiKey = 'API_KEY';
```
> If module fail to auto-detect app's bundle ID, add `Longdo.bundleId = 'REGISTERED_ID';`

Under root View
```
<Longdo.MapView />
```
In StyleSheet
```
alignItems: 'stretch'
```
For complete file, see [example/App.js](example/App.js)
### Run in Simulator  
```
npm run ios
npm run android
```
## Documentation
- [Reference](https://api.longdo.com/map/doc/react-native.php)
- [JavaScript Documentation](https://map.longdo.com/docs/)