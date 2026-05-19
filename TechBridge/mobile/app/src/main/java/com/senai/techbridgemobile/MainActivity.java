package com.senai.techbridgemobile;

import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.senai.techbridgemobile.model.Chamado;
import com.senai.techbridgemobile.model.ChamadoResponse;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.senai.techbridgemobile.adapter.ChamadosAdapter;

public class MainActivity extends AppCompatActivity {

    FloatingActionButton btnRecarregar; // BOTÃO DE RECARREGAR
    String token;                       // TOKEN DO USUÁRIO LOGADO
    RecyclerView recyclerChamados;      // RECYCLER PARA LISTAGEM DE CHAMADOS
    ChamadosAdapter adapter;            // ADAPTER PARA EXIBIR AS INFOS DOS CHAMADOS

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // REFERÊNCIANDO O BOTÃO RECARREGAR
        btnRecarregar = findViewById(R.id.btnRecarregar);
        // AO CLICAR NO BOTÃO
        btnRecarregar.setOnClickListener(v -> carregarChamados());

        // OBTENDO O TOKEN DE SESSÃO
        token = getIntent().getStringExtra("token");

        // REFERÊNCIANDO O RECYCLER
        recyclerChamados = findViewById(R.id.recyclerChamados);
        recyclerChamados.setLayoutManager(new LinearLayoutManager(this));

        // CASO NÃO TENHA UM TOKEN
        if (token == null || token.isEmpty()) {
            Toast.makeText(this, "Token não encontrado", Toast.LENGTH_LONG).show();
        }
    }

    // FUNÇÃO PARA BUSCAR OS CHAMADOS NA API
    private void carregarChamados() {
        // REFERÊNCIANDO A API
        ApiService api = RetrofitClient.getRetrofitInstance().create(ApiService.class);

        // FAZENDO A CONSULTA À API
        api.carregarChamados("Bearer " + token).enqueue(new Callback<ChamadoResponse>() {

            // AO RESPONDER
            @Override
            public void onResponse(Call<ChamadoResponse> call, Response<ChamadoResponse> response) {

                // SUCESSO NA CONSULTA
                if (response.isSuccessful() && response.body() != null) {
                    // OBTENDO CORPO DA RESPOSTA
                    ChamadoResponse resposta = response.body();

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
                    adapter = new ChamadosAdapter(chamados);
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
            public void onFailure(Call<ChamadoResponse> call, Throwable t) {
                Toast.makeText(MainActivity.this,
                        "Falha: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();

                Log.e("API_FALHA", t.getMessage());
            }
        });
    }
}