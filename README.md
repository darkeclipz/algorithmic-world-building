# Algorithmic world building

This repository contains various proof-of-concepts for different types of algorithms that are useful for world building.

## Pseudo random number generator

We want a seed based pseudo random number generator. The main reason for this is, we want predictive random numbers e.g.: if we start at a given seed, it should always generate the same sequence of random numbers. This property can be used to regenerate the same entity. 

For example, when a map is generated we only save the seed that is used to generate that map. Next, when we restart the algorithm with that seed, we will get the same result. This allows us to discard any generated data, and reconstruct it when it is required.

**Implementation**

A JavaScript implementation for the generator is:

```javascript
let seed = 0;
let random = function() {
    let x = Math.sin(seed++ * 4871452.47) * 87175.89;
    return x - Math.floor(x);
};
```

Because this is a simple generator, **do not use this for _cryptographic_ purposes**!!

## Game of Life

Game of life is a cellular automation algorithm developed by John Conway. Normally the algorithm implements a rule where cells can die if there are too many cells around it. If we ignore this rule, the result is an algorithm that will grow/expand. 

![Game of life](screenshots/game-of-life-1.png)

**Why this works**

The cool thing about this algorithm is that it will cluster cells on each generation. If there are lonely cells, they will die because there are not enough cells around. Because of this property the algorithm will generate a maze/cave like structure.

**Smoothing**

It is also possible to smooth a pixel space with this. At any given generation, we generate a new generation where the number of alive cells required is 2. This will grow the structure that is in the pixel space. After that we want to cut it, by setting the number of alive cells to 7. We then run another generation, which will cut off a portion of the structure. The result acts like a smoothing effect, and the smoothing can be done in multiple successions to create a smoother structure.

## Voronoi

In mathematics, a Voronoi diagram is a partitioning of a plane into regions based on distance to points in a specific subset of the plane. That set of points (called seeds, sites, or generators) is specified beforehand, and for each seed there is a corresponding region consisting of all points closer to that seed than to any other. These regions are called Voronoi cells. [[Wikipedia](https://en.wikipedia.org/wiki/Voronoi_diagram)] An [article from 
Nick Berry](https://datagenetics.com/blog/may12017/index.html) explains it really well.

This is particularly easy to run in parallel on a GPU. Generate a set of random points, and find the point that has the smallest distance from the pixel to the point. To display it, give each point a specific color to display at that pixel.

![Voronoi](screenshots/voronoi-1.png)

The [implementation of the algorithm](https://www.shadertoy.com/view/Xlccz2) can be viewed live at ShaderToy. There is also a [smooth colored version](https://www.shadertoy.com/view/ltcyRj).

![Voronoi smooth](screenshots/voronoi-2.png)

Besides pretty images, Nick Berry explains a few very cool use cases:

> If your job was to build a nuclear waste storage depot and a crieterion was that it had to be as far away as possible from any city, you can see how it must be located on a Voronoi edge. Maybe you have to fly your spy plane across a country and want to select a path that is the furthest distance away from every radar station to minimize the chance that you are detected. A maximally clear path will follow the lines edges of a Voronoi tessellation. Do you need to traverse a battlefield keeping a maximal distance for a group of snipers?
