import swaggerJSDoc from "swagger-jsdoc"

const PORT = process.env.PORT || 3000

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API - TechBridge',
			version: '1.0.0',
			description: `
				API REST para gerenciamento de sessão, usuários, setores, máquinas e chamados.

				A API utiliza um padrão de respostas, no qual todas as rotas retornam:
				- "sucesso" (boolean): indica se a requisição foi executada com êxito;
				- "mensagem" (string): descrição do sucesso ou do erro ocorrido;
				- "dados" (quando aplicável): informações retornadas pela operação.

            `
		},

		servers: [
			{
				// url: `http://localhost:${PORT}/techbridge`
				// url: "https://techbridge-api.up.railway.app/techbridge"
				url: "https://symmetrical-cod-44x7vxqjg67fjqvp-3000.app.github.dev/techbridge"
			}
		],

		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
					description: 'Insira o token JWT retornado pelo login: **Bearer &lt;token&gt;**',
				},
			},

			schemas: {
				// PAGINACAO
				paginacao: {
					type: 'object',
					properties: {
						total: { type: 'int', example: 78 },
						page: { type: 'int', example: 1 },
						limit: { type: 'int', example: 10 },
						total_paginas: { type: 'int', example: 8 },
					}
				},
				// ADMIN
				GetEmpresas: {
					type: 'object',
					properties: {
						empresas: {
							type: 'array',
							example: ['...']
						},
						paginacao: {
							$ref: '#/components/schemas/paginacao'
						}
					}
				},
				NewCompany: {
					type: 'object',
					required: ['empresa', 'gerente'],
					properties: {

						empresa: {
							type: 'object',
							required: ['nome_fantasia', 'razao_social', 'cnpj', 'endereco'],
							properties: {
								nome_fantasia: { type: 'string', example: 'Techbridge Interprise' },
								razao_social: { type: 'string', example: 'Techbridge LTDA' },
								cnpj: { type: 'string', example: '12345678000190' },

								endereco: {
									type: 'object',
									required: ['cep', 'rua', 'numero', 'bairro', 'cidade', 'estado'],
									properties: {
										cep: { type: 'string', example: '09572000' },
										rua: { type: 'string', example: 'Rua Santo André' },
										numero: { type: 'string', example: '680' },
										complemento: { type: 'string', example: 'A' },
										bairro: { type: 'string', example: 'Vila Palmares' },
										cidade: { type: 'string', example: 'São Caetano do Sul' },
										estado: { type: 'string', example: 'SP' }
									}
								}
							}
						},

						gerente: {
							type: 'object',
							required: ['nome', 'email'],
							properties: {
								nome: { type: 'string', example: 'João de Souza' },
								email: { type: 'string', example: 'joao@email.com' }
							}
						}
					}
				},
				// AUTH
				ReqLogin: {
					type: 'object',
					required: ['email', 'senha'],
					properties: {
						email: {
							type: 'string',
							example: 'joao@email.com'
						},
						senha: {
							type: 'string',
							example: '123456'
						}
					}
				},
				ResLogin: {
					type: 'object',
					properties: {
						dados: {
							type: 'object',
							properties: {
								token: { type: 'string', example: 'JWT_TOKEN' },
								usuario: {
									type: 'object',
									properties: {
										id: { type: 'number', example: 1 },
										nome: { type: 'string', example: 'João de Souza' },
										email: { type: 'string', example: 'joao@email.com' },
										foto_perfil: {
											type: 'string',
											example: 'http://foto_perfil.com'
										},
										ativo: { type: 'boolean', example: true },
										tipo_usuario: { type: 'number', example: 1 },
										cargo: { type: 'string', example: 'admin' },
										id_empresa: { type: 'number', example: 1 }
									}
								}
							}
						}
					}
				},
				Perfil: {
					type: 'object',
					properties: {
						dados: {
							type: 'object',
							properties: {
								usuario: {
									type: 'object',
									properties: {
										id: { type: 'number', example: 1 },
										nome: { type: 'string', example: 'João de Souza' },
										email: { type: 'string', example: 'joao@email.com' },
										foto_perfil: {
											type: 'string',
											example: 'http://foto_perfil.com'
										},
										ativo: { type: 'boolean', example: true },
										tipo_usuario: { type: 'number', example: 1 },
										id_empresa: { type: 'number', example: 1 }
									}
								}
							}
						}
					}
				},
				PatchInfo: {
					type: 'object',
					properties: {
						nome: { type: 'string', example: 'Maria Silva' },
						email: { type: 'string', example: 'maria@email.com' },
						telefone: { type: 'string', example: '11903231230' },
						tipo_usuario: { type: 'string', example: 2 }
					}
				},
				PatchSenha: {
					type: 'object',
					properties: {
						senhaAtual: { type: 'string', example: '123456' },
						senhaNova: { type: 'string', example: '123456' },
					}
				},
				// EMPRESAS
				PatchCompany: {
					type: 'object',
					properties: {
						nome_fantasia: { type: 'string', example: 'Techbridge Interprise' },
						razao_social: { type: 'string', example: 'Techbridge LTDA' },
						cnpj: { type: 'string', example: '12345678000190' },

						endereco: {
							type: 'object',
							required: ['cep', 'rua', 'numero', 'bairro', 'cidade', 'estado'],
							properties: {
								cep: { type: 'string', example: '09572000' },
								rua: { type: 'string', example: 'Rua Santo André' },
								numero: { type: 'string', example: '680' },
								complemento: { type: 'string', example: 'A' },
								bairro: { type: 'string', example: 'Vila Palmares' },
								cidade: { type: 'string', example: 'São Caetano do Sul' },
								estado: { type: 'string', example: 'SP' }
							}
						}
					}
				},


			},
		}
	},

	// apis: ['./src/routes/*.js']
	apis: ['./**/*.js']
}

console.log("Swagger carregado com sucesso");
export const swaggerSpec = swaggerJSDoc(swaggerOptions)