/*
    @author: Lars Rotgers, larsrotgers <at> gmail <dot> com, 8-Aug-'18.

    An L-system is created with an alphabet, an axiom (initial state), and a set of rules.
    Each generation, the set of rules is applied to the current state, which is
    the axiom in generation 0.

    Example to instantiate an L-system:

    LSystem.new( alphabet, axiom, [ruleset] );

    The system LSystem.new('AB', 'A', ['A=ABA', 'B=BBB']) will create Cantor's set.

    A stochastic system can be created in the following way:
    LSystem.new('AB', 'A', ['A=ABA,BAB', 'B=BBB']) where the first rule is parsed as
    a stochastic rule.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LSystem = /** @class */ (function () {
    function LSystem(alphabet, axiom, rules) {
        this.alphabet = alphabet;
        this.axiom = axiom;
        this.rules = rules;
        this.current = '';
        this.generation = 0;
        this.current = axiom;
    }
    // Get the state for the next generation by applying the rulesets to the current state.
    LSystem.prototype.nextGeneration = function () {
        var stringBuffer = '';
        for (var _i = 0, _a = this.current.split(''); _i < _a.length; _i++) {
            var char = _a[_i];
            // Make sure that the character is actually allowed.
            if (this.alphabet.indexOf(char) == -1) {
                console.error("Character '" + char + "' is not part of the L-systems alphabet.");
                return;
            }
            var rewritten = false;
            // Find the rule for this character and rewrite it.
            for (var _b = 0, _c = this.rules; _b < _c.length; _b++) {
                var rule = _c[_b];
                if (rule.symbol == char) {
                    stringBuffer += rule.rewrite();
                    rewritten = true;
                    break;
                }
            }
            // If for some reason we didn't rewrite it, just append it
            // to the end of the string.
            if (!rewritten) {
                stringBuffer += char;
            }
        }
        this.generation++;
        this.current = stringBuffer;
    };
    // Quickly go to any generation.
    LSystem.prototype.gotoGeneration = function (generation) {
        var failSafe = 100;
        while (this.generation <= generation && failSafe-- > 0) {
            this.nextGeneration();
        }
        if (failSafe <= 0)
            console.warn('Goto generation endless loop detected. Escaped from the loop, please check any present error message(s).');
    };
    // Go back to generation 0.
    LSystem.prototype.reset = function () {
        this.current = this.axiom;
        this.generation = 0;
    };
    // Create a new LSystem.
    LSystem.new = function (alphabet, axiom, rules) {
        var ruleSets = new Array();
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            ruleSets.push(rule.indexOf(',') > -1
                ? StochasticRuleset.parse(rule)
                : Ruleset.parse(rule));
        }
        return new LSystem(alphabet, axiom, ruleSets);
    };
    return LSystem;
}());
// A ruleset specifies how a character should be rewritten. 
// Example:  let rule1 = Ruleset.parse("A=ABA"), which will
// create a rulesets that rewrites A as ABA.
var Ruleset = /** @class */ (function () {
    function Ruleset(symbol, rewriteAs) {
        this.symbol = symbol;
        this.rewriteAs = rewriteAs;
    }
    Ruleset.prototype.rewrite = function () {
        return this.rewriteAs;
    };
    Ruleset.parse = function (rule) {
        var _a = rule.split('='), s = _a[0], r = _a[1];
        return new Ruleset(s, r);
    };
    return Ruleset;
}());
// A stochastic ruleset has multiple ways to rewrite the character. This is 
// based on a uniform probability.
// Example: let sRule = StochasticRuleset.parse("A=ABA,BAB"), which will
// create a stochastic ruleset where the character will be randomly rewritten as
// either ABA or BAB.
var StochasticRuleset = /** @class */ (function (_super) {
    __extends(StochasticRuleset, _super);
    function StochasticRuleset(symbol, stochasticRules) {
        var _this = _super.call(this, symbol, undefined) || this;
        _this.symbol = symbol;
        _this.stochasticRules = stochasticRules;
        // Used for pseudo-randomness. Always starting with the same seed, will
        // result in the same 'random' result.
        _this.seed = 0;
        return _this;
    }
    StochasticRuleset.prototype.rewrite = function () {
        return this.stochasticRules[Math.floor(this.random() * this.stochasticRules.length)];
    };
    StochasticRuleset.parse = function (rule) {
        var _a = rule.split('='), s = _a[0], r = _a[1];
        var sr = r.split(',');
        return new StochasticRuleset(s, sr);
    };
    StochasticRuleset.prototype.random = function () {
        var x = Math.sin(this.seed++ * 4871452.47) * 87175.89;
        return x - Math.floor(x);
    };
    StochasticRuleset.prototype.setSeed = function (x) {
        this.seed = x;
    };
    StochasticRuleset.prototype.getSeed = function () {
        return this.seed;
    };
    return StochasticRuleset;
}(Ruleset));
//# sourceMappingURL=lsystem.js.map