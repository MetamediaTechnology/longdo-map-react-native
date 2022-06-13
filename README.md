# Longdo Map Component for React Native 
![npm](https://img.shields.io/npm/v/longdo-map-react-native)
![npm](https://img.shields.io/npm/dt/longdo-map-react-native)
![npm](https://img.shields.io/npm/l/longdo-map-react-native)
- [Setting Up (Expo)](#setting-up-expo)
- [Setting Up (Native)](#setting-up-native)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Version](#version)
## Setting Up (Expo)
Install & init project
```
npm install -g expo-cli
expo init <project name>
cd <project name>
expo install react-native-webview
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
npm install -D @babel/preset-env
```
### Config babel.config.js
```
module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-env', { "targets": "iOS >= 11, Android >= 56" }],
  ],
}
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
Follow this [instruction](https://medium.com/@davidjasonharding/developing-a-react-native-app-on-an-m1-mac-without-rosetta-29fcc7314d70) to run on Mac M1
## Documentation
- [Reference 3.x](https://github.com/MetamediaTechnology/longdo-map-react-native/wiki/)
- [Reference 1.x](https://api.longdo.com/map/doc/react-native.php)
- [JavaScript documentation](https://map.longdo.com/docs/)
## Version
- 3.x: Vector map GL backend
- 1.x: Raster map backend