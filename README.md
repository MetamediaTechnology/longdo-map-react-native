# longdo-map-react-native
## Getting started (Expo)

### Install & init project
```
npm install -g expo-cli
expo init <project name>
cd <project name>
npm install MetamediaTechnology/longdo-map-react-native --save
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
### Add MapView in App.js
```
import Longdo from 'longdo-map-react-native';
```
in main App function
```
Longdo.apiKey = 'API_KEY';
```
under root View
```
<Longdo.MapView />
```
in StyleSheet
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
- [Longdo Map API Documentation](https://map.longdo.com/docs/) (JavaScript)