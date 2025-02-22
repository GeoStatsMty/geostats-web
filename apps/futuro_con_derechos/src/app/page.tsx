'use client';

/* Limpiar código, documentar y agregar diseño responsivo. */
import TopBar from '@/components/top-bar.tsx';
import dynamic from 'next/dynamic';
import { Paper, Switch } from 'geostats-ui';
import { Button } from 'react-aria-components';
import { useState } from 'react';
import ChevronRight from '@material-design-icons/svg/round/chevron_right.svg';

// Cargando componentes de manera dinámica para evitar SSR
const MainMap = dynamic(() => import('@/components/main-map.tsx'), {
  ssr: false,
});

const InformationPanel = dynamic(() => import('@/components/information-panel.tsx'), { ssr: false });

export default function Home() {
  // Estados para los controles
  const [showControls, setShowControls] = useState(false);
  const [showFiscalia, setShowFiscalia] = useState(false);
  const [showCubrimientoDeSitio, setShowCubrimientoDeSitio] = useState(true);
  const [showRezagoSocial, setShowRezagoSocial] = useState(true);
  const [showSitiosDeApoyo, setShowSitiosDeApoyo] = useState(true);
  const [showModelo, setShowModelo] = useState(false);
  const [showInformationPanel, setShowInformationPanel] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);

  return (
    <main className="h-screen w-screen overflow-hidden bg-stone-950 text-stone-300">
      {/* Barra superior con animación de deslizamiento hacia arriba */}
      <TopBar
        className={`fixed top-0 left-0 w-full transition-transform duration-500 z-50 
        ${showTopBar ? 'translate-y-0' : '-translate-y-full'}`}
      />

      <div className="relative h-full w-full">
        {/* Panel de Información con animación y transición */}
        <InformationPanel
          className={`absolute left-0 top-0 h-full z-50 transition-all duration-300 
          ${showInformationPanel ? 'w-[95%] md:w-[30%]' : 'w-0'}`}
          showInformationPanel={showInformationPanel}
        >
          <Button
            className="absolute right-0 bg-inherit flex justify-center items-center rounded-md"
            onPress={() => setShowInformationPanel(!showInformationPanel)}
          >
            <ChevronRight className="fill-white" />
          </Button>
        </InformationPanel>

        {/* Overlay global con transición de opacidad */}
        <div
          className={`absolute inset-0 z-40 bg-black transition-opacity duration-500 ease-in-out 
          ${showInformationPanel ? 'opacity-70' : 'opacity-0 pointer-events-none'}`}
        />

        {/* Mapa principal con posición fija */}
        <div className="absolute inset-0 z-30">
          <MainMap
            className="h-full w-full"
            showModelo={showModelo}
            showFiscalia={showFiscalia}
            showCubrimientoDeSitio={showCubrimientoDeSitio}
            showRezagoSocial={showRezagoSocial}
            showSitiosDeApoyo={showSitiosDeApoyo}
          />
        </div>

        {/* Controles para pantallas grandes */}
        <Paper className='absolute right-8 top-20 z-50 hidden md:block'>
          <div className='inline-flex flex-row mb-4 border border-gray-400 rounded-md w-full'>
            <Button className={`flex-1 p-2 rounded-md ${showFiscalia ? 'bg-white text-black' : 'bg-inherit text-white'}`} onPress={() => setShowFiscalia(true)}>Fiscalia</Button>
            <Button className={`flex-1 p-2 rounded-md ${!showFiscalia ? 'bg-white text-black' : 'bg-inherit text-white'}`} onPress={() => setShowFiscalia(false)}>Periodico</Button>
          </div>
          <Switch label='Mostrar Cubrimiento De Sitio' isSelected={showCubrimientoDeSitio} onChange={setShowCubrimientoDeSitio} className='mb-4' />
          <Switch label='Mostrar Rezago Social' isSelected={showRezagoSocial} onChange={setShowRezagoSocial} className='mb-4' />
          <Switch label='Mostrar Sitios De Apoyo' isSelected={showSitiosDeApoyo} onChange={setShowSitiosDeApoyo} className='mb-4' />
          <Switch label='Mostrar predicciones del modelo' isSelected={showModelo} onChange={setShowModelo} className='mb-4' />
        </Paper>

        {/* Controles para pantallas pequeñas */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-4 md:hidden">
          <Button className={`p-3 rounded-full ${showFiscalia ? 'bg-white text-black' : 'bg-stone-900 text-white'}`} onPress={() => setShowFiscalia(true)}>Fiscalía</Button>
          <Button className="p-3 rounded-full bg-stone-900 text-white" onPress={() => setShowControls(!showControls)}>
            <ChevronRight className="fill-white rotate-90" />
          </Button>
          <Button className={`p-3 rounded-full ${!showFiscalia ? 'bg-white text-black' : 'bg-stone-900 text-white'}`} onPress={() => setShowFiscalia(false)}>Periódico</Button>
        </div>

        {/* Menú centrado en pantalla */}
        <Paper className={`fixed inset-0 flex items-center justify-center p-4 bg-opacity-50 bg-black z-40 transition-all duration-300 ${showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
          <div className="w-full max-w-lg bg-black rounded-md shadow-lg p-6">
            <Switch label="Mostrar Cubrimiento De Sitio" isSelected={showCubrimientoDeSitio} onChange={setShowCubrimientoDeSitio} className="mb-4" />
            <Switch label="Mostrar Rezago Social" isSelected={showRezagoSocial} onChange={setShowRezagoSocial} className="mb-4" />
            <Switch label="Mostrar Sitios De Apoyo" isSelected={showSitiosDeApoyo} onChange={setShowSitiosDeApoyo} className="mb-4" />
            <Switch label="Mostrar Predicciones del Modelo" isSelected={showModelo} onChange={setShowModelo} className="mb-4" />
          </div>
        </Paper>
      </div>
    </main>
  );
}
