// src/ui/MapboxMap.tsx
'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { Map } from 'mapbox-gl';
import type { Feature } from 'geojson';
import { useEffect, useRef, useState } from 'react';
import {
  addSitiosDeApoyoLayer,
  addSitiosDeApoyoSource,
  removeSitiosDeApoyoLayer,
} from '@/lib/sitios-de-apoyo';
import {
  addFeminicidiosFiscaliaLayer,
  addFeminiciosFiscaliaSource,
  removeFeminicidiosFiscaliaLayer,
} from '@/lib/feminicidios-fiscalia';
import {
  addFeminicidiosPeriodicosLayer,
  addFeminicidiosPeriodicosSource,
  removeFeminicidiosPeriodicosLayer,
} from '@/lib/feminicidios-periodico';
import {
  addAreaSinCubrimientoDeSitioLayer,
  addAreaSinCubrimientoDeSitioSource,
  removeAreaSinCubrimientoDeSitioLayer,
} from '@/lib/area-sin-cubrimiento-de-sitio';
import {
  addResagoSocialLayer,
  addResagoSocialSource,
  removeResagoSocialLayer,
} from '@/lib/resago-social';
import {
  addModeloLayer,
  addModeloSource,
  removeModeloLayer,
} from '@/lib/modelo';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic3RvY2s0NCIsImEiOiJjbHE0amx3aXEwODQyMmlsb3RnNHk0MDN1In0.qWALc9kC_uuNNBucnTeauw';

const monterreyLat = 25.67;
const monterreyLng = -100.32;
const initialZoom = 10.5;

export type PointData = {
  municipio: string;
  direccion: string;
  siniestros: number;
  siniestrosPredichos: number;
  probabilidad: number;
};

export type MapboxMapProps = {
  showFiscalia: boolean;
  showCubrimientoDeSitio: boolean;
  showRezagoSocial: boolean;
  showSitiosDeApoyo: boolean;
  showModelo: boolean;
  showPeriodico: boolean;
  onPointClick?: (data: PointData) => void;
};

