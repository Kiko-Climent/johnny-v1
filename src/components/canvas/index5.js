"use client";

// con zoom dinamico

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import items from "./items"
import styles from "@/components/index/style.module.css"


let SplitType;

export default function CanvasGallery5() {
  
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const projectTitleRef = useRef(null);
  const projectTextRef = useRef(null);
  const [zoomedIn, setZoomedIn] = useState(false);

  function loadImageWithFallback(basePath, itemNum, callback) {
    const img = new Image();
    const jpegSrc = `${basePath}/image${itemNum}.jpeg`;

    img.src = jpegSrc;

    img.onload = () => {
      callback(jpegSrc);
    };

    img.onerror = () => {
      console.error(`Image not found: image${itemNum}.jpeg`);
    };
    
  }

  useEffect(() => {
    const importSplitType = async () => {
      const SplitTypeModule = await import("split-type");
      SplitType = SplitTypeModule.default;
  
      initializeGallery();
      // setInitialized(true);
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
      // Empezamos "lejos"
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
  
      if (stateRef.current.animationFrameId) {
        cancelAnimationFrame(stateRef.current.animationFrameId);
      }
  
      // DEVOLVER .projectTitle SI HACE FALTA
      if (el && containerRef.current?.contains(el) === false) {
        containerRef.current?.appendChild(el);
      }
      if (stateRef.current.titleSplit) {
        stateRef.current.titleSplit.revert();
        stateRef.current.titleSplit = null;
      }
      
      // Eliminar título si se movió al body
      if (projectTitleRef.current && projectTitleRef.current.parentNode === document.body) {
        document.body.removeChild(projectTitleRef.current);
      }
      
      // Eliminar expandedItem colgado
      if (stateRef.current.expandedItem && document.body.contains(stateRef.current.expandedItem)) {
        document.body.removeChild(stateRef.current.expandedItem);
        stateRef.current.expandedItem = null;
      }
      
      // Ocultar el título por si queda visible
      if (projectTitleRef.current) {
        projectTitleRef.current.style.display = "none";
      }
    };
  }, []);
  

  const itemCount = 42;
  const horizontalGap = 70;
  const verticalGap = 70;
  const columns = 17;
  const itemWidth = 120;
  const itemHeight = 160;

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

  const setAndAnimateTitle = (label, galleryLink) => {
    const { titleSplit } = stateRef.current;
    const projectTitleElement = projectTextRef.current;
  
    if (titleSplit) titleSplit.revert();
  
    // Limpiamos el nodo antes de insertar
    projectTitleElement.innerHTML = "";
  
    const link = document.createElement("a");
    link.href = galleryLink;
    link.textContent = label;
    link.className = styles.projectTextLink; // le podés dar estilos extra si querés
    projectTitleElement.addEventListener("click", e => e.stopPropagation()); // para evitar que se cierre al clickear
  
    projectTitleElement.appendChild(link);
  
    stateRef.current.titleSplit = new SplitType(projectTitleElement, {
      types: "words",
    });
  
    stateRef.current.titleSplit.words.forEach(word => {
      word.classList.add(styles.word);
    });
  
    gsap.set(stateRef.current.titleSplit.words, { y: "100%" });
    animateTitleIn();
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
  
    // posición original visible para cálculo
    const img = item.querySelector("img");
    const scrollLeft = window.scrollX;
    const scrollTop = window.scrollY;
    const rect = img.getBoundingClientRect();
  
    const imgSrc = img.src;
    const imgMatch = imgSrc.match(/\/image(\d+)\.jpeg/);
    const imgNum = imgMatch ? parseInt(imgMatch[1]) : 1;
    const { label, galleryLink } = items[(imgNum - 1) % items.length];
  
    projectTitleRef.current.style.pointerEvents = "auto";
    projectTitleRef.current.style.opacity = "1";
    item.style.visibility = "hidden";
  
    overlay.classList.add(styles.active);
  
    const expandedItem = document.createElement("div");
    expandedItem.classList.add(styles.expandedItem);
  
    // ✅ EMPIEZA invisible pero en layout
    expandedItem.style.opacity = "0";
    expandedItem.style.position = "absolute";
    expandedItem.style.left = `${rect.left + scrollLeft}px`;
    expandedItem.style.top = `${rect.top + scrollTop}px`;
    expandedItem.style.width = `${rect.width}px`;
    expandedItem.style.height = `${rect.height}px`;
    expandedItem.style.zIndex = "1000";
  
    const imgEl = document.createElement("img");
    imgEl.src = imgSrc;
    imgEl.className = styles.image;
  
    const titleLink = document.createElement("a");
    titleLink.href = galleryLink;
    titleLink.className = styles.galleryTitleLink;
    titleLink.addEventListener("click", (e) => e.stopPropagation());
  
    expandedItem.appendChild(titleLink);
    expandedItem.appendChild(imgEl);
    expandedItem.addEventListener("click", closeExpandedItem);
    document.body.appendChild(expandedItem);
    state.expandedItem = expandedItem;

    state.originalPosition = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      scrollLeft,
      scrollTop
    }
    state.expandedTransform = { fromX: 0, fromY: 0, scale: 1 };

  
    imgEl.onload = () => {
      expandedItem.style.opacity = "1";
  
      const ar = imgEl.naturalWidth / imgEl.naturalHeight;
      const maxW = window.innerWidth * 0.7;
      const maxH = window.innerHeight * 0.7;
      let w = imgEl.naturalWidth, h = imgEl.naturalHeight;
  
      if (w > maxW) { w = maxW; h = w / ar; }
      if (h > maxH) { h = maxH; w = h * ar; }
  
      const finalLeft = window.innerWidth / 2 - w / 2;
      const finalTop = window.innerHeight / 2 - h / 2;
  
      gsap.fromTo(
        expandedItem,
        {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        },
        {
          left: finalLeft,
          top: finalTop,
          width: w,
          height: h,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            // 👇 Título aparece solo cuando ya terminó la expansión
            setAndAnimateTitle(label, galleryLink);
          },
        }
      );
    };
  };

  const closeExpandedItem = () => {
    const state = stateRef.current;
    const container = containerRef.current;
    const overlay = overlayRef.current;
  
    if (
      !state.expandedItem ||
      !state.originalPosition
    )
      return;
  
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
  
    const {
      left,
      top,
      width,
      height,
      scrollLeft,
      scrollTop
    } = state.originalPosition;
  
    // Animamos left, top, width y height igual que en la apertura, pero al revés
    gsap.to(state.expandedItem, {
      left: left + scrollLeft,
      top: top + scrollTop,
      width,
      height,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        if (state.expandedItem && state.expandedItem.parentNode) {
          document.body.removeChild(state.expandedItem);
        }
  
        if (originalItem) {
          originalItem.style.visibility = "visible";
        }
  
        // Limpia el contenido del título y evita eventos
        const titleEl = projectTextRef.current;
        if (titleEl) titleEl.innerHTML = "";
  
        if (projectTitleRef.current) {
          projectTitleRef.current.style.pointerEvents = "none";
          projectTitleRef.current.style.opacity = "0";
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