import swaggerJSDoc from 'swagger-jsdoc'

const PORT = process.env.PORT || 3000

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API - TechBridge',
			version: '1.0.0',
			description: `
				API REST para gerenciamento de sessão, usuários, setores, máquinas e chamados.

				A API utiliza um padrão de resposta consistente, no qual todas as rotas retornam:
				- "sucesso" (boolean): indica se a requisição foi executada com êxito;
				- "mensagem" (string): descrição do sucesso ou do erro ocorrido;
				- "dados" (quando aplicável): informações retornadas pela operação.

            `
		},
		servers: [
			{
				url: `http://localhost:${PORT}/techbridge`
			}
		],
		components: {
			schemas: {
				Login: {
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
				LoginResponse: {
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
				TokenBody: {
					type: 'object',
					properties: {
						token: { type: 'string', example: 'Bearer Token' },
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
										cargo: { type: 'string', example: 'admin' },
										id_empresa: { type: 'number', example: 1 }
									}
								}
							}
						}
					}
				},
			}
		}
	},
	apis: ['./routes/*.js']
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)