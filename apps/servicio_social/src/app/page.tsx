'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <img
            alt="Logo"
            className="w-10 h-10 rounded"
          />
          <h1 className="text-2xl font-bold">TECNOLÓGICO DE MONTERREY</h1>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">Mapa</Button>
          <Button variant="default">Tabla</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar" className="pl-8" />
          </div>
          <select className="px-3 py-2 rounded-md border border-input bg-background min-w-[200px]">
            <option value="">Municipio</option>
          </select>
          <select className="px-3 py-2 rounded-md border border-input bg-background min-w-[200px]">
            <option value="">Proyecto solidario</option>
          </select>
          <select className="px-3 py-2 rounded-md border border-input bg-background min-w-[200px]">
            <option value="">Periodo académico</option>
          </select>
          <select className="px-3 py-2 rounded-md border border-input bg-background min-w-[200px]">
            <option value="">ODS</option>
          </select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Nombre de la Organización socio formadora (OSF)</TableHead>
                <TableHead className="w-[300px]">Periodo académico en el que se ofertará</TableHead>
                <TableHead>Nombre del proyecto solidario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(10).fill(null).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">Organización {i + 1}</TableCell>
                  <TableCell>2024-1</TableCell>
                  <TableCell>Proyecto {i + 1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}