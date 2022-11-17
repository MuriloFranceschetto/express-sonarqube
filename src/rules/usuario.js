const db = require('../db/database.js');

module.exports = {

    get(idEmpresa, idUsuario) {
        return new Promise((resolve) => {
            const arr = [];
            let sql = `SELECT 
                            id_usuario,
                            id_empresa,
                            nome,
                            email,
                            senha,
                            avatar,
                            role,
                            datacadastro,
                            ativo
                       FROM usuario 
                       where id_empresa = ${idEmpresa} `;
            if (idUsuario) {
                sql += ` and id_usuario = ${idUsuario}`;
            }

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                Object.keys(result).forEach((key) => {
                    const obj = result[key];
                    arr.push(obj);
                });
                const res = idUsuario ? arr[0] : arr;
                resolve(res);
            });
        });
    },

    post(obj, idEmpresa) {
        return new Promise((resolve) => {
            let sql = `INSERT INTO usuario
                       (id_usuario, id_empresa, nome, email, senha, avatar, role, ativo)
                       VALUES (${obj.id_usuario}, ${idEmpresa}, '${obj.nome}', '${obj.email}', 
                       '${obj.senha}', '${obj.avatar}', '${obj.role}', ${obj.ativo ? 1 : 0}) `;

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                const res = +result.affectedRows > 0 ? true : false;
                resolve(res);
            });
        });
    },

    put(obj, idEmpresa, idUsuario) {
        if (!idEmpresa) {
            throw new Error('o campo idEmpresa é obrigatório');
        }
        return new Promise((resolve) => {
            const ativo = obj.ativo ? 1 : 0;
            let sql = `UPDATE usuario
                       SET nome  = '${obj.nome}',
                           email = '${obj.email}',
                           senha = '${obj.senha}',
                           avatar = '${obj.avatar}',
                           role = '${obj.role}',
                           ativo = ${ativo}
                       WHERE id_usuario = ${idUsuario} 
                         and id_empresa = ${idEmpresa}`;
            console.log(sql);

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                const res = +result.affectedRows > 0 ? true : false;
                resolve(res);
            });
        });
    },

    delete(idEmpresa, idUsuario) {
        return new Promise((resolve) => {
            let sql = `Delete from usuario
                       WHERE id_empresa = ${idEmpresa}
                         and id_usuario = ${idUsuario}`;

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                resolve(`Usuario ${idUsuario} excluída com sucesso`);
            });
        });
    }

}
