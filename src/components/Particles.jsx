import { useEffect, useRef } from "react";

const Particles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Similar setup to CanvasBackground but with different parameters
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `hsla(${Math.random() * 60 + 180}, 70%, 50%, ${
          Math.random() * 0.4
        })`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = `hsla(${this.hue}, 70%, 50%, 0.5)`;
        ctx.shadowBlur = 15;
        ctx.lineWidth = 1.5;
      }
    }

    // Similar animation loop setup
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 -z-10 bg-gradient-to-br from-gray-900 via-slate-900 to-cyan-900/30"
    />
  );
};
export default Particles;
