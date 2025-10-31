import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="flex h-screen bg-gray-100">
            <div
                className={`fixed inset-y-0 left-0 bg-white w-64 shadow-md z-20 transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Menu</h2>
                </div>
                <ul className="p-4 space-y-2">
                    <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Categorias</li>
                </ul>
            </div>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 left-64 bg-black opacity-25 z-10"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div className="flex-1 flex flex-col">
                <header className="flex items-center bg-green-300 p-1 shadow-md">
                    <button onClick={toggleSidebar} className="text-2xl mr-3 bg-transparent border-none focus:outline-none">
                        <FaBars />
                    </button>
                    <h1 className="text-white font-bold text-xl">Finance Organize</h1>
                </header>

                <main className="flex-1 p-6">
                    <h2 className="text-2xl1 font-semibold mb-4">Bem-vindo(a)!</h2>
                    <p className="text-gray-700">
                        Aqui você pode acessar suas categorias e gerenciar suas finanças.
                    </p>
                </main>
            </div>
        </div>
    );
}
