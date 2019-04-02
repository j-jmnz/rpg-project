// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONSTANTS = {
  SCENES: {
    LOAD: 'LOAD',
    MENU: 'MENU',
    LVL1: 'LVL1',
    LVL2: 'LVL2'
  }
};
},{}],"src/scenes/loadScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("../constants");

var LoadScene =
/** @class */
function (_super) {
  __extends(LoadScene, _super);

  function LoadScene() {
    return _super.call(this, {
      key: constants_1.CONSTANTS.SCENES.LOAD
    }) || this;
  }

  LoadScene.prototype.init = function () {};

  LoadScene.prototype.preload = function () {
    var _this = this; // load background images and ui


    this.load.image('title_background', './assets/preview.png');
    this.load.image('play_button', './assets/play_button.png'); // load characters spritesheets

    this.load.spritesheet('meriel', './assets/meriel.png', {
      frameWidth: 22.59,
      frameHeight: 38
    });
    this.load.image('wizard_m', './assets/down_stand.png'); // create loading bar

    var loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xc0c0c0
      }
    }); //load bar

    this.load.on('progress', function (percent) {
      loadingBar.fillRect(0, _this.game.renderer.height / 2, _this.game.renderer.width * percent, 50);
    });
    this.load.on('complete', function () {});
    this.load.on('load', function (file) {
      console.log(file.src);
    });
  };

  LoadScene.prototype.create = function () {
    this.scene.start(constants_1.CONSTANTS.SCENES.MENU);
  };

  return LoadScene;
}(Phaser.Scene);

exports.LoadScene = LoadScene;
},{"../constants":"src/constants.ts"}],"src/scenes/menuScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("../constants");

var MenuScene =
/** @class */
function (_super) {
  __extends(MenuScene, _super);

  function MenuScene() {
    return _super.call(this, {
      key: constants_1.CONSTANTS.SCENES.MENU
    }) || this;
  }

  MenuScene.prototype.create = function () {
    var _this = this; // create buttons and background


    this.add.image(0, 0, 'title_background').setOrigin(0);
    var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'play_button'); // playbutton interactivity

    playButton.setInteractive();
    playButton.on('pointerover', function () {
      playButton.setScale(1.2);
    });
    playButton.on('pointerout', function () {
      playButton.setScale(1);
    });
    playButton.on('pointerup', function () {
      _this.scene.start(constants_1.CONSTANTS.SCENES.LVL1);
    });
  };

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../constants":"src/constants.ts"}],"src/scenes/lvl1Scene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("../constants");

