import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FormularioCargo({ cargo = null, onSubmit, onCancel, isLoading = false }) {
  const [formData, setFormData] = useState({
    cargo: "",
    sueldo: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cargo) {
      setFormData({
        cargo: cargo.cargo || "",
        sueldo: cargo.sueldo?.toString() || ""
      });
    }
  }, [cargo]);

  const validarFormulario = () => {
    const newErrors = {};
    if (!formData.cargo.trim()) {
      newErrors.cargo = "El nombre del cargo es requerido";
    }
    if (!formData.sueldo || parseFloat(formData.sueldo) <= 0) {
      newErrors.sueldo = "El sueldo debe ser mayor a 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      onSubmit({
        ...formData,
        sueldo: parseFloat(formData.sueldo)
      });
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
        <CardTitle>{cargo ? "Editar Cargo" : "Crear Cargo"}</CardTitle>
        <CardDescription>
          {cargo ? "Modifica los datos del cargo" : "Ingresa los datos del nuevo cargo"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cargo">Cargo</Label>
            <Input
              id="cargo"
              value={formData.cargo}
              onChange={(e) => handleInputChange("cargo", e.target.value)}
              placeholder="Ingresa el nombre del cargo"
              className={errors.cargo ? "border-red-500" : ""}
            />
            {errors.cargo && <p className="text-sm text-red-500">{errors.cargo}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="sueldo">Sueldo</Label>
            <Input
              id="sueldo"
              type="number"
              value={formData.sueldo}
              onChange={(e) => handleInputChange("sueldo", e.target.value)}
              placeholder="Ingresa el sueldo"
              min="1"
              className={errors.sueldo ? "border-red-500" : ""}
            />
            {errors.sueldo && <p className="text-sm text-red-500">{errors.sueldo}</p>}
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Guardando..." : cargo ? "Actualizar" : "Crear"}
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
