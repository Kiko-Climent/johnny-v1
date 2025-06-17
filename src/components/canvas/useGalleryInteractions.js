import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useGalleryInteractions({
  containerRef,
  canvasRef,
  overlayRef,
  projectTitleRef,
  projectTextRef,
  zoomedIn,
  setZoomedIn,
}) {
  const stateRef = useRef({
    isDragging: false,
    canDrag: true,
    mouseHasMoved: false,
    startX: 0,
    startY: 0,
    targetX: 0,
    targetY: 0,
    expandedItem: null,
    isExpanded: false,
    zoomedIn: false,
  });

  const animate = () => {
    const state = stateRef.current;
    if (!canvasRef.current) return;

    canvasRef.current.style.transform = `translate3d(${state.targetX}px, ${state.targetY}px, 0)`;

    requestAnimationFrame(animate);
  };

  const updateVisibleItems = () => {
    // Aquí podrías añadir lógica para mostrar/ocultar elementos según viewport
  };

  const handleMouseDown = (e) => {
    const state = stateRef.current;
    if (!state.canDrag) return;
    state.isDragging = true;
    state.mouseHasMoved = false;
    state.startX = e.clientX;
    state.startY = e.clientY;
  };

  const handleMouseMove = (e) => {
    const state = stateRef.current;
    if (!state.isDragging || !state.canDrag) return;

    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      state.mouseHasMoved = true;
    }

    state.targetX += dx;
    state.targetY += dy;
    state.startX = e.clientX;
    state.startY = e.clientY;
  };

  const handleMouseUp = () => {
    stateRef.current.isDragging = false;
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

    e.preventDefault(); // ✅ evita scroll mientras arrastras

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

  const closeExpandedItem = () => {
    const state = stateRef.current;
    if (!state.expandedItem) return;

    gsap.to(state.expandedItem, {
      width: 150,
      height: 150,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        state.isExpanded = false;
        state.expandedItem = null;
      },
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!container || !overlay) return;

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false }); // ✅
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);
    overlay.addEventListener("click", handleOverlayClick);

    updateVisibleItems();
    animate();

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      overlay.removeEventListener("click", handleOverlayClick);
    };
  }, []);

  const toggleZoom = () => {
    const nextZoomed = !zoomedIn;
    setZoomedIn(nextZoomed);
    const canvas = canvasRef.current;

    gsap.to(canvas, {
      scale: nextZoomed ? 1 : 0.6,
      z: nextZoomed ? 0 : -500,
      duration: 1.4,
      ease: "power4.out",
    });

    stateRef.current.zoomedIn = nextZoomed;
  };

  return { toggleZoom, zoomedIn };
}
