import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TablaTickeos({ tickeos = [], usuarios = [], onEdit, onDelete }) {
  // Helper para mostrar nombre de usuario
  const getUsuarioNombre = (id) => {
    const usuario = usuarios.find(u => u.id === id);
    return usuario ? usuario.nombre : id;
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
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">Hora</th>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tickeos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">No hay tickeos registrados</td>
                </tr>
              ) : (
                tickeos.map((t) => (
                  <tr key={t.id} className="border-b">
                    <td className="px-4 py-2">{t.id}</td>
                    <td className="px-4 py-2">{getUsuarioNombre(t.id_usuario)}</td>
                    <td className="px-4 py-2">{t.fecha}</td>
                    <td className="px-4 py-2">{t.hora}</td>
                    <td className="px-4 py-2">{t.tipo === "entrada" ? "Entrada" : "Salida"}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => onEdit(t)}>
                          Editar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => onDelete(t.id)}>
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
