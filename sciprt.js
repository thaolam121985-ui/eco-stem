function tinhToanToanBo() {
    // 1. Nhận diện chuẩn xác ID từ file HTML mới
    let heSoXang = parseFloat(document.getElementById('loaiXang').value);
    let litXang = parseFloat(document.getElementById('litXang').value);
    let soDien = parseFloat(document.getElementById('soDien').value);
    let kgRac = parseFloat(document.getElementById('kgRac').value);
    let khoiNuoc = parseFloat(document.getElementById('khoiNuoc').value);

    // 2. Ép số liệu hiển thị lên màn hình ngay cạnh thanh slider
    document.getElementById('valXang').innerText = litXang;
    document.getElementById('valDien').innerText = soDien;
    document.getElementById('valRac').innerText = kgRac;
    document.getElementById('valNuoc').innerText = khoiNuoc;

    // 3. Thay đổi Emoji linh hoạt theo mức độ sử dụng
    let emojiXang = document.getElementById('emojiXang');
    if (litXang === 0) emojiXang.innerText = "🚲";
    else if (litXang <= 20) emojiXang.innerText = "🛵";
    else emojiXang.innerText = "🚗💨";

    let emojiDien = document.getElementById('emojiDien');
    if (soDien <= 80) emojiDien.innerText = "🌱";
    else if (soDien <= 200) emojiDien.innerText = "💡";
    else emojiDien.innerText = "⚡🔥";

    let emojiRac = document.getElementById('emojiRac');
    if (kgRac <= 5) emojiRac.innerText = "🍃";
    else if (kgRac <= 15) emojiRac.innerText = "🗑️";
    else emojiRac.innerText = "⚠️🏭";

    let emojiNuoc = document.getElementById('emojiNuoc');
    if (khoiNuoc <= 10) emojiNuoc.innerText = "💧";
    else if (khoiNuoc <= 25) emojiNuoc.innerText = "🚰";
    else emojiNuoc.innerText = "🌊⚠️";

    // 4. Các công thức tính toán chỉ số phát thải CO2 (kg CO2 / tháng)
    let carbonXang = litXang * heSoXang;
    let carbonDien = soDien * 0.8; 
    let carbonRac = (kgRac * 4) * 0.5; // Quy đổi rác tuần sang tháng rồi nhân hệ số 0.5
    let carbonNuoc = khoiNuoc * 0.34;  // Lượng CO2 sinh ra trên mỗi khối nước tiêu thụ
    
    let tongThang = carbonXang + carbonDien + carbonRac + carbonNuoc;
    let tongNam = tongThang * 12;

    // Xuất tổng lượng Carbon ra màn hình chính
    document.getElementById('tongCarbon').innerText = tongThang.toFixed(2) + " kg CO₂ / tháng";

    // 5. Quy đổi ra số lượng cây xanh cần trồng để trung hòa CO2
    let soCayCanTrong = Math.ceil(tongNam / 22);
    document.getElementById('treeCount').innerText = soCayCanTrong + " Cây xanh / năm";

    // 6. Cập nhật nhãn trạng thái và màu sắc tương ứng
    let status = document.getElementById('statusText');
    if(tongThang < 120) {
        status.innerText = "🌱 Mức siêu xanh";
        status.style.background = "rgba(86, 211, 100, 0.12)";
        status.style.color = "#56d364";
    } else if(tongThang <= 280) {
        status.innerText = "⚠️ Mức trung bình! Hãy chú ý tiết kiệm năng lượng.";
        status.style.background = "rgba(240, 140, 0, 0.12)";
        status.style.color = "#e3b341";
    } else {
        status.innerText = "🚨 Mức báo động! Khí thải đang ở mức quá cao.";
        status.style.background = "rgba(248, 81, 73, 0.12)";
        status.style.color = "#f85149";
    }

    // 7. Tính phần trăm tỷ lệ và đẩy thanh đồ thị chạy động (Progress Bar)
    if(tongThang > 0) {
        let pXang = (carbonXang / tongThang) * 100;
        let pDien = (carbonDien / tongThang) * 100;
        let pRac = (carbonRac / tongThang) * 100;
        let pNuoc = (carbonNuoc / tongThang) * 100;

        document.getElementById('ptXang').innerText = pXang.toFixed(0) + "%";
        document.getElementById('barXang').style.width = pXang + "%";
        document.getElementById('txtXangKg').innerText = carbonXang.toFixed(1) + " kg CO₂";

        document.getElementById('ptDien').innerText = pDien.toFixed(0) + "%";
        document.getElementById('barDien').style.width = pDien + "%";
        document.getElementById('txtDienKg').innerText = carbonDien.toFixed(1) + " kg CO₂";

        document.getElementById('ptRac').innerText = pRac.toFixed(0) + "%";
        document.getElementById('barRac').style.width = pRac + "%";
        document.getElementById('txtRacKg').innerText = carbonRac.toFixed(1) + " kg CO₂";

        document.getElementById('ptNuoc').innerText = pNuoc.toFixed(0) + "%";
        document.getElementById('barNuoc').style.width = pNuoc + "%";
        document.getElementById('txtNuocKg').innerText = carbonNuoc.toFixed(1) + " kg CO₂";
    }

    // 8. Đưa ra so sánh với mức trung bình của học sinh
    let soSanhBox = document.getElementById('compareBox');
    let mucChuan = 200;
    if (tongThang < mucChuan) {
        let phanTramThap = ((mucChuan - tongThang) / mucChuan * 100).toFixed(0);
        soSanhBox.innerHTML = `📉 Chỉ số phát thải của bạn <b>thấp hơn ${phanTramThap}%</b> so với mức trung bình chuẩn.`;
    } else {
        let phanTramCao = ((tongThang - mucChuan) / mucChuan * 100).toFixed(0);
        soSanhBox.innerHTML = `📈 Chỉ số phát thải của bạn <b>cao hơn ${phanTramCao}%</b> so với mức trung bình chuẩn.`;
    }

    // 9. Tự động đề xuất giải pháp dựa trên nguồn gây ô nhiễm lớn nhất
    let advice = document.getElementById('adviceBox');
    let maxCarbon = Math.max(carbonXang, carbonDien, carbonRac, carbonNuoc);
    
    if(maxCarbon === carbonXang) {
        advice.innerHTML = "💡 <b>Chiến lược hành động:</b> Khí thải từ phương tiện di chuyển chiếm tỷ trọng lớn nhất. Hãy ưu tiên đi bộ, đi xe đạp hoặc đổ dòng <b>Xăng sinh học cao cấp E10</b> để giảm bớt khí độc ra môi trường.";
    } else if(maxCarbon === carbonDien) {
        advice.innerHTML = "💡 <b>Chiến lược hành động:</b> Tiêu thụ điện năng trong nhà đang là nguyên nhân gây ô nhiễm nhiều nhất. Bồ nên tập thói quen tắt bớt các thiết bị không cần thiết và chỉnh điều hòa từ 26°C.";
    } else if(maxCarbon === carbonRac) {
        advice.innerHTML = "💡 <b>Chiến lược hành động:</b> Lượng rác thải sinh hoạt thải ra đang sinh khí nhà kính rất cao. Hãy hạn chế sử dụng túi nilon, đồ nhựa dùng một lần và phân loại rác tái chế ngay tại nhà.";
    } else {
        advice.innerHTML = "💡 <b>Chiến lược hành động:</b> Nguồn nước sử dụng hàng tháng tạo áp lực phát thải lớn. Hãy thường xuyên kiểm tra vòi nước tránh rò rỉ và tận dụng nước rửa rau để tưới cây nhé!";
    }
}

