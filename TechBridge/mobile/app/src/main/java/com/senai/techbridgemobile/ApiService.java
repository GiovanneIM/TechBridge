package com.senai.techbridgemobile;

import com.senai.techbridgemobile.model.Chamado;

import java.util.List;

import retrofit2.Call;

import retrofit2.http.GET;

public interface ApiService {
    @GET("users")
    Call<List<Chamado>> listarChamados();
}
