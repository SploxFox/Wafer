/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/actor-grid.ts":
/*!***************************!*\
  !*** ./src/actor-grid.ts ***!
  \***************************/
/*! exports provided: ActorGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActorGrid", function() { return ActorGrid; });
var ActorGrid = /** @class */ (function () {
    function ActorGrid(characters) {
        this.characters = characters;
    }
    ActorGrid.createEmpty = function (width, height) {
        var rows = [];
        for (var i = 0; i < height; i++) {
            var row = [];
            for (var j = 0; j < width; j++) {
                row.push(undefined);
            }
            rows.push(row);
        }
        return new ActorGrid(rows);
    };
    Object.defineProperty(ActorGrid.prototype, "width", {
        get: function () {
            return this.getRow(0).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorGrid.prototype, "height", {
        get: function () {
            return this.getRows().length;
        },
        enumerable: true,
        configurable: true
    });
    ActorGrid.prototype.get = function (x, y) {
        return this.characters[y][x];
    };
    ActorGrid.prototype.set = function (x, y, value) {
        try {
            this.characters[y][x] = value;
        }
        catch (e) {
            console.log("Invalid spot for actor!");
        }
    };
    ActorGrid.prototype.getRow = function (row) {
        return this.characters[row];
    };
    ActorGrid.prototype.getRows = function () {
        return this.characters;
    };
    ActorGrid.prototype.toString = function () {
        return this.getRows().map(function (row) { return row.map(function (a) { return a == undefined ? " " : a.render(); }).join(" "); }).join("\n");
    };
    ActorGrid.prototype.clone = function () {
        var characters = [];
        for (var _i = 0, _a = this.characters; _i < _a.length; _i++) {
            var row = _a[_i];
            characters.push(row.slice());
        }
        return new ActorGrid(characters);
    };
    return ActorGrid;
}());



/***/ }),

/***/ "./src/actor.ts":
/*!**********************!*\
  !*** ./src/actor.ts ***!
  \**********************/
/*! exports provided: Actor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Actor", function() { return Actor; });
var Actor = /** @class */ (function () {
    function Actor(_position) {
        this._position = _position;
        this.power = 0;
        this.moved = false;
        this.ticks = 0;
    }
    Actor.prototype.render = function () {
        return "@";
    };
    Actor.prototype.tick = function () {
        this.moved = false;
        this.ticks++;
    };
    Object.defineProperty(Actor.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
            this._position = value;
            this.moved = true;
        },
        enumerable: true,
        configurable: true
    });
    return Actor;
}());



/***/ }),

/***/ "./src/actors/executer.ts":
/*!********************************!*\
  !*** ./src/actors/executer.ts ***!
  \********************************/
/*! exports provided: Executer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Executer", function() { return Executer; });
/* harmony import */ var _actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actor */ "./src/actor.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var legalCharacters = "!#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏ";
var executionInstructionNames = [
    "moveBody",
    "moveMemory",
    "say",
    "ifEqual",
    "add",
    "subtract",
    "multiply",
    "divide",
    "reproduce",
    "setMemory",
];
var NextLineExecution;
(function (NextLineExecution) {
    NextLineExecution[NextLineExecution["WHEN_IN_ORDER"] = 0] = "WHEN_IN_ORDER";
    NextLineExecution[NextLineExecution["NOW"] = 1] = "NOW";
    NextLineExecution[NextLineExecution["SKIP"] = 2] = "SKIP";
})(NextLineExecution || (NextLineExecution = {}));
var Executer = /** @class */ (function (_super) {
    __extends(Executer, _super);
    function Executer(position) {
        var _this = _super.call(this, position) || this;
        _this.memory = {
            0: 0,
            1: 63
        };
        _this.instructionIndex = 0;
        _this.instructionsPacketIndex = 0;
        _this.wantsToReproduce = false;
        _this.power = 100;
        _this.instructions = [
            []
        ];
        return _this;
    }
    Executer.prototype.tick = function () {
        _super.prototype.tick.call(this);
        this.power *= 0.95;
        this.power -= 1;
        this.memory = __assign(__assign({}, this.memory), { 0: this.power });
        if (this.instructions[this.instructionsPacketIndex].length != 0 && this.nextLineExecution != NextLineExecution.SKIP) {
            this.nextLineExecution = this.execute(expandInstruction(this.instructions[this.instructionsPacketIndex][this.instructionIndex]));
            if (this.nextLineExecution == NextLineExecution.NOW) {
                this.goToNextInstruction();
                this.execute(expandInstruction(this.instructions[this.instructionsPacketIndex][this.instructionIndex]));
            }
        }
        else {
            this.nextLineExecution = NextLineExecution.WHEN_IN_ORDER;
        }
        this.goToNextInstruction();
    };
    Executer.prototype.goToNextInstruction = function () {
        this.instructionIndex++;
        if (this.instructionIndex >= this.instructions[this.instructionsPacketIndex].length) {
            this.instructionIndex = 0;
            this.instructionsPacketIndex++;
            if (this.instructionsPacketIndex >= this.instructions.length) {
                this.instructionsPacketIndex = 0;
            }
        }
    };
    Executer.prototype.execute = function (instruction) {
        this.power - 0.05;
        var nextLineExecution = NextLineExecution.WHEN_IN_ORDER;
        switch (executionInstructionNames[instruction.name]) {
            case "moveBody":
                var xDir = instruction.args[0].toString(2).padStart(4, "0")[3] == "0" ? -1 : 1;
                var yDir = instruction.args[0].toString(2).padStart(4, "0")[2] == "0" ? -1 : 1;
                this.position = this.position.clone({
                    x: this.position.x + xDir,
                    y: this.position.y + yDir
                });
                break;
            case "moveMemory":
                this.memory[instruction.args[1]] = this.memory[instruction.args[0]];
                break;
            case "ifEqual":
                if (instruction.args[0] == instruction.args[1]) {
                    nextLineExecution = NextLineExecution.NOW;
                }
                else {
                    nextLineExecution = NextLineExecution.SKIP;
                }
                break;
            case "add":
                this.memory[instruction.args[0]] += this.memory[instruction.args[1]];
                break;
            case "subtract":
                this.memory[instruction.args[0]] -= this.memory[instruction.args[1]];
                break;
            case "multiply":
                this.memory[instruction.args[0]] *= this.memory[instruction.args[1]];
                break;
            case "divide":
                this.memory[instruction.args[0]] /= this.memory[instruction.args[1]];
                break;
            case "reproduce":
                this.wantsToReproduce = true;
                break;
            case "setMemory":
                this.memory[instruction.args[0]] = instruction.args[0];
                break;
        }
        return nextLineExecution;
    };
    Executer.prototype.reproduce = function () {
        this.power -= 110;
        var child = new Executer(this.position.clone({ y: this.position.y + 1 }));
        if (Math.random() < 0.1) {
            child.instructions.push([]);
        }
        child.instructions = this.instructions.map(function (ip) {
            var nip = ip.map(function (i) {
                if (Math.random() < 0.1) {
                    var instr = i.toString(2);
                    var spliceSpot = Math.floor(Math.random() * instr.length);
                    return parseInt(instr.substring(0, spliceSpot) + (instr[spliceSpot] == "1" ? "0" : "1") + instr.substring(spliceSpot + 1, instr.length), 2);
                }
                else {
                    return i;
                }
            });
            if (Math.random() < 0.1) {
                nip.push(Math.floor(Math.random() * 4096));
            }
            return nip;
        });
        return child;
    };
    Executer.prototype.render = function () {
        return legalCharacters[Math.floor(Math.min(this.memory[1], legalCharacters.length))];
    };
    return Executer;
}(_actor__WEBPACK_IMPORTED_MODULE_0__["Actor"]));

