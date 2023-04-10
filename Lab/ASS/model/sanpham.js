const mongoose = require('mongoose');

const SanPhamSchema = new mongoose.Schema({
    tensp: {
        type: String,
    },
    masp: {
        type: String,
    },
    dongia: {
        type: Number
    },
    hinhanh: {
        type: String
    },
    mausac: {
        type: String
    },
    loaisp: {
        type: String
    },
    makh: {
        type: String
    },
    tenkh: {
        type: String
    }

});

const SanPhamModel = new mongoose.model('sanpham', SanPhamSchema);

module.exports = SanPhamModel;