var LVL1Scene =
/** @class */
function (_super) {
  __extends(LVL1Scene, _super);

  function LVL1Scene() {
    return _super.call(this, {
      key: constants_1.CONSTANTS.SCENES.LVL1
    }) || this;
  }

  LVL1Scene.prototype.preload = function () {
    // load in level1 image and json
    this.load.tilemapTiledJSON('level1', './assets/level1.json');
    this.load.spritesheet('dungeon', './assets/dungeon.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.on('load', function (file) {
      console.log(file.src);
    });
  };

  LVL1Scene.prototype.create = function () {
    var _this = this; // create tilemap and tilesetimage


    this.level1 = this.make.tilemap({
      key: 'level1'
    }); //add tileset image

    this.terrain = this.level1.addTilesetImage('dungeon'); // create map layers

    this.backgroundLayer = this.level1.createStaticLayer('Background', this.terrain, 0, 0);
    this.blockedLayer = this.level1.createStaticLayer('Blocked', this.terrain, 0, 0);
    this.blockedLayer.setCollisionByExclusion([-1]); // add tileEvent to change scene

    this.blockedLayer.setTileLocationCallback(24, 4, 1, 1, function () {
      _this.scene.start(constants_1.CONSTANTS.SCENES.LVL2);

      console.log(constants_1.CONSTANTS.SCENES.LVL2);
    }); //create elf animation

    this.anims.create({
      key: 'meriel_downW',
      frames: this.anims.generateFrameNumbers('meriel', {
        start: 1,
        end: 2
      }),
      frameRate: 5,
      repeat: 1
    });
    this.anims.create({
      key: 'meriel_leftW',
      frames: this.anims.generateFrameNumbers('meriel', {
        start: 7,
        end: 8
      }),
      frameRate: 5,
      repeat: 1
    });
    this.anims.create({
      key: 'meriel_rightW',
      frames: this.anims.generateFrameNumbers('meriel', {
        start: 16,
        end: 17
      }),
      frameRate: 5,
      repeat: 1
    });
    this.anims.create({
      key: 'meriel_upW',
      frames: this.anims.generateFrameNumbers('meriel', {
        start: 23,
        end: 24
      }),
      frameRate: 5,
      repeat: 1
    }); //create meriel sprite

    this.meriel = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height * 0.7, 'meriel', 0);
    this.meriel.setScale(1.2).setCollideWorldBounds(true).setSize(20, 38).setOffset(2, 0); //create wizard animation and sprite

    this.wizard = this.physics.add.staticImage(this.game.renderer.width / 2, this.game.renderer.height / 2, 'wizard_m');
    this.wizard.setScale(1.5).setImmovable(true).setSize(24, 42).setOffset(-3, -4); // create keyboard inputs and assign to WASD

    this.keyboard = this.input.keyboard.addKeys('W, A, S, D'); // //collisions

    this.physics.add.collider(this.meriel, this.blockedLayer);
  };

  LVL1Scene.prototype.update = function () {
    this.physics.world.collide(this.meriel, this.wizard);

    if (this.meriel.active) {
      if (this.keyboard.D.isDown === true) {
        this.meriel.setVelocityX(64);
        this.meriel.play('meriel_rightW', true);
      } else if (this.keyboard.A.isDown === true) {
        this.meriel.setVelocityX(-64);
        this.meriel.play('meriel_leftW', true);
      } else if (this.keyboard.D.isUp && this.keyboard.A.isUp) {
        this.meriel.setVelocityX(0);
      }

      if (this.keyboard.S.isDown === true) {
        this.meriel.setVelocityY(64);
        this.meriel.play('meriel_downW', true);
      } else if (this.keyboard.W.isDown === true) {
        this.meriel.setVelocityY(-64);
        this.meriel.play('meriel_upW', true);
      } else if (this.keyboard.S.isUp && this.keyboard.W.isUp) {
        this.meriel.setVelocityY(0);
      }
    }
  };

  return LVL1Scene;
}(Phaser.Scene);

exports.LVL1Scene = LVL1Scene;
},{"../constants":"src/constants.ts"}],"src/scenes/lvl2Scene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("../constants");

