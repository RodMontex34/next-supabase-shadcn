"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Trash2, UserPlus } from "lucide-react";
export default function TablaUsuarios({
  usuarios,
  onEdit,
  onDelete,
  onNew,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <p>Cargando usuarios...</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Lista de Usuarios</CardTitle>
            <CardDescription>
              Gestiona todos los usuarios del sistema
            </CardDescription>
          </div>
          <Button onClick={onNew} className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Nuevo Usuario
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {usuarios.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No hay usuarios registrados</p>
            <Button onClick={onNew} className="mt-4">
              Crear primer usuario
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Edad</TableHead>
                  <TableHead>Género</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell className="font-medium">
                      {usuario.nombre}
                    </TableCell>
                    <TableCell>{usuario.edad}</TableCell>
                    <TableCell>{usuario.genero}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(usuario)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(usuario)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
