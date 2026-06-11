package com.senai.techbridgemobile.adapter;

import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.senai.techbridgemobile.DetalhesChamadosActivity;
import com.senai.techbridgemobile.R;
import com.senai.techbridgemobile.model.Chamado;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

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

        // CÓDIGO DO CHAMADO
        String codigo = chamado.getCod_setor()
                + "-" + chamado.getCod_maquina()
                + "-" + chamado.getCod_chamado();
        holder.txt_Codigo.setText(codigo);

        // ID DO CHAMADO
        holder.txtId.setText("ID: " + chamado.getId());

        // DATA DE ABERTURA
        SimpleDateFormat formato = new SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault());
        holder.txt_HoraAbertura.setText("Hora de abertura: " + formato.format(chamado.getDatahora_abertura()));

        // BOTÃO — ABRE TELA DE DETALHES
        holder.btn_Atender.setOnClickListener(view -> {
            Intent intent = new Intent(view.getContext(), DetalhesChamadosActivity.class);
            intent.putExtra("id_chamado", chamado.getId());
            intent.putExtra("codigo", codigo);
            intent.putExtra("token", token);
            view.getContext().startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return lista != null ? lista.size() : 0;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        TextView txtId, txt_HoraAbertura, txt_Codigo;
        Button btn_Atender;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            txt_Codigo      = itemView.findViewById(R.id.txt_Codigo);
            txtId           = itemView.findViewById(R.id.txtId);
            txt_HoraAbertura = itemView.findViewById(R.id.txt_HoraAbertura);
            btn_Atender     = itemView.findViewById(R.id.btn_Atender);
        }
    }
}