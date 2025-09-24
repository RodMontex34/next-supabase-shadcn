import { supabase } from "./supabase";
// Obtener todos los usuarios
export async function obtenerUsuarios() {
  try {
    const { data, error } = await supabase
      .from("usuarios2")
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
      .from("usuarios2")
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
      .from("usuarios2")
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
    const { error } = await supabase.from("usuarios2").delete().eq("id", id);
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
      .from("usuarios2")
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

export async function obtenerUsuariosPaginados(page = 1, limit = 10) {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await supabase
      .from("usuarios")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);
    if (error) throw error;
    return {
      data,
      error: null,
      count,
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    return { data: null, error: error.message, count: 0, totalPages: 0 };
  }
}

export async function buscarUsuarios(termino) {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .or(`nombre.ilike.%${termino}%,email.ilike.%${termino}%`)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
