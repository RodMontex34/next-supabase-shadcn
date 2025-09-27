"use client";
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TablaUsuarios from '@/components/TablaUsuarios';
import FormularioUsuario from '@/components/FormularioUsuario';
import DialogoConfirmacion from '@/components/DialogoConfirmacion';
import { NavigationBar } from '@/components/NavigationBar';
import {
  obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario
} from '@/lib/usuarios';

export default function HomePage() {
  const [usuarios, setUsuarios] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Estados para modales
  const [modalFormulario, setModalFormulario] = useState(false)
  const [modalConfirmacion, setModalConfirmacion] = useState(false)
  const [usuarioEditando, setUsuarioEditando] = useState(null)
  const [usuarioEliminando, setUsuarioEliminando] = useState(null)

  // Cargar usuarios al montar el componente 
  useEffect(() => {
    cargarUsuarios()
  }, [])

  const cargarUsuarios = async () => {
    setIsLoading(true)
    const { data, error } = await obtenerUsuarios()
    if (error) {
      toast.error('Error al cargar usuarios: ' + error)
    } else {
      setUsuarios(data || [])
    }
    setIsLoading(false)
  }

  const handleNuevoUsuario = () => {
    setUsuarioEditando(null)
    setModalFormulario(true)
  }
  const handleEditarUsuario = (usuario) => {
    setUsuarioEditando(usuario)
    setModalFormulario(true)
  }
  const handleEliminarUsuario = (usuario) => {
    setUsuarioEliminando(usuario)
    setModalConfirmacion(true)
  }
  const handleSubmitFormulario = async (datosUsuario) => {
    setIsSubmitting(true)
    let result
    if (usuarioEditando) {
      result = await actualizarUsuario(usuarioEditando.id, datosUsuario)
    } else {
      result = await crearUsuario(datosUsuario)
    }

    if (result.error) {
      toast.error(
        usuarioEditando
          ? 'Error al actualizar usuario: ' + result.error : 'Error al crear usuario: ' + result.error
      )
    } else {
      toast.success(usuarioEditando
        ? 'Usuario actualizado correctamente'
        : 'Usuario creado correctamente')
      setModalFormulario(false)
      cargarUsuarios()
    }
    setIsSubmitting(false)
  }
  const handleConfirmarEliminacion = async () => {
    if (!usuarioEliminando) return
    setIsSubmitting(true)
    const result = await eliminarUsuario(usuarioEliminando.id)

    if (result.error) {
      toast.error('Error al eliminar usuario: ' + result.error)
    } else {
      toast.success('Usuario eliminado correctamente')
      setModalConfirmacion(false)
      setUsuarioEliminando(null)
      cargarUsuarios()
    }
    setIsSubmitting(false)
  }
  const cerrarModalFormulario = () => {
    if (!isSubmitting) {
      setModalFormulario(false)
      setUsuarioEditando(null)
    }
  }
  const cerrarModalConfirmacion = () => {
    if (!isSubmitting) {
      setModalConfirmacion(false)
      setUsuarioEliminando(null)
    }

  }
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl mx-auto">
        <NavigationBar />
      </div>
      <div className="w-full max-w-4xl mt-20 p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg animate-fade-in flex flex-col items-center">
        <div className="text-center mb-12 w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-700 drop-shadow-lg mb-2">Gestión de Usuarios</h1>
          <p className="text-lg text-gray-500 mt-2 max-w-xl mx-auto">Sistema CRUD con Next.js 15, Supabase y shadcn/ui</p>
        </div>
        <div className="w-full">
          <TablaUsuarios usuarios={usuarios} onNew={handleNuevoUsuario} onEdit={handleEditarUsuario} onDelete={handleEliminarUsuario} isLoading={isLoading} />
        </div>
      </div>
      <Dialog open={modalFormulario} onOpenChange={cerrarModalFormulario}>
        <DialogContent className="rounded-xl shadow-xl bg-white/90">
          <DialogHeader>
            <DialogTitle className="text-blue-700 font-bold text-2xl">{usuarioEditando ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
          </DialogHeader>
          <FormularioUsuario
            usuario={usuarioEditando}
            onSubmit={handleSubmitFormulario}
            isSubmitting={isSubmitting}
            onCancel={cerrarModalFormulario}
          />
        </DialogContent>
      </Dialog>
      <DialogoConfirmacion
        open={modalConfirmacion}
        onOpenChange={cerrarModalConfirmacion}
        onConfirm={handleConfirmarEliminacion}
        title="Eliminar Usuario"
        description={usuarioEliminando ? `¿Estás seguro de que deseas eliminar a "${usuarioEliminando.nombre}"? Esta acción no se puede deshacer.` : ''}
        confirmText="Eliminar"
        cancelText="Cancelar"
        isDestructive={true}
        isLoading={isSubmitting}
      />
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
  )
}
