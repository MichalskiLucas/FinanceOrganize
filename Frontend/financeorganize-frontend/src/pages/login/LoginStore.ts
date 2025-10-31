import { create } from "zustand";

interface LoginState {
    email: string;
    password: string;
    error: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setError: (error: string) => void;
    login: () => Promise<void>;
}

export const useLoginStore = create<LoginState>((set, get) => ({
    email: "",
    password: "",
    error: "",
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setError: (error) => set({ error }),
    
    login: async () => {
        set({ error: "" });
        try {
            const { email, password } = get();
            const API_URL = import.meta.env.VITE_API_URL;

            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password_hash: password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Erro ao fazer login");
            }

            const data = await response.json();

            localStorage.setItem("token", data.token);

            window.location.href = "/home";

        } catch (err: unknown) {
            if (err instanceof Error) {
                set({ error: err.message });
            } else {
                set({ error: "Erro desconhecido" });
            }
        }
    },
}));
