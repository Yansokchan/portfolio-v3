import { useEffect, useRef } from "react";

const CanvasBackground = () => {
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

    // Create meteors
    class Meteor {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.length = Math.random() * 150 + 50; // Longer trails
        this.speed = Math.random() * 1.5 + 1; // Slower speed
        this.angle = Math.PI / 4 + (Math.random() * Math.PI) / 8; // Angle of the meteor
        this.opacity = 1;
        this.width = Math.random() * 1.5 + 1; // Width of the meteor trail
        this.headSize = Math.random() * 0.5 + 1; // Bigger head size (3-7 pixels)
      }

      draw() {
        // Draw the meteor head
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.headSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();

        // Draw the trail
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = this.width;
        ctx.lineCap = "round";

        // Create gradient for the meteor trail
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.6)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();

        // Add glow effect to the head
        const glowGradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.headSize * 2
        );
        glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
        glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.headSize * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        // Move the meteor
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Slower fade out
        this.opacity -= 0.005;

        // Reset meteor when it goes off screen or fades out
        if (
          this.y > canvas.height + 100 ||
          this.x < -100 ||
          this.x > canvas.width + 100 ||
          this.opacity <= 0
        ) {
          this.reset();
        }
      }
    }

    // Initialize meteors
    const meteors = Array.from({ length: 10 }, () => new Meteor());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0f172a"); // slate-900
      gradient.addColorStop(0.5, "#1e293b"); // slate-800
      gradient.addColorStop(1, "#0c4a6e"); // cyan-900
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update meteors
      meteors.forEach((meteor) => {
        meteor.update();
        meteor.draw();
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

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10" />;
};

export default CanvasBackground;
