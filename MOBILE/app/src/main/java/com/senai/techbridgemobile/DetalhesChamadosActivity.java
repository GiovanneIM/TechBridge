package com.senai.techbridgemobile;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import com.senai.techbridgemobile.database.ApiService;
import com.senai.techbridgemobile.database.RetrofitClient;
import com.senai.techbridgemobile.model.ApiResponse;
import com.senai.techbridgemobile.model.ConcluirChamadoRequest;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DetalhesChamadosActivity extends AppCompatActivity {

    TextView txtCodigo, txtIdDetalhe;
    TextInputEditText edtDescricao, edtSolucao, edtComentario, edtOperador;
    MaterialButton btnConcluir;

    int id_chamado;
    String token;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detalhes_chamado);

        txtCodigo     = findViewById(R.id.txtCodigo);
        txtIdDetalhe  = findViewById(R.id.txtIdDetalhe);
        edtDescricao  = findViewById(R.id.edtDescricao);
        edtSolucao    = findViewById(R.id.edtSolucao);
        edtComentario = findViewById(R.id.edtComentario);
        edtOperador   = findViewById(R.id.edtOperador);
        btnConcluir   = findViewById(R.id.btnConcluir);

        id_chamado = getIntent().getIntExtra("id_chamado", -1);
        token      = getIntent().getStringExtra("token");
        String codigo = getIntent().getStringExtra("codigo");

        txtIdDetalhe.setText("ID: " + id_chamado);
        txtCodigo.setText("Chamado: " + codigo);

        btnConcluir.setOnClickListener(v -> concluirChamado());
    }

    private void concluirChamado() {
        String descricao  = edtDescricao.getText().toString().trim();
        String solucao    = edtSolucao.getText().toString().trim();
        String comentario = edtComentario.getText().toString().trim();
        String operador   = edtOperador.getText().toString().trim();

        if (descricao.isEmpty()) {
            edtDescricao.setError("Informe a descrição do problema");
            return;
        }
        if (solucao.isEmpty()) {
            edtSolucao.setError("Informe a solução aplicada");
            return;
        }

        ConcluirChamadoRequest body = new ConcluirChamadoRequest(solucao, descricao, comentario, operador);

        ApiService api = RetrofitClient.getRetrofitInstance().create(ApiService.class);

        api.concluirChamado("Bearer " + token, id_chamado, body)
                .enqueue(new Callback<ApiResponse>() {
                    @Override
                    public void onResponse(Call<ApiResponse> call, Response<ApiResponse> response) {
                        if (response.isSuccessful() && response.body() != null && response.body().isSucesso()) {
                            Toast.makeText(DetalhesChamadosActivity.this,
                                    "Chamado concluído com sucesso!",
                                    Toast.LENGTH_SHORT).show();
                            finish();
                        } else {
                            Toast.makeText(DetalhesChamadosActivity.this,
                                    "Erro ao concluir: " + response.code(),
                                    Toast.LENGTH_LONG).show();
                            Log.e("CONCLUIR", "Código: " + response.code());
                        }
                    }

                    @Override
                    public void onFailure(Call<ApiResponse> call, Throwable t) {
                        Toast.makeText(DetalhesChamadosActivity.this,
                                "Falha: " + t.getMessage(),
                                Toast.LENGTH_LONG).show();
                        Log.e("CONCLUIR_FALHA", t.getMessage());
                    }
                });
    }
}