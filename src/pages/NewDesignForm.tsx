import React, { useState, useEffect } from 'react';
import { 
  Ruler, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Layers, 
  Settings2, 
  X,
  Download,
  Save,
  Undo,
  Redo,
  MousePointer2,
  Square,
  Circle,
  ArrowUpCircle,
  ArrowDownCircle,
  ArrowLeftCircle,
  ArrowRightCircle
} from 'lucide-react';
import { 
  OpeningType, 
  ComponentType, 
  Dimensions, 
  Profile, 
  INITIAL_PROFILES 
} from '../types';

interface NewDesignFormProps {
  onDesignCreated: (dimensions: Dimensions, type: OpeningType, componentType: ComponentType, frameProfile: Profile) => void;
}

const NewDesignForm = ({ onDesignCreated }: NewDesignFormProps) => {
  const [openingType, setOpeningType] = useState<OpeningType>('rectangular');
  const [componentType, setComponentType] = useState<ComponentType>('window');
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 100, height: 100 });
  const [frameProfile, setFrameProfile] = useState<Profile>(INITIAL_PROFILES[0]);

  const handleCreateDesign = () => {
    onDesignCreated(dimensions, openingType, componentType, frameProfile);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">بدء تصميم جديد</h2>
        <p className="text-slate-500 text-sm">قم بإدخال أبعاد الفتحة واختيار النظام</p>
      </div>

      <div className="p-8 space-y-8">
        {/* 1. Select Component Type */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-4">نوع المنتج</label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setComponentType('window')}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                componentType === 'window' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-500 hover:border-slate-200'
              }`}
            >
              <Layers size={32} className="mb-2" />
              <span className="font-bold">نافذة</span>
            </button>
            <button 
              onClick={() => setComponentType('door')}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                componentType === 'door' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-500 hover:border-slate-200'
              }`}
            >
              <Maximize2 size={32} className="mb-2" />
              <span className="font-bold">باب</span>
            </button>
          </div>
        </div>

        {/* 2. Select Opening Type */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-4">شكل الفتحة</label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setOpeningType('rectangular')}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                openingType === 'rectangular' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-500 hover:border-slate-200'
              }`}
            >
              <Square size={32} className="mb-2" />
              <span className="font-bold">مستطيلة</span>
            </button>
            <button 
              onClick={() => setOpeningType('arched')}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                openingType === 'arched' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-500 hover:border-slate-200'
              }`}
            >
              <Circle size={32} className="mb-2" />
              <span className="font-bold">مقوسة</span>
            </button>
          </div>
        </div>

        {/* 3. Dimensions */}
        <div className="bg-slate-50 p-6 rounded-2xl space-y-6">
          <div className="flex items-center space-x-reverse space-x-2 mb-2">
            <Ruler size={18} className="text-blue-500" />
            <h3 className="font-bold text-slate-700">الأبعاد (سم)</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-500">العرض</label>
              <input 
                type="number" 
                value={dimensions.width}
                onChange={(e) => setDimensions({...dimensions, width: Number(e.target.value)})}
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-500">الارتفاع</label>
              <input 
                type="number" 
                value={dimensions.height}
                onChange={(e) => setDimensions({...dimensions, height: Number(e.target.value)})}
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {openingType === 'arched' && (
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-200">
              <div className="space-y-2">
                <label className="text-sm text-slate-500">الارتفاع الجالس</label>
                <input 
                  type="number" 
                  value={dimensions.seatedHeight || 0}
                  onChange={(e) => setDimensions({...dimensions, seatedHeight: Number(e.target.value)})}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-500">الارتفاع الكلي</label>
                <input 
                  type="number" 
                  value={dimensions.totalHeight || 0}
                  onChange={(e) => setDimensions({...dimensions, totalHeight: Number(e.target.value)})}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* 4. Frame Selection */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-4">اختيار الحلق/الإطار</label>
          <div className="grid grid-cols-1 gap-3">
            {INITIAL_PROFILES.filter(p => p.category === 'frame').map(profile => (
              <button 
                key={profile.id}
                onClick={() => setFrameProfile(profile)}
                className={`p-4 rounded-xl border-2 text-right transition-all flex items-center justify-between ${
                  frameProfile.id === profile.id ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-200 text-slate-600'
                }`}
              >
                <div>
                  <div className="font-bold">{profile.nameAr}</div>
                  <div className="text-xs text-slate-400">{profile.nameEn}</div>
                </div>
                {frameProfile.id === profile.id && <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm shadow-blue-200" />}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 flex gap-4">
          <button 
            onClick={handleCreateDesign}
            className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            إنشاء التصميم
          </button>
          <button className="px-6 py-4 border-2 border-slate-100 rounded-xl text-slate-500 hover:bg-slate-50">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDesignForm;
