import { useEffect, useRef } from "react";
const CanvasBackground = () => {
  // ... previous code ...
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Create shapes
    class Shape {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50 + 10;
        this.rotation = Math.random() * 360;
        this.speed = Math.random() * 0.5 + 0.2;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 2;

        // Draw hexagon
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          ctx.lineTo(Math.cos(angle) * this.size, Math.sin(angle) * this.size);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
        ctx.shadowColor = `hsla(${this.hue}, 70%, 50%, 0.5)`;
        ctx.shadowBlur = 15;
        ctx.lineWidth = 1.5;
      }

      update() {
        this.rotation += this.speed;
        if (this.y > canvas.height + this.size) {
          this.y = -this.size;
          this.x = Math.random() * canvas.width;
        } else {
          this.y += this.speed;
        }
      }
    }

    // Initialize animation
    const shapes = Array.from({ length: 15 }, () => new Shape());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach((shape) => {
        shape.update();
        shape.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();
    animate();

    // Event listeners
    window.addEventListener("resize", resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  class Shape {
    constructor() {
      // Add color properties
      this.hue = Math.random() * 60 + 180; // Blue hues (180-240)
      this.alpha = Math.random() * 0.2 + 0.1;
    }

    draw() {
      // Modify stroke style
      ctx.strokeStyle = `hsla(${this.hue}, 70%, 50%, ${this.alpha})`;

      // Add fill effect
      ctx.fillStyle = `hsla(${this.hue}, 70%, 50%, ${this.alpha * 0.3})`;
      ctx.fill();

      // Keep previous path drawing code
    }

    update() {
      // Add color animation
      this.hue += 0.3;
      if (this.hue > 240) this.hue = 180;

      // Keep previous movement logic
    }
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 -z-10 bg-gradient-to-br from-gray-900 via-slate-900 to-cyan-900/30"
    />
  );
};
export default CanvasBackground;
