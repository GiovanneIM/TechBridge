'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { apiFetch } from "@/lib/api"
import { useState } from "react"

export default function TesteIMG() {
    const [img, setIMG] = useState(null)
    const [msg, setMSG] = useState('')
    const [file, setFile] = useState(null)

    const {user, perfil} = useAuth()

    function handleChange(e) {
        const arquivo = e.target.files[0]

        if (arquivo) {
            setFile(arquivo)
            setIMG(URL.createObjectURL(arquivo))
        }
    }

    async function atualizarImagem() {
        if (!file) return setMSG('Sem imagem')

        const formData = new FormData()
        formData.append('imagem', file)

        const response = await fetch(
            'http://localhost:3000/techbridge/auth/foto', {
            method: 'PATCH',
            body: formData,
            credentials: 'include'
        });

        const data = await response.json()

        setMSG(data.mensagem)

        if (data.sucesso) perfil()
    }

    return (
        <div>
            <div className="flex  p-4 gap-4">
                <div>
                    <p className="font-semibold text-xl">Nova foto</p>
                    <img src={img} width={500} height={500} />

                    <div className="flex flex-col gap-2 mt-2">
                        <Input type="file" onChange={handleChange} />

                        <Button onClick={atualizarImagem}>Enviar</Button>
                    </div>
                </div>

                <div>
                    <p className="font-semibold text-xl">Foto atual</p>
                    <img src={user?.foto_perfil} width={500} height={500} />
                </div>
            </div>

            <div>{msg}</div>

        </div>
    )
}