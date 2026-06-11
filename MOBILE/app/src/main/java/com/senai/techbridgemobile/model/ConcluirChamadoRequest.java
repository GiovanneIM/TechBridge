package com.senai.techbridgemobile.model;

public class ConcluirChamadoRequest {
    private String solucao_aplicada;
    private String descricao_problema;
    private String comentario_tecnico;
    private String operador;

    public ConcluirChamadoRequest(String solucao_aplicada, String descricao_problema, String comentario_tecnico, String operador) {
        this.solucao_aplicada = solucao_aplicada;
        this.descricao_problema = descricao_problema;
        this.comentario_tecnico = comentario_tecnico;
        this.operador = operador;
    }
}