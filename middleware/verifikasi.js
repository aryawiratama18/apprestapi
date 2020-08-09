const jwt = require('jsonwebtoken');
const config = requier('../config/secret');

function verifikasi(roles) {
    return function (req, rest, next) {
        // cek authorization header
        var tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1];
            // verifikasi
            jwt.verify(token, config.secret, function (error, decoded) {
                if (error) {
                    return rest.status(401).send({
                        auth: false,
                        message: 'Token tidak terdaftar!'
                    });
                } else {
                    if (roles == 2) {
                        req.auth = decoded;
                        next();
                    } else {
                        return rest.status(401).send({
                            auth: false,
                            message: 'Gagal meng-otorisasi akun anda!'
                        });
                    }
                }
            });
        } else {
            return rest.status(401).send({
                auth: false,
                message: 'Token tidak tersedia!'
            });
        }
    }
}

module.exports = verifikasi;