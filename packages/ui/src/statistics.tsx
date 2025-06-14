// src/components/statistics.tsx
'use client';
import React from 'react';

export interface StatisticsProps {
  municipio: string;
  direccion: string;
  siniestros: number;
  siniestrosPredichos: number;
  probabilidad: number;
}

export function Statistics({
  municipio,
  direccion,
  siniestros,
  siniestrosPredichos,
  probabilidad,
}: StatisticsProps) {
  return (
    <div className='mt-5 p-4 bg-neutral-900 rounded-lg'>
      <h1 className="font-['Inter'] text-white text-2xl pb-2 border-b border-[#362A2A]">
        Estadísticas
      </h1>
      <div className='flex flex-col space-y-2 text-[#A3A3A3] mt-4'>
        <p><strong>Municipio:</strong> {municipio}</p>
        <p><strong>Dirección:</strong> {direccion}</p>
        <p><strong>Número de siniestros:</strong> {siniestros}</p>
        <p><strong>Siniestros predichos:</strong> {siniestrosPredichos}</p>
        <p><strong>Probabilidad:</strong> {probabilidad}%</p>
      </div>
    </div>
  );
}
