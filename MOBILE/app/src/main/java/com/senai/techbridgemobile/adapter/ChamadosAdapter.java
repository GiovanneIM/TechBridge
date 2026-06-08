package com.senai.techbridgemobile.adapter;

import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.senai.techbridgemobile.MainActivity;
import com.senai.techbridgemobile.R;
import com.senai.techbridgemobile.database.ApiService;
import com.senai.techbridgemobile.database.RetrofitClient;
import com.senai.techbridgemobile.model.ApiResponse;
import com.senai.techbridgemobile.model.Chamado;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ChamadosAdapter extends RecyclerView.Adapter<ChamadosAdapter.ViewHolder> {

    private List<Chamado> lista;
    private String token;

    public ChamadosAdapter(List<Chamado> lista, String token) {
        this.lista = lista;
        this.token = token;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_chamado, parent, false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Chamado chamado = lista.get(position);

        // EXIBINDO O CÓDIGO DO CHAMADO
        String codigo =chamado.getCod_setor()
                + "-" + chamado.getCod_maquina()
                + "-" + chamado.getCod_chamado();
        holder.txt_Codigo.setText(codigo);

        // EXIBINDO O ID DO CHAMADO
        String id = "ID: " + chamado.getId();
        holder.txtId.setText(id);

        // EXIBINDO A DATA DE ABERTURA DO CHAMADO
        SimpleDateFormat formatoData = new SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault());
        String dataFormatada = formatoData.format(chamado.getDatahora_abertura());
        String horaChamado =  "Hora de abertura: " + dataFormatada;
        holder.txt_HoraAbertura.setText(horaChamado);

        // BOTÃO DE ATENDER CHAMADO
        holder.btn_Atender.setOnClickListener( view -> {
            // REFERÊNCIANDO A API
            ApiService api = RetrofitClient.getRetrofitInstance().create(ApiService.class);

            // CONCLUINDO CHAMADO
            api.concluirChamado(
                    token,
                    chamado.getId_empresa(),
                    chamado.getCod_setor(),
                    chamado.getCod_maquina(),
                    chamado.getCod_chamado()
            ).enqueue(new Callback<ApiResponse>() {
                @Override
                public void onResponse(Call<ApiResponse> call, Response<ApiResponse> response) {

                }

                // FALHA AO CONSULTAR
                @Override
                public void onFailure(Call<ApiResponse> call, Throwable t) {
                    Log.e("API_FALHA", t.getMessage());
                }
            });
        });

    }

    @Override
    public int getItemCount() {
        return lista != null ? lista.size() : 0;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        TextView txtId, txt_HoraAbertura, txt_Codigo;
        Button btn_Atender;
        EditText edt_Causa;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            txt_Codigo = itemView.findViewById(R.id.txt_Codigo);
            txtId = itemView.findViewById(R.id.txtId);
            txt_HoraAbertura = itemView.findViewById(R.id.txt_HoraAbertura);
            btn_Atender = itemView.findViewById(R.id.btn_Atender);
            edt_Causa = itemView.findViewById(R.id.edt_Causa);
        }
    }
}