function collapseInstruction(instruction) {
    return parseInt(instruction.name.toString(2) + instruction.args[0].toString(2) + instruction.args[1].toString(2), 2);
}
function expandInstruction(collapsedInstruction) {
    var binaryInstruction = collapsedInstruction.toString(2).padStart(12, "0");
    return {
        name: parseInt(binaryInstruction.substr(0, 4), 2),
        args: [
            parseInt(binaryInstruction.substr(4, 4), 2),
            parseInt(binaryInstruction.substr(8, 4), 2),
        ]
    };
}
window.expandInstruction = expandInstruction;
window.collapseInstruction = collapseInstruction;


/***/ }),

/***/ "./src/actors/food.ts":
/*!****************************!*\
  !*** ./src/actors/food.ts ***!
  \****************************/
/*! exports provided: Food */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Food", function() { return Food; });
/* harmony import */ var _actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actor */ "./src/actor.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Food = /** @class */ (function (_super) {
    __extends(Food, _super);
    function Food() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.power = 50;
        return _this;
    }
    Food.prototype.render = function () {
        return "*";
    };
    Food.prototype.tick = function () {
        this.power = Math.max(50, this.power * 0.75);
    };
    return Food;
}(_actor__WEBPACK_IMPORTED_MODULE_0__["Actor"]));



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: paint, tick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paint", function() { return paint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tick", function() { return tick; });
/* harmony import */ var _world__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./world */ "./src/world.ts");
/* harmony import */ var _actor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actor */ "./src/actor.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vector */ "./src/vector.ts");



function paint(characterGrid) {
    document.getElementById("character-grid-element").textContent = characterGrid.toString();
}
var world = new _world__WEBPACK_IMPORTED_MODULE_0__["World"](1000, 50);
world.addActor(new _actor__WEBPACK_IMPORTED_MODULE_1__["Actor"](new _vector__WEBPACK_IMPORTED_MODULE_2__["Vector"](10, 10)));
window.world = world;
function tick() {
    requestAnimationFrame(tick);
    world.tick();
    paint(world.render());
}
requestAnimationFrame(tick);


/***/ }),

/***/ "./src/vector.ts":
/*!***********************!*\
  !*** ./src/vector.ts ***!
  \***********************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.clone = function (change) {
        return new Vector(change && change.x != undefined ? change.x : this.x, change && change.y != undefined ? change.y : this.y);
    };
    return Vector;
}());



/***/ }),

/***/ "./src/world.ts":
/*!**********************!*\
  !*** ./src/world.ts ***!
  \**********************/
/*! exports provided: World */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "World", function() { return World; });
/* harmony import */ var _actor_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actor-grid */ "./src/actor-grid.ts");
/* harmony import */ var _actors_food__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actors/food */ "./src/actors/food.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vector */ "./src/vector.ts");
/* harmony import */ var _actors_executer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actors/executer */ "./src/actors/executer.ts");




