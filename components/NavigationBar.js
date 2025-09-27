"use client";
import * as React from "react";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components = [
  {
    title: "Usuarios",
    href: "/",
    description: "Gestión de usuarios del sistema.",
  },
  {
    title: "Cargos",
    href: "/cargos",
    description: "Gestión de cargos y roles.",
  },
  {
    title: "Cargos Usuarios",
    href: "/cargos_usuarios",
    description: "Asignación de cargos a usuarios.",
  },
  {
    title: "Horarios",
    href: "/horarios",
    description: "Gestión de horarios laborales.",
  },
  {
    title: "Tickeos",
    href: "/tickeos",
    description: "Registro de tickeos y asistencia.",
  },
];

export function NavigationBar() {
  return (
  <nav className="w-full flex justify-center items-center py-4 px-2 bg-white/70 backdrop-blur-lg shadow-lg rounded-b-2xl border-b border-blue-200 animate-fade-in-navbar z-50 relative">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + ' text-blue-700 font-semibold hover:bg-blue-100 transition-colors duration-200 rounded-lg px-4 py-2'}>
              <Link href="/inicio">Inicio</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-blue-700 font-semibold hover:bg-blue-100 transition-colors duration-200 rounded-lg px-4 py-2">Opciones</NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white/90 shadow-xl rounded-xl border border-blue-100 animate-fade-in-navbar z-50">
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + ' text-blue-700 font-semibold hover:bg-blue-100 transition-colors duration-200 rounded-lg px-4 py-2'}>
              <Link href="/reportes">Reportes</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <style jsx global>{`
        @keyframes fade-in-navbar {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-navbar {
          animation: fade-in-navbar 0.7s ease;
        }
      `}</style>
    </nav>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}) {
  return (
    <li {...props} className="rounded-lg hover:bg-blue-50 transition-colors duration-200 p-2">
      <NavigationMenuLink asChild>
        <Link href={href} className="block">
          <div className="text-base font-semibold text-blue-700 mb-1">{title}</div>
          <p className="text-gray-500 line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
