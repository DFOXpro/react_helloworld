// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"T4Ih":[function(require,module,exports) {
module.exports = {
  "playlists": [{
    "title": "Albumes editados recientemente",
    "description": "Albumes que se les arregló los metadatos",
    "albums": [{
      "id": 1,
      "description": "2007 Rebuild of evangelion OST",
      "title": "Shiro SAGISU Music from \"EVANGELION: 1.0\" YOU ARE (NOT) ALONE",
      "cover": "cover-eva1.jpg",
      "year": 2007,
      "tracks": [{
        "title": "I'll Go On Lovin' Someone Else",
        "author": "Shiro Sagisu",
        "type": "youtube",
        "src": "5qnuJXFNyDM",
        "track_number": 2
      }, {
        "title": "Rei Opus V",
        "author": "Shiro Sagisu",
        "type": "youtube",
        "src": "AXkDRzf74yY",
        "track_number": 22
      }, {
        "title": "Cruel Dilemme IV",
        "author": "Shiro Sagisu",
        "type": "youtube",
        "src": "5jROfBD_DAQ",
        "track_number": 26
      }]
    }]
  }, {
    "title": "Albumes para trabajar",
    "description": "Los mejores albumes para concentrarse",
    "albums": [{
      "id": 1,
      "description": "Album debut",
      "title": "Pies descalsos",
      "cover": "cover-shakira1.jpg",
      "year": 1996,
      "tracks": [{
        "title": "Te necesito",
        "author": "shakira",
        "type": "youtube",
        "src": "AjS3F6OWXts",
        "track_number": 5
      }, {
        "title": "Pienso en ti",
        "author": "shakira",
        "type": "youtube",
        "src": "WPWeLPrzdKA",
        "track_number": 9
      }]
    }]
  }]
};
},{}]},{},["T4Ih"], "_debug_")