using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class Algorithms {

	public static float[,] NewMap(int width, int height)
    {
        return new float[width, height];
    }

    public static float[,] ApplyPerlin(float[,] map, float scale, float cutOff)
    {
        Vector2 randomDisplacement = Random.insideUnitCircle * scale * map.GetLength(0) * map.GetLength(1);
        for (int y = 0; y < map.GetLength(1); y++)
            for (int x = 0; x < map.GetLength(0); x++)
                map[x, y] = Mathf.Clamp01(Mathf.PerlinNoise((x + randomDisplacement.x) / scale, (y + randomDisplacement.y) / scale) - cutOff);

        return map;
    }

    public static float[,] ApplyStochast(float[,] map)
    {
        for (int y = 0; y < map.GetLength(1); y++)
            for (int x = 0; x < map.GetLength(0); x++)
                map[x, y] = Random.value < map[x, y] ? 1f : 0f;

        return map;
    }

    private static float SumNeighbours(float[,] map, int x, int y)
    {
        var sum = 0f;

        if (x > 0 && y > 0) sum += map[x - 1, y - 1];                                          
        if (y > 0) sum += map[x, y - 1];                                             
        if (y > 0 && x < map.GetLength(0)-1) sum += map[x + 1, y - 1];    
        if (x < map.GetLength(0)-1) sum += map[x + 1, y];                 
        if (x < map.GetLength(0)-1 && y < map.GetLength(1)-1) sum += map[x + 1, y + 1];
        if (y < map.GetLength(1)-1) sum += map[x, y + 1];
        if (x > 0 && y < map.GetLength(1)-1) sum += map[x - 1, y + 1];
        if (x > 0) sum += map[x - 1, y];
        sum += map[x, y];

        return sum;
    }

    public static float[,] ApplyGeneration(float[,] map, float neighboursThreshold, bool continuous = false)
    {
        var nextGeneration = new float[map.GetLength(0), map.GetLength(1)];

        for (int y = 0; y < map.GetLength(1); y++)
            for (int x = 0; x < map.GetLength(0); x++)
            {
                var sumNeighbours = SumNeighbours(map, x, y);

                var alive = 1f;
                if (continuous) alive = sumNeighbours / 9f;

                nextGeneration[x, y] = sumNeighbours > neighboursThreshold ? alive : 0f;
            }
                

        return nextGeneration;
    }

    public static float[,] ApplyGenerations(float[,] map, float neighboursThreshold, int generations, bool continuous = false)
    {
        float[,] currentGeneration = map;

        for(int i=0; i < generations; i++)
            currentGeneration = ApplyGeneration(currentGeneration, neighboursThreshold, continuous);

        return currentGeneration;
    }

    public static float [,] CombineMaps(float[,] mapA, float[,] mapB)
    {
        float[,] combinedMap = new float[mapA.GetLength(0), mapA.GetLength(1)];

        for (int y = 0; y < combinedMap.GetLength(1); y++)
            for (int x = 0; x < combinedMap.GetLength(0); x++)
                combinedMap[x, y] = Mathf.Clamp01(mapA[x, y] + mapB[x, y]);

        return combinedMap;
    }

    public static float[,] CutOff(float[,] map, float threshold)
    {
        float[,] cuttedMap = new float[map.GetLength(0), map.GetLength(1)];

        for (int y = 0; y < cuttedMap.GetLength(1); y++)
            for (int x = 0; x < cuttedMap.GetLength(0); x++)
                cuttedMap[x, y] = map[x, y] > threshold ? 1f : 0f;

        return cuttedMap;
    }

}
