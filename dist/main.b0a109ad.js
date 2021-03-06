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
    LVL2: 'LVL2',
    BATTLE: 'BATTLE'
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
    var _this = this;

    this.input.setGlobalTopOnly(false); // load background images and ui

    this.load.image('title_background', './assets/preview1.png');
    this.load.image('logo', './assets/logo1.png');
    this.load.image('play_button', './assets/play_button1.png');
    this.load.image('controls_button', './assets/controls_button.png');
    this.load.image('keys', './assets/keys.png'); // load characters and enemies atlas

    this.load.atlas('characters', './assets/characters.png', './assets/characters.json');
    this.load.atlas('enemies', './assets/monsters.png', './assets/monsters.json'); // load characters spritesheets

    this.load.spritesheet('meriel', './assets/meriel.png', {
      frameWidth: 22.59,
      frameHeight: 38
    });
    this.load.image('wizard_m', './assets/down_stand.png'); // load audio files

    this.load.audio('title_song', './assets/title_song.mp3');
    this.load.audio('button_hover', './assets/button_highlight.wav');
    this.load.audio('button_select', './assets/button_select.wav');
    this.load.audio('lvl1_song', './assets/lvl1_song.mp3');
    this.load.audio('lvl2_song', './assets/lvl2_song.mp3');
    this.load.audio('battle_song', './assets/battle_song.mp3'); // create loading bar

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
    var _this = this; // play audio files


    this.titleSong = this.sound.add('title_song', {
      loop: true,
      volume: 0.7
    });
    this.titleSong.play(); // create logo, buttons, and background

    this.add.image(0, 0, 'title_background').setOrigin(0);
    this.add.image(400, 300 * 0.7, 'logo').setScale(0.35);
    this.keys = this.add.image(165, this.game.renderer.height * 0.6, 'keys').setScale(0.15);
    this.keys.visible = false;
    var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7, 'play_button').setScale(0.1);
    var controlsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.81, 'controls_button').setScale(0.1); // playbutton interactivity

    playButton.setInteractive();
    playButton.on('pointerover', function () {
      _this.sound.play('button_hover');

      playButton.setScale(0.12);
    });
    playButton.on('pointerout', function () {
      playButton.setScale(0.1);
    });
    playButton.on('pointerup', function () {
      _this.sound.play('button_select');

      _this.time.addEvent({
        delay: 750,
        callback: function callback() {
          _this.titleSong.stop();

          _this.scene.start(constants_1.CONSTANTS.SCENES.LVL1);
        },
        callbackScope: _this
      });
    }); /// control button interactivity

    controlsButton.setInteractive();
    controlsButton.on('pointerover', function () {
      _this.sound.play('button_hover');

      controlsButton.setScale(0.12);
    });
    controlsButton.on('pointerout', function () {
      controlsButton.setScale(0.1);

      _this.keys.setVisible(false);
    });
    controlsButton.on('pointerup', function () {
      _this.sound.play('button_select');

      _this.keys.visible === false ? _this.keys.setVisible(true) : _this.keys.setVisible(false);
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
    // this.load.spritesheet('dungeon', './assets/dungeon.png', {
    //     frameWidth: 16,
    //     frameHeight: 16
    // });
    // this.load.tilemapTiledJSON('level1', './assets/level1.json');
    this.load.spritesheet('dungeon_std', './assets/dungeon_std.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.tilemapTiledJSON('level1', './assets/level1_1.json'); // create meriel animations

    this.anims.create({
      key: 'meriel_downW',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'meriel_down_walk',
        suffix: '.png',
        start: 1,
        end: 2
      })
    });
    this.anims.create({
      key: 'meriel_upW',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'meriel_up_walk',
        suffix: '.png',
        start: 1,
        end: 2
      })
    });
    this.anims.create({
      key: 'meriel_rightW',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'meriel_right_walk',
        suffix: '.png',
        start: 1,
        end: 2
      })
    });
    this.anims.create({
      key: 'meriel_leftW',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'meriel_left_walk',
        suffix: '.png',
        start: 1,
        end: 2
      })
    }); // create wiz animation

    this.anims.create({
      key: 'wiz_idle',
      frameRate: 3,
      repeat: 1,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'wiz_laugh',
        suffix: '.png',
        start: 1,
        end: 3
      })
    });
    this.anims.create({
      key: 'wiz_pose',
      frameRate: 3,
      repeat: -1,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'wiz_pose',
        suffix: '.png',
        start: 1,
        end: 3
      })
    });
    this.load.on('load', function (file) {
      console.log(file.src);
    });
  };

  LVL1Scene.prototype.create = function () {
    var _this = this; // create audio isntance and play audio file


    this.lvl1Song = this.sound.add('lvl1_song', {
      loop: true,
      volume: 0.7
    });
    this.lvl1Song.play(); // create tilemap and tilesetimage

    this.level1 = this.make.tilemap({
      key: 'level1'
    }); //add tileset image

    this.terrain = this.level1.addTilesetImage('dungeon_std'); // create map layers

    this.backgroundLayer = this.level1.createStaticLayer('Background', this.terrain, 0, 0);
    this.blockedLayer = this.level1.createStaticLayer('Blocked', this.terrain, 0, 0);
    this.blockedLayer.setCollisionByExclusion([-1]); // add tileEvent to change scene

    this.blockedLayer.setTileLocationCallback(24, 4, 1, 1, function () {
      _this.lvl1Song.stop();

      _this.scene.start(constants_1.CONSTANTS.SCENES.LVL2);

      console.log(constants_1.CONSTANTS.SCENES.LVL2);
    }); //create meriel sprite

    this.meriel = this.physics.add.sprite(this.game.renderer.width * 0.45, this.game.renderer.height * 0.9, 'characters', 'meriel_down_stand.png');
    this.meriel.setScale(1.5).setCollideWorldBounds(true).setSize(18, 30).setOffset(0, 0); //create wizard sprite

    this.wizard = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, 'characters', 'wiz_down_stand.png');
    this.wizard.setScale(1.5).setImmovable(true).setSize(24, 30).setOffset(0, 0); // .play('wiz_idle');
    // create keyboard inputs and assign to WASD

    this.keyboard = this.input.keyboard.addKeys('W, A, S, D'); //collisions

    this.physics.add.collider(this.meriel, this.blockedLayer);
    this.dialog();
  };

  LVL1Scene.prototype.update = function () {
    this.physics.world.collide(this.meriel, this.wizard);

    if (this.meriel.active) {
      if (this.keyboard.D.isDown === true) {
        this.meriel.setVelocityX(100);
        this.meriel.play('meriel_rightW', true);
      } else if (this.keyboard.A.isDown === true) {
        this.meriel.setVelocityX(-100);
        this.meriel.play('meriel_leftW', true);
      } else if (this.keyboard.D.isUp && this.keyboard.A.isUp) {
        this.meriel.setVelocityX(0);
      }

      if (this.keyboard.S.isDown === true) {
        this.meriel.setVelocityY(100);
        this.meriel.play('meriel_downW', true);
      } else if (this.keyboard.W.isDown === true) {
        this.meriel.setVelocityY(-100);
        this.meriel.play('meriel_upW', true);
      } else if (this.keyboard.S.isUp && this.keyboard.W.isUp) {
        this.meriel.setVelocityY(0);
      }
    }
  };

  LVL1Scene.prototype.move = function (sprite) {
    var randNumber = Math.floor(Math.random() * 4 + 1);
    randNumber === 1 ? sprite.setVelocityX(50) : randNumber === 2 ? sprite.setVelocityX(-50) : randNumber === 3 ? sprite.setVelocityY(50) : randNumber === 2 ? sprite.setVelocityY(-50) : null;
    this.time.addEvent({
      delay: 500,
      callback: function callback() {
        sprite.setVelocity(0);
      },
      callbackScope: this
    });
  };

  LVL1Scene.prototype.dialog = function () {
    var _this = this; // create meriel's health text


    this.time.addEvent({
      delay: 1000,
      callback: function callback() {
        _this.wizText = _this.add.text(315, 248, "   APPROACH KID", {
          fontSize: '20px',
          fill: '#fff',
          align: 'center',
          fixedWidth: 200,
          fixedHeight: 100,
          maxLines: 2
        });

        _this.wizard.play('wiz_idle');
      },
      callbackScope: this
    });
    this.time.addEvent({
      delay: 4000,
      callback: function callback() {
        _this.wizText.setText("YOUR QUEST IS ABOUT TO START");

        _this.wizard.play('wiz_idle');
      },
      callbackScope: this
    });
    this.time.addEvent({
      delay: 7000,
      callback: function callback() {
        _this.wizText.setText("");
      },
      callbackScope: this
    });
    this.time.addEvent({
      delay: 10000,
      callback: function callback() {
        _this.wizText.setText("ITS TIME FOR YOU TO PROVE YOUR WORTH");

        _this.wizard.play('wiz_idle');
      },
      callbackScope: this
    });
    this.time.addEvent({
      delay: 13000,
      callback: function callback() {
        _this.wizText.setText("BE TRUE TO YOUR HERO LEGACY");

        _this.wizard.play('wiz_idle');
      },
      callbackScope: this
    });
    this.time.addEvent({
      delay: 15000,
      callback: function callback() {
        _this.wizText.setText("AND DEFEAT THE EVIL NECROMANCER!");

        _this.wizard.play('wiz_idle');
      },
      callbackScope: this
    });
    this.time.addEvent({
      delay: 18000,
      callback: function callback() {
        _this.wizText.setText("HEAD TO THE DUNGEONS OF THE MAGE TOWER");

        _this.wizard.play('wiz_idle');
      },
      callbackScope: this
    });
    this.time.addEvent({
      delay: 21000,
      callback: function callback() {
        _this.wizText.setText("AND REDEEM THIS LAND FROM ITS HORRORS!");

        _this.wizard.play('wiz_idle');
      },
      callbackScope: this
    });
    this.time.addEvent({
      delay: 24000,
      callback: function callback() {
        _this.wizText.setText("");
      },
      callbackScope: this
    });
    this.time.addEvent({
      delay: 27000,
      callback: function callback() {
        _this.wizText.setText("    GO NOW!");

        _this.wizard.play('wiz_idle');
      },
      callbackScope: this
    });
    this.time.addEvent({
      delay: 29000,
      callback: function callback() {
        _this.wizText.setText("");

        _this.wizard.play('wiz_pose');
      },
      callbackScope: this
    });
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

  LVL2Scene.prototype.init = function (data) {
    if (data.hasOwnProperty('playerX') === true) {
      this.playerX = data.playerX;
      this.playerY = data.playerY;
      this.collidingEnemy = data.collidingEnemy;
    } else if (data.hasOwnProperty('playerX') === false) {
      this.playerX = this.game.renderer.width * 0.2;
      this.playerY = this.game.renderer.height * 0.9;
      this.collidingEnemy = [];
    }
  };

  LVL2Scene.prototype.preload = function () {
    this.scene.bringToTop(constants_1.CONSTANTS.SCENES.LVL2);
    this.load.spritesheet('level2_std', './assets/level2_std.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.tilemapTiledJSON('level2', './assets/level2_2.json'); /////////// create meriel animations

    this.anims.create({
      key: 'meriel_downW',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'meriel_down_walk',
        suffix: '.png',
        start: 1,
        end: 2
      })
    });
    this.anims.create({
      key: 'meriel_upW',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'meriel_up_walk',
        suffix: '.png',
        start: 1,
        end: 2
      })
    });
    this.anims.create({
      key: 'meriel_rightW',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'meriel_right_walk',
        suffix: '.png',
        start: 1,
        end: 2
      })
    });
    this.anims.create({
      key: 'meriel_leftW',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'meriel_left_walk',
        suffix: '.png',
        start: 1,
        end: 2
      })
    }); /////// create goblin animations

    this.anims.create({
      key: 'goblin_downW',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'goblin_down_walk',
        suffix: '.png',
        start: 1,
        end: 2
      })
    });
    this.anims.create({
      key: 'goblin_upW',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'goblin_up_walk',
        suffix: '.png',
        start: 1,
        end: 2
      })
    });
    this.anims.create({
      key: 'goblin_rightW',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'goblin_right_walk',
        suffix: '.png',
        start: 1,
        end: 2
      })
    });
    this.anims.create({
      key: 'goblin_leftW',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: 'goblin_left_walk',
        suffix: '.png',
        start: 1,
        end: 2
      })
    });
  };

  LVL2Scene.prototype.create = function () {
    var _this = this; // create audio isntance and play audio file


    this.lvl2Song = this.sound.add('lvl2_song', {
      loop: true,
      volume: 0.7
    });
    this.lvl2Song.play(); // create tilemap and tilesetimage

    this.level2 = this.make.tilemap({
      key: 'level2'
    }); //add tileset image

    this.terrain = this.level2.addTilesetImage('level2_std'); // create map layers

    this.backgroundLayer = this.level2.createStaticLayer('Background', this.terrain, 0, 0);
    this.blockedLayer = this.level2.createStaticLayer('Blocked', this.terrain, 0, 0);
    this.blockedLayer.setCollisionByExclusion([-1]); // add tileEvent to change scene

    this.blockedLayer.setTileLocationCallback(9, 35, 1, 1, function () {// this.scene.start(CONSTANTS.SCENES.LVL1);
      // console.log(CONSTANTS.SCENES.LVL1);
    }); //create meriel sprite

    this.meriel = this.physics.add.sprite(this.playerX, this.playerY, 'characters', 'meriel_up_stand.png');
    this.meriel.setScale(1.5).setCollideWorldBounds(true).setSize(15, 23).setOffset(0, 1); // create goblin sprite

    this.goblin = this.physics.add.sprite(this.game.renderer.width * 0.5, this.game.renderer.height * 0.5, 'enemies', 'gob_5_8_idle1(1).png');
    this.goblin.setImmovable(true).setCollideWorldBounds(true).setScale(1.5).setSize(15, 23).setOffset(1, 0); ////// create goblins groups
    // goblin2

    this.goblin2 = this.physics.add.sprite(this.game.renderer.width * 0.69, this.game.renderer.height * 0.69, 'enemies', 'gob_5_8_idle1(1).png');
    this.goblin2.setImmovable(true).setCollideWorldBounds(true).setScale(1.5).setSize(15, 23).setOffset(1, 0); // goblin3

    this.goblin3 = this.physics.add.sprite(this.game.renderer.width * 0.2, this.game.renderer.height * 0.2, 'enemies', 'gob_5_8_idle1(1).png');
    this.goblin3.setImmovable(true).setCollideWorldBounds(true).setScale(1.5).setSize(15, 23).setOffset(1, 0); // create keyboard inputs and assign to WASD

    this.keyboard = this.input.keyboard.addKeys('W, A, S, D'); // //collisions

    this.physics.add.collider(this.meriel, this.blockedLayer);
    this.physics.add.collider(this.meriel, this.goblin, function () {
      _this.lvl2Song.stop();

      _this.collidingEnemy.push('goblin');

      _this.scene.start(constants_1.CONSTANTS.SCENES.BATTLE, {
        playerX: _this.meriel.x,
        playerY: _this.meriel.y,
        collidingEnemy: _this.collidingEnemy
      });
    });
    this.physics.add.collider(this.meriel, this.goblin2, function () {
      _this.lvl2Song.stop();

      _this.collidingEnemy.push('goblin2');

      _this.scene.start(constants_1.CONSTANTS.SCENES.BATTLE, {
        playerX: _this.meriel.x,
        playerY: _this.meriel.y,
        collidingEnemy: _this.collidingEnemy
      });
    });
    this.physics.add.collider(this.meriel, this.goblin3, function () {
      _this.lvl2Song.stop();

      _this.collidingEnemy.push('goblin3');

      _this.scene.start(constants_1.CONSTANTS.SCENES.BATTLE, {
        playerX: _this.meriel.x,
        playerY: _this.meriel.y,
        collidingEnemy: _this.collidingEnemy
      });
    });
    this.physics.add.collider(this.blockedLayer, this.goblin);
    this.physics.add.collider(this.blockedLayer, this.goblin2);
    this.physics.add.collider(this.blockedLayer, this.goblin3); // goblin move randomizer

    this.randMove = this.time.addEvent({
      delay: 1000,
      callback: function callback() {
        return _this.move(_this.goblin);
      },
      callbackScope: this,
      loop: true
    });
    this.randMove = this.time.addEvent({
      delay: 1500,
      callback: function callback() {
        return _this.move(_this.goblin2);
      },
      callbackScope: this,
      loop: true
    });
    this.randMove = this.time.addEvent({
      delay: 2000,
      callback: function callback() {
        return _this.move(_this.goblin3);
      },
      callbackScope: this,
      loop: true
    }); // despawn colliding enemy after battle scene

    if (this.collidingEnemy.some(function (goblin) {
      return goblin === 'goblin';
    })) {
      this.goblin.setVisible(false);
      this.goblin.disableBody(true);
    }

    if (this.collidingEnemy.some(function (goblin) {
      return goblin === 'goblin2';
    })) {
      this.goblin2.setVisible(false);
      this.goblin2.disableBody(true);
    }

    if (this.collidingEnemy.some(function (goblin) {
      return goblin === 'goblin3';
    })) {
      this.goblin3.setVisible(false);
      this.goblin3.disableBody(true);
    }
  };

  LVL2Scene.prototype.update = function () {
    if (this.meriel.active) {
      if (this.keyboard.D.isDown === true) {
        this.meriel.setVelocityX(100);
        this.meriel.play('meriel_rightW', true);
      } else if (this.keyboard.A.isDown === true) {
        this.meriel.setVelocityX(-100);
        this.meriel.play('meriel_leftW', true);
      } else if (this.keyboard.D.isUp && this.keyboard.A.isUp) {
        this.meriel.setVelocityX(0);
      }

      if (this.keyboard.S.isDown === true) {
        this.meriel.setVelocityY(100);
        this.meriel.play('meriel_downW', true);
      } else if (this.keyboard.W.isDown === true) {
        this.meriel.setVelocityY(-100);
        this.meriel.play('meriel_upW', true);
      } else if (this.keyboard.S.isUp && this.keyboard.W.isUp) {
        this.meriel.setVelocityY(0);
      }
    }
  };

  LVL2Scene.prototype.move = function (sprite) {
    var randNumber1 = Math.floor(Math.random() * 4 + 1);

    if (randNumber1 === 1) {
      sprite.setVelocityX(100);
      sprite.play('goblin_rightW', true);
    } else if (randNumber1 === 2) {
      sprite.setVelocityX(-100);
      sprite.play('goblin_leftW', true);
    } else if (randNumber1 === 3) {
      sprite.setVelocityY(-100);
      sprite.play('goblin_upW', true);
    } else if (randNumber1 === 4) {
      sprite.setVelocityY(100);
      sprite.play('goblin_downW', true);
    }

    this.time.addEvent({
      delay: 500,
      callback: function callback() {
        sprite.setVelocity(0);
      },
      callbackScope: this
    });
  };

  return LVL2Scene;
}(Phaser.Scene);

