import { supabase } from "./supabase";
// Obtener todos los usuarios
export async function obtenerUsuarios() {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return { data: null, error: error.message };
  }
}
// Crear un nuevo usuario
export async function crearUsuario(usuario) {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .insert([usuario])
      .select();
    if (error) throw error;
    return { data: data[0], error: null };
  } catch (error) {
    console.error("Error creando usuario:", error);
    return { data: null, error: error.message };
  }
}
// Actualizar un usuario
export async function actualizarUsuario(id, usuario) {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .update(usuario)
      .eq("id", id)
      .select();
    if (error) throw error;
    return { data: data[0], error: null };
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return { data: null, error: error.message };
  }
}
// Eliminar un usuario
export async function eliminarUsuario(id) {
  try {
    const { error } = await supabase.from("usuarios").delete().eq("id", id);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    return { error: error.message };
  }
}
// Obtener un usuario por ID
export async function obtenerUsuarioPorId(id) {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return { data: null, error: error.message };
  }
}
