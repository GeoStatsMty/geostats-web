import { ReactNode } from 'react';

function LegendRow({
    swatch,
    label,
    description,
}: {
    swatch: ReactNode;
    label: string;
    description: string;
}) {
    return (
        <div className='flex items-start gap-3'>
            <div className='mt-1 shrink-0'>{swatch}</div>
            <div>
                <p className='text-sm font-medium text-stone-200'>{label}</p>
                <p className='text-xs leading-5 text-stone-400'>{description}</p>
            </div>
        </div>
    );
}

export function MapLegend() {
    return (
        <section className='rounded-xl border border-neutral-800 bg-neutral-950/70 p-4'>
            <div className='mb-4'>
                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-stone-500'>
                    Cómo leer el mapa
                </p>
                <p className='mt-2 text-sm leading-6 text-stone-300'>
                    Cada capa muestra un tipo de información distinto. Esta guía
                    rápida te ayuda a interpretar colores, símbolos e intensidad.
                </p>
            </div>

            <div className='space-y-4'>
                <div className='space-y-3'>
                    <p className='text-xs font-semibold uppercase tracking-[0.16em] text-stone-500'>
                        Registros de casos
                    </p>

                    <LegendRow
                        swatch={
                            <span className='block h-3 w-3 rounded-full bg-[#ef4444] ring-2 ring-[#ef4444]/30' />
                        }
                        label='Fiscalía'
                        description='Casos registrados en fuentes oficiales.'
                    />

                    <LegendRow
                        swatch={
                            <span className='block h-3 w-3 rounded-full bg-[#f59e0b] ring-2 ring-[#f59e0b]/30' />
                        }
                        label='Periódicos'
                        description='Casos identificados en notas periodísticas.'
                    />
                </div>

                <div className='space-y-3'>
                    <p className='text-xs font-semibold uppercase tracking-[0.16em] text-stone-500'>
                        Contexto territorial
                    </p>

                    <LegendRow
                        swatch={
                            <span className='block h-4 w-7 rounded-sm border border-red-300/50 bg-[rgba(220,40,40,0.12)]' />
                        }
                        label='Área sin Cubrimiento'
                        description='Zonas con menor cercanía o cobertura de sitios de apoyo.'
                    />

                    <div>
                        <p className='mb-2 text-sm font-medium text-stone-200'>
                            Rezago Social
                        </p>
                        <div className='flex flex-wrap gap-2'>
                            <span className='rounded-full bg-[rgba(224,0,0,0.59)] px-3 py-1 text-xs text-white'>
                                Muy alto
                            </span>
                            <span className='rounded-full bg-[#87401d] px-3 py-1 text-xs text-white'>
                                Alto
                            </span>
                            <span className='rounded-full bg-[rgba(154,133,40,0.7)] px-3 py-1 text-xs text-white'>
                                Medio
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className='space-y-3'>
                    <p className='text-xs font-semibold uppercase tracking-[0.16em] text-stone-500'>
                        Modelo predictivo
                    </p>

                    <div>
                        <div className='h-3 w-full rounded-full bg-linear-to-r from-neutral-800 to-[#e30d0d]' />
                        <div className='mt-2 flex items-center justify-between text-xs text-stone-400'>
                            <span>Menor probabilidad</span>
                            <span>Mayor probabilidad</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}