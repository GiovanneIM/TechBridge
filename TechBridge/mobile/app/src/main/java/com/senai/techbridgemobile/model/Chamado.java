package com.senai.techbridgemobile.model;

import com.google.gson.annotations.SerializedName;

public class Chamado {

    private int id;

    @SerializedName("estado")
    private String estado;

    @SerializedName("descricao_problema")
    private String descricaoProblema;

    // Construtor vazio (IMPORTANTE)
    public Chamado() {
    }

    public int getId() {
        return id;
    }

    public String getEstado() {
        return estado;
    }

    public String getDescricaoProblema() {
        return descricaoProblema;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public void setDescricaoProblema(String descricaoProblema) {
        this.descricaoProblema = descricaoProblema;
    }
}