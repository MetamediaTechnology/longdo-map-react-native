import { Const } from './src/Const';
import MapView from './src/MapView';

let objectcount = 0;
const Longdo = {
  set server(value) { Const.server = value },
  set bundleId(value) { Const.bundleId = value },
  set apiKey(value) { Const.apiKey = value },
  static: (type, name) => ({ $static: type, name: name }),
  object: (type, ...args) => ({ $object: type, $id: ++objectcount, args: args }),
  isSameObject: (a, b) => a.$id == b.$id,
  MapView: MapView
};
Const.init();
export default Longdo;