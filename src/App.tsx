import React, { useState } from 'react';
import Sidebar from '../components/Layout';
import TopBar from '../components/Layout';
import Dashboard from './Dashboard';
import NewDesignForm from './NewDesignForm';
import VisualDesigner from './VisualDesigner';
import { View } from '../types';
import { Design, Dimensions, OpeningType, ComponentType, Profile } from '../types';

const App = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [currentDesign, setCurrentDesign] = useState<Design | null>(null);
  const [isDesigning, setIsDesigning] = useState(false);

  // Handlers
  const handleNewDesignCreated = (
    dimensions: Dimensions, 
    openingType: OpeningType, 
    componentType: ComponentType, 
    frameProfile: Profile
  ) => {
    const newDesign: Design = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'تصميم جديد',
      customerName: 'عميل جديد',
      openingType,
      componentType,
      dimensions,
      frameProfileId: frameProfile.id,
      components: [],
      createdAt: new Date()
    };
    setCurrentDesign(newDesign);
    setIsDesigning(true);
  };

  const handleExitDesigner = () => {
    setIsDesigning(false);
    setCurrentDesign(null);
    setActiveView('designs');
  };

  const handleSaveDesign = (design: Design) => {
    console.log('Saving design:', design);
    setIsDesigning(false);
    setActiveView('designs');
  };

  // Rendering logic
  if (isDesigning && currentDesign) {
    return (
      <VisualDesigner 
        design={currentDesign} 
        onSave={handleSaveDesign} 
        onExit={handleExitDesigner} 
      />
    );
  }

  return (
    <div className="min-h-screen flex overflow-hidden dir-rtl">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex flex-col relative mr-20 md:mr-64 transition-all duration-300">
        <TopBar onMenuClick={() => {}} />
        
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'new-design' && (
            <NewDesignForm onDesignCreated={handleNewDesignCreated} />
          )}
          {activeView === 'designs' && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <div className="text-6xl mb-4">📂</div>
              <h2 className="text-xl font-bold">لا توجد تصاميم محفوظة حالياً</h2>
              <button 
                onClick={() => setActiveView('new-design')}
                className="mt-4 text-blue-600 hover:underline"
              >
                ابدأ بتصميم أول مشروع لك
              </button>
            </div>
          )}
          {/* Other views placeholder */}
          {['customers', 'inventory', 'profiles', 'settings'].includes(activeView) && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <div className="text-6xl mb-4">🛠️</div>
              <h2 className="text-xl font-bold">هذه الميزة ستكون متاحة قريباً</h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
