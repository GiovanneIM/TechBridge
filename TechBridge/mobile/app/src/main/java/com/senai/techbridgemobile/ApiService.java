package com.senai.techbridgemobile;

import com.senai.techbridgemobile.model.Chamado;

import java.util.List;

import retrofit2.Call;

import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface ApiService {
    @GET("techbridge/chamados/1")
    Call<Chamado> listarChamado(
            @retrofit2.http.Header("Authorization") String token
    );

    @POST("techbridge/auth/login")
    Call<LoginResponse> login(@Body LoginRequest request);
}
