import React, { useRef, useEffect, useState } from 'react';
import { 
  MousePointer2, 
  Square, 
  Circle, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  ArrowLeftCircle, 
  ArrowRightCircle,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Trash2,
  Layers,
  Settings2,
  Maximize,
  Minimize,
  Save,
  Download,
  Type,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  Design, 
  DesignComponent, 
  Profile, 
  Dimensions, 
  OpeningType, 
  INITIAL_PROFILES 
} from '../types';

interface DesignerProps {
  design: Design;
  onSave: (design: Design) => void;
  onExit: () => void;
}

const VisualDesigner = ({ design, onSave, onExit }: DesignerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [components, setComponents] = useState<DesignComponent[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [panMode, setPanMode] = useState(true);
  const [tool, setTool] = useState<'select' | 'move' | 'resize'>('select');

  // Scale calculation: How many pixels per cm
  const scale = 10;

  // Draw the design
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(zoom, zoom);

    // 1. Draw Opening (Background)
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, 0, design.dimensions.width * scale, design.dimensions.height * scale);

    // 2. Draw Frame (simplified for now)
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 5;
    if (design.openingType === 'rectangular') {
      ctx.strokeRect(0, 0, design.dimensions.width * scale, design.dimensions.height * scale);
    } else {
      // Draw Arch
      const w = design.dimensions.width * scale;
      const h = design.dimensions.height * scale;
      const seatedH = (design.dimensions.seatedHeight || 0) * scale;
      
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, seatedH);
      // Assuming semicircular or elliptical arch
      ctx.arcTo(0, 0, w/2, 0, w/2);
      ctx.arcTo(w, 0, w, seatedH, w/2);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.stroke();
    }

    // 3. Draw Components
    components.forEach(comp => {
      const profile = INITIAL_PROFILES.find(p => p.id === comp.profileId);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'; // blue translucent
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.lineWidth = 2;

      if (comp.type === 'sash' || comp.type === 'divider') {
        ctx.fillRect(comp.x * scale, comp.y * scale, comp.width * scale, comp.height * scale);
        ctx.strokeRect(comp.x * scale, comp.y * scale, comp.width * scale, comp.height * scale);
      }
    });

    // 4. Selection Highlight
    if (selectedComponentId) {
      const selected = components.find(c => c.id === selectedComponentId);
      if (selected) {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.strokeRect(selected.x * scale - 2, selected.y * scale - 2, selected.width * scale + 4, selected.height * scale + 4);
      }
    }

    ctx.restore();
  }, [design, components, offset, zoom, selectedComponentId]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Interaction handlers (simplified)
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (panMode) {
      // Start panning logic
    } else {
      // Select/Move logic
    }
  };

  return (
    <div className="flex h-screen bg-slate-200 overflow-hidden dir-rtl">
      {/* LEFT SIDE: Toolbox */}
      <div className="w-20 bg-white border-l border-slate-300 flex flex-col items-center py-4 space-y-6 z-30 shadow-lg">
        <button 
          onClick={() => setTool('select')}
          className={`p-3 rounded-xl ${tool === 'select' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-100'}`}
        >
          <MousePointer2 size={24} />
        </button>
        <button 
          onClick={() => setTool('move')}
          className={`p-3 rounded-xl ${tool === 'move' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-100'}`}
        >
          <Layers size={24} />
        </button>
        <div className="w-10 h-[1px] bg-slate-200 my-2" />
        <button className="p-3 text-slate-400 hover:bg-slate-100 rounded-xl">
          <Square size={24} />
        </button>
        <button className="p-3 text-slate-400 hover:bg-slate-100 rounded-xl">
          <Circle size={24} />
        </button>
        <div className="flex-1" />
        <button className="p-3 text-red-400 hover:bg-red-50 rounded-xl">
          <Trash2 size={24} />
        </button>
      </div>

      {/* CENTER: Canvas Area */}
      <div className="flex-1 relative flex flex-col">
        {/* Designer Toolbar */}
        <div className="h-14 bg-white border-b border-slate-300 flex items-center justify-between px-4 shadow-sm">
          <div className="flex items-center space-x-reverse space-x-2">
            <button onClick={onExit} className="p-2 hover:bg-slate-100 rounded-md text-slate-500"><ChevronRight size={20}/></button>
            <div className="h-6 w-[1px] bg-slate-200 mx-2" />
            <span className="font-bold text-slate-700">{design.name}</span>
          </div>

          <div className="flex items-center space-x-reverse space-x-4">
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button className="p-1.5 hover:bg-white rounded-md"><Undo size={18} /></button>
              <button className="p-1.5 hover:bg-white rounded-md"><Redo size={18} /></button>
            </div>
            <div className="flex items-center space-x-reverse space-x-2 bg-slate-100 rounded-lg p-1">
              <button onClick={() => setZoom(z => Math.max(0.1, z - 0.1))} className="p-1.5 hover:bg-white rounded-md"><ZoomOut size={18} /></button>
              <span className="text-xs font-medium w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.min(5, z + 0.1))} className="p-1.5 hover:bg-white rounded-md"><ZoomIn size={18} /></button>
            </div>
          </div>

          <div className="flex items-center space-x-reverse space-x-2">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold">
              <Save size={16} className="ml-2" />
              حفظ التصميم
            </button>
            <button className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 text-sm font-bold">
              <Download size={16} className="ml-2" />
              تقرير PDF
            </button>
          </div>
        </div>

        {/* Main Drawing Canvas */}
        <div className="flex-1 bg-slate-300 overflow-hidden relative cursor-crosshair">
          <canvas 
            ref={canvasRef}
            width={2000}
            height={2000}
            className="bg-white shadow-2xl"
            onMouseDown={handleCanvasMouseDown}
          />
        </div>

        {/* Bottom Bar: Live Summary */}
        <div className="h-12 bg-slate-900 text-white flex items-center px-6 text-sm">
          <div className="flex items-center space-x-reverse space-x-4">
            <span className="text-slate-400">إجمالي الألومنيوم:</span>
            <span className="font-bold text-blue-400">12.5 متر</span>
            <span className="text-slate-400 ml-4">|</span>
            <span className="text-slate-400">التكلفة التقديرية:</span>
            <span className="font-bold text-green-400">450.00 د.إ</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Properties Panel */}
      <div className="w-80 bg-white border-r border-slate-300 flex flex-col z-30 shadow-lg">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center">
            <Settings2 size={18} className="ml-2 text-blue-500" />
            خصائص العنصر
          </h3>
          <button onClick={() => setSelectedComponentId(null)} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {selectedComponentId ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">الإعدادات العامة</h4>
                <div className="space-y-2">
                  <label className="text-sm text-slate-600">النوع</label>
                  <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                    <option>درفة ملفوفة 5.5 سم</option>
                    <option>قاطع عريض 6.5 سم</option>
                    <option>ثابت</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-600">العرض (سم)</label>
                    <input type="number" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" defaultValue={50} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-600">الارتفاع (سم)</label>
                    <input type="number" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" defaultValue={100} />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">الموضع والدوران</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-600">X بالسم</label>
                    <input type="number" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" defaultValue={10} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-600">Y بالسم</label>
                    <input type="number" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" defaultValue={10} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-600">الدوران (درجة)</label>
                  <input type="number" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" defaultValue={0} />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-8">
              <MousePointer2 size={48} className="mb-4 opacity-20" />
              <p className="text-sm">قم بتحديد عنصر من التصميم لعرض خصائصه</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <button className="w-full py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors">
            تكرار العنصر
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualDesigner;
