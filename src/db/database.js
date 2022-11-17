const {createConnection} = require('mysql');
let _conn = null;

module.exports = {

    startConnection() {
        _conn = createConnection({
            host: 'mysql10-farm1.kinghost.net',
            user: 'emalherbi04',
            password: 'FFi6V8Yghw3i',
            database: 'emalherbi04',
        });
        this.onConnect();
        return _conn;
    },

    getConn() {
        return _conn;
    },

    onConnect() {
        _conn.connect((err) => {
            if (err) throw err;
            // console.log('Conexão realizada scom sucesso!');
        });
    }

}
