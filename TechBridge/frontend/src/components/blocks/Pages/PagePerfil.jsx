"use client";

import { useState } from "react";

export default function PagePerfil({ usuario }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    const tecnico = usuario;
    console.log(tecnico);
    

    if (!tecnico) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Carregando perfil...
            </div>
        );
    }

    const openModal = () => {
        setUsuarioSelecionado(tecnico);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUsuarioSelecionado(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">

                {/* HEADER */}
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm border">
                    <div className="h-25"></div>

                    <div className="px-6 pb-6 -mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-5">

                        <div className="flex items-center gap-5">

                            <img
                                src={tecnico.foto_perfil}
                                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
                            />

                            <div>
                                <h1 className="text-3xl font-bold">
                                    {tecnico.nome}
                                </h1>

                                <p className="text-gray-600 text-sm">
                                    {tecnico.cargo || "Sem cargo"}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={openModal}
                            className="px-5 py-2.5 rounded-xl text-white bg-blue-600"
                        >
                            Editar perfil
                        </button>
                    </div>
                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white border rounded-2xl p-5">
                        <Info label="Email" value={tecnico.email} />
                        <Info label="Telefone" value={tecnico.telefone} />
                    </div>

                    <div className="bg-white border rounded-2xl p-5">
                        <Info label="Cargo" value={tecnico.cargo} />
                        <Info label="Departamento" value={tecnico.departamento} />
                    </div>

                    <div className="bg-white border rounded-2xl p-5">
                        <Info label="Cidade" value={tecnico.cidade} />
                        <Info label="Estado" value={tecnico.estado} />
                    </div>
                </div>

                {/* BIO */}
                <div className="bg-white border rounded-2xl p-6">
                    <p>{tecnico.bio || "Sem descrição."}</p>
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-white w-full max-w-2xl rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Editar perfil
                        </h2>

                        <Input label="Nome" value={usuarioSelecionado.nome} />
                        <Input label="Email" value={usuarioSelecionado.email} />

                        <div className="flex justify-end mt-4 gap-2">
                            <button onClick={closeModal}>Cancelar</button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Info({ label, value }) {
    return (
        <div className="flex justify-between text-sm">
            <span className="text-gray-500">{label}</span>
            <span>{value || "-"}</span>
        </div>
    );
}

function Input({ label, value }) {
    return (
        <div className="mb-3">
            <label className="text-xs text-gray-500">{label}</label>
            <input defaultValue={value} className="w-full border p-2 rounded" />
        </div>
    );
}