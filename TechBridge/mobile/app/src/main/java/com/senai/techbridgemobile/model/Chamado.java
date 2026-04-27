package com.senai.techbridgemobile.model;

public class Chamado {

    private int id;
    private String Estado;
    private String DescricaoProblema;

    public Chamado(int id, String descricaoProblema, String estado) {
        this.id = id;
        DescricaoProblema = descricaoProblema;
        Estado = estado;
    }

    public int getId() {
        return id;
    }

    public String getEstado() {
        return Estado;
    }

    public String getDescricaoProblema() {
        return DescricaoProblema;
    }

    public void setDescricaoProblema(String descricaoProblema) {
        DescricaoProblema = descricaoProblema;
    }

    public void setEstado(String estado) {
        Estado = estado;
    }

    public void setId(int id) {
        this.id = id;
    }
}
