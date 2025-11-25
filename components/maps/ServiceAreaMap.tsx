'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Plus, Minus } from 'lucide-react'

// Custom blue marker icon with brand colors
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative;">
        <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        className="flex items-center justify-center h-10 w-10 bg-white dark:bg-slate-800 border-2 border-brand-deep-blue dark:border-brand-bright-blue rounded-lg shadow-lg hover:bg-brand-bright-blue hover:text-white transition-all duration-150"
        aria-label="Zoom in"
      >
        <Plus className="h-5 w-5" strokeWidth={2} />
      </button>
      <button
        onClick={handleZoomOut}
        className="flex items-center justify-center h-10 w-10 bg-white dark:bg-slate-800 border-2 border-brand-deep-blue dark:border-brand-bright-blue rounded-lg shadow-lg hover:bg-brand-bright-blue hover:text-white transition-all duration-150"
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
  const customIcon = createCustomIcon()

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden border-2 border-neutral-light-grey dark:border-slate-700 relative">
      <MapContainer
        center={centerPoint}
        zoom={8}
        scrollWheelZoom={false}
        zoomControl={false} // Disable default zoom controls
        className="h-full w-full z-0"
        style={{ zIndex: 0 }}
      >
        {/* Custom styled map tiles - CartoDB Voyager for cleaner look */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
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
          <Marker key={city.name} position={city.position} icon={customIcon}>
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
