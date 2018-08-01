# Algorithmic world building

This repository contains various proof-of-concepts for different types of algorithms that are useful for world building.

## Pseudo random number generator

We want a seed based pseudo random number generator. The main reason for this is, we want predictive random numbers e.g.: if we start at a given seed, it should always generate the same sequence of random numbers. This property can be used to regenerate the same entity. 

For example, when a map is generated we only save the seed that is used to generate that map. Next, when we restart the algorithm with that seed, we will get the same result. This allows us to discard any generated data, and reconstruct it when it is required.

## Game of Life

Game of life is a cellular automation algorithm developed by John Conway. Normally the algorithm implements a rule where cells can die if there are too many cells around it. If we ignore this rule, the result is an algorithm that will grow/expand. 

**Why this works**

The cool thing about this algorithm is that it will cluster cells on each generation. If there are lonely cells, they will die because there are not enough cells around. Because of this property the algorithm will generate a maze/cave like structure.

**Smoothing**

It is also possible to smooth a pixel space with this. At any given generation, we generate a new generation where the number of alive cells required is 2. This will grow the structure that is in the pixel space. After that we want to cut it, by setting the number of alive cells to 7. We then run another generation, which will cut off a portion of the structure. The result yields in a smoothing effect, and the smoothing can be run in multiple successions to create smoother structures.

## Voronoi

Tbd
