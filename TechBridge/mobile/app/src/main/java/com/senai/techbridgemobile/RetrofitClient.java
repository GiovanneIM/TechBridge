package com.senai.techbridgemobile;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {

    // URL DA API
    private static final String BASE_URL = "http://10.84.7.6:3000";

    // INSTÂNCIA DO BANCO DE DADOS
    private static Retrofit retrofit = null;

    // GET - INSTÂNCIA DO BANCO
    public static Retrofit getRetrofitInstance() {
        // SE A INSTÂNCIA NÃO EXISTIR
        if (retrofit == null) {
            // CRIA A INSTÂNCIA
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }

        // RETORNA A INSTÂNCIA
        return retrofit;
    }
}