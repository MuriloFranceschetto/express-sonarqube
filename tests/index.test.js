const request = require('supertest');
const app = require('../src/app');
const {expect, describe, it} = require('@jest/globals');

describe('Rota padrão', () => {
    it('Get na rota padrão do server', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200)
    });
});

const ID_EMPRESA = 9021;
const ID_USUARIO = 90211;
const ID_CATEGORIA = 902111;
const ID_SUBCATEGORIA = 902111;

describe('EMPRESA', () => {

    it('Buscar lista de empresas', async () => {
        const res = await request(app).get('/empresa');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        if (res.body[0]) {
            expect(res.body[0]).toHaveProperty('id_empresa');
        }
    });

    it('Criar nova empresa', async () => {
        let objNovaEmpresa = {
            id_empresa: ID_EMPRESA,
            nome: 'Empresa de teste',
            nivelAcesso: 1,
            ativo: true,
        };
        const res = await request(app).post('/empresa').send(objNovaEmpresa);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(true);
    });

    it('Buscar empresa por código', async () => {
        const res = await request(app).get('/empresa/' + ID_EMPRESA);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id_empresa');
        expect(res.body.id_empresa).toEqual(ID_EMPRESA);
    });

    it('Atualizar Empresa', async () => {
        let objEmpresa = {
            nome: 'Empresa de teste 2',
            nivelAcesso: 1,
            ativo: true,
        };
        const res = await request(app).put('/empresa/' + ID_EMPRESA).send(objEmpresa);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(true);
    });

    describe('USUARIOS', () => {

        it('Buscar Usuários', async () => {
            const res = await request(app).get(`/usuario/${ID_EMPRESA}`);
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length) {
                expect(res.body.id_empresa).toEqual(ID_EMPRESA);
            }
        });

        it('Criar novo usuário', async () => {
            let objNovoUsuario = {
                id_empresa: ID_EMPRESA,
                id_usuario: ID_USUARIO,
                nome: 'João Kleber',
                email: 'joaozinho3000@email.com',
                senha: '123',
                ativo: true,
            };
            const res = await request(app).post(`/usuario/${ID_EMPRESA}`).send(objNovoUsuario);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(true);
        });

        it('Buscar Usuário por código', async () => {
            const res = await request(app).get(`/usuario/${ID_EMPRESA}/${ID_USUARIO}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id_empresa');
            expect(res.body).toHaveProperty('id_usuario');
            expect(res.body.id_empresa).toEqual(ID_EMPRESA);
            expect(res.body.id_usuario).toEqual(ID_USUARIO);
        });

        it('Atualizar Usuário', async () => {
            let objNovoUsuario = {
                nome: 'Murilo Franceschetto',
                email: 'lilo3000@email.com',
                senha: '321',
                ativo: false,
            };
            const res = await request(app).put(`/usuario/${ID_EMPRESA}/${ID_USUARIO}`).send(objNovoUsuario);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(true);
        });

        it('Excluir usuário', async () => {
            const res = await request(app).delete(`/usuario/${ID_EMPRESA}/${ID_USUARIO}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(`Usuario ${ID_USUARIO} excluído com sucesso`);
        });

    });

    describe('CATEGORIAS', () => {

        it('Buscar categorias', async () => {
            const res = await request(app).get(`/categoria/${ID_EMPRESA}`);
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length) {
                expect(res.body[0].id_empresa).toEqual(ID_EMPRESA);
            }
        });

        it('Criar nova categoria', async () => {
            let objNovaCategoria = {
                id_empresa: ID_EMPRESA,
                id_categoria: ID_CATEGORIA,
                nome: 'Carros',
                icon: 'user',
                ativo: true,
            };
            const res = await request(app).post(`/categoria/${ID_EMPRESA}`).send(objNovaCategoria);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(true);
        });

        it('Buscar Categoria por código', async () => {
            const res = await request(app).get(`/categoria/${ID_EMPRESA}/${ID_CATEGORIA}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id_empresa');
            expect(res.body).toHaveProperty('id_categoria');
            expect(res.body.id_empresa).toEqual(ID_EMPRESA);
            expect(res.body.id_categoria).toEqual(ID_CATEGORIA);
        });

        it('Atualizar categoria', async () => {
            let objNovoUsuario = {
                nome: 'Carros esportivos',
                icon: 'car',
                ativo: false,
            };
            const res = await request(app).put(`/categoria/${ID_EMPRESA}/${ID_CATEGORIA}`).send(objNovoUsuario);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(true);
        });

        describe('SUB-CATEGORIA', () => {

            it('Buscar sub-categorias', async () => {
                const res = await request(app).get(`/subcategoria/${ID_EMPRESA}/${ID_CATEGORIA}`);
                expect(res.statusCode).toEqual(200);
                expect(Array.isArray(res.body)).toBe(true);
                if (res.body.length) {
                    expect(res.body[0].id_empresa).toEqual(ID_EMPRESA);
                    expect(res.body[0].id_categoria).toEqual(ID_CATEGORIA);
                }
            });

            it('Criar nova sub-categoria', async () => {
                let objNovaSubCategoria = {
                    id_empresa: ID_EMPRESA,
                    id_categoria: ID_CATEGORIA,
                    id_subcategoria: ID_SUBCATEGORIA,
                    nome: 'Amarelos',
                    icon: 'yellows',
                    ativo: true,
                };
                const res = await request(app).post(`/subcategoria/${ID_EMPRESA}/${ID_CATEGORIA}`).send(objNovaSubCategoria);
                expect(res.statusCode).toEqual(200);
                expect(res.body).toEqual(true);
            });

            it('Buscar sub-categoria por código', async () => {
                const res = await request(app).get(`/subcategoria/${ID_EMPRESA}/${ID_CATEGORIA}/${ID_SUBCATEGORIA}`);
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('id_empresa');
                expect(res.body).toHaveProperty('id_subcategoria');
                expect(res.body).toHaveProperty('id_subcategoria');
                expect(res.body.id_empresa).toEqual(ID_EMPRESA);
                expect(res.body.id_categoria).toEqual(ID_CATEGORIA);
                expect(res.body.id_subcategoria).toEqual(ID_SUBCATEGORIA);
            });

            it('Atualizar sub-categoria', async () => {
                let objNovaSubCategoria = {
                    nome: 'Vermelhos',
                    icon: 'red',
                    ativo: false,
                };
                const res = await request(app).put(`/subcategoria/${ID_EMPRESA}/${ID_CATEGORIA}/${ID_SUBCATEGORIA}`).send(objNovaSubCategoria);
                expect(res.statusCode).toEqual(200);
                expect(res.body).toEqual(true);
            });

            it('Excluir sub-categoria', async () => {
                const res = await request(app).delete(`/subcategoria/${ID_EMPRESA}/${ID_CATEGORIA}/${ID_SUBCATEGORIA}`);
                expect(res.statusCode).toEqual(200);
                expect(res.body).toEqual(`Sub-Categoria ${ID_SUBCATEGORIA} excluída com sucesso`);
            });

        });

        it('Excluir categoria', async () => {
            const res = await request(app).delete(`/categoria/${ID_EMPRESA}/${ID_CATEGORIA}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(`Categoria ${ID_CATEGORIA} excluída com sucesso`);
        });

    });

    it('Excluir empresa', async () => {
        const res = await request(app).delete('/empresa/' + ID_EMPRESA);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(`Empresa ${ID_EMPRESA} excluída com sucesso`);
    });

});







