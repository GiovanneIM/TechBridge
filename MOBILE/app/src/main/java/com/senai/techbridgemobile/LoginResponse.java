package com.senai.techbridgemobile;

public class LoginResponse {
    private boolean sucesso;
    private String mensagem;
    private Dados dados;

    public boolean isSucesso() { return sucesso; }
    public String getMensagem() { return mensagem; }
    public Dados getDados() { return dados; }

    public static class Dados {
        private String token;

        public String getToken() { return token; }
    }
}