using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MapGeneratorAnimator : MonoBehaviour {

    MapGenerator mapGenerator;
    public float updateIntervalSeconds = 0.1f;
    public float updateSpeed = 0.1f;

    private float interval = 0f;

	// Use this for initialization
	void Start () {
        mapGenerator = FindObjectOfType<MapGenerator>();
        mapGenerator.GenerateMap();
        interval = updateIntervalSeconds;
	}
	
	// Update is called once per frame
	void FixedUpdate()
    {
        if (interval <= 0f)
        {
            interval = updateIntervalSeconds;
            mapGenerator.offset.x += updateSpeed;
            mapGenerator.GenerateMap();
        }
        else
        {
            interval -= Time.fixedDeltaTime;
        }
    }
}
