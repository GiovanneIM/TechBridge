'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { useEmpresa } from "@/hooks/useEmpresa"
import { apiFetch } from "@/lib/api"
import { useEffect, useState } from "react"

export default function TesteIMG() {
    const [img, setIMG] = useState(null)
    const [msg, setMSG] = useState('')
    const [file, setFile] = useState(null)

    const [imgLogo, setIMGLogo] = useState(null)
    const [msgLogo, setMSGLogo] = useState('')
    const [fileLogo, setFileLogo] = useState(null)

    const { user, perfil } = useAuth()
    
    const { empresa, obterEmpresa } = useEmpresa()

    useEffect(() => {
        if (!empresa && user?.id_empresa) { obterEmpresa(user.id_empresa) }
    }, [empresa, obterEmpresa, user])



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

    function handleChangeLogo(e) {
        const arquivo = e.target.files[0]

        if (arquivo) {
            setFileLogo(arquivo)
            setIMGLogo(URL.createObjectURL(arquivo))
        }
    }

    async function atualizarLogo() {
        if (!fileLogo) return setMSGLogo('Sem imagem')

        const formData = new FormData()
        formData.append('imagem', fileLogo)

        const response = await fetch(
            `http://localhost:3000/techbridge/empresas/${user.id_empresa}/logo`, {
            method: 'PATCH',
            body: formData,
            credentials: 'include'
        });

        const data = await response.json()

        setMSGLogo(data.mensagem)

        if (data.sucesso) obterEmpresa(user.id_empresa)
    }

    return (
        <div>
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

            <div>
                <div className="flex  p-4 gap-4">
                    <div>
                        <p className="font-semibold text-xl">Nova Logo</p>
                        <img src={imgLogo} width={500} height={500} />

                        <div className="flex flex-col gap-2 mt-2">
                            <Input type="file" onChange={handleChangeLogo} />

                            <Button onClick={atualizarLogo}>Enviar</Button>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold text-xl">Logo atual</p>
                        <img src={empresa?.logo} width={500} height={500} />
                    </div>
                </div>

                <div>{msgLogo}</div>
            </div>
        </div>
    )
}