import {Platform} from 'react-native';

export let Const = {
  server: 'api.longdo.com/map3/',
  // bundleId
  // apiKey
  init: () => {
    try {
      const app = require('../../../app.json');
      if (app.expo) {
        Const.bundleId = app.expo.slug;
        if (Platform.OS === 'ios') {
          Const.bundleId = app.expo.ios.bundleIdentifier;
        } else if (Platform.OS === 'android') {
          Const.bundleId = app.expo.android.package;
        }
      } else { // native
        Const.bundleId = app.name;
      }
    } catch (e) {
      Const.log('config not found:', e);
    }
    if (!Const.bundleId) { // fallback
      Const.bundleId = 'react-native';
    }
  },
  log: (...messages) => {
    console.log('\x1B[35mMAP\x1B[0m', ...messages);
  },
  objectcount: 0
};
