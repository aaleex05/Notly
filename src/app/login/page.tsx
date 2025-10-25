"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../backend/client";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Button from "@/components/ui/buttonStyle";

export default function Login() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
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
                    data: { display_name: name },
                    emailRedirectTo: '/dashboard'
                }
            });

            if (error) {
                toast.error("Error al enviar el email. Inténtalo de nuevo.");
            } else {
                toast.success("¡Email enviado! Revisa tu bandeja de entrada.");
                setEmail('');
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
                <div className="rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-primary">
                    <div className="p-6 space-y-5 md:space-y-6 sm:p-8">
                        <h1 className="flex justify-center text-4xl py-5 font-bold tracking-wide">Notly</h1>
                        <div>
                            <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-2xl">Iniciar sesión</h2>
                            <p className="text-white/60">Introduce tu correo electrónico y te enviaremos un enlace mágico</p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="text"
                                name="nae"
                                placeholder="Nombre usuario"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isSubmitting}
                                className="p-2 rounded-lg border-1 border-border py-2 bg-primary focus:outline-2 focus:border-1 focus:border-[#797979] focus:outline-[#525252]"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico *"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isSubmitting}
                                className="p-2 rounded-lg border-1 border-border py-2 bg-primary focus:outline-2 focus:border-1 focus:border-[#797979] focus:outline-[#525252]"

                            />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center gap-2 mt-3"
                                variant="white"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner />
                                        <span>Enviando...</span>
                                    </>
                                ) : (
                                    'Iniciar sesión'
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}