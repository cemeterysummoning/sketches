import * as THREE from './../node_modules/three/build/three.module.js'
import { ParametricGeometries } from './../node_modules/three/examples/jsm/geometries/ParametricGeometries.js';
import { ParametricGeometry } from '../node_modules/three/examples/jsm/geometries/ParametricGeometry.js'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js'

let camera, scene, renderer;

init();
animate();

function init() {

    const container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.y = 400;

    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );

    const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );
    scene.add( camera );

    const map = new THREE.TextureLoader().load( 'morbius.jpg' );
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;

    const material = new THREE.MeshPhongMaterial( { map: map, side: THREE.DoubleSide } );

    let geometry, object;

    geometry = new ParametricGeometry( ParametricGeometries.mobius, 20, 20 );
    object = new THREE.Mesh( geometry, material );
    object.position.set( 0, 0, 200 );
    object.scale.multiplyScalar( 50 );
    scene.add( object );
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    let controls = new OrbitControls( camera, renderer.domElement );
    controls.listenToKeyEvents(window);

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    const timer = Date.now() * 0.0001;

    camera.position.x = Math.cos( timer ) * 800;
    camera.position.z = Math.sin( timer ) * 800;

    camera.lookAt( scene.position );

    scene.traverse( function ( object ) {

        if ( object.isMesh === true ) {

            object.rotation.x = timer * 5;
            object.rotation.y = timer * 2.5;

        }

    } );

    renderer.render( scene, camera );

}
    