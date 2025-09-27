"use client";
import { useEffect, useState } from "react";
import { obtenerHorarios, crearHorario, actualizarHorario, eliminarHorario } from "@/lib/horarios";
import TablaHorarios from "@/components/TablaHorarios";
import FormularioHorario from "@/components/FormularioHorario";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NavigationBar } from "@/components/NavigationBar";
import { toast } from "sonner";

export default function HorariosPage() {
  const [horarios, setHorarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editHorario, setEditHorario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cargarHorarios = async () => {
    const { data } = await obtenerHorarios();
    setHorarios(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    cargarHorarios();
  }, []);

  const handleCrear = async (nuevoHorario) => {
    setIsLoading(true);
    await crearHorario(nuevoHorario);
    setIsLoading(false);
    setModalOpen(false);
    cargarHorarios();
  };

  const handleActualizar = async (horarioActualizado) => {
    setIsLoading(true);
    await actualizarHorario(editHorario.id, horarioActualizado);
    setIsLoading(false);
    setEditHorario(null);
    setModalOpen(false);
    cargarHorarios();
  };

  const handleEliminar = async (id) => {
    toast(
      "¿Seguro que deseas eliminar este horario?",
      {
  position: "top-center",
        action: {
          label: "Eliminar",
          onClick: async () => {
            await eliminarHorario(id);
            cargarHorarios();
            toast.success("Horario eliminado correctamente", { position: "top-center" });
          },
        },
        cancel: {
          label: "Cancelar"
        },
      }
    );
  };

  const handleEdit = (horario) => {
    setEditHorario(horario);
    setModalOpen(true);
  };

  const handleOpenModal = () => {
    setEditHorario(null);
    setModalOpen(true);
  };

  const handleCancel = () => {
    setEditHorario(null);
    setModalOpen(false);
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl mx-auto">
        <NavigationBar />
      </div>
      <div className="w-full max-w-4xl mt-10 p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-700 drop-shadow-lg">Horarios</h1>
          <p className="text-lg text-gray-500 mt-2">Gestión de horarios de ingreso y salida</p>
        </div>
        <div className="mb-6 flex justify-end">
          <Button onClick={handleOpenModal}>Nuevo Horario</Button>
        </div>
        <TablaHorarios horarios={horarios} onEdit={handleEdit} onDelete={handleEliminar} />
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full animate-fade-in">
              <FormularioHorario
                horario={editHorario}
                onSubmit={editHorario ? handleActualizar : handleCrear}
                onCancel={handleCancel}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </Dialog>
    </main>
  );
}
