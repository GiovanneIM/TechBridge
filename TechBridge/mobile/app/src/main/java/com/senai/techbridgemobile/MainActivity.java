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

    FloatingActionButton btnCarregar;
    String token;

    RecyclerView recyclerChamados;
    ChamadosAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnCarregar = findViewById(R.id.btnCarregar);

        token = getIntent().getStringExtra("token");
        recyclerChamados = findViewById(R.id.recyclerChamados);
        recyclerChamados.setLayoutManager(new LinearLayoutManager(this));

        // 🔥 proteção contra token nulo
        if (token == null || token.isEmpty()) {
            Toast.makeText(this, "Token não encontrado", Toast.LENGTH_LONG).show();
            return;
        }

        btnCarregar.setOnClickListener(v -> carregarChamados());
    }

    private void carregarChamados() {

        ApiService api = RetrofitClient.getRetrofitInstance().create(ApiService.class);

        api.carregarChamados("Bearer " + token).enqueue(new Callback<ChamadoResponse>() {
            @Override
            public void onResponse(Call<ChamadoResponse> call, Response<ChamadoResponse> response) {

                if (response.isSuccessful() && response.body() != null) {

                    ChamadoResponse resposta = response.body();

                    if (resposta.getDados() == null || resposta.getDados().getChamados() == null) {
                        Toast.makeText(MainActivity.this,
                                "Resposta vazia da API",
                                Toast.LENGTH_LONG).show();
                        return;
                    }

                    List<Chamado> chamados = resposta.getDados().getChamados();

                    if (chamados.isEmpty()) {
                        Toast.makeText(MainActivity.this,
                                "Nenhum chamado encontrado",
                                Toast.LENGTH_LONG).show();
                        return;
                    }

                    List<Chamado> Chamados = resposta.getDados().getChamados();

                    adapter = new ChamadosAdapter(chamados);
                    recyclerChamados.setAdapter(adapter);

                } else {
                    Toast.makeText(MainActivity.this,
                            "Erro: " + response.code(),
                            Toast.LENGTH_LONG).show();

                    Log.e("API_ERRO", "Código: " + response.code());
                }
            }

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