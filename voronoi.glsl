float seed = 0.0;
float random() {
	return fract( sin( seed++ * 4871452.47 ) * 87175.89 );
}

#define N 64
#define t iTime

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Rescale.
    vec2 R = iResolution.xy;
    vec2 uv = (2.*fragCoord-R)/R.y;
    vec2 M = (2.*iMouse.xy-R)/R.y;
    
    // Colors.
    vec3 col = vec3(0);
    vec3 colP = vec3(0);
    
    // Location of each points (x, y)
    vec2 points[N];
    
    // Distance from uv to point N.
    float pDistances[N];
    
    // Distance to the closest point from uv.
    float minDist = 0.0;
    
    // Index of the closest point.
	int minN = 0;
    
    for(int i=0; i < N; i++) {
                
        // Create a random point.
        points[i] = 2. * vec2(random(), random()) - 1.;
        
        // Override this with two circling points.
        if(i == N-1) points[i] = .8*vec2(cos(t/4.), sin(t/4.));
        if(i == N-2) points[i] = .4*vec2(cos(-t/2.), sin(-t/2.));
        
        // Distance from uv to the created point.
        float d = distance(points[i], uv);
        
        // if min dist = 0, this is the first point, so we use that.
        if(minDist == 0.0) minDist = d;
        
        // Save the closest point.
        minDist = min(minDist, d);
        
        // Store the index.
        if(minDist == d) minN = i;   
        
        // Used to display the point on the screen.
        if( distance(uv, points[i]) < 0.01 ) col = vec3(1);   
        
    }
    
    // Get a normalized index for each cell.
    float normN = float(minN)/float(N);
    
    // Get a color for the cell.
    col = 0.5 + 0.5*cos( 3.*normN + vec3(0,2,4) + t );
    
    // Render points.
    for(int i=0; i < N && fract(t/8.) < .5; i++) {
    	if( distance(uv, points[i]) < 0.01 ) col = vec3(1); 
	}

    
    // Set the color, but if the cell is the mouse, it should
    // be black.
    fragColor = vec4(col,1.0);
}