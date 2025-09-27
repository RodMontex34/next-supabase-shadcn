export default function TablaReportes({ usuarios = [], cargos = [] }) {
  if (!usuarios.length) {
    return <div className="text-center text-gray-500">No hay usuarios con ese cargo.</div>;
  }
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full text-sm rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Correo</th>
            <th className="px-4 py-2 text-left">Cargo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => {
            const cargo = cargos.find((c) => c.id === usuario.id_cargo);
            return (
              <tr key={usuario.id} className="border-b">
                <td className="px-4 py-2">{usuario.id}</td>
                <td className="px-4 py-2">{usuario.nombre}</td>
                <td className="px-4 py-2">{usuario.correo}</td>
                <td className="px-4 py-2">{cargo ? cargo.cargo : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
