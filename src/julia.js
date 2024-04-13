import * as THREE from 'three';
import vertex from './shaders/vertex';
import fragment from './shaders/fragment';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const camera = new THREE.PerspectiveCamera( 90, 1/1 );
camera.position.set( 0, 0, screenWidth / 2);
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();

const material = new THREE.ShaderMaterial({
  uniforms: {
    sWidth: {
      value: screenWidth,
    },
    sHeight: {
      value: screenHeight,
    },
    u_mouse: {
      value: new THREE.Vector2(0, 0)
    },
    zoom: {
      value: 2.4
    },
    pad: {
      value: new THREE.Vector2(0, 0)
    }
  },
  vertexShader: vertex,
  fragmentShader: fragment
})



const geometry = new THREE.PlaneGeometry(screenWidth, screenWidth, 1);

const plane = new THREE.Mesh( geometry, material );

scene.add( plane );

// document.addEventListener('mousemove', (event) => {
//   material.uniforms.u_mouse.value.x = ( event.clientX / screenWidth ) * 2 - 1;
//   material.uniforms.u_mouse.value.y = - ( event.clientY / screenHeight ) * 2 + 1;
// })

document.addEventListener('wheel', (event) => {
  material.uniforms.zoom.value += event.deltaY * 0.00001;
})

function animate() {
  renderer.render( scene, camera );

  requestAnimationFrame( animate );
}

animate();
