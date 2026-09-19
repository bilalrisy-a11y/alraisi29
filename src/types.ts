import React, { useState, useEffect } from 'react';

// Types
export type OpeningType = 'rectangular' | 'arched';
export type ComponentType = 'window' | 'door';

export interface Dimensions {
  width: number;
  height: number;
  seatedHeight?: number; // For arch
  totalHeight?: number; // For arch
}

export interface Profile {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'frame' | 'divider' | 'sash' | 'glazing' | 'accessory';
  width: number;
  depth: number;
  pricePerMeter: number;
  image?: string;
  cuttingRules: any;
}

export interface DesignComponent {
  id: string;
  type: string; // e.g., 'sash', 'divider', 'fixed'
  profileId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  properties: any;
}

export interface Design {
  id: string;
  name: string;
  customerName: string;
  openingType: OpeningType;
  componentType: ComponentType;
  dimensions: Dimensions;
  frameProfileId: string;
  components: DesignComponent[];
  createdAt: Date;
}

// Mock Data for initial load
export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'frame-tube-44',
    nameAr: 'تيوب مرد 4×4',
    nameEn: 'Tube frame 4x4',
    category: 'frame',
    width: 4,
    depth: 4,
    pricePerMeter: 25,
    cuttingRules: { angle: 45 }
  },
  {
    id: 'frame-internal-75',
    nameAr: 'حلق داخلي 7.5 سم',
    nameEn: 'Internal Halaq 7.5cm',
    category: 'frame',
    width: 7.5,
    depth: 7.5,
    pricePerMeter: 35,
    cuttingRules: { angle: 90 }
  },
  {
    id: 'divider-small-45',
    nameAr: 'قاطع صغير 4.5 سم',
    nameEn: 'Small divider 4.5cm',
    category: 'divider',
    width: 4.5,
    depth: 3,
    pricePerMeter: 15,
    cuttingRules: { angle: 90 }
  },
  {
    id: 'divider-large-65',
    nameAr: 'قاطع عريض 6.5 سم',
    nameEn: 'Large divider 6.5cm',
    category: 'divider',
    width: 6.5,
    depth: 4,
    pricePerMeter: 20,
    cuttingRules: { angle: 90 }
  },
  {
    id: 'sash-55',
    nameAr: 'درفة ملفوفة 5.5 سم',
    nameEn: 'Rolled Sash 5.5cm',
    category: 'sash',
    width: 5.5,
    depth: 4,
    pricePerMeter: 30,
    cuttingRules: { angle: 45 }
  },
  {
    id: 'sash-door-65',
    nameAr: 'درفة باب 6.5 سم',
    nameEn: 'Door Sash 6.5cm',
    category: 'sash',
    width: 6.5,
    depth: 5,
    pricePerMeter: 40,
    cuttingRules: { angle: 45 }
  }
];

export const STORAGE_KEY = 'AlRaisi_App_Data';
