package com.senai.techbridgemobile.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.senai.techbridgemobile.model.Chamado;

import java.util.List;

public class ChamadosAdapter extends RecyclerView.Adapter<ChamadosAdapter.ViewHolder> {

    private List<Chamado> lista;

    public ChamadosAdapter(List<Chamado> lista){
        this.lista = lista;
    }


    @NonNull
    @Override
    public ChamadosAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(
                android.R.layout.simple_list_item_2, parent, false
        );
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ChamadosAdapter.ViewHolder holder, int position) {
        Chamado chamado = lista.get(position);
        holder.txt1.setText(chamado.getDescricaoProblema());
        holder.txt2.setText(chamado.getEstado());

    }

    @Override
    public int getItemCount() {
        return lista.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView txt1, txt2;

        public ViewHolder(@NonNull View itemview) {
            super(itemview);
            txt1 = itemview.findViewById(android.R.id.text1);
            txt2 = itemview.findViewById(android.R.id.text2);
        }
    }

}
