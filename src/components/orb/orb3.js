"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const Orb = ({
  totalImages = 22,
  totalItems = 84,
  baseWidth = 1.7,
  baseHeight = 1.1,
  sphereRadius = 4.6,
  backgroundColor = "FFFFFF"
}) => {

  const orbRef = useRef()

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(parseInt(backgroundColor, 16));
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.linearEncoding;
    renderer.gammaFactor = 2.2;

    orbRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 1.2
    controls.minDistance = 6
    controls.maxDistance = 10
    controls.enableZoom = true
    controls.enablePan = false

    const textureLoader = new THREE.TextureLoader()
    let loadedCount = 0

    const imagePool = [
      // "image1.webp",
      // "image2.webp",
      "image3.webp",
      "image4.webp",
      "image5.webp",
      "image6.webp",
      "image7.webp",
      "image8.webp",
      "image9.webp",
      // "image10.jpeg",
      "image11.jpeg",
      "image12.jpeg",
      "image13.jpeg",
      "image14.jpeg",
      // "image15.jpeg",
      "image16.jpeg",
      "image17.jpeg",
      "image18.jpeg",
      // "image19.jpeg",
      // "image21.jpeg",
      "image22.jpeg",
      "image26.jpeg",
      "image28.jpeg",
      "image29.jpeg",
      "image30.jpeg",
      "image35.jpeg",
      "image27.jpeg",
    ];
    
    const getRandomImagePath = () => {
      const index = Math.floor(Math.random() * imagePool.length);
      const selectedImage = `/assets/orb/${imagePool[index]}`;
      console.log("➡️ Imagen seleccionada para cargar:", selectedImage); // ✅ Aquí
      return selectedImage;
    };
    
    

    const createImagePlane = (texture) => {
      const imageAspect = texture.image.width / texture.image.height;
      let width = baseWidth;
      let height = baseHeight;

      if (imageAspect > 1) {
        height = width / imageAspect;
      } else {
        width = height * imageAspect;
      }

      return new THREE.PlaneGeometry(width, height);
    };

    const loadImageMesh = (phi, theta) => {
      console.log(getRandomImagePath());
      textureLoader.load(getRandomImagePath(), (texture) => {
        texture.generateMipmaps = false
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.encoding = THREE.linearEncoding

        const geometry = createImagePlane(texture)
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: false,
          depthWrite: true,
          depthTest: true
        });
        
        const mesh = new THREE.Mesh(geometry, material)

        mesh.position.x = sphereRadius * Math.cos(theta) * Math.sin(phi);
        mesh.position.y = sphereRadius * Math.sin(theta) * Math.sin(phi);
        mesh.position.z = sphereRadius * Math.cos(phi);

        mesh.lookAt(0, 0, 0);
        mesh.rotateY(Math.PI);

        scene.add(mesh);

        loadedCount++;
        if (loadedCount === totalItems) {
          animate()
        }
      },
      undefined, 
      (error) => console.error(error)
    );
    }

    const createSphere = () => {
      for (let i = 0; i < totalItems; i++) {
        const phi = Math.acos(-1 + (2 * i) / totalItems);
        const theta = Math.sqrt(totalItems * Math.PI) * phi;
        loadImageMesh(phi, theta)
      }
    }

    camera.position.z = 10

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera)
    };

    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    createSphere()

    return () => {
      if (orbRef.current && renderer?.domElement && orbRef.current.contains(renderer.domElement)) {
        orbRef.current.removeChild(renderer.domElement);
      }
    }
  }, [
    totalImages,
    totalItems,
    baseWidth,
    baseHeight,
    sphereRadius,
    backgroundColor
  ])

  return(
    <div className="orb-container" style={{ position: 'relative' }}>
      <div className="orb" ref={orbRef}></div>
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        whitespace: 'nowrap',
        textTransform: 'uppercase',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '1.3rem',
        color: 'black',
        pointerEvents: 'none'
      }}>
        analog photography
      </div>
    </div>
  )
}

export default Orb;