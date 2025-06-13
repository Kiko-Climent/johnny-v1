"use client";

// con zoom dinamico

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import items from "./items"
import styles from "@/components/index/style.module.css"


let SplitType;

export default function CanvasGallery3() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const projectTitleRef = useRef(null);
  const projectTextRef = useRef(null);
  const expandedItemRef = useRef(null);
  const [zoomedIn, setZoomedIn] = useState(false);


  const [initialized, setInitialized] = useState(false);

  function loadImageWithFallback(basePath, itemNum, callback) {
    const img = new Image();
    const webpSrc = `${basePath}/image${itemNum}.webp`;
    const jpegSrc = `${basePath}/image${itemNum}.jpeg`;
  
    img.src = webpSrc;
  
    img.onload = () => {
      callback(webpSrc);
    };
  
    img.onerror = () => {
      // Si falla el .webp, probamos con .jpeg
      img.src = jpegSrc;
      img.onload = () => {
        callback(jpegSrc);
      };
      img.onerror = () => {
        console.error(`Image not found: image${itemNum}.webp or .jpeg`);
      };
    };
  }

  useEffect(() => {
    const importSplitType = async () => {
      const SplitTypeModule = await import("split-type");
      SplitType = SplitTypeModule.default;
  
      initializeGallery();
      setInitialized(true);
    };
  
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "0.9, 0, 0.1, 1");
  
    // MOVER .projectTitle AL BODY
    const el = projectTitleRef.current;
    if (el && el.parentNode !== document.body) {
      document.body.appendChild(el);
    }
  
    importSplitType();
    const canvas = canvasRef.current;
    if (canvas) {
      // 👇 Empezamos "lejos"
      gsap.set(canvas, {
        scale: 0.6,
        z: -500, // simulamos que está "atrás" en un plano 3D
      });
    }
  
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousedown", handleMouseDown);
        containerRef.current.removeEventListener("touchstart", handleTouchStart);
      }
  
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleInitialZoom);
  
      if (stateRef.current.animationFrameId) {
        cancelAnimationFrame(stateRef.current.animationFrameId);
      }
  
      // DEVOLVER .projectTitle SI HACE FALTA
      if (el && containerRef.current?.contains(el) === false) {
        containerRef.current?.appendChild(el);
      }
    };
  }, []);
  

  const itemCount = 34;
  const horizontalGap = 145;
  const verticalGap = 145;
  const columns = 6;
  const itemWidth = 85;
  const itemHeight = 140;

  const stateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    dragVelocityX: 0,
    dragVelocityY: 0,
    lastDragTime: 0,
    mouseHasMoved: false,
    visibleItems: new Set(),
    lastUpdateTime: 0,
    lastX: 0,
    lastY: 0,
    isExpanded: false,
    activeItem: null,
    canDrag: true,
    originalPosition: null,
    expandedItem: null,
    activeItemId: null,
    titleSplit: null,
    animationFrameId: null,
    zoomedIn: false,
  });

  const setAndAnimateTitle = (title) => {
    const { titleSplit } = stateRef.current;
    const projectTitleElement = projectTextRef.current;
  
    if (titleSplit) titleSplit.revert();
    projectTitleElement.textContent = title;
  
    stateRef.current.titleSplit = new SplitType(projectTitleElement, {
      types: "words",
    });

    stateRef.current.titleSplit.words.forEach(word => {
      word.classList.add(styles.word);
    });
    gsap.set(stateRef.current.titleSplit.words, { y: "100%" });
  };
  

  const animateTitleIn = () => {
    gsap.to(stateRef.current.titleSplit.words, {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });
  };

  const animateTitleOut = () => {
    gsap.to(stateRef.current.titleSplit.words, {
      y: "-100%",
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });
  };

  const updateVisibleItems = () => {
    const state = stateRef.current;
    const canvas = canvasRef.current;

    if (!canvas) return;

    const buffer = 2.5;
    const viewWidth = window.innerWidth * (1 + buffer);
    const viewHeight = window.innerHeight * (1 + buffer);
    const movingRight = state.targetX > state.currentX;
    const movingDown = state.targetY > state.currentY;
    const directionBufferX = movingRight ? -300 : 300;
    const directionBufferY = movingDown ? -300 : 300;

    const startCol = Math.floor(
      (-state.currentX - viewWidth / 2 + (movingRight ? directionBufferX : 0)) /
        (itemWidth + horizontalGap)
    );
    const endCol = Math.ceil(
      (-state.currentX +
        viewWidth * 1.5 +
        (!movingRight ? directionBufferX : 0)) /
        (itemWidth + horizontalGap)
    );
    const startRow = Math.floor(
      (-state.currentY - viewHeight / 2 + (movingDown ? directionBufferY : 0)) /
        (itemHeight + verticalGap)
    );
    const endRow = Math.ceil(
      (-state.currentY +
        viewHeight * 1.5 +
        (!movingDown ? directionBufferY : 0)) /
        (itemHeight + verticalGap)
    );
    

    const currentItems = new Set();

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const itemId = `${col},${row}`;
        currentItems.add(itemId);

        if (state.visibleItems.has(itemId)) continue;
        if (state.activeItemId === itemId && state.isExpanded) continue;

        const item = document.createElement("div");
        item.classList.add(styles.item);
        item.id = itemId;
        item.style.left = `${col * (itemWidth + horizontalGap)}px`;
        item.style.top = `${row * (itemHeight + verticalGap)}px`;
        item.dataset.col = col;
        item.dataset.row = row;

        const itemNum = (Math.abs(row * columns + col) % itemCount) + 1;
        const basePath = "/assets/orb";

        loadImageWithFallback(basePath, itemNum, (finalSrc) => {
          const img = document.createElement("img");
          img.src = finalSrc;
          img.alt = `Image ${itemNum}`;
          img.loading = "lazy";
          item.appendChild(img);
        });


        item.addEventListener("click", (e) => {
          if (state.mouseHasMoved || state.isDragging) return;
          handleItemClick(item);
        });

        canvas.appendChild(item);
        state.visibleItems.add(itemId);
      }
    }

    state.visibleItems.forEach((itemId) => {
      if (
        !currentItems.has(itemId) ||
        (state.activeItemId === itemId && state.isExpanded)
      ) {
        const item = document.getElementById(itemId);
        if (item && canvas.contains(item)) canvas.removeChild(item);
        state.visibleItems.delete(itemId);
      }
    });
  };

  const handleItemClick = (item) => {
    const state = stateRef.current;

    if (state.isExpanded) {
      if (state.expandedItem) closeExpandedItem();
    } else {
      expandItem(item);
    }
  };

  const expandItem = (item) => {
    const state = stateRef.current;
    const container = containerRef.current;
    const overlay = overlayRef.current;
  
    state.isExpanded = true;
    state.activeItem = item;
    state.activeItemId = item.id;
    state.canDrag = false;
    container.style.cursor = "auto";
  
    const imgSrc = item.querySelector("img").src;
    const imgMatch = imgSrc.match(/\/image(\d+)\.jpeg/);
    const imgNum = imgMatch ? parseInt(imgMatch[1]) : 1;
    const titleIndex = (imgNum - 1) % items.length;
  
    const { label, galleryLink } = items[titleIndex];
    setAndAnimateTitle(label);
    item.style.visibility = "hidden";
  
    const rect = item.getBoundingClientRect();
    const targetImg = item.querySelector("img").src;
    gsap.delayedCall(0.5, animateTitleIn);
  
    state.originalPosition = {
      id: item.id,
      rect: rect,
      imgSrc: targetImg,
    };
  
    overlay.classList.add(styles.active);
  
    const expandedItem = document.createElement("div");
    expandedItem.classList.add(styles.expandedItem);
    expandedItem.style.visibility = "hidden";
  
    const img = document.createElement("img");
    img.src = targetImg;
    img.className = styles.image;
    const titleLink = document.createElement("a");
    titleLink.href = galleryLink;
    titleLink.className = styles.galleryTitleLink;
    titleLink.addEventListener("click", e => e.stopPropagation());

    expandedItem.appendChild(titleLink);
    expandedItem.appendChild(img);
    expandedItem.addEventListener("click", closeExpandedItem);
    document.body.appendChild(expandedItem);
    state.expandedItem = expandedItem;
  
    // Ocultar otros elementos
    document.querySelectorAll(".item").forEach((el) => {
      if (el !== state.activeItem) {
        gsap.to(el, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  
    img.onload = () => {
      expandedItem.style.visibility = "visible";
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
    
      const aspectRatio = naturalWidth / naturalHeight;
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.8;
    
      let targetWidth = naturalWidth;
      let targetHeight = naturalHeight;
    
      if (targetWidth > maxWidth) {
        targetWidth = maxWidth;
        targetHeight = targetWidth / aspectRatio;
      }
    
      if (targetHeight > maxHeight) {
        targetHeight = maxHeight;
        targetWidth = targetHeight * aspectRatio;
      }
    
      expandedItem.style.width = `${targetWidth}px`;
      expandedItem.style.height = `${targetHeight}px`;
    
      // Calcular transformaciones
      const fromX = rect.left + rect.width / 2 - window.innerWidth / 2;
      const fromY = rect.top + rect.height / 2 - window.innerHeight / 2;
      const scaleX = rect.width / targetWidth;
      const scaleY = rect.height / targetHeight;
      const initialScale = Math.min(scaleX, scaleY);
    
      // Guardamos los valores para la animación inversa
      state.expandedTransform = {
        fromX,
        fromY,
        toX: 0,
        toY: 0,
        scale: initialScale,
      };
    
      gsap.fromTo(
        expandedItem,
        {
          x: fromX,
          y: fromY,
          scale: initialScale,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        }
      );
    };
    
  };  

  const closeExpandedItem = () => {
    const state = stateRef.current;
    const container = containerRef.current;
    const overlay = overlayRef.current;
  
    if (!state.expandedItem || !state.originalPosition || !state.expandedTransform) return;
  
    animateTitleOut();
    overlay.classList.remove(styles.active);
    const originalItem = document.getElementById(state.activeItemId);
  
    document.querySelectorAll(".item").forEach((el) => {
      if (el.id !== state.activeItemId) {
        gsap.to(el, {
          opacity: 1,
          duration: 0.5,
          delay: 0.5,
          ease: "power2.out",
        });
      }
    });
  
    const { fromX, fromY, scale } = state.expandedTransform;
  
    gsap.to(state.expandedItem, {
      x: fromX,
      y: fromY,
      scale: scale,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        if (state.expandedItem && state.expandedItem.parentNode) {
          document.body.removeChild(state.expandedItem);
        }
  
        if (originalItem) {
          originalItem.style.visibility = "visible";
        }
  
        // Limpiar estado
        state.expandedItem = null;
        state.isExpanded = false;
        state.activeItem = null;
        state.originalPosition = null;
        state.activeItemId = null;
        state.expandedTransform = null;
        state.canDrag = true;
        container.style.cursor = "grab";
        state.dragVelocityX = 0;
        state.dragVelocityY = 0;
      },
    });
  };
  

  const animate = () => {
    const state = stateRef.current;
    const canvas = canvasRef.current;

    if (!canvas) return;

    if (state.canDrag) {
      const ease = 0.075;
      state.currentX += (state.targetX - state.currentX) * ease;
      state.currentY += (state.targetY - state.currentY) * ease;

      gsap.set(canvas, {
        x: state.currentX,
        y: state.currentY,
      });

      const now = Date.now();
      const distMoved = Math.sqrt(
        Math.pow(state.currentX - state.lastX, 2) +
          Math.pow(state.currentY - state.lastY, 2)
      );

      if (distMoved > 100 || now - state.lastUpdateTime > 120) {
        updateVisibleItems();
        state.lastX = state.currentX;
        state.lastY = state.currentY;
        state.lastUpdateTime = now;
      }
    }

    state.animationFrameId = requestAnimationFrame(animate);
  };

  const handleMouseDown = (e) => {
    const state = stateRef.current;

    if (!state.canDrag) return;
    state.isDragging = true;
    state.mouseHasMoved = false;
    state.startX = e.clientX;
    state.startY = e.clientY;
    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    const state = stateRef.current;

    if (!state.isDragging || !state.canDrag) return;

    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      state.mouseHasMoved = true;
    }

    const now = Date.now();
    const dt = Math.max(10, now - state.lastDragTime);
    state.lastDragTime = now;

    state.dragVelocityX = dx / dt;
    state.dragVelocityY = dy / dt;

    state.targetX += dx;
    state.targetY += dy;

    state.startX = e.clientX;
    state.startY = e.clientY;
  };

  const handleMouseUp = (e) => {
    const state = stateRef.current;

    if (!state.isDragging) return;
    state.isDragging = false;

    if (state.canDrag) {
      containerRef.current.style.cursor = "grab";

      if (
        Math.abs(state.dragVelocityX) > 0.1 ||
        Math.abs(state.dragVelocityY) > 0.1
      ) {
        const momentumFactor = 200;
        state.targetX += state.dragVelocityX * momentumFactor;
        state.targetY += state.dragVelocityY * momentumFactor;
      }
    }
  };

  const handleTouchStart = (e) => {
    const state = stateRef.current;

    if (!state.canDrag) return;
    state.isDragging = true;
    state.mouseHasMoved = false;
    state.startX = e.touches[0].clientX;
    state.startY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const state = stateRef.current;

    if (!state.isDragging || !state.canDrag) return;

    const dx = e.touches[0].clientX - state.startX;
    const dy = e.touches[0].clientY - state.startY;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      state.mouseHasMoved = true;
    }

    state.targetX += dx;
    state.targetY += dy;

    state.startX = e.touches[0].clientX;
    state.startY = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    stateRef.current.isDragging = false;
  };

  const handleOverlayClick = () => {
    if (stateRef.current.isExpanded) closeExpandedItem();
  };

  const handleResize = () => {
    const state = stateRef.current;

    if (state.isExpanded && state.expandedItem) {
      const viewportWidth = window.innerWidth;
      const targetWidth = viewportWidth * 0.4;
      const targetHeight = targetWidth * 1.2;

      gsap.to(state.expandedItem, {
        width: targetWidth,
        height: targetHeight,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      updateVisibleItems();
    }
  };

  const initializeGallery = () => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!container || !overlay) return;

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);
    overlay.addEventListener("click", handleOverlayClick);

    updateVisibleItems();
    animate();
  };

  return (
    <>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.canvas} id="canvas" ref={canvasRef}></div>
        <div className={styles.overlay} id="overlay" ref={overlayRef}></div>
      </div>

      <button
        className={styles.zoomToggle}
        onClick={() => {
          const canvas = canvasRef.current;
          const nextZoomed = !zoomedIn;
          setZoomedIn(nextZoomed);

          gsap.to(canvas, {
            scale: nextZoomed ? 1 : 0.6,
            z: nextZoomed ? 0 : -500,
            duration: 1.4,
            ease: "power4.out",
          });

          // Actualizamos también en el stateRef para coherencia
          stateRef.current.zoomedIn = nextZoomed;
        }}
      >
        {zoomedIn ? "ZOOM OUT" : "ZOOM IN"}
      </button>


      <div className={styles.projectTitle} ref={projectTitleRef}>
        <p className={styles.projectText} ref={projectTextRef}></p>
      </div>
    </>
  );
}