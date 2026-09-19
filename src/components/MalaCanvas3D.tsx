import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MalaCanvas3DProps {
  activeMalaId: string;
  scrollProgress: number; // 0 to 1 overall
  currentChapterProgress: number; // 0 to 1 for active mala chapter
  isBinduFocused: boolean;
}

export const MalaCanvas3D: React.FC<MalaCanvas3DProps> = ({
  activeMalaId,
  scrollProgress,
  currentChapterProgress,
  isBinduFocused,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const malaGroupRef = useRef<THREE.Group | null>(null);
  const binduLightRef = useRef<THREE.PointLight | null>(null);
  const beadsMeshGroupRef = useRef<THREE.Group | null>(null);

  // Store materials for quick switching
  const materialsRef = useRef<Record<string, THREE.Material>>({});

  // Target animation values for smooth lerp
  const targetRotationYRef = useRef(0);
  const targetRotationXRef = useRef(0);
  const targetCameraZRef = useRef(5.5);
  const targetCameraYRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080808);
    scene.fog = new THREE.FogExp2(0x080808, 0.08);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.6);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffe8d6, 2.2);
    mainKeyLight.position.set(3, 4, 5);
    mainKeyLight.castShadow = true;
    scene.add(mainKeyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.8);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // Warm illumination for Bindu reveal
    const binduPointLight = new THREE.PointLight(0xf59e0b, 0, 4);
    binduPointLight.position.set(0, -1.3, 0.5);
    scene.add(binduPointLight);
    binduLightRef.current = binduPointLight;

    // 5. Create Materials for 5 Malas
    const materials: Record<string, THREE.Material> = {
      'tulsi-108': new THREE.MeshStandardMaterial({
        color: 0xc49a6c,
        roughness: 0.55,
        metalness: 0.05,
      }),
      'rudraksha-108': new THREE.MeshStandardMaterial({
        color: 0x5c2416,
        roughness: 0.85,
        metalness: 0.0,
      }),
      'sandalwood-108': new THREE.MeshPhysicalMaterial({
        color: 0xd9a768,
        roughness: 0.4,
        metalness: 0.02,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
      }),
      'sphatik-108': new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.92,
        opacity: 0.85,
        transparent: true,
        roughness: 0.04,
        ior: 1.52,
        reflectivity: 0.95,
        clearcoat: 1.0,
      }),
      'kamal-gatta-108': new THREE.MeshStandardMaterial({
        color: 0x3b2518,
        roughness: 0.75,
        metalness: 0.0,
      }),
    };

    // Bindu Guru Bead Special Gold Highlight Material
    const guruGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.85,
    });

    materialsRef.current = materials;

    // 6. Build 3D Mala Geometry
    const malaGroup = new THREE.Group();
    scene.add(malaGroup);
    malaGroupRef.current = malaGroup;

    const beadsGroup = new THREE.Group();
    malaGroup.add(beadsGroup);
    beadsMeshGroupRef.current = beadsGroup;

    // Generate 108 bead positions along a draped necklace oval
    const beadCount = 108;
    const baseSphereGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const guruSphereGeo = new THREE.SphereGeometry(0.12, 24, 24);

    const activeMaterial = materials[activeMalaId] || materials['tulsi-108'];

    for (let i = 0; i < beadCount; i++) {
      const angle = (i / beadCount) * Math.PI * 2;
      // Elliptical draped mala necklace curve shape
      const x = Math.sin(angle) * 1.3;
      const y = Math.cos(angle) * 1.6 + Math.sin(angle * 2) * 0.1;
      const z = Math.sin(angle * 3) * 0.15;

      const beadMesh = new THREE.Mesh(baseSphereGeo, activeMaterial);
      beadMesh.position.set(x, y, z);
      beadMesh.castShadow = true;
      beadMesh.receiveShadow = true;
      beadsGroup.add(beadMesh);
    }

    // 7. Add Bindu (Guru Bead) at bottom center
    const guruMesh = new THREE.Mesh(guruSphereGeo, guruGoldMaterial);
    guruMesh.position.set(0, -1.3, 0.1);
    guruMesh.castShadow = true;
    guruMesh.name = 'guruBead';
    malaGroup.add(guruMesh);

    // 8. Add Silk Tassel under Bindu
    const tasselGroup = new THREE.Group();
    const tasselConeGeo = new THREE.ConeGeometry(0.08, 0.4, 16);
    const tasselMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.5 });
    const tasselMesh = new THREE.Mesh(tasselConeGeo, tasselMat);
    tasselMesh.position.set(0, -1.6, 0.1);
    tasselMesh.rotation.x = Math.PI;
    tasselGroup.add(tasselMesh);
    malaGroup.add(tasselGroup);

    // 9. Floating Golden Dust Particles Background
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 10;
      particlePos[i + 1] = (Math.random() - 0.5) * 10;
      particlePos[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.025,
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 10. Animation Loop with Lerp
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Lerp camera
      if (cameraRef.current) {
        cameraRef.current.position.z += (targetCameraZRef.current - cameraRef.current.position.z) * 0.08;
        cameraRef.current.position.y += (targetCameraYRef.current - cameraRef.current.position.y) * 0.08;
        cameraRef.current.lookAt(0, targetCameraYRef.current * 0.5, 0);
      }

      // Lerp mala rotation based on scroll
      if (malaGroupRef.current) {
        malaGroupRef.current.rotation.y += (targetRotationYRef.current - malaGroupRef.current.rotation.y) * 0.08;
        malaGroupRef.current.rotation.x += (targetRotationXRef.current - malaGroupRef.current.rotation.x) * 0.08;
      }

      // Rotate floating particles slowly
      particles.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Window Resize Handler
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
      scene.clear();
    };
  }, []);

  // Update materials when activeMalaId changes
  useEffect(() => {
    if (!beadsMeshGroupRef.current || !materialsRef.current) return;
    const newMaterial = materialsRef.current[activeMalaId] || materialsRef.current['tulsi-108'];

    beadsMeshGroupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = newMaterial;
      }
    });
  }, [activeMalaId]);

  // Update target rotation and camera zoom based on scroll progress and Bindu focus
  useEffect(() => {
    // Map chapter progress to 3D rotation
    targetRotationYRef.current = currentChapterProgress * Math.PI * 2.2;
    targetRotationXRef.current = Math.sin(currentChapterProgress * Math.PI) * 0.25;

    if (isBinduFocused) {
      // Zoom camera in on Bindu bead
      targetCameraZRef.current = 3.2;
      targetCameraYRef.current = -0.8;
      if (binduLightRef.current) {
        binduLightRef.current.intensity = 3.5;
      }
    } else {
      // Standard view
      targetCameraZRef.current = 5.5;
      targetCameraYRef.current = 0;
      if (binduLightRef.current) {
        binduLightRef.current.intensity = 0;
      }
    }
  }, [scrollProgress, currentChapterProgress, isBinduFocused]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-[#080808]"
    />
  );
};
