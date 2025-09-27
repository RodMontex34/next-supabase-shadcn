"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FormularioHorario({ horario = null, onSubmit, onCancel, isLoading = false }) {
  const [formData, setFormData] = useState({
    hora_ingreso: "",
    hora_salida: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (horario) {
      setFormData({
        hora_ingreso: horario.hora_ingreso || "",
        hora_salida: horario.hora_salida || ""
      });
    }
  }, [horario]);

  const validarFormulario = () => {
    const newErrors = {};
    if (!formData.hora_ingreso.trim()) {
      newErrors.hora_ingreso = "La hora de ingreso es requerida";
    }
    if (!formData.hora_salida.trim()) {
      newErrors.hora_salida = "La hora de salida es requerida";
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
  <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{horario ? "Editar Horario" : "Crear Horario"}</CardTitle>
        <CardDescription>
          {horario ? "Modifica los datos del horario" : "Ingresa los datos del nuevo horario"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hora_ingreso">Hora de ingreso</Label>
            <Input
              id="hora_ingreso"
              type="time"
              value={formData.hora_ingreso}
              onChange={(e) => handleInputChange("hora_ingreso", e.target.value)}
              placeholder="Ejemplo: 05:00:00"
              className={errors.hora_ingreso ? "border-red-500" : ""}
            />
            {errors.hora_ingreso && <p className="text-sm text-red-500">{errors.hora_ingreso}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="hora_salida">Hora de salida</Label>
            <Input
              id="hora_salida"
              type="time"
              value={formData.hora_salida}
              onChange={(e) => handleInputChange("hora_salida", e.target.value)}
              placeholder="Ejemplo: 13:00:00"
              className={errors.hora_salida ? "border-red-500" : ""}
            />
            {errors.hora_salida && <p className="text-sm text-red-500">{errors.hora_salida}</p>}
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Guardando..." : horario ? "Actualizar" : "Crear"}
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
