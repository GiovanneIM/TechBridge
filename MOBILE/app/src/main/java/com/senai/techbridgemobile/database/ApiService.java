package com.senai.techbridgemobile.database;

import com.senai.techbridgemobile.LoginRequest;
import com.senai.techbridgemobile.LoginResponse;
import com.senai.techbridgemobile.model.ApiResponse;
import com.senai.techbridgemobile.model.ConcluirChamadoRequest;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ApiService {

    @POST("/techbridge/auth/login")
    Call<LoginResponse> login(@Body LoginRequest request);

    @GET("/techbridge/auth/perfil")
    Call<ApiResponse> perfil(@Header("Authorization") String token);

    @GET("/techbridge/empresas/{id_empresa}/chamados?estado=aberto")
    Call<ApiResponse> carregarChamadosAbertos(
            @Header("Authorization") String token,
            @Path("id_empresa") int idEmpresa
    );

    @PATCH("techbridge/chamados/{id_chamado}/concluir")
    Call<ApiResponse> concluirChamado(
            @Header("Authorization") String token,
            @Path("id_chamado") int id_chamado,
            @Body ConcluirChamadoRequest body
    );
}