// Hệ thống tính điểm Thử thách trò chơi sống xanh
function tinhDiemRank() {
    let diem = 0;
    if(document.getElementById('nv1').checked) diem += 20;
    if(document.getElementById('nv2').checked) diem += 20;
    if(document.getElementById('nv3').checked) diem += 20;
    if(document.getElementById('nv4').checked) diem += 20;

    document.getElementById('txtDiem').innerText = diem;

    let badge = document.getElementById('badgeRank');
    if(diem === 0) {
        badge.innerText = "🥚 Trứng Non Sống Xanh";
        badge.style.background = "#6e7681";
    } else if(diem <= 40) {
        badge.innerText = "🌱 Chiến Binh Tập Sự";
        badge.style.background = "#1f6feb";
    } else if(diem <= 60) {
        badge.innerText = "🌳 Trưởng Thành Vì Môi Trường";
        badge.style.background = "#b652da";
    } else {
        badge.innerText = "👑 HUYỀN THOẠI BẢO VỆ MÔI TRƯỜNG!";
        badge.style.background = "#238636";
    }
}

function toggleCheck(id) {
    let cb = document.getElementById(id);
    cb.checked = !cb.checked;
    tinhDiemRank();
}

// Đảm bảo chạy tính toán ngay khi load trang
window.addEventListener('DOMContentLoaded', () => {
    tinhToanToanBo();
    tinhDiemRank();
});