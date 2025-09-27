"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FormularioTickeo({ tickeo = null, usuarios = [], onSubmit, onCancel, isLoading = false }) {
  const [formData, setFormData] = useState({
    id_usuario: "",
    fecha: "",
    hora: "",
    tipo: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (tickeo) {
      setFormData({
        id_usuario: tickeo.id_usuario || "",
        fecha: tickeo.fecha || "",
        hora: tickeo.hora || "",
        tipo: tickeo.tipo || ""
      });
    }
  }, [tickeo]);

  const validarFormulario = () => {
    const newErrors = {};
    if (!formData.id_usuario) {
      newErrors.id_usuario = "El usuario es requerido";
    }
    if (!formData.fecha) {
      newErrors.fecha = "La fecha es requerida";
    }
    if (!formData.hora) {
      newErrors.hora = "La hora es requerida";
    }
    if (!formData.tipo) {
      newErrors.tipo = "El tipo es requerido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      onSubmit({ ...formData });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{tickeo ? "Editar Tickeo" : "Registrar Tickeo"}</CardTitle>
        <CardDescription>
          {tickeo ? "Modifica el tickeo" : "Registra un nuevo tickeo"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id_usuario">Usuario</Label>
            <Select value={formData.id_usuario} onValueChange={(value) => handleInputChange("id_usuario", value)}>
              <SelectTrigger id="id_usuario">
                <SelectValue placeholder="Selecciona un usuario" />
              </SelectTrigger>
              <SelectContent>
                {usuarios.map((usuario) => (
                  <SelectItem key={usuario.id} value={usuario.id.toString()}>
                    {usuario.nombre} ({usuario.username})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.id_usuario && <p className="text-sm text-red-500">{errors.id_usuario}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha</Label>
            <Input
              id="fecha"
              type="date"
              value={formData.fecha}
              onChange={(e) => handleInputChange("fecha", e.target.value)}
              className={errors.fecha ? "border-red-500" : ""}
            />
            {errors.fecha && <p className="text-sm text-red-500">{errors.fecha}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="hora">Hora</Label>
            <Input
              id="hora"
              type="time"
              value={formData.hora}
              onChange={(e) => handleInputChange("hora", e.target.value)}
              className={errors.hora ? "border-red-500" : ""}
            />
            {errors.hora && <p className="text-sm text-red-500">{errors.hora}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo</Label>
            <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
              <SelectTrigger id="tipo">
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entrada">Entrada</SelectItem>
                <SelectItem value="salida">Salida</SelectItem>
              </SelectContent>
            </Select>
            {errors.tipo && <p className="text-sm text-red-500">{errors.tipo}</p>}
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Guardando..." : tickeo ? "Actualizar" : "Registrar"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
