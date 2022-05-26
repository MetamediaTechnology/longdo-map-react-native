import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { Const } from './Const';

export default class MapView extends Component {
  static defaultProps = {
    // layer
    // zoom
    // zoomRange
    // location
    // ui
    // lastView
    language: '',
  };

  // MARK: - Public fields

  // on{Event}

  // MARK: - Private fields

  #web;
  #baseUrl = 'http://' + Const.bundleId.toLowerCase() + '/';
  #callback;

  // MARK: - Public methods

  render() {
    let events = '';
    for (const prop in this.props) {
      if (prop[0] == 'o' && prop[1] == 'n') {
        events += ',"' + prop + '"';
        this[prop] = this.props[prop];
      }
    }
    
    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <title></title>
    <style>
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0; font: 12px/1.2 sans-serif; }
      #map { width: 100%; height: 100%; }
    </style>
    <script src="https://${Const.server}?key=${Const.apiKey}"></script>
    <script>
      let objectList = [];

      function init() {
        const placeholder = document.getElementById('map');
        if (!window.longdo) {
          placeholder.innerHTML = navigator.onLine
            ? '<h4>UNREGISTERED APP</h4><strong>ID</strong>: ${Const.bundleId}<br><strong>KEY</strong>: ${Const.apiKey.substring(0, 8)}...'
            : 'Not connected to network';
          return;
        }
        console.log = (message) => ReactNativeWebView.postMessage('{"$log":"' + message.replaceAll('"', '\\"') + '"}')
        onerror = (message, source, lineno, colno) => {
          console.log(message + ' @ ' + source + '#L' + lineno + ':' + colno);
          return true;
        };
        
        const map = new longdo.Map({
          layer: parse(${JSON.stringify(this.props.layer)}),
          zoom: ${this.props.zoom},
          zoomRange: ${JSON.stringify(this.props.zoomRange)},
          location: ${JSON.stringify(this.props.location)},
          ui: ${this.props.ui},
          lastView: ${this.props.lastView},
          language: '${this.props.language }',
          placeholder: placeholder
        });
        map.Ui.Geolocation?.visible(false);
        for (const event of [${events.substring(1)}]) {
          try {
            map.Event.bind(event[2].toLocaleLowerCase() + event.substring(3),
              data => ReactNativeWebView.postMessage(JSON.stringify({ $event: event, data: serialize(data) })));
          } catch (e) {
            console.log(e);
          }
        }
        map.toJSON = map.Overlays.toJSON = map.Ui.toJSON = () => ({});
        objectList[0] = map;
      }

      function parse(data) {
        if (!data) return data;
        if (data.$static) return longdo[data.$static][data.name];
        if (data.$object) {
          let object = objectList[data.$id];
          if (!object) {
            let dot = data.$object.indexOf('.');
            if (dot < 0) {
              object = new longdo[data.$object](...data.args.map(parse));
            } else {
              object = new longdo[data.$object.substring(0, dot)][data.$object.substring(dot + 1)](...data.args.map(parse));
            }
            object.$id = data.$id;
            objectList[data.$id] = object;
          }
          return object;
        }
        if (Array.isArray(data)) {
          return data.map(parse);
        }
        if (typeof(data) === 'object') {
          let object = {};
          for (i in data) {
            object[i] = parse(data[i]);
          }
          return object;
        }

        return data;
      }

      function serialize(object) {
        if (!object) return object;
        if (object.$id) return { $object: true, $id: object.$id };
        if (object.active) return { $object: null };

        if (Array.isArray(object)) {
          for (let i = 0; i < object.length; ++i) {
            object[i] = serialize(object[i]);
          }
        }

        return object;
      }

      function call(method, args) {
        let dot = method.indexOf('.');
        if (dot < 0) {
          commit(objectList[0], method, args);
        } else {
          commit(objectList[0][method.substring(0, dot)], method.substring(dot + 1), args);
        }
      }

      function objectCall(object, method, args) {
        commit(parse(JSON.parse(object)), method, args);
      }

      function commit(executor, method, args) {
        if (executor && executor[method]) {
          ReactNativeWebView.postMessage(JSON.stringify(serialize(executor[method](...JSON.parse(args).map(parse)))));
        } else {
          console.log(method + ' not found');
        }
      }

    </script>
  </head>
  <body onload="init();">
    <div id="map"></div>
  </body>
</html>`;

    return (
      <WebView
        ref={r => (this.#web = r)}
        originWhitelist={['*']}
        source={{
          html: html,
          baseUrl: this.#baseUrl,
        }}
        onMessage={e => this.#onMessage(e.nativeEvent.data)}
        onShouldStartLoadWithRequest={e => e.url == this.#baseUrl}
      />
    );
  }
  
  call(method, ...args) {
    if (method == 'Event.bind' || method == 'Event.unbind') {
      Const.log(method + ' not supported');
      return;
    }

    return new Promise(resolve => {
      this.#callback = resolve;
      this.#web.injectJavaScript('call("' + method + '", `' + JSON.stringify(args) + '`)');
    });
  }

  objectCall(object, method, ...args) {
    return new Promise(resolve => {
      this.#callback = resolve;
      this.#web.injectJavaScript('objectCall(`' + JSON.stringify(object) + '`, "' + method + '", `' + JSON.stringify(args) + '`)');
    });
  }

  // MARK: - Private methods

  #onMessage(data) {
    data = JSON.parse(data);
    if (data.$event) {
      this[data.$event](data.data);
    } else if (data.$log) {
      Const.log(data.$log);
    } else {
      this.#callback(data);
    }
  }
}
