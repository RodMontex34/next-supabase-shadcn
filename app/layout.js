import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
const geistSans = localFont({
src: './fonts/GeistVF.woff2',
variable: '--font-geist-sans',
weight: '100 900',
})
const geistMono = localFont({
src: './fonts/GeistMonoVF.woff2',
variable: '--font-geist-mono',
weight: '100 900',
})
export const metadata = {
title: 'CRUD Usuarios - Next.js 15 + Supabase',
description: 'Sistema de gestión de usuarios con Next.js 15, Supabase y shadcn/ui',
}
export default function RootLayout({ children }) {
return (
<html lang="es">
<body
className={`${geistSans.variable} ${geistMono.variable} antialiased`}
>
{children}
<Toaster />
</body>
</html>
)
}