
import React, { useEffect, useRef } from 'react';

interface StarFieldProps {
  starCount?: number;
}

export const StarField: React.FC<StarFieldProps> = ({ starCount = 100 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Array<{x: number, y: number, size: number, speed: number, brightness: number}>>([]);
  const requestRef = useRef<number>(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };
    
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.1,
          brightness: Math.random() * 0.5 + 0.5
        });
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      starsRef.current.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Move stars downward (parallax effect)
        star.y += star.speed;
        
        // Reset star position when it goes out of screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      // Occasionally add a shooting star
      if (Math.random() < 0.01) {
        const shootingStar = {
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 80 + 20,
          speed: Math.random() * 10 + 8,
          angle: Math.PI / 4, // 45 degrees
          life: 1 // Full life
        };
        
        // Animate the shooting star
        const animateShootingStar = () => {
          if (shootingStar.life <= 0) return;
          
          const endX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length;
          const endY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length;
          
          // Create gradient for the shooting star
          const gradient = ctx.createLinearGradient(
            shootingStar.x, shootingStar.y, endX, endY
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.life})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          
          // Move the shooting star
          shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
          shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
          
          // Reduce life (fade out)
          shootingStar.life -= 0.02;
          
          if (shootingStar.life > 0 && 
              shootingStar.x < canvas.width + shootingStar.length && 
              shootingStar.y < canvas.height + shootingStar.length) {
            requestAnimationFrame(animateShootingStar);
          }
        };
        
        animateShootingStar();
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [starCount]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
};

export default StarField;
