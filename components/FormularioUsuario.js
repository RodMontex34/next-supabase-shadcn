'use client'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FormularioUsuario({ usuario = null, onSubmit, onCancel, isLoading = false }) {
    const [formData, setFormData] = useState({
        nombre: '', edad: '', genero: '', email: ''
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (usuario) {
            setFormData({
                nombre: usuario.nombre || '',
                edad: usuario.edad?.toString() || '',
                genero: usuario.genero || '',
                email: usuario.email || ''
            })
        }
    }, [usuario])

    const validarFormulario = () => {
        const newErrors = {}
        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido'
        }
        if (!formData.edad || parseInt(formData.edad) <= 0) {
            newErrors.edad = 'La edad debe ser un número mayor a 0'
        }
        if (!formData.genero) {
            newErrors.genero = 'El género es requerido'
        }
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido'
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'El email no es válido'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (validarFormulario()) {
            onSubmit({
                ...formData,
                edad: parseInt(formData.edad)
            })
        }
    }
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }))
        }
    }
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>{usuario ? 'Editar Usuario' : 'Crear Usuario'}</CardTitle> <CardDescription>
                    {usuario ? 'Modifica los datos del usuario' : 'Ingresa los datos del nuevo usuario'} </CardDescription>
            </CardHeader> <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4"> <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label> <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)} placeholder="Ingresa el nombre"
                        className={errors.nombre ? 'border-red-500' : ''}
                    />
                    {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>} </div>
                    <div className="space-y-2">
                        <Label htmlFor="edad">Edad</Label> <Input
                            id="edad"
                            type="number"
                            value={formData.edad}
                            onChange={(e) => handleInputChange('edad', e.target.value)} placeholder="Ingresa la edad"
                            min="1"
                            max="120"
                            className={errors.edad ? 'border-red-500' : ''}
                        />
                        {errors.edad && <p className="text-sm text-red-500">{errors.edad}</p>} </div>
                    <div className="space-y-2">
                        <Label htmlFor="genero">Género</Label>
                        <Select value={formData.genero} onValueChange={(value) => handleInputChange('genero', value)}> <SelectTrigger className={errors.genero ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Selecciona el género" /> </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Masculino">Masculino</SelectItem> <SelectItem value="Femenino">Femenino</SelectItem> <SelectItem value="Otro">Otro</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.genero && <p className="text-sm text-red-500">{errors.genero}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label> <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)} placeholder="Ingresa el email"
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>} </div>
                    <div className="flex gap-2 pt-4">
                        <Button type="submit" disabled={isLoading} className="flex-1">
                            {isLoading ? 'Guardando...' : (usuario ? 'Actualizar' : 'Crear')} </Button>
                        {onCancel && (
                            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}> Cancelar
                            </Button>)}
                    </div> </form>
            </CardContent> </Card>
    )
}