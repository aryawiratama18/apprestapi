"use strict";

var response = require("./res");
var connection = require("./koneksi");
const conn = require("./koneksi");

exports.index = function (req, res) {
    response.ok("Aplikasi REST API berjalan", res);
};

// menampilkan semua data mahasiswa
exports.tampilsemuadatamahasiswa = function (req, res) {
    connection.query("SELECT * FROM mahasiswa", function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

// menampilkan semua data mahasiswa berdasarkan id
exports.tampilberdasarkanid = function (req, res) {
    let id = req.params.id;
    connection.query("SELECT * FROM mahasiswa WHERE id = ?", [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        });
}

// menambahkan data mahasiswa
exports.tambahdatamahasiswa = function (req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query("INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)", [nim, nama, jurusan],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil menambahkan data!", res);
            }
        });
};

// mengubah data berdasarkan id
exports.ubahdatamahasiswa = function (req, res) {
    var id = req.body.id;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query("UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id=?", [nim, nama, jurusan, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil mengubah data", res);
            }
        });
}

exports.hapusdatamahasiswa = function (req, res) {
    var id = req.body.id;

    connection.query("DELETE FROM mahasiswa WHERE id=?", [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil menghapus data", res);
            }
        });
}