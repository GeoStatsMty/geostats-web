'use client';
import { useState } from 'react';
import { Button } from 'ui';
import { Menu } from 'lucide-react';
import { MapboxMap } from '../../components/mapbox-map';
import { FiltersList, MapFilters } from '../../components/filters-list';

export default function DesktopPage() {
    const [mapFilters, setMapFilters] = useState<MapFilters>({
        showFiscalia: true,
        showCubrimientoDeSitio: false,
        showRezagoSocial: false,
        showSitiosDeApoyo: false,
        showModelo: false,
        showPeriodico: true,
    });
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="relative h-full w-full bg-neutral-800">
            <MapboxMap
                showFiscalia={mapFilters.showFiscalia}
                showCubrimientoDeSitio={mapFilters.showCubrimientoDeSitio}
                showRezagoSocial={mapFilters.showRezagoSocial}
                showSitiosDeApoyo={mapFilters.showSitiosDeApoyo}
                showModelo={mapFilters.showModelo}
                showPeriodico={mapFilters.showPeriodico}
            />

            <div className="absolute top-4 left-4 z-10">
                <Button
                    variant='secondary'
                    size='icon'
                    className={`w-10 h-10 shadow-md flex justify-center rounded-md ${
                        showFilters
                            ? 'bg-white'
                            : 'bg-neutral-900 hover:bg-[#1A1A1A]'
                    }`}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Menu
                        className={`h-6 w-6 ${showFilters ? 'text-neutral-900' : 'text-[#FAFAFA]'}`}
                    />
                </Button>
            </div>

            {showFilters && (
                <div className="absolute top-4 left-20 z-10 bg-neutral-900 p-4 rounded-lg shadow-xl">
                    <h2 className="text-white text-lg mb-3">Filtros</h2>
                    <div className="w-[480px]">
                        <FiltersList
                            filters={mapFilters}
                            onFiltersChange={setMapFilters}
                            variant="compact"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}