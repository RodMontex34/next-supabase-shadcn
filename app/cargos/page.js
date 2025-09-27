'use client'
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import TablaCargos from '@/components/TablaCargos';
import FormularioCargo from '@/components/FormularioCargo';
import { NavigationBar } from '@/components/NavigationBar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  obtenerCargos,
  crearCargo,
  actualizarCargo,
  eliminarCargo
} from '@/lib/cargos';

export default function CargosPage() {
  const [cargos, setCargos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalFormulario, setModalFormulario] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [cargoEditando, setCargoEditando] = useState(null);
  const [cargoEliminando, setCargoEliminando] = useState(null);

  useEffect(() => {
    cargarCargos();
  }, []);

  const cargarCargos = async () => {
    setIsLoading(true);
    const { data, error } = await obtenerCargos();
    if (error) {
      toast.error('Error al cargar cargos: ' + error);
    } else {
      setCargos(data || []);
    }
    setIsLoading(false);
  };

  const handleNuevoCargo = () => {
    setCargoEditando(null);
    setModalFormulario(true);
  };
  const handleEditarCargo = (cargo) => {
    setCargoEditando(cargo);
    setModalFormulario(true);
  };
  const handleEliminarCargo = (cargo) => {
    setCargoEliminando(cargo);
    setModalConfirmacion(true);
  };
  const handleSubmitFormulario = async (datosCargo) => {
    setIsSubmitting(true);
    let result;
    if (cargoEditando) {
      result = await actualizarCargo(cargoEditando.id, datosCargo);
    } else {
      result = await crearCargo(datosCargo);
    }
    if (result.error) {
      toast.error(cargoEditando ? 'Error al actualizar cargo: ' + result.error : 'Error al crear cargo: ' + result.error);
    } else {
      toast.success(cargoEditando ? 'Cargo actualizado correctamente' : 'Cargo creado correctamente');
      setModalFormulario(false);
      cargarCargos();
    }
    setIsSubmitting(false);
  };

  const handleConfirmarEliminacion = async () => {
    if (!cargoEliminando) return;
    setIsSubmitting(true);
    const result = await eliminarCargo(cargoEliminando.id);
    if (result.error) {
      toast.error('Error al eliminar cargo: ' + result.error);
    } else {
      toast.success('Cargo eliminado correctamente');
      setModalConfirmacion(false);
      setCargoEliminando(null);
      cargarCargos();
    }
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl mx-auto">
        <NavigationBar />
      </div>
      <div className="w-full max-w-4xl mt-10 p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-700 drop-shadow-lg">Cargos</h1>
          <p className="text-lg text-gray-500 mt-2">Gestión de cargos y roles</p>
        </div>
        {/* Botón eliminado, solo se usa el de la tabla con icono */}
  <TablaCargos cargos={cargos} onEdit={handleEditarCargo} onDelete={handleEliminarCargo} isLoading={isLoading} onNew={handleNuevoCargo} />
      </div>
      <Dialog open={modalFormulario} onOpenChange={setModalFormulario}>
        <DialogContent className="rounded-xl shadow-xl bg-white/90">
          <DialogHeader>
            <DialogTitle className="text-blue-700 font-bold text-2xl">{cargoEditando ? 'Editar Cargo' : 'Nuevo Cargo'}</DialogTitle>
          </DialogHeader>
          <FormularioCargo
            cargo={cargoEditando}
            onSubmit={handleSubmitFormulario}
            isSubmitting={isSubmitting}
            onCancel={() => setModalFormulario(false)}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={modalConfirmacion} onOpenChange={setModalConfirmacion}>
        <DialogContent className="rounded-xl shadow-xl bg-white/90">
          <DialogHeader>
            <DialogTitle className="text-red-700 font-bold text-2xl">¿Eliminar Cargo?</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 mb-4">¿Estás seguro de que deseas eliminar el cargo <span className="font-bold">{cargoEliminando?.cargo}</span>? Esta acción no se puede deshacer.</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setModalConfirmacion(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleConfirmarEliminacion} isLoading={isSubmitting}>
                Eliminar
              </Button>
            </div>
          </div>
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

    