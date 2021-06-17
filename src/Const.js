import {Platform} from 'react-native';

export let Const = {
  server: 'api',
  // bundleId
  // apiKey
};

try { // expo
  const app = require('../../../app.json');
  Const.bundleId = app.expo.slug;
  if (Platform.OS === 'ios') {
    Const.bundleId = app.expo.ios.bundleIdentifier;
  } else if (Platform.OS === 'android') {
    Const.bundleId = app.expo.android.package;
  }
} catch (e) { // native
  try {
    Const.bundleId = require('../../../app.json').name;
  } catch (e) {}
}