export function MapboxMap({
  showFiscalia,
  showCubrimientoDeSitio,
  showRezagoSocial,
  showSitiosDeApoyo,
  showModelo,
  showPeriodico,
  onPointClick,
}: MapboxMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1) Inicializa el mapa y las fuentes
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/stock44/clwwmpmk7003501nm1y6eh0q4',
        center: [monterreyLng, monterreyLat],
        maxBounds: [
          [monterreyLng - 2, monterreyLat - 3],
          [monterreyLng + 2, monterreyLat + 3],
        ],
        zoom: initialZoom,
      });

      map.on('load', () => {
        addResagoSocialSource(map);
        addAreaSinCubrimientoDeSitioSource(map);
        addFeminiciosFiscaliaSource(map);
        addFeminicidiosPeriodicosSource(map);
        addSitiosDeApoyoSource(map);
        addModeloSource(map);
        setIsLoaded(true);
      });

      mapRef.current = map;
      return () => map.remove();
    }
  }, []);

  // 2) Capas de fiscalía y periódico
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;
    const map = mapRef.current;

    if (map.getLayer('feminicidios-fiscalia-layer')) {
      removeFeminicidiosFiscaliaLayer(map);
    }
    if (map.getLayer('feminicidios-periodicos-layer')) {
      removeFeminicidiosPeriodicosLayer(map);
    }
    if (showFiscalia) {
      addFeminicidiosFiscaliaLayer(map);
    }
    if (showPeriodico) {
      addFeminicidiosPeriodicosLayer(map);
    }

    return () => {
      if (map.getLayer('feminicidios-fiscalia-layer')) {
        removeFeminicidiosFiscaliaLayer(map);
      }
      if (map.getLayer('feminicidios-periodicos-layer')) {
        removeFeminicidiosPeriodicosLayer(map);
      }
    };
  }, [showFiscalia, showPeriodico, isLoaded]);

  // 3) Popup al hover sobre fiscalía/ periódico
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;
    const map = mapRef.current;
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    const layers = [
      { id: 'feminicidios-fiscalia-layer', defaultText: 'Sin datos disponibles fiscalia' },
      { id: 'feminicidios-periodicos-layer', defaultText: 'Sin datos disponibles periodico' },
    ];

    const onMouseEnter = (e: mapboxgl.MapMouseEvent & { features?: Feature[] }) => {
      if (e.features?.length) {
        const pt = e.features[0].properties;
        const num = pt?.NUMPOINTS ?? pt?.numPoints ?? '—';
        popup
          .setLngLat(e.lngLat)
          .setHTML(`<div style="color:black">Número de siniestros: ${num}</div>`)
          .addTo(map);
      }
    };
    const onMouseLeave = () => popup.remove();

    for (const { id } of layers) {
      map.on('mouseenter', id, onMouseEnter);
      map.on('mouseleave', id, onMouseLeave);
    }

    return () => {
      for (const { id } of layers) {
        map.off('mouseenter', id, onMouseEnter);
        map.off('mouseleave', id, onMouseLeave);
      }
      popup.remove();
    };
  }, [isLoaded]);

  // 4) Capa área sin cubrimiento
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;
    const map = mapRef.current;
    if (map.getLayer('area-sin-cubrimiento-de-sitio-layer')) {
      removeAreaSinCubrimientoDeSitioLayer(map);
    }
    if (showCubrimientoDeSitio) {
      addAreaSinCubrimientoDeSitioLayer(map);
    }
    return () => {
      if (map.getLayer('area-sin-cubrimiento-de-sitio-layer')) {
        removeAreaSinCubrimientoDeSitioLayer(map);
      }
    };
  }, [showCubrimientoDeSitio, isLoaded]);

  // 5) Capa rezago social
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;
    const map = mapRef.current;
    if (map.getLayer('resago-social-layer')) {
      removeResagoSocialLayer(map);
    }
    if (showRezagoSocial) {
      addResagoSocialLayer(map);
    }
    return () => {
      if (map.getLayer('resago-social-layer')) {
        removeResagoSocialLayer(map);
      }
    };
  }, [showRezagoSocial, isLoaded]);

  // 6) Capa sitios de apoyo
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;
    const map = mapRef.current;
    if (map.getLayer('sitios-de-apoyo-layer')) {
      removeSitiosDeApoyoLayer(map);
    }
    if (showSitiosDeApoyo) {
      addSitiosDeApoyoLayer(map);
    }
    return () => {
      if (map.getLayer('sitios-de-apoyo-layer')) {
        removeSitiosDeApoyoLayer(map);
      }
    };
  }, [showSitiosDeApoyo, isLoaded]);

  // 7) Capa modelo: hover + click para stats
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;
    const map = mapRef.current;
    const layerId = 'modelo-layer';

    // limpia si existe
    if (map.getLayer(layerId)) {
      removeModeloLayer(map);
    }
    if (!showModelo) return;

    addModeloLayer(map);

    const modeloPopup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

    const onMouseMove = (e: mapboxgl.MapMouseEvent & { features?: Feature[] }) => {
      if (!e.features?.length) return;
      const p = e.features[0].properties!;
      modeloPopup
        .setLngLat(e.lngLat)
        .setHTML(
          `<div style="color:black">
             Siniestros predichos: ${p['Predicció']}<br>
             Siniestros reales: ${p['FemTot']}<br>
             Probabilidad: ${p['ProbAtLe']}
           </div>`
        )
        .addTo(map);
    };
    const onMouseLeave = () => modeloPopup.remove();

    map.on('mousemove', layerId, onMouseMove);
    map.on('mouseleave', layerId, onMouseLeave);

    // click para abrir modal de stats
    const onClick = (e: mapboxgl.MapMouseEvent & { features?: Feature[] }) => {
      if (!e.features?.length || !onPointClick) return;
      const props = e.features[0].properties!;
      const data: PointData = {
        municipio: String(props['Municipio'] ?? 'Desconocido'),
        direccion: String(props['Direccion'] ?? '—'),
        siniestros: Number(props['FemTot'] ?? 0),
        siniestrosPredichos: Number(props['Predicció'] ?? 0),
        probabilidad: Number(props['ProbAtLe'] ?? 0) * 100,
      };
      onPointClick(data);
    };
    map.on('click', layerId, onClick);

    return () => {
      map.off('mousemove', layerId, onMouseMove);
      map.off('mouseleave', layerId, onMouseLeave);
      map.off('click', layerId, onClick);
      if (map.getLayer(layerId)) {
        removeModeloLayer(map);
      }
      modeloPopup.remove();
    };
  }, [showModelo, isLoaded, onPointClick]);

  // Render del contenedor
  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    />
  );
}
