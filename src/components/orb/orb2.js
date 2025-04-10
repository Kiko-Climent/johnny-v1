import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useEffect, useRef } from 'react';

const Orb2 = ({
  totalItems = 32,
  baseWidth = 1.2,
  baseHeight = 0.75,
  sphereRadius = 6,
  backgroundColor = '000000',
}) => {
  const orbRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(parseInt(backgroundColor, 16));
    renderer.setPixelRatio(window.devicePixelRatio);
    orbRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 1;
    controls.minDistance = 5;
    controls.maxDistance = 15;
    controls.enableZoom = true;
    controls.enablePan = false;

    const imagePool = Array.from({ length: 22 }, (_, i) => `image${i + 1}.webp`);

    const getRandomImagePath = () => {
      const index = Math.floor(Math.random() * imagePool.length);
      return `/assets/${imagePool[index]}`;
    };

    const textureLoader = new THREE.TextureLoader();

    const createImagePlane = (texture) => {
      const aspectRatio = texture.image.width / texture.image.height;
      const height = baseHeight;
      const width = height * aspectRatio;
      const geometry = new THREE.PlaneGeometry(width, height);
      const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      return new THREE.Mesh(geometry, material);
    };

    const loadImageMesh = (phi, theta) => {
      textureLoader.load(getRandomImagePath(), (texture) => {
        const mesh = createImagePlane(texture);

        // Coordenadas esféricas → cartesianas
        mesh.position.x = sphereRadius * Math.sin(phi) * Math.cos(theta);
        mesh.position.y = sphereRadius * Math.cos(phi);
        mesh.position.z = sphereRadius * Math.sin(phi) * Math.sin(theta);

        mesh.lookAt(0, 0, 0);
        mesh.rotateY(Math.PI);

        scene.add(mesh);
      });
    };

    const createSphere = () => {
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < totalItems; i++) {
        const y = 1 - (i / (totalItems - 1)) * 2; // -1 to 1
        const radius = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;

        const phi = Math.acos(y); // 0 to PI
        loadImageMesh(phi, theta);
      }
    };

    createSphere();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      const scale = Math.min(1.8, Math.max(0.6, 10 / camera.position.z));
      scene.children.forEach(child => {
        if (child.isMesh) {
          child.scale.set(scale, scale, 1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      orbRef.current.removeChild(renderer.domElement);
    };
  }, [totalItems, baseWidth, baseHeight, sphereRadius, backgroundColor]);

  return <div ref={orbRef} className="w-full h-screen" />;
};

export default Orb2;
