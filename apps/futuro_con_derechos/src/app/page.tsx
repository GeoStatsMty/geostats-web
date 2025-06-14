'use client';
import { useState } from 'react';
import {
  Button,
  FiltersContainer,
  MapboxMap,
  MapFilters,
  Statistics,
} from 'ui';
import type { PointData } from 'ui';
import { Menu, X } from 'lucide-react';
import { ModalSheet } from '@/components/modal-sheet.tsx';

export default function Home() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [buttonWhite, setButtonWhite] = useState(false);

  // Nuevo estado para estadísticas
  const [selectedStats, setSelectedStats] = useState<PointData | null>(null);

  const [mapFilters, setMapFilters] = useState<MapFilters>({
    showFiscalia: true,
    showCubrimientoDeSitio: false,
    showRezagoSocial: false,
    showSitiosDeApoyo: false,
    showModelo: false, // Cambia a false si no quieres la capa
    showPeriodico: true,
  });

  // Handler que dispara al hacer click en un punto del mapa
  const handlePointClick = (data: PointData) => {
    setSelectedStats(data);      // Esto muestra el modal de estadísticas
    setFiltersOpen(false);       // Esto cierra el menú de filtros si está abierto
    setButtonWhite(false);
  };

  return (
    <main className="w-screen h-dvh relative bg-neutral-800 overflow-hidden">
      <MapboxMap
        showFiscalia={mapFilters.showFiscalia}
        showCubrimientoDeSitio={mapFilters.showCubrimientoDeSitio}
        showRezagoSocial={mapFilters.showRezagoSocial}
        showSitiosDeApoyo={mapFilters.showSitiosDeApoyo}
        showModelo={mapFilters.showModelo}
        showPeriodico={mapFilters.showPeriodico}
        onPointClick={handlePointClick}
      />

      {/* Mantiene el container de filtros antiguo */}
      <FiltersContainer
        open={filtersOpen}
        onOpenChange={open => {
          setFiltersOpen(open);
          if (!open) {
            setButtonWhite(false);
            setSelectedStats(null);
          }
        }}
        filters={mapFilters}
        onFiltersChange={setMapFilters}
      />

      <ModalSheet
        header={
          <h1 className="text-white text-2xl">
            {selectedStats ? 'Detalles del Punto' : 'Feminicidios en el Área Metropolitana'}
          </h1>
        }
        controls={
          selectedStats ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedStats(null);
                setFiltersOpen(false);
              }}
            >
              <X className="h-6 w-6 text-white" />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="icon"
              className={`w-10 h-10 shadow-md flex justify-center rounded-md ${
                buttonWhite ? 'bg-white' : 'bg-neutral-900 hover:bg-[#1A1A1A]'
              }`}
              onClick={() => {
                setFiltersOpen(true);
                setButtonWhite(true);
                setSelectedStats(null);
              }}
            >
              <Menu
                className={`h-6 w-6 ${
                  buttonWhite ? 'text-neutral-900' : 'text-[#FAFAFA]'
                }`}
              />
            </Button>
          )
        }
      >
        {selectedStats ? (
          // Si hay stats seleccionadas, muestra el componente de estadísticas
          <Statistics
            municipio={selectedStats.municipio}
            direccion={selectedStats.direccion}
            siniestros={selectedStats.siniestros}
            siniestrosPredichos={selectedStats.siniestrosPredichos}
            probabilidad={selectedStats.probabilidad}
          />
        ) : showFilters ? (
          // Panel de filtros interno (igual que antes)
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg sm:max-w-[500px] w-full mx-4 p-6 relative">
              <div className="flex flex-row items-center justify-between mb-4">
                <span className="text-xl font-bold">Filtros</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(false)}
                  className="rounded-full h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 py-4">
                {/* Aquí van los elementos de filtro */}
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline">Clear</Button>
                <Button>Aplicar Filtros</Button>
              </div>
            </div>
          </div>
        ) : (
          // Contenido por defecto (lorem ipsum) cuando no hay stats ni panel de filtros abierto
          <div className="flex flex-col items-center">
            <div className="space-y-2 px-4">
              <p className='text-[#A3A3A3]'>
                            Lorem Ipsum is simply dummy text of the printing
                            and typesetting industry. Lorem Ipsum has been
                            the industry&apos;s standard dummy text ever
                            since the unknown printer took a galley of type
                            and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but
                            also the leap into electronic typesetting,
                            remaining essentially unchanged. It was
                            popularised in the 1960s with the the release of
                            Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing
                            software like Aldus PageMaker including versions
                            of Lorem Ipsum Contrary to popular belief, Lorem
                            Ipsum is not simply random text. It has roots
                            roots in a piece of classical Latin literature
                            from 45 BC, making it over 2000 years old.
                            Richard McClintock, a Latin professor at
                            Hampden-Sydney College in Virginia, looked up
                            one of the more obscure Latin words,
                            consectetur, from a Lorem Ipsum passage, and
                            going through the cites of the word in classical
                            literature, discovered the undoubtable source.
                            Lorem Ipsum comes from sections 1.10.32 and
                            1.10.33 of &quot;de Finibus Bonorum et
                            Malorum&quot;
                        </p>
                        <p className='text-[#A3A3A3]'>
                            Lorem Ipsum is simply dummy text of the printing
                            and typesetting industry. Lorem Ipsum has been
                            the industry&apos;s standard dummy text ever
                            since the unknown printer took a galley of type
                            and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but
                            also the leap into electronic typesetting,
                            remaining essentially unchanged. It was
                            popularised in the 1960s with the the release of
                            Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing
                            software like Aldus PageMaker including versions
                            of Lorem Ipsum Contrary to popular belief, Lorem
                            Ipsum is not simply random text. It has roots
                            roots in a piece of classical Latin literature
                            from 45 BC, making it over 2000 years old.
                            Richard McClintock, a Latin professor at
                            Hampden-Sydney College in Virginia, looked up
                            one of the more obscure Latin words,
                            consectetur, from a Lorem Ipsum passage, and
                            going through the cites of the word in classical
                            literature, discovered the undoubtable source.
                            Lorem Ipsum comes from sections 1.10.32 and
                            1.10.33 of &quot;de Finibus Bonorum et
                            Malorum&quot;
                        </p>
            </div>
          </div>
        )}
      </ModalSheet>
    </main>
  );
}
