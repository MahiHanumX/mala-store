import React, { useEffect, useRef, useState } from 'react';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_032550_4c49689d-a215-41e0-bb76-8ef78f562429.mp4';
const POSTER_URL = '/hero-poster.jpg';

export const ScrollVideo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [cacheReady, setCacheReady] = useState(false);
  const framesCacheRef = useRef<ImageBitmap[]>([]);

  // Smooth scroll tracking with lerp
  const targetProgressRef = useRef(0);
  const smoothedProgressRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const maxScroll = Math.max(1, scrollHeight - innerHeight);
      const rawProgress = scrollY / maxScroll;
      targetProgressRef.current = Math.min(Math.max(rawProgress, 0), 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Video Frame Extraction for smooth scrub
  useEffect(() => {
    let isCancelled = false;

    const extractFrames = async () => {
      try {
        const offscreenVideo = document.createElement('video');
        offscreenVideo.crossOrigin = 'anonymous';
        offscreenVideo.src = VIDEO_URL;
        offscreenVideo.muted = true;
        offscreenVideo.playsInline = true;

        await new Promise((resolve, reject) => {
          offscreenVideo.onloadedmetadata = resolve;
          offscreenVideo.onerror = reject;
        });

        if (isCancelled) return;

        const duration = offscreenVideo.duration || 5;
        const totalFrames = Math.min(72, Math.max(24, Math.floor(duration * 10)));
        const step = (duration - 0.1) / totalFrames;

        const frames: ImageBitmap[] = [];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxW = 960;
        const scale = Math.min(1, maxW / (offscreenVideo.videoWidth || 1920));
        const frameW = Math.floor((offscreenVideo.videoWidth || 1920) * scale);
        const frameH = Math.floor((offscreenVideo.videoHeight || 1080) * scale);

        canvas.width = frameW;
        canvas.height = frameH;

        for (let i = 0; i < totalFrames; i++) {
          if (isCancelled) return;
          offscreenVideo.currentTime = i * step;

          await new Promise<void>((res) => {
            const onSeeked = () => {
              offscreenVideo.removeEventListener('seeked', onSeeked);
              res();
            };
            offscreenVideo.addEventListener('seeked', onSeeked);
          });

          if (ctx) {
            ctx.drawImage(offscreenVideo, 0, 0, frameW, frameH);
            const bitmap = await createImageBitmap(canvas);
            frames.push(bitmap);
          }
        }

        if (!isCancelled && frames.length > 0) {
          framesCacheRef.current = frames;
          setCacheReady(true);
        }
      } catch (err) {
        console.log('Using 3D Sacred Mala Canvas Renderer for scroll scrubbing');
      }
    };

    const timer = setTimeout(() => {
      extractFrames();
    }, 400);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // Continuous animation loop rendering the 3D Sacred Mala Strand Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastSeekTime = -1;

    const renderLoop = () => {
      const target = targetProgressRef.current;
      const current = smoothedProgressRef.current;
      const smoothed = current + (target - current) * 0.12;
      smoothedProgressRef.current = smoothed;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Draw frame from Video cache if ready
      if (cacheReady && framesCacheRef.current.length > 0) {
        const total = framesCacheRef.current.length;
        const frameIdx = Math.min(Math.floor(smoothed * total), total - 1);
        const bitmap = framesCacheRef.current[frameIdx];

        if (bitmap) {
          drawCover(ctx, bitmap, width, height);
          // Overlay golden aura mist on top
          drawGoldenAuraMist(ctx, width, height, smoothed);
        }
      } else if (videoRef.current && videoLoaded) {
        // Seek video fallback
        const video = videoRef.current;
        const duration = video.duration || 5;
        const seekTime = smoothed * (duration - 0.05);

        if (Math.abs(seekTime - lastSeekTime) > 0.04) {
          video.currentTime = seekTime;
          lastSeekTime = seekTime;
        }

        drawCover(ctx, video, width, height);
        drawGoldenAuraMist(ctx, width, height, smoothed);
      } else {
        // 2. High-End 3D Sacred Mala Canvas Renderer (108 Beads + Golden Tassel + Floating Mantras)
        draw3DSacredMalaBeads(ctx, width, height, smoothed);
      }

      ctx.restore();

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [cacheReady, videoLoaded]);

  const drawCover = (
    ctx: CanvasRenderingContext2D,
    img: ImageBitmap | HTMLVideoElement,
    cw: number,
    ch: number
  ) => {
    const iw = (img as ImageBitmap).width || (img as HTMLVideoElement).videoWidth || 1920;
    const ih = (img as ImageBitmap).height || (img as HTMLVideoElement).videoHeight || 1080;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;

    ctx.drawImage(img, cx, cy, nw, nh);
  };

  const drawGoldenAuraMist = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    progress: number
  ) => {
    const grad = ctx.createRadialGradient(
      w * 0.5,
      h * 0.4 + (progress - 0.5) * 150,
      100,
      w * 0.5,
      h * 0.5,
      w * 0.7
    );
    grad.addColorStop(0, 'rgba(245, 158, 11, 0.12)');
    grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  };

  // 3D Sacred Mala Bead Canvas Renderer (108 Beads + Guru Bead + Golden Thread + Floating Particles)
  const draw3DSacredMalaBeads = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    progress: number
  ) => {
    // Deep luxury background with golden aura
    ctx.fillStyle = '#060608';
    ctx.fillRect(0, 0, w, h);

    // Cosmic background glow
    const bgGrad = ctx.createRadialGradient(
      w * 0.5,
      h * 0.35 + (progress - 0.5) * 200,
      50,
      w * 0.5,
      h * 0.5,
      Math.max(w, h) * 0.85
    );
    bgGrad.addColorStop(0, '#1c1524');
    bgGrad.addColorStop(0.4, '#120f1a');
    bgGrad.addColorStop(1, '#060608');

    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Draw floating mantra symbols ('ॐ') in gold aura
    const mantras = ['ॐ', 'ॐ नमः शिवाय', 'अहं ब्रह्मास्मि', 'ॐ मणिपद्मे हूँ'];
    ctx.font = '24px serif';
    ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';

    mantras.forEach((mantra, idx) => {
      const mx = w * (0.15 + idx * 0.25) + Math.sin(progress * 5 + idx) * 30;
      const my = h * (0.2 + (idx % 2) * 0.5) + Math.cos(progress * 4 + idx) * 40;
      ctx.fillText(mantra, mx, my);
    });

    // 108 Sacred Mala Beads along a 3D curving strand trajectory
    const totalBeads = 108;
    const strandScrollOffset = progress * Math.PI * 4;

    // Draw silk thread line first
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 2;

    const beadCoords: { x: number; y: number; z: number; isGuru?: boolean; type: number }[] = [];

    for (let i = 0; i <= totalBeads; i++) {
      const t = (i / totalBeads) * Math.PI * 3 + strandScrollOffset;

      // 3D spiral curve math
      const rx = (w * 0.32) + Math.sin(t * 0.8) * (w * 0.15);
      const ry = (h * 0.5) + Math.cos(t * 0.6) * (h * 0.35) + (i - totalBeads / 2) * 2.5;
      const rz = Math.sin(t * 1.2) * 150 + 200;

      if (i === 0) {
        ctx.moveTo(rx, ry);
      } else {
        ctx.lineTo(rx, ry);
      }

      beadCoords.push({
        x: rx,
        y: ry,
        z: rz,
        isGuru: i === 0 || i === 108,
        type: i % 5,
      });
    }
    ctx.stroke();

    // Sort beads by Z-depth for 3D realism
    beadCoords.sort((a, b) => a.z - b.z);

    // Draw 3D Spherical Mala Beads
    beadCoords.forEach((bead) => {
      const scale = Math.max(0.4, bead.z / 250);
      const radius = (bead.isGuru ? 16 : 9) * scale;

      // Draw bead shadow
      ctx.beginPath();
      ctx.arc(bead.x + 3, bead.y + 4, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fill();

      // Draw bead gradient (Rudraksha / Rose Quartz / Amethyst / Sandalwood)
      const bGrad = ctx.createRadialGradient(
        bead.x - radius * 0.3,
        bead.y - radius * 0.3,
        radius * 0.1,
        bead.x,
        bead.y,
        radius
      );

      if (bead.isGuru) {
        // Guru Bead (Gold & Sacred Rudraksha)
        bGrad.addColorStop(0, '#fef08a');
        bGrad.addColorStop(0.5, '#f59e0b');
        bGrad.addColorStop(1, '#78350f');
      } else if (bead.type === 0) {
        // Rudraksha (Warm Golden Earth)
        bGrad.addColorStop(0, '#fde047');
        bGrad.addColorStop(0.4, '#d97706');
        bGrad.addColorStop(1, '#451a03');
      } else if (bead.type === 1) {
        // Rose Quartz (Soft Pink)
        bGrad.addColorStop(0, '#fbcfe8');
        bGrad.addColorStop(0.6, '#f472b6');
        bGrad.addColorStop(1, '#831843');
      } else if (bead.type === 2) {
        // Amethyst (Royal Purple)
        bGrad.addColorStop(0, '#ddd6fe');
        bGrad.addColorStop(0.6, '#8b5cf6');
        bGrad.addColorStop(1, '#4c1d95');
      } else {
        // Sandalwood (Warm Amber Wood)
        bGrad.addColorStop(0, '#fef3c7');
        bGrad.addColorStop(0.5, '#b45309');
        bGrad.addColorStop(1, '#381a05');
      }

      ctx.beginPath();
      ctx.arc(bead.x, bead.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = bGrad;
      ctx.fill();

      // Specular highlight on bead
      ctx.beginPath();
      ctx.arc(bead.x - radius * 0.3, bead.y - radius * 0.3, radius * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.fill();
    });

    // Draw Golden Silk Tassel at Guru Bead
    if (beadCoords.length > 0) {
      const guru = beadCoords[beadCoords.length - 1];
      const tx = guru.x;
      const ty = guru.y + 20;

      ctx.beginPath();
      ctx.moveTo(tx, ty);
      for (let k = -6; k <= 6; k++) {
        ctx.lineTo(tx + k * 3 + Math.sin(progress * 8 + k) * 5, ty + 45);
      }
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.85)';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  };

  return (
    <div className="fixed inset-0 z-0 bg-[#060608] overflow-hidden pointer-events-none">
      {/* 1. Poster Layer */}
      <img
        src={POSTER_URL}
        alt="Sacred mala background poster"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          videoLoaded || cacheReady ? 'opacity-0' : 'opacity-100'
        }`}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* 2. Video Layer */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          videoLoaded && !cacheReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 3. Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block opacity-100 transition-opacity duration-500"
      />
    </div>
  );
};
