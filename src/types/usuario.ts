// src/types/usuario.ts

export interface Usuario {
  id: number;
  imagen?: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  rol_id: number;
  rol?: "Administrador" | "Vendedor"; // opcional, solo para mostrar
  dni: string;
  estado?: boolean;
  contrasena?: string;
}