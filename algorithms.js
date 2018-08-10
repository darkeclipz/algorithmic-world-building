"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tilemap = /** @class */ (function () {
    function Tilemap(width, height) {
        this.width = width;
        this.height = height;
        this.clear();
    }
    Tilemap.prototype.clear = function () {
        this.tilemap = new Array(this.width * this.height);
    };
    Tilemap.prototype.index = function (x, y) {
        return y * this.width + x;
    };
    Tilemap.prototype.get = function (x, y) {
        return this.tilemap[this.index(x, y)];
    };
    Tilemap.prototype.set = function (x, y, value) {
        this.tilemap[this.index(x, y)] = value;
    };
    return Tilemap;
}());
exports.Tilemap = Tilemap;
var Algorithms = /** @class */ (function () {
    function Algorithms() {
        this.seed = 0;
    }
    Algorithms.prototype.setSeed = function (seed) {
        this.seed = seed;
    };
    Algorithms.prototype.random = function () {
        return 0;
    };
    Algorithms.prototype.getNeighbours = function (t, x, y) {
        return {
            top: y > 0 && t.get(x, y - 1),
            topright: x < t.width && y > 0 && t.get(x + 1, y - 1),
            right: x < t.width && t.get(x + 1, y),
            bottomright: false,
            bottom: false,
            bottomleft: false,
            left: false,
            topleft: false,
            center: false
        };
    };
    Algorithms.prototype.sumNeighbours = function (t, x, y) {
        var n = this.getNeighbours(t, x, y);
        var sum = 0;
        if (n.bottom)
            sum++;
        if (n.bottomleft)
            sum++;
        if (n.bottomright)
            sum++;
        if (n.top)
            sum++;
        if (n.topleft)
            sum++;
        if (n.topright)
            sum++;
        if (n.right)
            sum++;
        if (n.left)
            sum++;
        if (n.center)
            sum++;
        return sum;
    };
    Algorithms.prototype.applyGameOfLife = function (t, neighboursAlive, suffocation, neighboursSuffocate) {
        if (suffocation === void 0) { suffocation = false; }
        if (neighboursSuffocate === void 0) { neighboursSuffocate = 5; }
        return t;
    };
    Algorithms.prototype.applyRandom = function (t, probability) {
        for (var y = 0; y < t.height; y++) {
            for (var x = 0; x < t.width; x++) {
                t.set(x, y, this.random() <= probability);
            }
        }
        return t;
    };
    Algorithms.sumFloodFillArea = function (t, x, y) {
        return 0;
    };
    return Algorithms;
}());
exports.Algorithms = Algorithms;
//# sourceMappingURL=algorithms.js.map