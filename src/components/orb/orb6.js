"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Orb6 = ({
  totalImages = 28,
  totalItems = 72,
  baseWidth = 1.7,
  baseHeight = 1.1,
  sphereRadius = 4.6,
  backgroundColor = "FFFFFF"
}) => {
  const orbRef = useRef();
  const imageUsageCount = {};
  const imagePositions = {};

  const isTooCloseToOthers = (phi, theta, positions, threshold = 0.7) => {
    return positions.some((pos) => {
      const dPhi = phi - pos.phi;
      const dTheta = theta - pos.theta;
      const dist = Math.sqrt(dPhi * dPhi + dTheta * dTheta);
      return dist < threshold;
    });
  };

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
      "image3.jpeg","image5.jpeg","image7.jpeg","image8.jpeg","image12.jpeg","image13.jpeg",
      "image17.jpeg","image19.jpeg","image20.jpeg","image22.jpeg","image26.jpeg","image27.jpeg",
      "image28.jpeg","image29.jpeg","image30.jpeg","image33.jpeg","image36.jpeg","image40.jpeg",
      "image41.jpeg","image42.jpeg","image10.jpeg","image25.jpeg","image39.jpeg","image4.jpeg",
      "image9.jpeg","image1.jpeg","image2.jpeg","image38.jpeg"
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
    
        const isAllowedThirdUsage = usage < 3 && (usage < 2 || imagePool.slice(0, 18).includes(name));
    
        if (!tooClose && isAllowedThirdUsage) {
          return { name, path: `/assets/orb/${name}` };
        }
      }
    
      // Fallback
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

          if (usage === 2) {
            // Filtro tipo mix-blend-difference (ya implementado)
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
          } else if (usage === 3 && imagePool.slice(0, 18).includes(name)) {
            // Filtro psicodélico
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = texture.image.width;
            canvas.height = texture.image.height;
            ctx.drawImage(texture.image, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
              // Canal R lo dejamos, canal G lo desplazamos, canal B lo posterizamos
              data[i + 1] = data[i];                  // G toma valor de R
              data[i + 2] = Math.floor(data[i + 2] / 64) * 64; // posterizar B
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
          if (loadedCount === totalItems) animate();
        },
        undefined,
        (error) => console.error(error)
      );
    };

    const createSphere = () => {
      for (let i = 0; i < totalItems; i++) {
        const phi = Math.acos(-1 + (2 * i) / totalItems);
        const theta = Math.sqrt(totalItems * Math.PI) * phi;
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

export default Orb6;