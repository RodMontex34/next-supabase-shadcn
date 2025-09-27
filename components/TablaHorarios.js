import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TablaHorarios({ horarios = [], onEdit, onDelete }) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Hora de ingreso</th>
                <th className="px-4 py-2 text-left">Hora de salida</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {horarios.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">No hay horarios registrados</td>
                </tr>
              ) : (
                horarios.map((horario) => (
                  <tr key={horario.id} className="border-b">
                    <td className="px-4 py-2">{horario.id}</td>
                    <td className="px-4 py-2">{horario.hora_ingreso}</td>
                    <td className="px-4 py-2">{horario.hora_salida}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => onEdit(horario)}>
                          Editar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => onDelete(horario.id)}>
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
