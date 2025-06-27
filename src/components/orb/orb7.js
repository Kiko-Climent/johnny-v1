"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Orb7 = ({
  totalImages = 28,
  totalItems = 64,
  baseWidth = 1.7,
  baseHeight = 1.1,
  sphereRadius = 4.6,
  backgroundColor = "FFFFFF"
}) => {
  const orbRef = useRef();
  const imageUsageCount = {};
  const imagePositions = {};

  useEffect(() => {
    // Ajustamos totalItems según el dispositivo
    const isMobile = window.innerWidth <= 768;
    const adjustedTotalItems = isMobile ? 56 : totalItems;

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
      // powerPreference: "high-performance"
      powerPreference:"default"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(parseInt(backgroundColor, 16));
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.linearEncoding;
    renderer.gammaFactor = 2.2;

    orbRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 1.2;
    controls.minDistance = 6;
    controls.maxDistance = 10;
    controls.enableZoom = true;
    controls.enablePan = false;

    const textureLoader = new THREE.TextureLoader();
    let loadedCount = 0;

    const imagePool = [
      "image3.webp", "image5.webp", "image7.webp", "image8.webp", "image12.webp", "image13.webp", "image1.webp",
      "image17.webp", "image20.webp", "image22.webp", "image26.webp", "image27.webp", "image9.webp", "image19.webp",
      "image28.webp", "image29.webp", "image30.webp", "image33.webp", "image36.webp", "image40.webp", "image2.webp",
      "image41.webp", "image42.webp", "image10.webp", "image25.webp", "image39.webp", "image4.webp", "image38.webp"
    ];

    const getValidImage = (phi, theta) => {
      const MAX_ATTEMPTS = 15;
      const MIN_ANGULAR_DISTANCE = 0.7;

      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const index = Math.floor(Math.random() * imagePool.length);
        const name = imagePool[index];
        const previousPositions = imagePositions[name] || [];
        const usage = imageUsageCount[name] || 0;

        const tooClose = previousPositions.some((pos) => {
          const dPhi = phi - pos.phi;
          const dTheta = theta - pos.theta;
          const dist = Math.sqrt(dPhi * dPhi + dTheta * dTheta);
          return dist < MIN_ANGULAR_DISTANCE;
        });

        if (!tooClose && usage < 3) {
          return { name, path: `/assets/orb/${name}` };
        }
      }

      const fallbackIndex = Math.floor(Math.random() * imagePool.length);
      const fallbackName = imagePool[fallbackIndex];
      return { name: fallbackName, path: `/assets/orb/${fallbackName}` };
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
      const pos = new THREE.Vector3(
        sphereRadius * Math.cos(theta) * Math.sin(phi),
        sphereRadius * Math.sin(theta) * Math.sin(phi),
        sphereRadius * Math.cos(phi)
      );

      const { name, path } = getValidImage(phi, theta);
      imageUsageCount[name] = (imageUsageCount[name] || 0) + 1;
      const usage = imageUsageCount[name];

      textureLoader.load(
        path,
        (texture) => {
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.encoding = THREE.linearEncoding;

          // Aplica solo el filtro mix-blend (inverso) para segunda aparición
          if (usage === 2) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = texture.image.width;
            canvas.height = texture.image.height;
            ctx.drawImage(texture.image, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
              data[i] = 255 - data[i];         // R
              data[i + 1] = 255 - data[i + 1]; // G
              data[i + 2] = 255 - data[i + 2]; // B
            }
            ctx.putImageData(imageData, 0, 0);
            texture = new THREE.CanvasTexture(canvas);
          }

          const geometry = createImagePlane(texture);
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: false,
            depthWrite: true,
            depthTest: true
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.copy(pos);
          mesh.lookAt(0, 0, 0);
          mesh.rotateY(Math.PI);
          scene.add(mesh);

          if (!imagePositions[name]) imagePositions[name] = [];
          imagePositions[name].push({ phi, theta });

          loadedCount++;
          if (loadedCount === adjustedTotalItems) animate();
        },
        undefined,
        (error) => console.error(error)
      );
    };

    const createSphere = () => {
      for (let i = 0; i < adjustedTotalItems; i++) {
        const phi = Math.acos(-1 + (2 * i) / adjustedTotalItems);
        const theta = Math.sqrt(adjustedTotalItems * Math.PI) * phi;
        loadImageMesh(phi, theta);
      }
    };

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    createSphere();

    return () => {
      if (
        orbRef.current &&
        renderer?.domElement &&
        orbRef.current.contains(renderer.domElement)
      ) {
        orbRef.current.removeChild(renderer.domElement);
      }
    };
  }, [totalImages, totalItems, baseWidth, baseHeight, sphereRadius, backgroundColor]);

  return (
    <div className="orb-container" style={{ position: "relative" }}>
      <div className="orb" ref={orbRef}></div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          whitespace: "nowrap",
          textTransform: "uppercase",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1.3rem",
          color: "black",
          pointerEvents: "none"
        }}
      >
        analog photography
      </div>
    </div>
  );
};

export default Orb7;
