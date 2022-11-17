const db = require('../db/database.js');

module.exports = {

    get(idEmpresa, idCategoria) {
        return new Promise((resolve) => {
            const arr = [];
            let sql = `SELECT 
                            id_categoria,
                            id_empresa,
                            nome,
                            icon,
                            ativo
                       FROM categoria 
                       where id_empresa = ${idEmpresa} `;
            if (idCategoria) {
                sql += ` and id_categoria = ${idCategoria}`;
            }

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                Object.keys(result).forEach((key) => {
                    const obj = result[key];
                    arr.push(obj);
                });
                const res = idCategoria ? arr[0] : arr;
                resolve(res);
            });
        });
    },

    post(obj, idEmpresa) {
        return new Promise((resolve) => {
            let sql = `INSERT INTO categoria
                       (id_categoria, id_empresa, nome, icon, ativo)
                       VALUES (${obj.id_categoria}, ${idEmpresa}, '${obj.nome}', '${obj.icon}', ${obj.ativo ? 1 : 0}) `;

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                const res = +result.affectedRows > 0 ? true : false;
                resolve(res);
            });
        });
    },

    put(obj, idEmpresa, idCategoria) {
        if (!idEmpresa) {
            throw new Error('o campo idEmpresa é obrigatório');
        }
        return new Promise((resolve) => {
            const ativo = obj.ativo ? 1 : 0;
            let sql = `UPDATE categoria
                       SET nome  = '${obj.nome}',
                           icon = '${obj.icon}',
                           ativo = ${ativo}
                       WHERE id_categoria = ${idCategoria} 
                         and id_empresa = ${idEmpresa}`;

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                const res = +result.affectedRows > 0 ? true : false;
                resolve(res);
            });
        });
    },

    delete(idEmpresa, idCategoria) {
        return new Promise((resolve) => {
            let sql = `Delete from categoria
                       WHERE id_empresa = ${idEmpresa}
                         and id_categoria = ${idCategoria}`;

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                resolve(`Categoria ${idCategoria} excluída com sucesso`);
            });
        });
    }

}