var LVL2Scene =
/** @class */
function (_super) {
  __extends(LVL2Scene, _super);

  function LVL2Scene() {
    return _super.call(this, {
      key: constants_1.CONSTANTS.SCENES.LVL2
    }) || this;
  }

  LVL2Scene.prototype.preload = function () {
    // load in level1 image and json
    this.load.tilemapTiledJSON('level2', './assets/level2.json');
    this.load.spritesheet('terrain', './assets/terrain.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet('outside', './assets/outside.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.on('load', function (file) {
      console.log(file.src);
    });
  };

  LVL2Scene.prototype.create = function () {
    // create tilemap and tilesetimage
    this.level2 = this.make.tilemap({
      key: 'level2'
    }); //add tileset image

    this.level2.addTilesetImage('terrain');
    this.terrain = this.level2.addTilesetImage('outside'); // create map layers

    this.backgroundLayer = this.level2.createStaticLayer('Background', this.terrain, 0, 0);
    this.blockedLayer = this.level2.createStaticLayer('Blocked', this.terrain, 0, 0);
    this.blockedLayer.setCollisionByExclusion([-1]); // add tileEvent to change scene
    // this.blockedLayer.setTileLocationCallback(24, 4, 1, 1, ()=> {
    //     this.scene.start(CONSTANTS.SCENES.MENU);
    // })
    //create elf animation

    this.anims.create({
      key: 'meriel_downW',
      frames: this.anims.generateFrameNumbers('meriel', {
        start: 1,
        end: 2
      }),
      frameRate: 5,
      repeat: 1
    });
    this.anims.create({
      key: 'meriel_leftW',
      frames: this.anims.generateFrameNumbers('meriel', {
        start: 7,
        end: 8
      }),
      frameRate: 5,
      repeat: 1
    });
    this.anims.create({
      key: 'meriel_rightW',
      frames: this.anims.generateFrameNumbers('meriel', {
        start: 16,
        end: 17
      }),
      frameRate: 5,
      repeat: 1
    });
    this.anims.create({
      key: 'meriel_upW',
      frames: this.anims.generateFrameNumbers('meriel', {
        start: 23,
        end: 24
      }),
      frameRate: 5,
      repeat: 1
    }); //create meriel sprite

    this.meriel = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height * 0.7, 'meriel', 0);
    this.meriel.setScale(1.2).setCollideWorldBounds(true).setSize(20, 38).setOffset(2, 0); //create wizard animation and sprite

    this.wizard = this.physics.add.staticImage(this.game.renderer.width / 2, this.game.renderer.height / 2, 'wizard_m');
    this.wizard.setScale(1.5).setImmovable(true).setSize(24, 42).setOffset(-3, -4); // create keyboard inputs and assign to WASD

    this.keyboard = this.input.keyboard.addKeys('W, A, S, D'); // //collisions

    this.physics.add.collider(this.meriel, this.blockedLayer);
  };

  LVL2Scene.prototype.update = function () {
    this.physics.world.collide(this.meriel, this.wizard);

    if (this.meriel.active) {
      if (this.keyboard.D.isDown === true) {
        this.meriel.setVelocityX(80);
        this.meriel.play('meriel_rightW', true);
      } else if (this.keyboard.A.isDown === true) {
        this.meriel.setVelocityX(-80);
        this.meriel.play('meriel_leftW', true);
      } else if (this.keyboard.D.isUp && this.keyboard.A.isUp) {
        this.meriel.setVelocityX(0);
      }

      if (this.keyboard.S.isDown === true) {
        this.meriel.setVelocityY(80);
        this.meriel.play('meriel_downW', true);
      } else if (this.keyboard.W.isDown === true) {
        this.meriel.setVelocityY(-80);
        this.meriel.play('meriel_upW', true);
      } else if (this.keyboard.S.isUp && this.keyboard.W.isUp) {
        this.meriel.setVelocityY(0);
      }
    }
  };

  return LVL2Scene;
}(Phaser.Scene);

exports.LVL2Scene = LVL2Scene;
},{"../constants":"src/constants.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";
/** @type {import('../typings/phaser')} */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var loadScene_1 = require("./scenes/loadScene");

var menuScene_1 = require("./scenes/menuScene");

var lvl1Scene_1 = require("./scenes/lvl1Scene");

var lvl2Scene_1 = require("./scenes/lvl2Scene");

var game = new Phaser.Game({
  width: 800,
  height: 600,
  scene: [loadScene_1.LoadScene, menuScene_1.MenuScene, lvl1Scene_1.LVL1Scene, lvl2Scene_1.LVL2Scene],
  render: {
    pixelArt: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
});
},{"./scenes/loadScene":"src/scenes/loadScene.ts","./scenes/menuScene":"src/scenes/menuScene.ts","./scenes/lvl1Scene":"src/scenes/lvl1Scene.ts","./scenes/lvl2Scene":"src/scenes/lvl2Scene.ts"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64380" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map