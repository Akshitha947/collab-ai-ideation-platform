
import { useRef, useState, useEffect } from "react";
import { Brush, Eraser } from "lucide-react";
import io from "socket.io-client";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const socket = io("http://localhost:5000"); // backend server

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState("brush");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(3);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctxRef.current = ctx;
  }, []);

  // Update brush settings
  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
      ctxRef.current.lineWidth = size;
    }
  }, [color, size, tool]);

  // Handle incoming drawings
  useEffect(() => {
    socket.on("draw", ({ x, y, type, color, size, tool }) => {
      if (!ctxRef.current) return;
      ctxRef.current.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
      ctxRef.current.lineWidth = size;

      if (type === "begin") {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(x, y);
      } else if (type === "draw") {
        ctxRef.current.lineTo(x, y);
        ctxRef.current.stroke();
      }
    });

    return () => socket.off("draw");
  }, []);

  // Mouse events
  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);

    socket.emit("draw", {
      x: offsetX,
      y: offsetY,
      type: "begin",
      color,
      size,
      tool,
    });
  };

  const draw = (e) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
    ctxRef.current.lineWidth = size;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();

    socket.emit("draw", {
      x: offsetX,
      y: offsetY,
      type: "draw",
      color,
      size,
      tool,
    });
  };

  const stopDrawing = () => setDrawing(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Whiteboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Collaborative visual workspace
          </p>
        </div>
        <Button onClick={() => window.location.reload()}>New Board</Button>
      </div>

      {/* Toolbar */}
      <Card className="p-4 flex items-center space-x-4">
        {/* Brush */}
        <button
          onClick={() => setTool("brush")}
          className={`p-2 rounded-lg ${
            tool === "brush" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <Brush className="w-5 h-5" />
        </button>

        {/* Eraser */}
        <button
          onClick={() => setTool("eraser")}
          className={`p-2 rounded-lg ${
            tool === "eraser" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <Eraser className="w-5 h-5" />
        </button>

        {/* Colors */}
        <div className="flex space-x-1">
          {["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00"].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="w-6 h-6 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Size */}
        <input
          type="range"
          min="1"
          max="20"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-24"
        />
      </Card>

      {/* Canvas */}
      <Card className="p-0 overflow-hidden min-h-96">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-96 bg-white dark:bg-gray-900 cursor-crosshair"
        />
      </Card>
    </div>
  );
};

export default Whiteboard;