var World = /** @class */ (function () {
    function World(width, height) {
        this.width = width;
        this.height = height;
        this.actors = [];
        this.ticks = 0;
    }
    World.prototype.addActor = function (actor) {
        this.actors.push(actor);
    };
    World.prototype.render = function () {
        return this.actorGrid.clone();
    };
    World.prototype.getRandomPosition = function () {
        return new _vector__WEBPACK_IMPORTED_MODULE_2__["Vector"](Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height));
    };
    World.prototype.tick = function () {
        var _this = this;
        this.actors.forEach(function (a) { return a.tick(); });
        if (this.ticks % 1 === 0) {
            for (var i = 0; i < (this.width * this.height) / 1000; i++) {
                this.addActor(new _actors_food__WEBPACK_IMPORTED_MODULE_1__["Food"](this.getRandomPosition()));
            }
        }
        if (this.ticks % 1 === 0) {
            for (var i = 0; i < (this.width * this.height) / 20000; i++) {
                var exec = new _actors_executer__WEBPACK_IMPORTED_MODULE_3__["Executer"](this.getRandomPosition());
                this.addActor(exec);
                this.addActor(exec.reproduce());
            }
        }
        this.actors.forEach(function (a) {
            if (a instanceof _actors_executer__WEBPACK_IMPORTED_MODULE_3__["Executer"]) {
                if (a.wantsToReproduce) {
                    _this.addActor(a.reproduce());
                }
            }
            if (a.power < 0) {
                _this.removeActor(a);
            }
        });
        debugger;
        this.actors.forEach(function (a) {
            if (a.position.x >= _this.width) {
                a.position = a.position.clone({ x: _this.width - 1 });
            }
            if (a.position.y >= _this.height) {
                a.position = a.position.clone({ y: _this.height - 1 });
            }
            if (a.position.x < 0) {
                a.position = a.position.clone({ x: 0 });
            }
            if (a.position.y < 0) {
                a.position = a.position.clone({ y: 0 });
            }
        });
        /*for (let i = 0; i < this.actors.length; i++) {
            if (!this.actors[i].moved && this.actors[i].ticks > 1) {
                continue;
            }
            for (let j = i; j < this.actors.length; j++) {
                if (this.actors[i] != this.actors[j] && this.actors[i].position.x == this.actors[j].position.x && this.actors[i].position.y == this.actors[j].position.y) {
                    const dom = this.actors[i].power > this.actors[j].power ? this.actors[i] : this.actors[j];
                    const sub = this.actors[i].power > this.actors[j].power ? this.actors[j] : this.actors[i];
                    const removalAt = this.actors[i].power > this.actors[j].power ? j : i;

                    dom.power += sub.power;

                    this.removeActor(sub);
                    if (removalAt <= i) {
                        i--;
                        break;
                    }
                    if (removalAt <= j) {
                        j--;
                    }
                }
            }
        }*/
        this.actorGrid = _actor_grid__WEBPACK_IMPORTED_MODULE_0__["ActorGrid"].createEmpty(this.width, this.height);
        for (var _i = 0, _a = this.actors; _i < _a.length; _i++) {
            var actor = _a[_i];
            /*if (actor.position.x >= this.width || actor.position.y >= this.height || actor.position.x < 0 || actor.position.y < 0) {

            } else */
            if (this.actorGrid.get(actor.position.x, actor.position.y) == undefined) {
                this.actorGrid.set(actor.position.x, actor.position.y, actor);
            }
            else {
                var otherActor = this.actorGrid.get(actor.position.x, actor.position.y);
                var dom = otherActor.power > actor.power ? otherActor : actor;
                var sub = otherActor.power > actor.power ? actor : otherActor;
                dom.power += sub.power;
                this.removeActor(sub);
                this.actorGrid.set(actor.position.x, actor.position.y, dom);
            }
        }
        this.ticks++;
    };
    World.prototype.removeActor = function (actor) {
        this.actors.splice(this.actors.indexOf(actor), 1);
    };
    return World;
}());



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdG9yLWdyaWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9hY3RvcnMvZXhlY3V0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdG9ycy9mb29kLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQUE7QUFBQTtJQUNJLG1CQUFvQixVQUErQjtRQUEvQixlQUFVLEdBQVYsVUFBVSxDQUFxQjtJQUVuRCxDQUFDO0lBQ00scUJBQVcsR0FBbEIsVUFBbUIsS0FBYSxFQUFFLE1BQWM7UUFD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QUFDO2FBQ2pFO2lCQUFNO2dCQUNILElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTFFLElBQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ2hFLElBQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7Z0JBRWhFLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFFdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDL0Q7U0FDSjtRQUVELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsMkJBQVcsR0FBWCxVQUFZLEtBQVk7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IEFjdG9yIH0gZnJvbSBcIi4vYWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY3RvckdyaWQge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjaGFyYWN0ZXJzOiBBcnJheTxBcnJheTxBY3Rvcj4+KSB7XHJcblxyXG4gICAgfVxyXG4gICAgc3RhdGljIGNyZWF0ZUVtcHR5KHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3Qgcm93cyA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gW107XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB3aWR0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICByb3cucHVzaCh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvd3MucHVzaChyb3cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBBY3RvckdyaWQocm93cyk7XHJcbiAgICB9XHJcbiAgICBnZXQgd2lkdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Um93KDApLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGdldCBoZWlnaHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Um93cygpLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGdldCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJhY3RlcnNbeV1beF07XHJcbiAgICB9XHJcbiAgICBzZXQoeDogbnVtYmVyLCB5OiBudW1iZXIsIHZhbHVlOiBBY3Rvcikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyc1t5XVt4XSA9IHZhbHVlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbnZhbGlkIHNwb3QgZm9yIGFjdG9yIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRSb3cocm93OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXJzW3Jvd107XHJcbiAgICB9XHJcbiAgICBnZXRSb3dzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJhY3RlcnM7XHJcbiAgICB9XHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRSb3dzKCkubWFwKChyb3cpID0+IHJvdy5tYXAoKGEpID0+IGEgPT0gdW5kZWZpbmVkID8gXCIgXCIgOiBhLnJlbmRlcigpKS5qb2luKFwiIFwiKSkuam9pbihcIlxcblwiKTtcclxuICAgIH1cclxuICAgIGNsb25lKCkge1xyXG4gICAgICAgIGNvbnN0IGNoYXJhY3RlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCByb3cgb2YgdGhpcy5jaGFyYWN0ZXJzKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3RlcnMucHVzaChyb3cuc2xpY2UoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IEFjdG9yR3JpZChjaGFyYWN0ZXJzKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yIHtcclxuICAgIHBvd2VyOiBudW1iZXIgPSAwO1xyXG4gICAgbW92ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHRpY2tzOiBudW1iZXIgPSAwO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcG9zaXRpb246IFZlY3Rvcikge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkBcIjtcclxuICAgIH1cclxuXHJcbiAgICB0aWNrKCkge1xyXG4gICAgICAgIHRoaXMubW92ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRpY2tzKys7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBvc2l0aW9uKHZhbHVlOiBWZWN0b3IpIHtcclxuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMubW92ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwb3NpdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBY3RvciB9IGZyb20gXCIuLi9hY3RvclwiO1xyXG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vdmVjdG9yXCI7XHJcblxyXG5jb25zdCBsZWdhbENoYXJhY3RlcnMgPSBcIiEjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+wqHCosKjwqTCpcKmwqfCqMKpwqrCq8Kswq7Cr8KwwrHCssKzwrTCtcK2wrfCuMK5wrrCu8K8wr3CvsK/w4DDgcOCw4PDhMOFw4bDh8OIw4nDisOLw4zDjcOOw4/DkMORw5LDk8OUw5XDlsOXw5jDmcOaw5vDnMOdw57Dn8Ogw6HDosOjw6TDpcOmw6fDqMOpw6rDq8Osw63DrsOvw7DDscOyw7PDtMO1w7bDt8O4w7nDusO7w7zDvcO+w7/EgMSBxILEg8SExIXEhsSHxIjEicSKxIvEjMSNxI7Ej8SQxJHEksSTxJTElcSWxJfEmMSZxJrEm8ScxJ3EnsSfxKDEocSixKPEpMSlxKbEp8SoxKnEqsSrxKzErcSuxK/EsMSxxLLEs8S0xLXEtsS3xLjEucS6xLvEvMS9xL7Ev8WAxYHFgsWDxYTFhcWGxYfFiMWJxYrFi8WMxY3FjsWPxZDFkcWSxZPFlMWVxZbFl8WYxZnFmsWbxZzFncWexZ/FoMWhxaLFo8WkxaXFpsWnxajFqcWqxavFrMWtxa7Fr8WwxbHFssWzxbTFtcW2xbfFuMW5xbrFu8W8xb3FvsW/xoDGgcaCxoPGhMaFxobGh8aIxonGisaLxozGjcaOxo/GkMaRxpLGk8aUxpXGlsaXxpjGmcaaxpvGnMadxp7Gn8agxqHGosajxqTGpcamxqfGqMapxqrGq8asxq3GrsavxrDGscayxrPGtMa1xrbGt8a4xrnGusa7xrzGvca+xr/HgMeBx4LHg8eEx4XHhseHx4jHiceKx4vHjMeNx47Hj8eQx5HHkseTx5THlceWx5fHmMeZx5rHm8ecx53Hnsefx6DHoceix6PHpMelx6bHp8eox6nHqserx6zHrceux6/HsMexx7LHs8e0x7XHtse3x7jHuce6x7vHvMe9x77Hv8iAyIHIgsiDyITIhciGyIfIiMiJyIrIi8iMyI3IjsiPyJDIkciSyJPIlMiVyJbIl8iYyJnImsibyJzIncieyJ/IoMihyKLIo8ikyKXIpsinyKjIqciqyKvIrMityK7Ir8iwyLHIssizyLTItci2yLfIuMi5yLrIu8i8yL3Ivsi/yYDJgcmCyYPJhMmFyYbJh8mIyYnJismLyYzJjcmOyY9cIlxyXG5cclxuY29uc3QgZXhlY3V0aW9uSW5zdHJ1Y3Rpb25OYW1lcyA9IFtcclxuICAgIFwibW92ZUJvZHlcIiwgICAgLy8wMDAwXHJcbiAgICBcIm1vdmVNZW1vcnlcIiwgIC8vMDAwMVxyXG4gICAgXCJzYXlcIiwgICAgICAgICAvLzAwMTBcclxuICAgIFwiaWZFcXVhbFwiLCAgICAgLy8wMDExXHJcbiAgICBcImFkZFwiLCAgICAgICAgIC8vMDEwMFxyXG4gICAgXCJzdWJ0cmFjdFwiLCAgICAvLzAxMDFcclxuICAgIFwibXVsdGlwbHlcIiwgICAgLy8wMTEwXHJcbiAgICBcImRpdmlkZVwiLCAgICAgIC8vMDExMVxyXG4gICAgXCJyZXByb2R1Y2VcIiwgICAgLy8xMDAwXHJcbiAgICBcInNldE1lbW9yeVwiLFxyXG5dXHJcblxyXG5pbnRlcmZhY2UgTWVtb3J5IHtcclxuICAgIFtpbmRleDogbnVtYmVyXTogbnVtYmVyO1xyXG4gICAgMDogbnVtYmVyOyAvL3Bvd2VyXHJcbiAgICAxOiBudW1iZXI7IC8vbGV0dGVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnN0cnVjdGlvbiB7XHJcbiAgICBuYW1lOiBudW1iZXI7XHJcbiAgICBhcmdzOiBbbnVtYmVyLCBudW1iZXJdO1xyXG59XHJcblxyXG5lbnVtIE5leHRMaW5lRXhlY3V0aW9uIHtcclxuICAgIFdIRU5fSU5fT1JERVIsIE5PVywgU0tJUFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXhlY3V0ZXIgZXh0ZW5kcyBBY3RvciB7XHJcbiAgICBtZW1vcnk6IE1lbW9yeSA9IHtcclxuICAgICAgICAwOiAwLFxyXG4gICAgICAgIDE6IDYzXHJcbiAgICB9O1xyXG4gICAgaW5zdHJ1Y3Rpb25zOiBudW1iZXJbXVtdO1xyXG4gICAgaW5zdHJ1Y3Rpb25JbmRleDogbnVtYmVyID0gMDtcclxuICAgIGluc3RydWN0aW9uc1BhY2tldEluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgd2FudHNUb1JlcHJvZHVjZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcG93ZXIgPSAxMDA7XHJcbiAgICBuZXh0TGluZUV4ZWN1dGlvbjogTmV4dExpbmVFeGVjdXRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9zaXRpb246IFZlY3Rvcikge1xyXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIFtdXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aWNrICgpIHtcclxuICAgICAgICBzdXBlci50aWNrKCk7XHJcbiAgICAgICAgdGhpcy5wb3dlciAqPSAwLjk1XHJcbiAgICAgICAgdGhpcy5wb3dlciAtPSAxO1xyXG4gICAgICAgIHRoaXMubWVtb3J5ID0ge1xyXG4gICAgICAgICAgICAuLi50aGlzLm1lbW9yeSxcclxuICAgICAgICAgICAgMDogdGhpcy5wb3dlclxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmluc3RydWN0aW9uc1t0aGlzLmluc3RydWN0aW9uc1BhY2tldEluZGV4XS5sZW5ndGggIT0gMCAmJiB0aGlzLm5leHRMaW5lRXhlY3V0aW9uICE9IE5leHRMaW5lRXhlY3V0aW9uLlNLSVApIHtcclxuICAgICAgICAgICAgdGhpcy5uZXh0TGluZUV4ZWN1dGlvbiA9IHRoaXMuZXhlY3V0ZShleHBhbmRJbnN0cnVjdGlvbih0aGlzLmluc3RydWN0aW9uc1t0aGlzLmluc3RydWN0aW9uc1BhY2tldEluZGV4XVt0aGlzLmluc3RydWN0aW9uSW5kZXhdKSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5leHRMaW5lRXhlY3V0aW9uID09IE5leHRMaW5lRXhlY3V0aW9uLk5PVykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb1RvTmV4dEluc3RydWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGUoZXhwYW5kSW5zdHJ1Y3Rpb24odGhpcy5pbnN0cnVjdGlvbnNbdGhpcy5pbnN0cnVjdGlvbnNQYWNrZXRJbmRleF1bdGhpcy5pbnN0cnVjdGlvbkluZGV4XSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uZXh0TGluZUV4ZWN1dGlvbiA9IE5leHRMaW5lRXhlY3V0aW9uLldIRU5fSU5fT1JERVI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdvVG9OZXh0SW5zdHJ1Y3Rpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBnb1RvTmV4dEluc3RydWN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25JbmRleCsrO1xyXG4gICAgICAgIGlmICh0aGlzLmluc3RydWN0aW9uSW5kZXggPj0gdGhpcy5pbnN0cnVjdGlvbnNbdGhpcy5pbnN0cnVjdGlvbnNQYWNrZXRJbmRleF0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25JbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zUGFja2V0SW5kZXgrKztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluc3RydWN0aW9uc1BhY2tldEluZGV4ID49IHRoaXMuaW5zdHJ1Y3Rpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnNQYWNrZXRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhlY3V0ZShpbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24pIHtcclxuICAgICAgICB0aGlzLnBvd2VyIC0gMC4wNTtcclxuICAgICAgICBsZXQgbmV4dExpbmVFeGVjdXRpb24gPSBOZXh0TGluZUV4ZWN1dGlvbi5XSEVOX0lOX09SREVSO1xyXG5cclxuICAgICAgICBzd2l0Y2goZXhlY3V0aW9uSW5zdHJ1Y3Rpb25OYW1lc1tpbnN0cnVjdGlvbi5uYW1lXSkge1xyXG4gICAgICAgICAgICBjYXNlIFwibW92ZUJvZHlcIjpcclxuICAgICAgICAgICAgICAgIGNvbnN0IHhEaXIgPSBpbnN0cnVjdGlvbi5hcmdzWzBdLnRvU3RyaW5nKDIpLnBhZFN0YXJ0KDQsXCIwXCIpWzNdID09IFwiMFwiID8gLTEgOiAxO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeURpciA9IGluc3RydWN0aW9uLmFyZ3NbMF0udG9TdHJpbmcoMikucGFkU3RhcnQoNCxcIjBcIilbMl0gPT0gXCIwXCIgPyAtMSA6IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uY2xvbmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IHRoaXMucG9zaXRpb24ueCArIHhEaXIsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5wb3NpdGlvbi55ICsgeURpclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJtb3ZlTWVtb3J5XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbW9yeVtpbnN0cnVjdGlvbi5hcmdzWzFdXSA9IHRoaXMubWVtb3J5W2luc3RydWN0aW9uLmFyZ3NbMF1dO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiaWZFcXVhbFwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGluc3RydWN0aW9uLmFyZ3NbMF0gPT0gaW5zdHJ1Y3Rpb24uYXJnc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRMaW5lRXhlY3V0aW9uID0gTmV4dExpbmVFeGVjdXRpb24uTk9XO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0TGluZUV4ZWN1dGlvbiA9IE5leHRMaW5lRXhlY3V0aW9uLlNLSVA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgXCJhZGRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubWVtb3J5W2luc3RydWN0aW9uLmFyZ3NbMF1dICs9IHRoaXMubWVtb3J5W2luc3RydWN0aW9uLmFyZ3NbMV1dO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIFwic3VidHJhY3RcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubWVtb3J5W2luc3RydWN0aW9uLmFyZ3NbMF1dIC09IHRoaXMubWVtb3J5W2luc3RydWN0aW9uLmFyZ3NbMV1dO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwibXVsdGlwbHlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubWVtb3J5W2luc3RydWN0aW9uLmFyZ3NbMF1dICo9IHRoaXMubWVtb3J5W2luc3RydWN0aW9uLmFyZ3NbMV1dO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiZGl2aWRlXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbW9yeVtpbnN0cnVjdGlvbi5hcmdzWzBdXSAvPSB0aGlzLm1lbW9yeVtpbnN0cnVjdGlvbi5hcmdzWzFdXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcInJlcHJvZHVjZVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy53YW50c1RvUmVwcm9kdWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcInNldE1lbW9yeVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW1vcnlbaW5zdHJ1Y3Rpb24uYXJnc1swXV0gPSBpbnN0cnVjdGlvbi5hcmdzWzBdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV4dExpbmVFeGVjdXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcmVwcm9kdWNlKCkge1xyXG4gICAgICAgIHRoaXMucG93ZXIgLT0gMTEwO1xyXG5cclxuICAgICAgICBjb25zdCBjaGlsZCA9IG5ldyBFeGVjdXRlcih0aGlzLnBvc2l0aW9uLmNsb25lKHt5OiB0aGlzLnBvc2l0aW9uLnkgKyAxfSkpO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMSkge1xyXG4gICAgICAgICAgICBjaGlsZC5pbnN0cnVjdGlvbnMucHVzaChbXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGlsZC5pbnN0cnVjdGlvbnMgPSB0aGlzLmluc3RydWN0aW9ucy5tYXAoKGlwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5pcCA9IGlwLm1hcCgoaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0ciA9IGkudG9TdHJpbmcoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BsaWNlU3BvdCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGluc3RyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGluc3RyLnN1YnN0cmluZygwLHNwbGljZVNwb3QpICsgKGluc3RyW3NwbGljZVNwb3RdID09IFwiMVwiID8gXCIwXCIgOiBcIjFcIikgKyBpbnN0ci5zdWJzdHJpbmcoc3BsaWNlU3BvdCArIDEsIGluc3RyLmxlbmd0aCksIDIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMSkge1xyXG4gICAgICAgICAgICAgICAgbmlwLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNDA5NikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmlwO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiBsZWdhbENoYXJhY3RlcnNbTWF0aC5mbG9vcihNYXRoLm1pbih0aGlzLm1lbW9yeVsxXSwgbGVnYWxDaGFyYWN0ZXJzLmxlbmd0aCkpXTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY29sbGFwc2VJbnN0cnVjdGlvbihpbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24pIHtcclxuICAgIHJldHVybiBwYXJzZUludChpbnN0cnVjdGlvbi5uYW1lLnRvU3RyaW5nKDIpICsgaW5zdHJ1Y3Rpb24uYXJnc1swXS50b1N0cmluZygyKSArIGluc3RydWN0aW9uLmFyZ3NbMV0udG9TdHJpbmcoMiksMik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4cGFuZEluc3RydWN0aW9uKGNvbGxhcHNlZEluc3RydWN0aW9uOiBudW1iZXIpOiBJbnN0cnVjdGlvbiB7XHJcbiAgICBjb25zdCBiaW5hcnlJbnN0cnVjdGlvbiA9IGNvbGxhcHNlZEluc3RydWN0aW9uLnRvU3RyaW5nKDIpLnBhZFN0YXJ0KDEyLFwiMFwiKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogcGFyc2VJbnQoYmluYXJ5SW5zdHJ1Y3Rpb24uc3Vic3RyKDAsNCksMiksXHJcbiAgICAgICAgYXJnczogW1xyXG4gICAgICAgICAgICBwYXJzZUludChiaW5hcnlJbnN0cnVjdGlvbi5zdWJzdHIoNCw0KSwyKSxcclxuICAgICAgICAgICAgcGFyc2VJbnQoYmluYXJ5SW5zdHJ1Y3Rpb24uc3Vic3RyKDgsNCksMiksXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59XHJcblxyXG4od2luZG93IGFzIGFueSkuZXhwYW5kSW5zdHJ1Y3Rpb24gPSBleHBhbmRJbnN0cnVjdGlvbjtcclxuKHdpbmRvdyBhcyBhbnkpLmNvbGxhcHNlSW5zdHJ1Y3Rpb24gPSBjb2xsYXBzZUluc3RydWN0aW9uOyIsImltcG9ydCB7IEFjdG9yIH0gZnJvbSBcIi4uL2FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRm9vZCBleHRlbmRzIEFjdG9ye1xyXG4gICAgcG93ZXIgPSA1MDtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiKlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHRpY2soKSB7XHJcbiAgICAgICAgdGhpcy5wb3dlciA9IE1hdGgubWF4KDUwLCB0aGlzLnBvd2VyICogMC43NSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBY3RvckdyaWQgfSBmcm9tIFwiLi9hY3Rvci1ncmlkXCI7XHJcbmltcG9ydCB7IFdvcmxkIH0gZnJvbSBcIi4vd29ybGRcIjtcclxuaW1wb3J0IHsgQWN0b3IgfSBmcm9tIFwiLi9hY3RvclwiO1xyXG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi92ZWN0b3JcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYWludChjaGFyYWN0ZXJHcmlkOiBBY3RvckdyaWQpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWdyaWQtZWxlbWVudFwiKS50ZXh0Q29udGVudCA9IGNoYXJhY3RlckdyaWQudG9TdHJpbmcoKTtcclxufVxyXG5cclxuY29uc3Qgd29ybGQgPSBuZXcgV29ybGQoMTAwMCw1MCk7XHJcbndvcmxkLmFkZEFjdG9yKG5ldyBBY3RvcihuZXcgVmVjdG9yKDEwLDEwKSkpO1xyXG5cclxuKHdpbmRvdyBhcyBhbnkpLndvcmxkID0gd29ybGQ7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGljaygpIHtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcclxuICAgIHdvcmxkLnRpY2soKTtcclxuICAgIHBhaW50KHdvcmxkLnJlbmRlcigpKTtcclxufVxyXG5cclxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spOyIsImludGVyZmFjZSBWZWN0b3JQcm9wcyB7XHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB5OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFZlY3RvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgeDogbnVtYmVyLCBwdWJsaWMgcmVhZG9ubHkgeTogbnVtYmVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvbmUoY2hhbmdlPzogUGFydGlhbDxWZWN0b3JQcm9wcz4pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihjaGFuZ2UgJiYgY2hhbmdlLnggIT0gdW5kZWZpbmVkID8gY2hhbmdlLnggOiB0aGlzLngsIGNoYW5nZSAmJiBjaGFuZ2UueSAhPSB1bmRlZmluZWQgPyBjaGFuZ2UueSA6IHRoaXMueSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBY3RvckdyaWQgfSBmcm9tIFwiLi9hY3Rvci1ncmlkXCI7XHJcbmltcG9ydCB7IEFjdG9yIH0gZnJvbSBcIi4vYWN0b3JcIjtcclxuaW1wb3J0IHsgRm9vZCB9IGZyb20gXCIuL2FjdG9ycy9mb29kXCI7XHJcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xyXG5pbXBvcnQgeyBFeGVjdXRlciB9IGZyb20gXCIuL2FjdG9ycy9leGVjdXRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmxkIHtcclxuICAgIHByaXZhdGUgYWN0b3JzOiBBY3RvcltdID0gW107XHJcbiAgICBwcml2YXRlIHRpY2tzOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBhY3RvckdyaWQ6IEFjdG9yR3JpZDtcclxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHdpZHRoOiBudW1iZXIsIHJlYWRvbmx5IGhlaWdodDogbnVtYmVyKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFkZEFjdG9yKGFjdG9yOiBBY3Rvcikge1xyXG4gICAgICAgIHRoaXMuYWN0b3JzLnB1c2goYWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3RvckdyaWQuY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSYW5kb21Qb3NpdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLndpZHRoKSwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aWNrKCkge1xyXG4gICAgICAgIHRoaXMuYWN0b3JzLmZvckVhY2goKGEpID0+IGEudGljaygpKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGlja3MgJSAxID09PSAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCkgLyAxMDAwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQWN0b3IobmV3IEZvb2QodGhpcy5nZXRSYW5kb21Qb3NpdGlvbigpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpY2tzICUgMSA9PT0gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQpIC8gMjAwMDA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXhlYyA9IG5ldyBFeGVjdXRlcih0aGlzLmdldFJhbmRvbVBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRBY3RvcihleGVjKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQWN0b3IoZXhlYy5yZXByb2R1Y2UoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWN0b3JzLmZvckVhY2goKGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBFeGVjdXRlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGEud2FudHNUb1JlcHJvZHVjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQWN0b3IoYS5yZXByb2R1Y2UoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGEucG93ZXIgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFjdG9yKGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICB0aGlzLmFjdG9ycy5mb3JFYWNoKChhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhLnBvc2l0aW9uLnggPj0gdGhpcy53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgYS5wb3NpdGlvbiA9IGEucG9zaXRpb24uY2xvbmUoe3g6IHRoaXMud2lkdGggLSAxfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGEucG9zaXRpb24ueSA+PSB0aGlzLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgYS5wb3NpdGlvbiA9IGEucG9zaXRpb24uY2xvbmUoe3k6IHRoaXMuaGVpZ2h0IC0gMX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhLnBvc2l0aW9uLnggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBhLnBvc2l0aW9uID0gYS5wb3NpdGlvbi5jbG9uZSh7eDogMH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhLnBvc2l0aW9uLnkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBhLnBvc2l0aW9uID0gYS5wb3NpdGlvbi5jbG9uZSh7eTogMH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYWN0b3JzW2ldLm1vdmVkICYmIHRoaXMuYWN0b3JzW2ldLnRpY2tzID4gMSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGk7IGogPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0b3JzW2ldICE9IHRoaXMuYWN0b3JzW2pdICYmIHRoaXMuYWN0b3JzW2ldLnBvc2l0aW9uLnggPT0gdGhpcy5hY3RvcnNbal0ucG9zaXRpb24ueCAmJiB0aGlzLmFjdG9yc1tpXS5wb3NpdGlvbi55ID09IHRoaXMuYWN0b3JzW2pdLnBvc2l0aW9uLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkb20gPSB0aGlzLmFjdG9yc1tpXS5wb3dlciA+IHRoaXMuYWN0b3JzW2pdLnBvd2VyID8gdGhpcy5hY3RvcnNbaV0gOiB0aGlzLmFjdG9yc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWIgPSB0aGlzLmFjdG9yc1tpXS5wb3dlciA+IHRoaXMuYWN0b3JzW2pdLnBvd2VyID8gdGhpcy5hY3RvcnNbal0gOiB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZW1vdmFsQXQgPSB0aGlzLmFjdG9yc1tpXS5wb3dlciA+IHRoaXMuYWN0b3JzW2pdLnBvd2VyID8gaiA6IGk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5wb3dlciArPSBzdWIucG93ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWN0b3Ioc3ViKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVtb3ZhbEF0IDw9IGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbW92YWxBdCA8PSBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGotLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgdGhpcy5hY3RvckdyaWQgPSBBY3RvckdyaWQuY3JlYXRlRW1wdHkodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGFjdG9yIG9mIHRoaXMuYWN0b3JzKSB7XHJcbiAgICAgICAgICAgIC8qaWYgKGFjdG9yLnBvc2l0aW9uLnggPj0gdGhpcy53aWR0aCB8fCBhY3Rvci5wb3NpdGlvbi55ID49IHRoaXMuaGVpZ2h0IHx8IGFjdG9yLnBvc2l0aW9uLnggPCAwIHx8IGFjdG9yLnBvc2l0aW9uLnkgPCAwKSB7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgKi9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdG9yR3JpZC5nZXQoYWN0b3IucG9zaXRpb24ueCwgYWN0b3IucG9zaXRpb24ueSkgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdG9yR3JpZC5zZXQoYWN0b3IucG9zaXRpb24ueCwgYWN0b3IucG9zaXRpb24ueSwgYWN0b3IpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJBY3RvciA9IHRoaXMuYWN0b3JHcmlkLmdldChhY3Rvci5wb3NpdGlvbi54LCBhY3Rvci5wb3NpdGlvbi55KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkb20gPSBvdGhlckFjdG9yLnBvd2VyID4gYWN0b3IucG93ZXIgPyBvdGhlckFjdG9yIDogYWN0b3I7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWIgPSBvdGhlckFjdG9yLnBvd2VyID4gYWN0b3IucG93ZXIgPyBhY3RvciA6IG90aGVyQWN0b3I7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9tLnBvd2VyICs9IHN1Yi5wb3dlcjtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFjdG9yKHN1Yik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdG9yR3JpZC5zZXQoYWN0b3IucG9zaXRpb24ueCwgYWN0b3IucG9zaXRpb24ueSwgZG9tKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50aWNrcysrO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFjdG9yKGFjdG9yOiBBY3Rvcikge1xyXG4gICAgICAgIHRoaXMuYWN0b3JzLnNwbGljZSh0aGlzLmFjdG9ycy5pbmRleE9mKGFjdG9yKSwgMSk7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9