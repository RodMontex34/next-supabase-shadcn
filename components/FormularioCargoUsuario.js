"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FormularioCargoUsuario({ cargoUsuario = null, usuarios = [], cargos = [], onSubmit, onCancel, isLoading = false }) {
  const [formData, setFormData] = useState({
    id_usuario: "",
    id_cargo: "",
    fecha_inicio: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cargoUsuario) {
      setFormData({
        id_usuario: cargoUsuario.id_usuario || "",
        id_cargo: cargoUsuario.id_cargo || "",
        fecha_inicio: cargoUsuario.fecha_inicio || ""
      });
    }
  }, [cargoUsuario]);

  const validarFormulario = () => {
    const newErrors = {};
    if (!formData.id_usuario) {
      newErrors.id_usuario = "El usuario es requerido";
    }
    if (!formData.id_cargo) {
      newErrors.id_cargo = "El cargo es requerido";
    }
    if (!formData.fecha_inicio) {
      newErrors.fecha_inicio = "La fecha de inicio es requerida";
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
        <CardTitle>{cargoUsuario ? "Editar Cargo Usuario" : "Asignar Cargo a Usuario"}</CardTitle>
        <CardDescription>
          {cargoUsuario ? "Modifica la asignación" : "Asigna un cargo a un usuario"}
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
            <Label htmlFor="id_cargo">Cargo</Label>
            <Select value={formData.id_cargo} onValueChange={(value) => handleInputChange("id_cargo", value)}>
              <SelectTrigger id="id_cargo">
                <SelectValue placeholder="Selecciona un cargo" />
              </SelectTrigger>
              <SelectContent>
                {cargos.map((cargo) => (
                  <SelectItem key={cargo.id} value={cargo.id.toString()}>
                    {cargo.cargo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.id_cargo && <p className="text-sm text-red-500">{errors.id_cargo}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fecha_inicio">Fecha de inicio</Label>
            <Input
              id="fecha_inicio"
              type="date"
              value={formData.fecha_inicio}
              onChange={(e) => handleInputChange("fecha_inicio", e.target.value)}
              className={errors.fecha_inicio ? "border-red-500" : ""}
            />
            {errors.fecha_inicio && <p className="text-sm text-red-500">{errors.fecha_inicio}</p>}
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Guardando..." : cargoUsuario ? "Actualizar" : "Asignar"}
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
