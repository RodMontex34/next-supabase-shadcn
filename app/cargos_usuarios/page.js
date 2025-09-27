"use client";
import { useEffect, useState } from "react";
import { obtenerCargosUsuarios, crearCargoUsuario, actualizarCargoUsuario, eliminarCargoUsuario } from "@/lib/cargos_usuarios";
import { obtenerUsuarios } from "@/lib/usuarios";
import { obtenerCargos } from "@/lib/cargos";
import TablaCargosUsuarios from "@/components/TablaCargosUsuarios";
import FormularioCargoUsuario from "@/components/FormularioCargoUsuario";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NavigationBar } from "@/components/NavigationBar";

export default function AsignacionesPage() {
  const [cargosUsuarios, setCargosUsuarios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCU, setEditCU] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cargarDatos = async () => {
    const [{ data: cuData }, { data: usuariosData }, { data: cargosData }] = await Promise.all([
      obtenerCargosUsuarios(),
      obtenerUsuarios(),
      obtenerCargos()
    ]);
    setCargosUsuarios(Array.isArray(cuData) ? cuData : []);
    setUsuarios(Array.isArray(usuariosData) ? usuariosData : []);
    setCargos(Array.isArray(cargosData) ? cargosData : []);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCrear = async (nuevoCU) => {
    setIsLoading(true);
    await crearCargoUsuario(nuevoCU);
    setIsLoading(false);
    setModalOpen(false);
    cargarDatos();
  };

  const handleActualizar = async (cuActualizado) => {
    setIsLoading(true);
    await actualizarCargoUsuario(editCU.id, cuActualizado);
    setIsLoading(false);
    setEditCU(null);
    setModalOpen(false);
    cargarDatos();
  };

  const handleEliminar = async (id) => {
    await eliminarCargoUsuario(id);
    cargarDatos();
  };

  const handleEdit = (cu) => {
    setEditCU(cu);
    setModalOpen(true);
  };

  const handleOpenModal = () => {
    setEditCU(null);
    setModalOpen(true);
  };

  const handleCancel = () => {
    setEditCU(null);
    setModalOpen(false);
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl mx-auto">
        <NavigationBar />
      </div>
      <div className="w-full max-w-4xl mt-10 p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-700 drop-shadow-lg">Asignaciones de Cargos</h1>
          <p className="text-lg text-gray-500 mt-2">Asignación de cargos a usuarios</p>
        </div>
        <div className="mb-6 flex justify-end">
          <Button onClick={handleOpenModal}>Nueva Asignación</Button>
        </div>
        <TablaCargosUsuarios cargosUsuarios={cargosUsuarios} usuarios={usuarios} cargos={cargos} onEdit={handleEdit} onDelete={handleEliminar} isLoading={isLoading} />
      </div>
      <Dialog open={modalOpen} onOpenChange={handleCancel}>
        <DialogContent className="rounded-xl shadow-xl bg-white/90">
          <FormularioCargoUsuario
            usuarios={usuarios}
            cargos={cargos}
            cargoUsuario={editCU}
            onSubmit={editCU ? handleActualizar : handleCrear}
            isSubmitting={isLoading}
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease;
        }
      `}</style>
    </main>
  );
}