exports.LVL2Scene = LVL2Scene;
},{"../constants":"src/constants.ts"}],"src/scenes/battleScene.ts":[function(require,module,exports) {
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

var BattleScene =
/** @class */
function (_super) {
  __extends(BattleScene, _super);

  function BattleScene() {
    return _super.call(this, {
      key: constants_1.CONSTANTS.SCENES.BATTLE
    }) || this;
  }

  BattleScene.prototype.init = function (data) {
    this.playerX = data.playerX;
    this.playerY = data.playerY;
    this.collidingEnemy = data.collidingEnemy;
    console.log(data);
    console.log(this.scene);
  };

  BattleScene.prototype.preload = function () {
    // load background and bot layer tilemap and images
    this.load.spritesheet('forest_bot', './assets/forest_bot.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.tilemapTiledJSON('battle', './assets/battle.json');
    this.load.image('forest', './assets/forest.png'); // load attack atlas and image

    this.load.atlas('attacks', './assets/attacks.png', './assets/attacks.json');
    this.load.atlas('attacks_enemies', './assets/attacks_enemies.png', './assets/attacks_enemies.json'); ///// create meriel animations
    // walk

    this.anims.create({
      key: 'meriel_walk',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: '5_6_walk(',
        suffix: ').png',
        start: 1,
        end: 2
      })
    }); //idle

    this.anims.create({
      key: 'meriel_idle',
      frameRate: 4,
      repeat: -1,
      frames: this.anims.generateFrameNames('characters', {
        prefix: '5_6_idle1(',
        suffix: ').png',
        start: 1,
        end: 3
      })
    }); //attack

    this.anims.create({
      key: 'meriel_attack2',
      frameRate: 4,
      frames: this.anims.generateFrameNames('characters', {
        prefix: '5_6_atk2(',
        suffix: ').png',
        start: 1,
        end: 3
      })
    }); //death

    this.anims.create({
      key: 'meriel_death',
      frameRate: 2,
      frames: this.anims.generateFrameNames('characters', {
        prefix: '5_6_crouch(',
        suffix: ').png',
        start: 1,
        end: 4
      })
    }); /////// create goblin animations
    //idle

    this.anims.create({
      key: 'goblin_idle',
      frameRate: 4,
      repeat: -1,
      frames: this.anims.generateFrameNames('enemies', {
        prefix: 'gob_5_8_idle1(',
        suffix: ').png',
        start: 1,
        end: 3
      })
    }); //walk

    this.anims.create({
      key: 'goblin_walk',
      frameRate: 4,
      frames: this.anims.generateFrameNames('enemies', {
        prefix: 'gob_5_8_walk(',
        suffix: ').png',
        start: 1,
        end: 3
      })
    }); //attack

    this.anims.create({
      key: 'goblin_attack',
      frameRate: 4,
      frames: this.anims.generateFrameNames('enemies', {
        prefix: 'gob_5_8_atk2(',
        suffix: ').png',
        start: 1,
        end: 3
      })
    }); //death

    this.anims.create({
      key: 'goblin_death',
      frameRate: 1,
      frames: this.anims.generateFrameNames('enemies', {
        prefix: 'gob_5_8_crouch(',
        suffix: ').png',
        start: 1,
        end: 4
      })
    });
    this.load.on('load', function (file) {
      console.log(file.src);
    });
  };

  BattleScene.prototype.create = function () {
    var _this = this; // create audio isntance and play audio file


    this.battleSong = this.sound.add('battle_song', {
      loop: true,
      volume: 0.7
    });
    this.battleSong.play(); // add forest backkground tilesprite

    this.forestField = this.add.tileSprite(0, -200, 928, 793, 'forest').setOrigin(0); // create tilemap and tilesetimage

    this.battle = this.make.tilemap({
      key: 'battle'
    }); //add tileset image

    this.forestBot = this.battle.addTilesetImage('forest_bot'); // create layers

    this.blockedLayer = this.battle.createStaticLayer('Blocked', this.forestBot, 0, 0);
    this.blockedLayer.setCollisionByExclusion([-1]);
    this.blockedLayer.setDepth(1); //create meriel sprite

    this.meriel = this.physics.add.sprite(this.game.renderer.width * 0.2, this.game.renderer.height * 0.81, 'characters', '5_6_idle1(1).png');
    this.meriel.graceTime = false;
    this.meriel.health = 10;
    this.meriel.alive = true;
    this.meriel.setSize(15, 23).setScale(2.5).setCollideWorldBounds(true).play('meriel_idle').setFlipX(true); // create meriel's health text

    this.meriel.healthText = this.add.text(12, 50, "HP " + this.meriel.health, {
      fontSize: '32px',
      fill: '#fff',
      strokeThickness: 2
    }); // create goblin sprite

    this.goblin = this.physics.add.sprite(this.game.renderer.width * 0.8, this.game.renderer.height * 0.78, 'enemies', 'gob_5_8_idle1(1).png');
    this.goblin.health = 10;
    this.goblin.graceTime = false;
    this.goblin.alive = true;
    this.goblin.setSize(20, 23).setImmovable(true).setCollideWorldBounds(true).setScale(3.5).play('goblin_idle'); //create goblin's health text

    this.goblin.healthText = this.add.text(685, 50, "HP " + this.goblin.health, {
      fontSize: '32px',
      fill: '#fff',
      strokeThickness: 1
    }); // create keyboard inputs and assign to WASDKL

    this.keyboard = this.input.keyboard.addKeys('A, D, K'); // //collisions

    this.physics.add.collider(this.meriel, this.goblin, function () {
      //if goblin attack animation meriel tints and takes damage
      if (_this.goblin.anims.currentAnim.key === 'goblin_attack') {
        _this.onHit(_this.goblin, _this.meriel); // on death


        if (_this.meriel.health === 0) {
          _this.meriel.alive = false;

          _this.meriel.play('meriel_death');

          _this.meriel.setImmovable(true);
        }
      } // if meriel attack anim goblin tints and takes damage


      if (_this.meriel.anims.currentAnim.key === 'meriel_attack2') {
        _this.onHit(_this.meriel, _this.goblin); //on death


        if (_this.goblin.health === 0) {
          _this.goblin.alive = false; // this.goblin.y += 0.5;

          _this.goblin.play('goblin_death');
        }
      }
    });
    this.physics.add.collider(this.meriel, this.blockedLayer); // goblin move randomizer

    this.randMove = this.time.addEvent({
      delay: 2000,
      callback: function callback() {
        if (_this.goblin.alive) {
          _this.move(_this.goblin);
        }
      },
      callbackScope: this,
      loop: true
    });
  };

  BattleScene.prototype.update = function () {
    var _this = this; // background scrolling


    this.forestField.tilePositionX += 0.5; //keyboard animations interaction

    if (this.meriel.active) {
      //walking animations
      if (this.keyboard.D.isDown === true) {
        this.meriel.setFlipX(true);
        this.meriel.setVelocityX(120);
        this.meriel.play('meriel_walk', true);
      } else if (this.keyboard.A.isDown === true) {
        // this.meriel.setFlipX(false);
        this.meriel.setVelocityX(-120);
        this.meriel.play('meriel_walk', true);
      } else if (this.keyboard.D.isUp && this.keyboard.A.isUp) {
        this.meriel.setVelocityX(0);
        this.meriel.anims.chain('meriel_idle');
      }

      if (this.keyboard.K.isDown === true) {
        this.meriel.setSize(28, 23).setOffset(10, 10);
        this.meriel.play('meriel_attack2', true);
        this.meriel.anims.chain('meriel_idle');
        this.time.addEvent({
          delay: 700,
          callback: function callback() {
            _this.meriel.setSize(15, 23).setOffset(15, 10);
          },
          callbackScope: this
        });
      }
    } // on death events


    if (!this.goblin.alive) {
      this.time.addEvent({
        delay: 6500,
        callback: function callback() {
          _this.battleSong.stop();

          _this.scene.start(constants_1.CONSTANTS.SCENES.LVL2, {
            playerX: _this.playerX,
            playerY: _this.playerY,
            collidingEnemy: _this.collidingEnemy
          });
        },
        callbackScope: this
      });
    }

    if (!this.meriel.alive) {
      this.time.addEvent({
        delay: 2000,
        callback: function callback() {
          _this.battleSong.stop();

          _this.scene.start(constants_1.CONSTANTS.SCENES.MENU);
        },
        callbackScope: this
      });
    }
  };

  BattleScene.prototype.move = function (sprite) {
    var randNumber1 = Math.floor(Math.random() * 2 + 1);
    var randNumber2 = Math.floor(Math.random() * 2 + 1);

    if (randNumber1 === 1) {
      sprite.setVelocityX(100);
      sprite.play('goblin_walk', true);
      sprite.anims.chain('goblin_idle');

      if (randNumber2 === 1) {
        sprite.setSize(28, 23).setOffset(10, 10);
        sprite.play('goblin_attack');
        sprite.anims.chain('goblin_idle');
        this.time.addEvent({
          delay: 700,
          callback: function callback() {
            sprite.setSize(20, 23).setOffset(15, 10);
          },
          callbackScope: this
        });
      }
    } else if (randNumber1 === 2) {
      sprite.setFlipX(false);
      sprite.setVelocityX(-100);
      sprite.play('goblin_walk', true);
      sprite.anims.chain('goblin_idle');

      if (randNumber2 === 1) {
        sprite.setSize(28, 23).setOffset(10, 10);
        sprite.play('goblin_attack');
        sprite.anims.chain('goblin_idle');
        this.time.addEvent({
          delay: 700,
          callback: function callback() {
            sprite.setSize(20, 23).setOffset(15, 10);
          },
          callbackScope: this
        });
      }
    }

    this.time.addEvent({
      delay: 500,
      callback: function callback() {
        sprite.setVelocity(0);
      },
      callbackScope: this
    });
  };

  BattleScene.prototype.onHit = function (attacker, receiver) {
    this.gracePeriod = 2000;

    if (receiver.health > 0) {
      if (attacker.graceTime == false) {
        // set hit immunity
        attacker.graceTime = true;
        setTimeout(function () {
          attacker.graceTime = false;
        }, this.gracePeriod); // diminish hp

        receiver.health--;
        receiver.healthText.setText("HP " + receiver.health); // tint and untint sprite

        receiver.tint = 0xff0000;
        this.time.addEvent({
          delay: 500,
          callback: function callback() {
            return receiver.tint = 0xffffff;
          },
          callbackScope: this
        });
      }
    }
  };

  return BattleScene;
}(Phaser.Scene);

exports.BattleScene = BattleScene;
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

var battleScene_1 = require("./scenes/battleScene");

var game = new Phaser.Game({
  width: 800,
  height: 600,
  scene: [loadScene_1.LoadScene, menuScene_1.MenuScene, lvl1Scene_1.LVL1Scene, lvl2Scene_1.LVL2Scene, battleScene_1.BattleScene],
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
},{"./scenes/loadScene":"src/scenes/loadScene.ts","./scenes/menuScene":"src/scenes/menuScene.ts","./scenes/lvl1Scene":"src/scenes/lvl1Scene.ts","./scenes/lvl2Scene":"src/scenes/lvl2Scene.ts","./scenes/battleScene":"src/scenes/battleScene.ts"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52156" + '/');

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