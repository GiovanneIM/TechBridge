package com.senai.techbridgemobile.model;

import java.util.List;

public class DadosResponse {

    private List<Chamado> chamados;
    private Usuario usuario;


    public List<Chamado> getChamados() {

        return chamados;
    }

    public Usuario getUsuario() {
        return usuario;
    }
}