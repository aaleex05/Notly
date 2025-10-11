"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../backend/client";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function Login() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);
                if (user) {
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: email,
                options: {
                    emailRedirectTo: '/dashboard'
                }
            });

            if (error) {
                toast.error("Error al enviar el email. Inténtalo de nuevo.");
            } else {
                toast.success("¡Email enviado! Revisa tu bandeja de entrada.");
                setEmail(''); // Clear email after successful submission
            }
        } catch (error) {
            console.error(error);
            toast.error("Error inesperado. Inténtalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        );
    } else {
        return (
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
                <div className="w-full h-1/2 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="flex justify-center text-4xl py-5 font-bold tracking-wide gradient-color">AUTH REACT</h1>
                        <div>
                            <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-2xl">Iniciar sesión</h2>
                            <p className="text-gray-400">Introduce tu correo electrónico y te enviaremos un enlace mágico</p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isSubmitting}
                                className="p-2 border-2 rounded-lg border-gray-500 pr-20 py-3 focus:border-blue-600 focus:border-2 focus:outline-hidden"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-blue-700 to-blue-600 cursor-pointer hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-600 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner />
                                        <span>Enviando...</span>
                                    </>
                                ) : (
                                    'Iniciar sesión'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}