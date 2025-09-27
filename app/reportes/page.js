"use client";

import React, { useState, useEffect } from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export default function ReportesPage() {
  const [horaInicioSalida, setHoraInicioSalida] = useState("16:00:00");
  const [horaFinSalida, setHoraFinSalida] = useState("18:00:00");
  const [usuariosTemprano, setUsuariosTemprano] = useState([]);

  async function handleBuscarTemprano(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from("tickeos")
      .select("id_usuario, usuarios(nombre), hora, tipo")
      .gt("hora", horaInicioSalida)
      .lte("hora", horaFinSalida)
      .eq("tipo", "salida");
    setUsuariosTemprano(data || []);
  }
  const [cargo, setCargo] = useState("");
  const [cargos, setCargos] = useState([]);
  const [usuariosPorCargo, setUsuariosPorCargo] = useState([]);
  const [sueldoMin, setSueldoMin] = useState("");
  const [usuariosSueldoMin, setUsuariosSueldoMin] = useState([]);
  const [sueldoRangoMin, setSueldoRangoMin] = useState("");
  const [sueldoRangoMax, setSueldoRangoMax] = useState("");
  const [usuariosSueldoRango, setUsuariosSueldoRango] = useState([]);
  const [horaInicioTarde, setHoraInicioTarde] = useState("08:00:00");
  const [horaFinTarde, setHoraFinTarde] = useState("09:00:00");
  const [usuariosTarde, setUsuariosTarde] = useState([]);
  async function handleBuscarTarde(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from("tickeos")
      .select("id_usuario, usuarios(nombre), hora, tipo")
      .gt("hora", horaInicioTarde)
      .lte("hora", horaFinTarde)
      .eq("tipo", "entrada");
    setUsuariosTarde(data || []);
  }
  async function handleBuscarSueldoRango(e) {
    e.preventDefault();
    if (!sueldoRangoMin || !sueldoRangoMax) return;
    const min = Number(sueldoRangoMin);
    const max = Number(sueldoRangoMax);
    const { data, error } = await supabase
      .from("cargos_usuarios")
      .select("id_usuario, usuarios(nombre), cargos(sueldo)")
      .gte("cargos.sueldo", min)
      .lte("cargos.sueldo", max);
    setUsuariosSueldoRango(data || []);
  }
  async function handleBuscarSueldoMin(e) {
    e.preventDefault();
    if (!sueldoMin) return;
    const sueldoNum = Number(sueldoMin);
    const { data, error } = await supabase
      .from("cargos_usuarios")
      .select("id_usuario, usuarios(nombre), cargos(sueldo)")
      .gt("cargos.sueldo", sueldoNum);
    setUsuariosSueldoMin(data || []);
  }

  useEffect(() => {
    async function fetchCargos() {
      const { data } = await supabase.from("cargos").select();
      setCargos(data || []);
    }
    fetchCargos();
  }, []);

  async function handleBuscarPorCargo(e) {
    e.preventDefault();
    if (!cargo) return;
    const { data, error } = await supabase
      .from("cargos_usuarios")
      .select("id_usuario, usuarios(nombre), cargos(cargo)")
      .eq("id_cargo", cargo);
    setUsuariosPorCargo(data || []);
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl mx-auto">
        <NavigationBar />
      </div>
      <div className="w-full max-w-2xl mt-20 p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg animate-fade-in flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">
          Reportes Generales
        </h1>
        {/* Reporte 1: Usuarios por cargo */}
        <section className="w-full mb-12">
          <h4 className="text-xl font-semibold text-blue-700 mb-4">
            1.- Usuarios con el cargo seleccionado
          </h4>
          <form
            onSubmit={handleBuscarPorCargo}
            className="flex gap-2 items-center mb-6 w-full max-w-md"
          >
            <select
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              required
              className="border rounded px-4 py-2 w-full"
            >
              <option value="">Seleccione un cargo</option>
              {cargos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.cargo}
                </option>
              ))}
            </select>
            <Button type="submit" className="h-10 px-6">
              Buscar
            </Button>
          </form>
          {usuariosPorCargo.length > 0 && (
            <ul className="w-full max-w-md bg-white rounded shadow p-4">
              {usuariosPorCargo.map((u) => (
                <li
                  className="flex justify-between items-center py-2 border-b last:border-b-0"
                  key={u.id_usuario}
                >
                  <span className="font-medium text-blue-700">
                    {u.usuarios?.nombre}
                  </span>
                  <span className="text-gray-500">{u.cargos?.cargo}</span>
                </li>
              ))}
            </ul>
          )}
          {usuariosPorCargo.length === 0 && (
            <div className="text-center text-gray-400 mt-4">
              No hay usuarios con ese cargo.
            </div>
          )}
        </section>
        {/* Reporte 2: Usuarios que ganan más de X Bs */}
        <section className="w-full mb-8">
          <h4 className="text-xl font-semibold text-blue-700 mb-4">
            2.- Usuarios que ganan más de X Bs
          </h4>
          <form
            onSubmit={handleBuscarSueldoMin}
            className="flex gap-2 items-center mb-6 w-full max-w-md"
          >
            <input
              type="number"
              value={sueldoMin}
              onChange={(e) => setSueldoMin(e.target.value)}
              placeholder="Monto Bs"
              required
              className="border rounded px-4 py-2 w-full"
            />
            <Button type="submit" className="h-10 px-6">
              Buscar
            </Button>
          </form>
          {usuariosSueldoMin.length > 0 && (
            <ul className="w-full max-w-md bg-white rounded shadow p-4">
              {usuariosSueldoMin.map((u) => (
                <li
                  className="flex justify-between items-center py-2 border-b last:border-b-0"
                  key={u.id_usuario}
                >
                  <span className="font-medium text-blue-700">
                    {u.usuarios?.nombre}
                  </span>
                  <span className="text-green-600 font-semibold">
                    {u.cargos?.sueldo !== undefined && u.cargos?.sueldo !== null
                      ? Number(u.cargos.sueldo).toLocaleString("es-BO", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        }) + " Bs"
                      : "-"}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {usuariosSueldoMin.length === 0 && (
            <div className="text-center text-gray-400 mt-4">
              No hay usuarios que ganen más de ese monto.
            </div>
          )}
        </section>
        {/* Reporte 3: Usuarios que ganan entre X y Y Bs */}
        <section className="w-full mb-8">
          <h4 className="text-xl font-semibold text-blue-700 mb-4">
           3.-  Usuarios que ganan entre X y Y Bs
          </h4>
          <form
            onSubmit={handleBuscarSueldoRango}
            className="flex gap-2 items-center mb-6 w-full max-w-md"
          >
            <input
              type="number"
              value={sueldoRangoMin}
              onChange={(e) => setSueldoRangoMin(e.target.value)}
              placeholder="Desde Bs"
              required
              className="border rounded px-4 py-2 w-full"
            />
            <input
              type="number"
              value={sueldoRangoMax}
              onChange={(e) => setSueldoRangoMax(e.target.value)}
              placeholder="Hasta Bs"
              required
              className="border rounded px-4 py-2 w-full"
            />
            <Button type="submit" className="h-10 px-6">
              Buscar
            </Button>
          </form>
          {usuariosSueldoRango.length > 0 && (
            <ul className="w-full max-w-md bg-white rounded shadow p-4">
              {usuariosSueldoRango.map((u) => (
                <li
                  className="flex justify-between items-center py-2 border-b last:border-b-0"
                  key={u.id_usuario}
                >
                  <span className="font-medium text-blue-700">
                    {u.usuarios?.nombre}
                  </span>
                  <span className="text-yellow-600 font-semibold">
                    {u.cargos?.sueldo !== undefined && u.cargos?.sueldo !== null
                      ? Number(u.cargos.sueldo).toLocaleString("es-BO", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        }) + " Bs"
                      : "-"}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {usuariosSueldoRango.length === 0 && (
            <div className="text-center text-gray-400 mt-4">
              No hay usuarios en ese rango de sueldo.
            </div>
          )}
        </section>
        {/* Reporte 4: Usuarios que llegaron tarde */}
        <section className="w-full mb-8">
          <h4 className="text-xl font-semibold text-blue-700 mb-4">
            4.- Usuarios que llegaron tarde
          </h4>
          <form
            onSubmit={handleBuscarTarde}
            className="flex gap-2 items-center mb-6 w-full max-w-md"
          >
            <label htmlFor="horaInicioTarde" className="font-medium">
              Desde:
            </label>
            <select
              id="horaInicioTarde"
              value={horaInicioTarde}
              onChange={(e) => setHoraInicioTarde(e.target.value)}
              className="border rounded px-4 py-2"
            >
              <option value="07:00:00">07:00</option>
              <option value="07:30:00">07:30</option>
              <option value="08:00:00">08:00</option>
              <option value="08:30:00">08:30</option>
              <option value="09:00:00">09:00</option>
              <option value="09:30:00">09:30</option>
              <option value="10:00:00">10:00</option>
            </select>
            <label htmlFor="horaFinTarde" className="font-medium">
              Hasta:
            </label>
            <select
              id="horaFinTarde"
              value={horaFinTarde}
              onChange={(e) => setHoraFinTarde(e.target.value)}
              className="border rounded px-4 py-2"
            >
              <option value="07:00:00">07:00</option>
              <option value="07:30:00">07:30</option>
              <option value="08:00:00">08:00</option>
              <option value="08:30:00">08:30</option>
              <option value="09:00:00">09:00</option>
              <option value="09:30:00">09:30</option>
              <option value="10:00:00">10:00</option>
            </select>
            <Button type="submit" className="h-10 px-6">
              Buscar
            </Button>
          </form>
          {usuariosTarde.length > 0 && (
            <ul className="w-full max-w-md bg-white rounded shadow p-4">
              {usuariosTarde.map((u) => (
                <li
                  className="flex justify-between items-center py-2 border-b last:border-b-0"
                  key={u.id_usuario}
                >
                  <span className="font-medium text-blue-700">
                    {u.usuarios?.nombre}
                  </span>
                  <span className="text-red-600 font-semibold">{u.hora}</span>
                </li>
              ))}
            </ul>
          )}
          {usuariosTarde.length === 0 && (
            <div className="text-center text-gray-400 mt-4">
              No hay usuarios que llegaron tarde en ese rango.
            </div>
          )}
        </section>
        {/* Reporte 5: Usuarios que se fueron temprano */}
        <section className="w-full mb-8">
          <h4 className="text-xl font-semibold text-blue-700 mb-4"> 5.- Usuarios que se fueron temprano</h4>
          <form onSubmit={handleBuscarTemprano} className="flex gap-2 items-center mb-6 w-full max-w-md">
            <label htmlFor="horaInicioSalida" className="font-medium">Desde:</label>
            <select id="horaInicioSalida" value={horaInicioSalida} onChange={e => setHoraInicioSalida(e.target.value)} className="border rounded px-4 py-2">
              <option value="16:00:00">16:00</option>
              <option value="16:30:00">16:30</option>
              <option value="17:00:00">17:00</option>
              <option value="17:30:00">17:30</option>
              <option value="18:00:00">18:00</option>
              <option value="18:30:00">18:30</option>
              <option value="19:00:00">19:00</option>
            </select>
            <label htmlFor="horaFinSalida" className="font-medium">Hasta:</label>
            <select id="horaFinSalida" value={horaFinSalida} onChange={e => setHoraFinSalida(e.target.value)} className="border rounded px-4 py-2">
              <option value="16:00:00">16:00</option>
              <option value="16:30:00">16:30</option>
              <option value="17:00:00">17:00</option>
              <option value="17:30:00">17:30</option>
              <option value="18:00:00">18:00</option>
              <option value="18:30:00">18:30</option>
              <option value="19:00:00">19:00</option>
            </select>
            <Button type="submit" className="h-10 px-6">Buscar</Button>
          </form>
          {usuariosTemprano.length > 0 && (
            <ul className="w-full max-w-md bg-white rounded shadow p-4">
              {usuariosTemprano.map(u => (
                <li className="flex justify-between items-center py-2 border-b last:border-b-0" key={u.id_usuario}>
                  <span className="font-medium text-blue-700">{u.usuarios?.nombre}</span>
                  <span className="text-orange-600 font-semibold">{u.hora}</span>
                </li>
              ))}
            </ul>
          )}
          {usuariosTemprano.length === 0 && (
            <div className="text-center text-gray-400 mt-4">No hay usuarios que se hayan ido temprano en ese rango.</div>
          )}
        </section>
      </div>
    </main>
  );
}
