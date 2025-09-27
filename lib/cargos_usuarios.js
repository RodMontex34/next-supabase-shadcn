import { supabase } from "./supabase";

// Obtener todos los cargos_usuarios
export async function obtenerCargosUsuarios() {
  const { data, error } = await supabase
    .from("cargos_usuarios")
    .select("*");
  if (error) throw error;
  return { data, error: null };
}

// Crear un nuevo cargo_usuario
export async function crearCargoUsuario(cargoUsuario) {
  const { data, error } = await supabase
    .from("cargos_usuarios")
    .insert([cargoUsuario])
    .select();
  if (error) throw error;
  return { data: data[0], error: null };
}

// Actualizar un cargo_usuario
export async function actualizarCargoUsuario(id, cargoUsuario) {
  const { data, error } = await supabase
    .from("cargos_usuarios")
    .update(cargoUsuario)
    .eq("id", id)
    .select();
  if (error) throw error;
  return { data: data[0], error: null };
}

// Eliminar un cargo_usuario
export async function eliminarCargoUsuario(id) {
  const { error } = await supabase
    .from("cargos_usuarios")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return { error: null };
}
