"use client";
import { useEffect, useState } from "react";
import { obtenerTickeos, crearTickeo, actualizarTickeo, eliminarTickeo } from "@/lib/tickeos";
import { obtenerUsuarios } from "@/lib/usuarios";
import TablaTickeos from "@/components/TablaTickeos";
import FormularioTickeo from "@/components/FormularioTickeo";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NavigationBar } from "@/components/NavigationBar";

export default function TickeosPage() {
  const [tickeos, setTickeos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTickeo, setEditTickeo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cargarDatos = async () => {
    const [{ data: tickeosData }, { data: usuariosData }] = await Promise.all([
      obtenerTickeos(),
      obtenerUsuarios()
    ]);
    setTickeos(Array.isArray(tickeosData) ? tickeosData : []);
    setUsuarios(Array.isArray(usuariosData) ? usuariosData : []);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCrear = async (nuevoTickeo) => {
    setIsLoading(true);
    await crearTickeo(nuevoTickeo);
    setIsLoading(false);
    setModalOpen(false);
    cargarDatos();
  };

  const handleActualizar = async (tickeoActualizado) => {
    setIsLoading(true);
    await actualizarTickeo(editTickeo.id, tickeoActualizado);
    setIsLoading(false);
    setEditTickeo(null);
    setModalOpen(false);
    cargarDatos();
  };

  const handleEliminar = async (id) => {
    await eliminarTickeo(id);
    cargarDatos();
  };

  const handleEdit = (tickeo) => {
    setEditTickeo(tickeo);
    setModalOpen(true);
  };

  const handleOpenModal = () => {
    setEditTickeo(null);
    setModalOpen(true);
  };

  const handleCancel = () => {
    setEditTickeo(null);
    setModalOpen(false);
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl mx-auto">
        <NavigationBar />
      </div>
      <div className="w-full max-w-4xl mt-10 p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-700 drop-shadow-lg">Tickeos</h1>
          <p className="text-lg text-gray-500 mt-2">Gestión de tickeos de entrada y salida</p>
        </div>
        <div className="mb-6 flex justify-end">
          <Button onClick={handleOpenModal}>Registrar Tickeo</Button>
        </div>
        <TablaTickeos tickeos={tickeos} usuarios={usuarios} onEdit={handleEdit} onDelete={handleEliminar} />
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full animate-fade-in">
              <FormularioTickeo
                tickeo={editTickeo}
                usuarios={usuarios}
                onSubmit={editTickeo ? handleActualizar : handleCrear}
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
