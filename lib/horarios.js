import { supabase } from "./supabase";

// Obtener todos los horarios
export async function obtenerHorarios() {
  try {
    const { data, error } = await supabase
      .from("horarios")
      .select("*");
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error obteniendo horarios:", error);
    return { data: null, error: error.message };
  }
}

// Crear un nuevo horario
export async function crearHorario(horario) {
  try {
    const { data, error } = await supabase
      .from("horarios")
      .insert([horario])
      .select();
    if (error) throw error;
    return { data: data[0], error: null };
  } catch (error) {
    console.error("Error creando horario:", error);
    return { data: null, error: error.message };
  }
}

// Actualizar un horario
export async function actualizarHorario(id, horario) {
  try {
    const { data, error } = await supabase
      .from("horarios")
      .update(horario)
      .eq("id", id)
      .select();
    if (error) throw error;
    return { data: data[0], error: null };
  } catch (error) {
    console.error("Error actualizando horario:", error);
    return { data: null, error: error.message };
  }
}

// Eliminar un horario
export async function eliminarHorario(id) {
  try {
    const { error } = await supabase
      .from("horarios")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error eliminando horario:", error);
    return { error: error.message };
  }
}
