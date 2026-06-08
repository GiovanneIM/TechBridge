"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function PagePerfil() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("perfil");
    const [form, setForm] = useState({});
    const [preview, setPreview] = useState(null);

    const { user } = useAuth()

    const tecnico = user;
    console.log(tecnico);
    

    const openModal = () => {
        setForm({
            ...tecnico,
            cidade: tecnico.nacionalidade?.split(",")[0] || "",
            pais: tecnico.nacionalidade?.split(",")[1] || "",
        });
        setIsModalOpen(true);
    };

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const salvarPerfil = async () => {
        try {
            const response = await fetch("http://localhost:3000/techbridge/user/atualizarPerfil", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // se usar cookie
                body: JSON.stringify({
                    nome: form.nome,
                    email: form.email,
                    telefone: form.telefone,
                    bio: form.bio,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.mensagem || "Erro ao atualizar perfil");
                return;
            }

            if (data.sucesso) {
                alert("Perfil atualizado com sucesso!");

            }


            // atualiza UI sem reload
            window.location.reload();

            setIsModalOpen(false);

        } catch (error) {
            console.error(error);
            alert("Erro ao salvar perfil");
        }
    };

    return (
        <div className="dark:bg-sidebar min-h-scree bg-gray-50">

            {/* HEADER PREMIUM */}
            <div className="relative h-37 bg-linear-to-r mt-10 rounded from-indigo-600 to-blue-500">
                <div className="absolute mt-2.5 left-10 flex items-end gap-6">
                    <div className="relative">
                        <img
                            src={preview || tecnico.foto_perfil}
                            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                        />
                    </div>

                    <div className="text-white mb-5">
                        <h1 className="text-3xl font-bold">{tecnico.nome}</h1>
                        <p className="opacity-90">{tecnico.cargo}</p>
                    </div>
                </div>

                <button
                    onClick={openModal}
                    className="absolute dark:bg-sidebar dark:text-white top-5 right-5 bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:scale-105 transition"
                >
                    Editar
                </button>
            </div>

            {/* CONTEÚDO */}
            <div className="max-w-6xl mx-auto mt-15">

                {/* STATS */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <Stat label="Projetos" value="24" />
                    <Stat label="Atividades" value="128" />
                    <Stat label="Avaliação" value="4.8⭐" />
                </div>

                {/* TABS */}
                <div className="flex gap-6 border-b mb-6">
                    <p className="pb-1 font-semibold">Perfil</p>
                </div>

                {/* TAB CONTENT */}
                {activeTab === "perfil" && (
                    <div className="grid md:grid-cols-3 gap-6">

                        <Card>
                            <Info label="Email" value={tecnico.email} />
                            <Info label="Telefone" value={tecnico.telefone} />
                        </Card>

                        <Card>
                            <Info label="Departamento" value={tecnico.departamento} />
                            <Info label="Cidade" value={tecnico.nacionalidade?.split(",")[0]} />
                        </Card>

                        <Card>
                            <Info label="País" value={tecnico.nacionalidade?.split(",")[1]} />
                            <Info label="Cargo" value={tecnico.cargo} />
                        </Card>

                        {/* BIO */}
                        <div className="md:col-span-3 dark:bg-sidebar dark:border bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-semibold mb-2">Sobre</h3>
                            <p className="text-gray-600 dark:text-white">{tecnico.bio}</p>
                        </div>

                        {/* SKILLS */}
                        <div className="md:col-span-3 dark:bg-sidebar dark:border bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-semibold mb-3">Habilidades</h3>

                            <div className="flex flex-wrap gap-2">
                                {["React", "Node", "UI/UX", "SQL"].map(skill => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-xl animate-scaleIn">

                        <h2 className="text-xl font-semibold mb-4">
                            Editar Perfil
                        </h2>

                        {/* FOTO */}
                        <div className="mb-4">
                            <label className="text-sm">Foto</label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setPreview(URL.createObjectURL(file));
                                    }
                                }}
                            />
                        </div>

                        <Input label="Nome" value={form.nome} onChange={(v) => handleChange("nome", v)} />
                        <Input label="Email" value={form.email} onChange={(v) => handleChange("email", v)} />
                        <Input label="Telefone" value={form.telefone} onChange={(v) => handleChange("telefone", v)} />

                        <Textarea label="Bio" value={form.bio} onChange={(v) => handleChange("bio", v)} />

                        <div className="flex justify-end mt-4 gap-2">
                            <button onClick={() => setIsModalOpen(false)}>
                                Cancelar
                            </button>

                            <button onClick={salvarPerfil} className="bg-blue-600 text-white px-4 py-2 rounded">
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* COMPONENTES */

function Card({ children }) {
    return <div className="bg-white dark:bg-sidebar dark:border p-5 rounded-2xl shadow-sm">{children}</div>;
}

function Info({ label, value }) {
    return (
        <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500 dark:text-white">{label}</span>
            <span>{value}</span>
        </div>
    );
}

function Input({ label, value, onChange }) {
    return (
        <div className="mb-3">
            <label className="text-xs text-gray-500">{label}</label>
            <input
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

function Textarea({ label, value, onChange }) {
    return (
        <div>
            <label className="text-xs text-gray-500">{label}</label>
            <textarea
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div className="bg-white dark:bg-sidebar dark:border p-4 rounded-xl shadow-sm text-center">
            <p className="text-xl font-bold">{value}</p>
            <p className="text-gray-500 text-sm dark:text-white">{label}</p>
        </div>
    );
}