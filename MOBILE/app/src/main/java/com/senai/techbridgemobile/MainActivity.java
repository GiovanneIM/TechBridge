package com.senai.techbridgemobile;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.senai.techbridgemobile.database.RetrofitClient;
import com.senai.techbridgemobile.database.ApiService;
import com.senai.techbridgemobile.model.Chamado;
import com.senai.techbridgemobile.model.ApiResponse;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.senai.techbridgemobile.adapter.ChamadosAdapter;
import com.senai.techbridgemobile.model.DadosResponse;
import com.senai.techbridgemobile.model.Usuario;

public class MainActivity extends AppCompatActivity {

    FloatingActionButton btnRecarregar; // BOTÃO DE RECARREGAR
    String token;                       // TOKEN DO USUÁRIO LOGADO
    RecyclerView recyclerChamados;      // RECYCLER PARA LISTAGEM DE CHAMADOS
    ChamadosAdapter adapter;            // ADAPTER PARA EXIBIR AS INFOS DOS CHAMADOS

    // USUÁRIO
    Usuario usuario;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // OBTENDO O TOKEN DE SESSÃO
        token = getIntent().getStringExtra("token");

        // CARREGANDO O PERFIL DO USUÁRIO
        carregarPerfil();


        // REFERÊNCIANDO O BOTÃO RECARREGAR
        btnRecarregar = findViewById(R.id.btnRecarregar);
        // AO CLICAR NO BOTÃO
        btnRecarregar.setOnClickListener(v -> carregarChamados());



        // REFERÊNCIANDO O RECYCLER
        recyclerChamados = findViewById(R.id.recyclerChamados);
        recyclerChamados.setLayoutManager(new LinearLayoutManager(this));

        // CASO NÃO TENHA UM TOKEN
        if (token == null || token.isEmpty()) {
            Toast.makeText(this, "Token não encontrado", Toast.LENGTH_LONG).show();
        }
    }

    // FUNÇÃO PARA CARREGAR OS DADOS DO USUÁRIO
    private void carregarPerfil() {
        // REFERÊNCIANDO A API
        ApiService api = RetrofitClient
                .getRetrofitInstance()
                .create(ApiService.class);

        Call<ApiResponse> call = api.perfil("Bearer " + token);

        // FAZENDO A CONSULTA À API
        call.enqueue(new Callback<ApiResponse>() {

            // AO RESPONDER
            @Override
            public void onResponse(
                    Call<ApiResponse> call,
                    Response<ApiResponse> response
            ) {

                // SUCESSO NA CONSULTA
                if (response.isSuccessful() && response.body() != null) {
                    // OBTENDO O USUÁRIO DO CORPO DA RESPOSTA
                    usuario = response.body()
                                    .getDados()
                                    .getUsuario();
                }
                // ERRO NA CONSULTA
                else {
                    Toast.makeText(MainActivity.this,
                            "Erro: " + response.code(),
                            Toast.LENGTH_LONG).show();

                    Log.e("API_ERRO", "Código: " + response.code());
                }
            }

            // FALHA AO CONSULTAR
            @Override
            public void onFailure(Call<ApiResponse> call, Throwable t) {
                Toast.makeText(MainActivity.this,
                        "Falha: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();

                Log.e("API_FALHA", t.getMessage());
            }
        });
    }

    // FUNÇÃO PARA BUSCAR OS CHAMADOS NA API
    private void carregarChamados() {
        // REFERÊNCIANDO A API
        ApiService api = RetrofitClient.getRetrofitInstance().create(ApiService.class);

        // FAZENDO A CONSULTA À API
        api.carregarChamadosAbertos("Bearer " + token, usuario.getId_empresa()).enqueue(new Callback<ApiResponse>() {

            // AO RESPONDER
            @Override
            public void onResponse(Call<ApiResponse> call, Response<ApiResponse> response) {

                // SUCESSO NA CONSULTA
                if (response.isSuccessful() && response.body() != null) {
                    // OBTENDO CORPO DA RESPOSTA
                    ApiResponse resposta = response.body();

                    // DADOS DA RESPOSTA
                    if (resposta.getDados() == null || resposta.getDados().getChamados() == null) {
                        Toast.makeText(MainActivity.this,
                                "Resposta vazia da API",
                                Toast.LENGTH_LONG).show();
                        return;
                    }

                    // CRIANDO LISTA DE CHAMADOS
                    List<Chamado> chamados = resposta.getDados().getChamados();

                    // LISTA DE CHAMADOS VAZIA
                    if (chamados.isEmpty()) {
                        Toast.makeText(MainActivity.this,
                                "Nenhum chamado encontrado",
                                Toast.LENGTH_LONG).show();
                        return;
                    }

                    // CRIANDO ADAPTER DOS CHAMADOS
                    adapter = new ChamadosAdapter(chamados, token);
                    // EXIBINDO OS CHAMADOS NO RECYCLER
                    recyclerChamados.setAdapter(adapter);

                }
                // ERRO NA CONSULTA
                else {
                    Toast.makeText(MainActivity.this,
                            "Erro: " + response.code(),
                            Toast.LENGTH_LONG).show();

                    Log.e("API_ERRO", "Código: " + response.code());
                }
            }

            // FALHA AO CONSULTAR
            @Override
            public void onFailure(Call<ApiResponse> call, Throwable t) {
                Toast.makeText(MainActivity.this,
                        "Falha: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();

                Log.e("API_FALHA", t.getMessage());
            }
        });
    }
}