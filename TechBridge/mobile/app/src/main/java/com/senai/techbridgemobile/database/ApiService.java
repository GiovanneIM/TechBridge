package com.senai.techbridgemobile.database;

import com.senai.techbridgemobile.LoginRequest;
import com.senai.techbridgemobile.LoginResponse;

import retrofit2.Call;

import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;

import com.senai.techbridgemobile.model.ApiResponse;
public interface ApiService {
    // FAZER LOGIN
    @POST("/techbridge/auth/login")
    Call<LoginResponse> login(
            @Body LoginRequest request
    );

    // OBTER PERFIL DO USUARIO
    @GET("/techbridge/auth/perfil")
    Call<ApiResponse> perfil(
            @Header("Authorization") String token
    );

    // OBTER CHAMADOS ABERTOS
    @GET("/techbridge/empresas/{id_empresa}/chamados?estado=aberto")
    Call<ApiResponse> carregarChamadosAbertos(
            @Header("Authorization") String token,
            @Path("id_empresa") int idEmpresa
    );

    // CONCLUIR UM CHAMADO
    @POST("/techbridge/empresas/{id_empresa}/setores/{cod_setor}/maquinas/{cod_maquina}/chamados/{cod_chamado}")
    Call<ApiResponse> concluirChamado(
            @Header("Authorization") String token,
            @Path("id_empresa") int id_empresa,
            @Path("cod_setor") String cod_setor,
            @Path("cod_maquina") String cod_maquina,
            @Path("cod_chamado") int cod_chamado
    );


}
