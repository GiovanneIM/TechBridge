-- USUARIOS
SELECT  COUNT(*) AS total
FROM chamados
WHERE id_tecnico = 4 AND estado = 'concluido';

{
  "id": 3,
  "nome": "The Rock",
  "email": "gerente@email.com",
  "telefone": "(11) 97548-1367",
  "foto_perfil": null,
  "cargo": "tecnico",
  "tipo_usuario": 3,
  "empresa": {
    "id": 2,
    "nome": "EC 01"
  },

  "atendimento_atual": {
    "tem_chamado": true,
    "chamado_id": 991,
    "inicio_atendimento": "2026-06-01T10:30:00Z"
  },

  "metricas": {
    "total_chamados_atendidos": 128,
  },

  "historico_chamados": [
    {
      "mes": "2025-11",
      "total": 12
    },
    {
      "mes": "2025-12",
      "total": 18
    },
    {
      "mes": "2026-01",
      "total": 22
    },
    {
      "mes": "2026-02",
      "total": 15
    }
  ]
}
