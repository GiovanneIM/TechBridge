package com.senai.techbridgemobile;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class DetalhesChamadosActivity extends AppCompatActivity {

    TextView txtIdDetalhe, txtEstadoDetalhe;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detalhes_chamado);

        // Ligando componentes
        txtIdDetalhe = findViewById(R.id.txtIdDetalhe);
        txtEstadoDetalhe = findViewById(R.id.txtEstadoDetalhe);

        // Pegando dados enviados
        Intent intent = getIntent();

        String id = intent.getStringExtra("id");
        String estado = intent.getStringExtra("estado");

        // Exibindo na tela
        txtIdDetalhe.setText("ID: " + id);
        txtEstadoDetalhe.setText("Estado: " + estado);
    }
}
