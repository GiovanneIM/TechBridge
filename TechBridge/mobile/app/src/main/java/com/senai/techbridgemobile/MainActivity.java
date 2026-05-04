package com.senai.techbridgemobile;

import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.senai.techbridgemobile.model.Chamado;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    Button btnCarregar;
    String token;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnCarregar = findViewById(R.id.btnCarregar);

        // Pegar token vindo do login
        token = getIntent().getStringExtra("token");

        btnCarregar.setOnClickListener(v -> carregarChamado());
    }

    private void carregarChamado() {

        ApiService api = RetrofitClient.getRetrofitInstance().create(ApiService.class);

        api.listarChamado("Bearer " + token).enqueue(new Callback<Chamado>() {
            @Override
            public void onResponse(Call<Chamado> call, Response<Chamado> response) {

                if (response.isSuccessful() && response.body() != null) {

                    Chamado chamado = response.body();

                    Toast.makeText(MainActivity.this,
                            "ID: " + chamado.getId() +
                                    "\nEstado: " + chamado.getEstado() +
                                    "\nProblema: " + chamado.getDescricaoProblema(),
                            Toast.LENGTH_LONG).show();

                } else {
                    Toast.makeText(MainActivity.this,
                            "Erro: " + response.code(),
                            Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<Chamado> call, Throwable t) {
                Toast.makeText(MainActivity.this,
                        "Falha: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }
}