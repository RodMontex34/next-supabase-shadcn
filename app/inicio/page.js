import { NavigationBar } from "@/components/NavigationBar";
import Image from "next/image";

export default function InicioPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-indigo-400 via-purple-200 to-pink-100 flex flex-col items-center justify-start animate-fade-in">
      <div className="w-full max-w-4xl mx-auto">
        <NavigationBar />
      </div>
      <section className="w-full max-w-2xl mt-20 p-10 rounded-3xl shadow-2xl bg-white/60 backdrop-blur-xl border border-white/40 flex flex-col items-center transition-all duration-700 animate-fade-in">
        <div className="text-center mb-10 w-full flex flex-col items-center justify-center">
          <h1 className="text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 drop-shadow-xl mb-4 animate-slide-down">Bienvenido</h1>
          <p className="text-xl text-gray-700 mt-2 max-w-xl mx-auto animate-fade-in">Sistema CRUD profesional con Next.js, Supabase y shadcn/ui</p>
        </div>
        <div className="grid grid-cols-2 gap-8 justify-center items-center mb-10">
          <div className="group transition-transform duration-500 hover:scale-110 hover:shadow-xl rounded-xl bg-white/70 p-4 flex flex-col items-center">
            <Image src="/next.svg" alt="Next.js" width={80} height={80} className="drop-shadow-lg" />
            <span className="mt-2 text-sm text-indigo-600 font-semibold">Next.js</span>
          </div>
          <div className="group transition-transform duration-500 hover:scale-110 hover:shadow-xl rounded-xl bg-white/70 p-4 flex flex-col items-center">
            <Image src="/vercel.svg" alt="Vercel" width={80} height={80} className="drop-shadow-lg" />
            <span className="mt-2 text-sm text-gray-700 font-semibold">Vercel</span>
          </div>
          <div className="group transition-transform duration-500 hover:scale-110 hover:shadow-xl rounded-xl bg-white/70 p-4 flex flex-col items-center">
            <Image src="/globe.svg" alt="Globe" width={80} height={80} className="drop-shadow-lg" />
            <span className="mt-2 text-sm text-purple-600 font-semibold">Global</span>
          </div>
          <div className="group transition-transform duration-500 hover:scale-110 hover:shadow-xl rounded-xl bg-white/70 p-4 flex flex-col items-center">
            <Image src="/window.svg" alt="Window" width={80} height={80} className="drop-shadow-lg" />
            <span className="mt-2 text-sm text-pink-600 font-semibold">Window</span>
          </div>
        </div>
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-bounce text-center"
        >
          Empezar
        </a>
      </section>
    </main>
  );
}
