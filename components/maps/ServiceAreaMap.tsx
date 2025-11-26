'use client'

// Leaflet CSS - only loaded when map component is rendered (code-split)
import 'leaflet/dist/leaflet.css'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Plus, Minus } from 'lucide-react'

// Custom blue marker icon with brand colors and accessibility
const createCustomIcon = (cityName: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative;" role="img" aria-label="${cityName} service location">
        <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 13 16 26 16 26s16-13 16-26c0-8.837-7.163-16-16-16z" fill="#0077D9"/>
          <circle cx="16" cy="16" r="6" fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
  })
}

// Custom zoom controls component
function CustomZoomControls() {
  const map = useMap()

  const handleZoomIn = () => {
    map.zoomIn()
  }

  const handleZoomOut = () => {
    map.zoomOut()
  }

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <button
        onClick={handleZoomIn}
        className="flex items-center justify-center w-[40px] h-[40px] bg-white dark:bg-slate-800 border-2 border-brand-bright-blue rounded-lg shadow-lg cursor-pointer text-brand-bright-blue hover:bg-[#F0F7FF] dark:hover:bg-brand-bright-blue/20 focus:outline-none focus:ring-2 focus:ring-brand-bright-blue focus:ring-offset-2 transition-all duration-150"
        aria-label="Zoom in"
      >
        <Plus className="h-5 w-5" strokeWidth={2} />
      </button>
      <button
        onClick={handleZoomOut}
        className="flex items-center justify-center w-[40px] h-[40px] bg-white dark:bg-slate-800 border-2 border-brand-bright-blue rounded-lg shadow-lg cursor-pointer text-brand-bright-blue hover:bg-[#F0F7FF] dark:hover:bg-brand-bright-blue/20 focus:outline-none focus:ring-2 focus:ring-brand-bright-blue focus:ring-offset-2 transition-all duration-150"
        aria-label="Zoom out"
      >
        <Minus className="h-5 w-5" strokeWidth={2} />
      </button>
    </div>
  )
}

// West Springfield, MA (zip 01089) - center point
const centerPoint: [number, number] = [42.1015, -72.5898]

// 100 miles in meters (1 mile = 1609.34 meters)
const radiusInMeters = 100 * 1609.34

// Major cities to mark on the map
const cities = [
  { name: 'West Springfield, MA', position: [42.1015, -72.5898] as [number, number] },
  { name: 'Springfield, MA', position: [42.1015, -72.5898] as [number, number] },
  { name: 'Hartford, CT', position: [41.7658, -72.6734] as [number, number] },
  { name: 'Worcester, MA', position: [42.2626, -71.8023] as [number, number] },
  { name: 'New Haven, CT', position: [41.3083, -72.9279] as [number, number] },
]

export default function ServiceAreaMap() {
  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden border border-[#D0D0D0] dark:border-slate-600 shadow-[0_2px_8px_rgba(0,0,0,0.08)] relative">
      <MapContainer
        center={centerPoint}
        zoom={8}
        scrollWheelZoom={false}
        zoomControl={false} // Disable default zoom controls
        className="h-full w-full z-0"
        style={{ zIndex: 0 }}
      >
        {/* Map tiles - Standard OpenStreetMap with custom overlays */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* 100-mile service radius - semi-transparent Bright Blue circle */}
        <Circle
          center={centerPoint}
          radius={radiusInMeters}
          pathOptions={{
            fillColor: '#0077D9', // brand-bright-blue
            fillOpacity: 0.12,
            color: '#0077D9', // brand-bright-blue
            weight: 2,
            opacity: 0.6,
          }}
        />

        {/* City markers with custom blue pins */}
        {cities.map((city) => (
          <Marker
            key={city.name}
            position={city.position}
            icon={createCustomIcon(city.name)}
            title={`${city.name} - Click to view details`}
          >
            <Popup>
              <div className="p-2">
                <div className="text-sm font-bold text-brand-deep-blue mb-1">{city.name}</div>
                <div className="text-xs text-neutral-charcoal/70">Within service area</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Custom zoom controls */}
        <CustomZoomControls />
      </MapContainer>
    </div>
  )
}
