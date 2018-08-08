/* 
    @author: Lars Rotgers, larsrotgers@gmail.com, 8-Aug-'18.

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

class LSystem {

    public current: string = '';
    public generation: number = 0;

    constructor(public readonly alphabet: string, 
                public readonly axiom: string, 
                public readonly rules: Ruleset[]) 
    { 
        this.current = axiom;
    }

    // Get the state for the next generation by applying the rulesets to the current state.
    public nextGeneration(): void {

        let stringBuffer: string = '';

        for(let char of this.current.split('')) {

            // Make sure that the character is actually allowed.
            if(this.alphabet.indexOf(char) == -1) {
                console.error("Character '" + char + "' is not part of the L-systems alphabet.");
                return;
            }

            let rewritten = false;

            // Find the rule for this character and rewrite it.
            for(let rule of this.rules) {
                if(rule.symbol == char) {
                    stringBuffer += rule.rewrite()
                    rewritten = true;
                    break;
                }
            }

            // If for some reason we didn't rewrite it, just append it
            // to the end of the string.
            if(!rewritten) {
                stringBuffer += char;
            }

        }

        this.generation++;
        this.current = stringBuffer;
    }

    // Quickly go to any generation.
    public gotoGeneration(generation: number): void {

        let failSafe = 100;
        while(this.generation <= generation && failSafe-- > 0) {
            this.nextGeneration();
        }

        if(failSafe <= 0) 
            console.warn('Goto generation endless loop detected. Escaped from the loop, please check any present error message(s).');
    }

    // Go back to generation 0.
    public reset(): void {

        this.current = this.axiom;
        this.generation = 0;
    }

    // Create a new LSystem.
    public static new(alphabet: string, axiom: string, rules: string[]): LSystem {

        let ruleSets: Ruleset[] = new Array<Ruleset>();

        for(let rule of rules) {

            ruleSets.push(  rule.indexOf(',') > -1 
                ? StochasticRuleset.parse(rule)
                : Ruleset.parse(rule) 
            )
        }
        
        return new LSystem(alphabet, axiom, ruleSets);
    }

}

// A ruleset specified how a character should be rewritten. 
// Example:  let rule1 = Ruleset.parse("A=ABA"), which will
// create a rulesets that rewrites A as ABA.
class Ruleset {

    constructor(public symbol: string, public rewriteAs: string) { }

    public rewrite(): string {
        return this.rewriteAs;
    }

    public static parse(rule: string): Ruleset {

        let [s, r] = rule.split('=');
        return new Ruleset(s, r);
    }

}

// A stochastig ruleset has multiple ways to rewrite the character. This is 
// based on a uniform probability.
// Example: let sRule = StochasticRuleset.parse("A=ABA,BAB"), which will
// create a stochastic ruleset where the character will be randomly rewritten as
// either ABA or BAB.
class StochasticRuleset extends Ruleset {

    constructor(public symbol: string, public stochasticRules: string[]) {
        super(symbol, undefined);
    }

    public rewrite(): string {
        return this.stochasticRules[Math.floor(this.random() * this.stochasticRules.length)];
    }

    public static parse(rule: string): StochasticRuleset {
        let [s, r] = rule.split('=');
        let sr = r.split(',');
        return new StochasticRuleset(s, sr);
    }

    // Used for pseudo-randomness. Always starting with the same seed, will
    // result in the same 'random' result.
    private seed: number = 0;

    private random() {
        let x = Math.sin(this.seed++ * 4871452.47) * 87175.89;
        return x - Math.floor(x);
    }

    public setSeed(x: number) {
        this.seed = x;
    }

    public getSeed(): number {
        return this.seed;
    }

}