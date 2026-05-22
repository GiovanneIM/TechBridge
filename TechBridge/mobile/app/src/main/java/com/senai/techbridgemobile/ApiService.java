package com.senai.techbridgemobile;

import com.senai.techbridgemobile.model.Chamado;

import java.util.List;

import retrofit2.Call;

import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import com.senai.techbridgemobile.model.ChamadoResponse;
public interface ApiService {
    // FAZER LOGIN
    @POST("/techbridge/auth/login")
    Call<LoginResponse> login(
            @Body LoginRequest request
    );

    // OBTER CHAMADOS ABERTOS
    @GET("/techbridge/chamados/abertos")
    Call<ChamadoResponse> carregarChamados(
            @Header("Authorization") String token
    );


}
