package com.senai.techbridgemobile.model;

public class ApiResponse {

    private boolean sucesso;
    private String mensagem;
    private DadosResponse dados;

    public boolean isSucesso() {

        return sucesso;
    }

    public DadosResponse getDados() {
        return dados;
    }
}