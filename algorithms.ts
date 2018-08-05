
interface Neighbours {
    top: boolean;
    topright: boolean;
    right: boolean;
    bottomright: boolean;
    bottom: boolean;
    bottomleft: boolean;
    left: boolean;
    topleft: boolean;
    center: boolean;
}

export class Tilemap<T> {

    private tilemap: T[];

    constructor(public width: number, public height: number) {
        this.clear();
    }

    public clear() {
        this.tilemap = new Array<T>(this.width * this.height);
    }

    private index(x: number, y: number) {
        return y * this.width + x;
    }

    public get(x: number, y: number) {
        return this.tilemap[this.index(x, y)];
    }

    public set(x: number, y: number, value: T) {
        this.tilemap[this.index(x, y)] = value;
    }

}

export class Algorithms {

    public setSeed(seed: number) {
        this.seed = seed;
    }

    private seed = 0;

    public random(): number {
        return 0;
    }

    public getNeighbours(t: Tilemap<boolean>, x: number, y: number): Neighbours {
        
        return { 
            top: y > 0 && t.get(x, y-1),
            topright: x < t.width && y > 0 && t.get(x+1, y-1),
            right: x < t.width && t.get(x+1, y),
            bottomright: false,
            bottom: false,
            bottomleft: false,
            left: false,
            topleft: false,
            center: false
        };

    }


    public sumNeighbours(t: Tilemap<boolean>, x: number, y: number): number {
        let n = this.getNeighbours(t, x, y);
        let sum = 0;
        if(n.bottom)        sum++; if(n.bottomleft)    sum++; if(n.bottomright)   sum++;
        if(n.top)           sum++; if(n.topleft)       sum++; if(n.topright)      sum++;
        if(n.right)         sum++; if(n.left)          sum++; if(n.center)        sum++;
        return sum;
    }

    public applyGameOfLife(t: Tilemap<boolean>, neighboursAlive: number, suffocation: boolean = false, neighboursSuffocate: number = 5): Tilemap<boolean> {

        return t;

    }

    public applyRandom(t: Tilemap<boolean>, probability: number): Tilemap<boolean> {

        for(let y=0; y < t.height; y++) {
            for(let x=0; x < t.width; x++) {
                t.set(x, y, this.random() <= probability);
            }
        }
        return t;

    }

    public static sumFloodFillArea(t: Tilemap<boolean>, x: number, y: number): number {

        return 0;

    }
}