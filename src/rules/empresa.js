const db = require('../db/database.js');

module.exports = {

    get(idEmpresa) {
        return new Promise((resolve) => {
            const arr = [];
            let sql = `SELECT  
                            id_empresa,
                            nome,
                            nivelacesso,
                            datacadastro,
                            ativo
                       FROM empresa `;
            if (idEmpresa) {
                sql += ` WHERE id_empresa = ${idEmpresa}`;
            }

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                Object.keys(result).forEach((key) => {
                    const obj = result[key];
                    arr.push(obj);
                });
                const res = idEmpresa ? arr[0] : arr;
                resolve(res);
            });
        });
    },

    post(obj) {
        return new Promise((resolve) => {
            let sql = `insert into empresa (id_empresa, nome, nivelacesso, ativo)
                       VALUES (${obj.id_empresa}, '${obj.nome}', ${obj.nivelAcesso}, ${obj.ativo ? 1 : 0})`;

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                const res = +result.affectedRows > 0 ? true : false;
                resolve(res);
            });
        });
    },

    put(obj, idEmpresa) {
        return new Promise((resolve) => {
            let sql = `UPDATE empresa SET
                           id_empresa = ${idEmpresa},
                           nome = '${obj.nome}',
                           nivelacesso = ${obj.nivelAcesso},
                           ativo = ${obj.ativo ? 1 : 0}
                       WHERE id_empresa = ${idEmpresa}`;

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                const res = +result.affectedRows > 0 ? true : false;
                resolve(res);
            });
        });
    },

    delete(idEmpresa) {
        return new Promise((resolve) => {
            let sql = `Delete from empresa
                       WHERE id_empresa = ${idEmpresa}`;

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                resolve(`Empresa ${idEmpresa} excluída com sucesso`);
            });
        });
    }

}
