package com.senai.techbridgemobile.model;

public class Usuario {
    // DADOS DO USUARIO
    private  int id;
    private  String nome;
    private  String email;
    private  String foto_perfil;
    private  boolean ativo;
    private  int tipo_usuario;
    private  int id_empresa;


    // GETTERS
    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getFoto_perfil() {
        return foto_perfil;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public int getTipo_usuario() {
        return tipo_usuario;
    }

    public int getId_empresa() {
        return id_empresa;
    }
}
