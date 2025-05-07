
import React, { useEffect, useRef } from "react";

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 200,
  bgColor = "#FFFFFF",
  fgColor = "#000000",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // This is a placeholder for actual QR code generation
    // In a real-world app, we would use a library like qrcode.js
    const drawPlaceholderQR = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);

      // Draw mock QR code pattern
      ctx.fillStyle = fgColor;
      const blockSize = size / 33;
      
      // Outer frame
      ctx.fillRect(blockSize * 2, blockSize * 2, size - blockSize * 4, blockSize);
      ctx.fillRect(blockSize * 2, blockSize * 2, blockSize, size - blockSize * 4);
      ctx.fillRect(blockSize * 2, size - blockSize * 3, size - blockSize * 4, blockSize);
      ctx.fillRect(size - blockSize * 3, blockSize * 2, blockSize, size - blockSize * 4);
      
      // Position detection patterns (corners)
      // Top-left corner
      ctx.fillRect(blockSize * 4, blockSize * 4, blockSize * 7, blockSize * 7);
      ctx.fillStyle = bgColor;
      ctx.fillRect(blockSize * 5, blockSize * 5, blockSize * 5, blockSize * 5);
      ctx.fillStyle = fgColor;
      ctx.fillRect(blockSize * 6, blockSize * 6, blockSize * 3, blockSize * 3);
      
      // Top-right corner
      ctx.fillRect(size - blockSize * 11, blockSize * 4, blockSize * 7, blockSize * 7);
      ctx.fillStyle = bgColor;
      ctx.fillRect(size - blockSize * 10, blockSize * 5, blockSize * 5, blockSize * 5);
      ctx.fillStyle = fgColor;
      ctx.fillRect(size - blockSize * 9, blockSize * 6, blockSize * 3, blockSize * 3);
      
      // Bottom-left corner
      ctx.fillRect(blockSize * 4, size - blockSize * 11, blockSize * 7, blockSize * 7);
      ctx.fillStyle = bgColor;
      ctx.fillRect(blockSize * 5, size - blockSize * 10, blockSize * 5, blockSize * 5);
      ctx.fillStyle = fgColor;
      ctx.fillRect(blockSize * 6, size - blockSize * 9, blockSize * 3, blockSize * 3);
      
      // Random pattern to simulate QR code data
      for (let i = 0; i < 50; i++) {
        const x = Math.floor(Math.random() * 25) + 4;
        const y = Math.floor(Math.random() * 25) + 4;
        // Don't draw in the corner position detection patterns
        if ((x < 12 && y < 12) || (x > 21 && y < 12) || (x < 12 && y > 21)) continue;
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
      }

      // Add text in the center
      ctx.fillStyle = bgColor;
      ctx.fillRect(blockSize * 13, blockSize * 14, blockSize * 7, blockSize * 5);
      ctx.fillStyle = fgColor;
      ctx.font = `${blockSize * 3}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("PS", size/2, size/2 + blockSize);
    };

    drawPlaceholderQR();
  }, [value, size, bgColor, fgColor]);

  return (
    <div className="inline-flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="border border-gray-200 rounded-lg shadow-sm"
      />
      <div className="mt-2 text-xs text-gray-500">ParkSmart Access Code</div>
    </div>
  );
};

export default QRCode;
