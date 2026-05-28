package com.senai.techbridgemobile.model;

import com.google.gson.annotations.SerializedName;

import java.util.Date;

public class Chamado {

    private int id;
    private int id_empresa;
    private String cod_setor;
    private String cod_maquina;
    private int cod_chamado;

    private String estado;
    private String descricao_problema;
    private Date datahora_abertura;



    // Construtor vazio (IMPORTANTE)
    public Chamado() {
    }

    // GETTERS

    public int getId() {
        return id;
    }

    public String getEstado() {
        return estado;
    }

    public String getDescricao_problema() {
        return descricao_problema;
    }

    public String getCod_setor() {
        return cod_setor;
    }

    public String getCod_maquina() {
        return cod_maquina;
    }

    public int getCod_chamado() {
        return cod_chamado;
    }

    public Date getDatahora_abertura() {
        return datahora_abertura;
    }

    public int getId_empresa() {
        return id_empresa;
    }
}