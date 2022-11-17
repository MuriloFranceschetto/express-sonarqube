const db = require('../db/database.js');

module.exports = {

    get(idEmpresa, idCategoria, idSubCategoria) {
        return new Promise((resolve) => {
            const arr = [];
            let sql = `SELECT 
                            id_subcategoria,
                            id_categoria,
                            id_empresa,
                            nome,
                            icon,
                            contafixa,
                            padrao,
                            ativo
                       FROM subcategoria 
                       where id_empresa = ${idEmpresa} 
                         and id_categoria = ${idCategoria} `;
            if (idSubCategoria) {
                sql += ` and id_subcategoria = ${idSubCategoria}`;
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

    post(obj, idEmpresa, idCategoria) {
        return new Promise((resolve) => {
            let sql = `INSERT INTO subcategoria
                       (id_subcategoria, id_categoria, id_empresa, nome, icon, ativo)
                       VALUES (${obj.id_subcategoria}, ${idCategoria}, ${idEmpresa}, '${obj.nome}', '${obj.icon}', ${obj.ativo ? 1 : 0}) `;

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                const res = +result.affectedRows > 0 ? true : false;
                resolve(res);
            });
        });
    },

    put(obj, idEmpresa, idCategoria, idSubCategoria) {
        if (!idEmpresa) {
            throw new Error('o campo idEmpresa é obrigatório');
        }
        if (!idCategoria) {
            throw new Error('o campo idCategoria é obrigatório');
        }
        return new Promise((resolve) => {
            const ativo = obj.ativo ? 1 : 0;
            let sql = `UPDATE subcategoria
                       SET nome  = '${obj.nome}',
                           icon = '${obj.icon}',
                           ativo = ${ativo}
                       WHERE id_subcategoria = ${idSubCategoria} 
                         and id_categoria = ${idCategoria}
                         and id_empresa = ${idEmpresa}`;

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                const res = +result.affectedRows > 0 ? true : false;
                resolve(res);
            });
        });
    },

    delete(idEmpresa, idCategoria, idSubCategoria) {
        return new Promise((resolve) => {
            let sql = `Delete from subcategoria
                       WHERE id_empresa = ${idEmpresa}
                         and id_categoria = ${idCategoria}
                         and id_subcategoria = ${idSubCategoria}`;

            db.getConn().query(sql, (err, result) => {
                if (err) throw err;
                resolve(`Sub-Categoria ${idCategoria} excluída com sucesso`);
            });
        });
    }

}
