// Author: Dalton Patterson
var gl;
var points;
var bufferId;
var vPosition;
var program;
var canvas;
var keyleft, keyright, keyup, keydown;
window.onload = function init()
{
canvas = document.getElementById( "gl-canvas" );


gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" ); }

	points = new Float32Array([.1,.1, 
				-.1,.1, 
				.1,-.1, 
				-.1,-.1]);

//
// Configure WebGL
//
gl.viewport( 0, 0, canvas.width, canvas.height );
gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
// Load shaders and initialize attribute buffers
program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );
bufferId = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	
gl.bufferData( gl.ARRAY_BUFFER,points, gl.STATIC_DRAW );
vPosition = gl.getAttribLocation( program, "vPosition" );
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition );
// Load the data into the GPU
// Associate our shader variables with our data buffer
render();
update();
};

function update() {
	if(keyright){
		if(points[0] < 1){
			for(var i = 0; i < points.length; i +=2){
				points[i] += .02;
			}
		}
	}
	if(keyup){
		if(points[1] < 1){
			for(var i = 1; i < points.length; i +=2){
				points[i] += .02;
			}
		}
	}
	if(keydown){
		if(points[5] > -1){
			for(var i = 1; i < points.length; i +=2){
				points[i]-= .02;
			}
		}
	}
	
	if(keyleft){
		if(points[2] > -1){
			for(var i = 0; i < points.length; i +=2){
				points[i] -= .02;
			}
		}
	}
//	requestAnimFrame(update);
}

function render() {
	update();
gl.clear( gl.COLOR_BUFFER_BIT );
gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
gl.bufferData( gl.ARRAY_BUFFER,points, gl.STATIC_DRAW );
vPosition = gl.getAttribLocation( program, "vPosition" );
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition );
gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    requestAnimFrame( render );
}
				$(document).keydown(function(e) {
					if(e.which == 68){
						keyright = true;
					}
					
					else if(e.which == 87){
						keyup = true;
					}
					
					else if(e.which == 83){
						keydown = true;
					}
					
					else if(e.which == 65){
						keyleft = true;
					}
					console.log(e.which);
				});

				$(document).keyup(function(e) {
					if(e.which == 68){
						keyright = false;
					}
					if(e.which == 87){
						keyup = false;
					}
					if(e.which == 83){
						keydown = false;
					}
					if(e.which == 65){
						keyleft = false;
					}
				});