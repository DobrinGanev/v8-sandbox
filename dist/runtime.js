"use strict";

global._tryCallback = func => {
  try {
    func();
  } catch (ex) {
    global.setResult({
      error: {
        name: ex.name,
        message: ex.message,
        stack: ex.stack
      }
    });
  }
};

global.httpRequest = (options, callback) => {
  const parameters = [JSON.stringify([options])];

  if (callback) {
    const wrappedCallback = args => {
      global._tryCallback(() => {
        callback.apply(null, JSON.parse(args));
      });
    };

    parameters.push(wrappedCallback);
  }

  const result = global._httpRequest.apply(global, parameters);

  return result != null ? JSON.parse(result) : null;
};

global.setResult = result => {
  return global._setResult(result != null ? JSON.stringify(result) : null);
};

global.setTimeout = (callback, timeout) => {
  const handler = () => {
    global._tryCallback(callback);
  };

  return global._setTimeout(handler, timeout);
};

global.clearTimeout = id => {
  return global._clearTimeout(id);
};

global.console = {
  log: function log() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    global._log(JSON.stringify(args));
  },
  error: function error() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    global._error(JSON.stringify(args));
  }
};
//# sourceMappingURL=runtime.js.map