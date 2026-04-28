package com.senai.techbridgemobile;

import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.senai.techbridgemobile.adapter.ChamadosAdapter;
import com.senai.techbridgemobile.model.Chamado;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    private RecyclerView recycler;
    private ChamadosAdapter adapter;
    private List<Chamado> lista = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        Button btnCarregar = findViewById(R.id.btnCarregar);
        recycler = findViewById(R.id.recyclerChamados);
        adapter = new ChamadosAdapter(lista);
        recycler.setLayoutManager(new LinearLayoutManager(this));
        recycler.setAdapter(adapter);

        btnCarregar.setOnClickListener(v -> carregarChamados());

    }

    private void carregarChamados(){
        ApiService api = RetrofitClient.getInstance().create(ApiService.class);
        Call<List<Chamado>> call = api.listarChamados();
        call.enqueue(new Callback<List<Chamado>>() {
            @Override
            public void onResponse(Call<List<Chamado>> call, Response<List<Chamado>> response) {
                if (response.isSuccessful()){
                    lista.clear();
                    lista.addAll(response.body());
                    adapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onFailure(Call<List<Chamado>> call, Throwable t) {
                Toast.makeText(MainActivity.this, "Erro ao carregar", Toast.LENGTH_SHORT).show();
            }
        });
    }

}