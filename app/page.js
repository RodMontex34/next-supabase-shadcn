'use client'
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TablaUsuarios from '@/components/TablaUsuarios';
import FormularioUsuario from '@/components/FormularioUsuario';
import DialogoConfirmacion from '@/components/DialogoConfirmacion';
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
    <main className="container mx-auto py-8 px-4">
      <div className="space-y-6"> <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight"> Gestión de Usuarios
        </h1>
        <p className="text-muted-foreground">
          Sistema CRUD con Next.js 15, Supabase y shadcn/ui </p>
      </div>
        <TablaUsuarios usuarios={usuarios} onNew={handleNuevoUsuario} onEdit={handleEditarUsuario} onDelete={handleEliminarUsuario} isLoading={isLoading} />
      </div>
      {/* Modal de formulario */}
      <Dialog open={modalFormulario} onOpenChange={cerrarModalFormulario}>

        <DialogContent className="sm:max-w-md"> <DialogHeader>
          <DialogTitle>
            {usuarioEditando ? 'Editar Usuario' : 'Nuevo Usuario'}
          </DialogTitle> </DialogHeader> <FormularioUsuario
            usuario={usuarioEditando} onSubmit={handleSubmitFormulario} onCancel={cerrarModalFormulario} isLoading={isSubmitting} /> </DialogContent>
      </Dialog>
      {/* Modal de confirmación para eliminar */}
      <DialogoConfirmacion
        open={modalConfirmacion} onOpenChange={setModalConfirmacion} onConfirm={handleConfirmarEliminacion} title="Eliminar Usuario"
        description={usuarioEliminando
          ? `¿Estás seguro de que deseas eliminar a "${usuarioEliminando.nombre}"? Esta acción no se puede deshacer.`
          : ''}
        confirmText="Eliminar" cancelText="Cancelar" isDestructive={true} isLoading={isSubmitting}
      /> </main>
  )
}