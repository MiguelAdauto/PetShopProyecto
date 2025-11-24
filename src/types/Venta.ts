export interface Venta {
  id: number;
  fecha: string;
  nro: string;                // <--- corregido
  tipoPago: string;           // <--- corregido
  cliente: string;            // <--- corregido
  total: string;              // <--- viene como string en tu JSON
}
