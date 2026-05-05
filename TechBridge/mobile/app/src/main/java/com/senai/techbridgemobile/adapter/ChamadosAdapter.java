package com.senai.techbridgemobile.adapter;

import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.senai.techbridgemobile.R;
import com.senai.techbridgemobile.model.Chamado;

import java.util.List;

public class ChamadosAdapter extends RecyclerView.Adapter<ChamadosAdapter.ViewHolder> {

    private List<Chamado> lista;

    public ChamadosAdapter(List<Chamado> lista) {
        this.lista = lista;
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

        holder.txtId.setText("ID: " + chamado.getId());
        holder.txtEstado.setText("Estado: " + chamado.getEstado());

        // 🔥 Cor por status
        if (chamado.getEstado() != null &&
                chamado.getEstado().equalsIgnoreCase("aberto")) {

            holder.txtEstado.setTextColor(Color.parseColor("#2E7D32")); // verde

        } else {
            holder.txtEstado.setTextColor(Color.parseColor("#C62828")); // vermelho
        }
    }

    @Override
    public int getItemCount() {
        return lista != null ? lista.size() : 0;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        TextView txtId, txtEstado;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            txtId = itemView.findViewById(R.id.txtId);
            txtEstado = itemView.findViewById(R.id.txtEstado);
        }
    }
}