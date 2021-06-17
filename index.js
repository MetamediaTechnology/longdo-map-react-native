import { Const } from './src/Const';
import MapView from './src/MapView';

let objectcount = 0;
const Longdo = {
  set apiKey(key) { Const.apiKey = key },
  static: (type, name) => ({ $static: type, name: name }),
  object: (type, ...args) => ({ $object: type, $id: ++objectcount, args: args }),
  isSameObject: (a, b) => a.$id == b.$id,
  MapView: MapView
};
export default Longdo;