-- Migration: Selecionar tabelas
-- Data: 2026-03-08
-- Descrição: Seleciona as tabelas para visualisação


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Selecionando as tabelas do banco
SELECT * FROM tipos_usuarios;
SELECT * FROM empresas;
SELECT * FROM usuarios;
SELECT * FROM setores;
SELECT * FROM maquinas;
SELECT * FROM causas;
SELECT * FROM chamados;
SELECT * FROM logs;