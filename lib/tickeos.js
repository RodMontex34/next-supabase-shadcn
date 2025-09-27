import { supabase } from "./supabase";

// Obtener todos los tickeos
export async function obtenerTickeos() {
  const { data, error } = await supabase
    .from("tickeos")
    .select("*");
  if (error) throw error;
  return { data, error: null };
}

// Crear un nuevo tickeo
export async function crearTickeo(tickeo) {
  const { data, error } = await supabase
    .from("tickeos")
    .insert([tickeo])
    .select();
  if (error) throw error;
  return { data: data[0], error: null };
}

// Actualizar un tickeo
export async function actualizarTickeo(id, tickeo) {
  const { data, error } = await supabase
    .from("tickeos")
    .update(tickeo)
    .eq("id", id)
    .select();
  if (error) throw error;
  return { data: data[0], error: null };
}

// Eliminar un tickeo
export async function eliminarTickeo(id) {
  const { error } = await supabase
    .from("tickeos")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return { error: null };
}
