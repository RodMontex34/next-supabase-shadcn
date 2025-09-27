import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


export default function TablaCargosUsuarios({ cargosUsuarios = [], usuarios = [], cargos = [], onEdit, onDelete }) {
  // Helper para mostrar nombre de usuario y cargo
  const getUsuarioNombre = (id) => {
    const usuario = usuarios.find(u => u.id === id);
    return usuario ? usuario.nombre : id;
  };
  const getCargoNombre = (id) => {
    const cargo = cargos.find(c => c.id === id);
    return cargo ? cargo.cargo : id;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Usuario</th>
                <th className="px-4 py-2 text-left">Cargo</th>
                <th className="px-4 py-2 text-left">Fecha inicio</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargosUsuarios.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">No hay asignaciones registradas</td>
                </tr>
              ) : (
                cargosUsuarios.map((cu) => (
                  <tr key={cu.id} className="border-b">
                    <td className="px-4 py-2">{cu.id}</td>
                    <td className="px-4 py-2">{getUsuarioNombre(cu.id_usuario)}</td>
                    <td className="px-4 py-2">{getCargoNombre(cu.id_cargo)}</td>
                    <td className="px-4 py-2">{cu.fecha_inicio}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => onEdit(cu)}>
                          Editar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => onDelete(cu.id)}>
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// ...eliminar función duplicada y segundo return...
