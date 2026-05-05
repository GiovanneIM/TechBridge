package com.senai.techbridgemobile.model;

public class ChamadoResponse {

    private boolean sucesso;
    private DadosResponse dados;

    public boolean isSucesso() {
        return sucesso;
    }

    public DadosResponse getDados() {
        return dados;
    }
}