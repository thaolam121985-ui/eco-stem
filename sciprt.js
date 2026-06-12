function tinhToanToanBo() {
    // 1. Lấy dữ liệu đầu vào từ giao diện mới
    let heSoXang = parseFloat(document.getElementById('loaiXang').value);
    let litXang = parseFloat(document.getElementById('litXang').value);
    let soDien = parseFloat(document.getElementById('soDien').value);
    let kgRac = parseFloat(document.getElementById('kgRac').value);
    let khoiNuoc = parseFloat(document.getElementById('khoiNuoc').value);

    // 2. Cập nhật con số hiển thị ngay cạnh thanh kéo slider
    document.getElementById('valXang').innerText = litXang;
    document.getElementById('valDien').innerText = soDien;
    document.getElementById('valRac').innerText = kgRac;
    document.getElementById('valNuoc').innerText = khoiNuoc;

    // 3. Xử lý thay đổi Emoji trạng thái động
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

    // 4. Công thức toán học tính lượng phát thải CO2 hàng tháng
    let carbonXang = litXang * heSoXang;
    let carbonDien = soDien * 0.8; 
    let carbonRac = (kgRac * 4) * 0.5; // Quy đổi rác tuần thành rác tháng rồi nhân hệ số
    let carbonNuoc = khoiNuoc * 0.34;  // Hệ số phát thải của nước sạch thông thường
    
    let tongThang = carbonXang + carbonDien + carbonRac + carbonNuoc;
    let tongNam = tongThang * 12;

    // Hiển thị tổng số Carbon
    document.getElementById('tongCarbon').innerText = tongThang.toFixed(2) + " kg CO₂ / tháng";

    // 5. Tính số cây xanh cần bù đắp trong 1 năm
    let soCayCanTrong = Math.ceil(tongNam / 22);
    document.getElementById('treeCount').innerText = soCayCanTrong + " Cây xanh / năm";

    // 6. Phân loại mức độ thân thiện môi trường
    let status = document.getElementById('statusText');
    if(tongThang < 100) {
        status.innerText = "🌱 Mức siêu xanh";
        status.style.background = "rgba(86, 211, 100, 0.12)";
        status.style.color = "#56d364";
    } else if(tongThang <= 250) {
        status.innerText = "⚠️ Mức trung bình! Hãy chú ý tiết kiệm năng lượng.";
        status.style.background = "rgba(240, 140, 0, 0.12)";
        status.style.color = "#e3b341";
    } else {
        status.innerText = "🚨 Mức báo động! Khí thải quá cao.";
        status.style.background = "rgba(248, 81, 73, 0.12)";
        status.style.color = "#f85149";
    }

    // 7. Cập nhật tỷ lệ % và chiều rộng thanh Progress Bar chạy động
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

    // 8. So sánh với mức chuẩn trung bình (Giả định mức chuẩn xanh là 180kg)
    let soSanhBox = document.getElementById('compareBox');
    let mucChuan = 180;
    if (tongThang < mucChuan) {
        let phanTramThap = ((mucChuan - tongThang) / mucChuan * 100).toFixed(0);
        soSanhBox.innerHTML = `📉 Chỉ số phát thải của bạn <b>thấp hơn ${phanTramThap}%</b> so với trung bình quốc gia.`;
    } else {
        let phanTramCao = ((tongThang - mucChuan) / mucChuan * 100).toFixed(0);
        soSanhBox.innerHTML = `📈 Chỉ số phát thải của bạn <b>cao hơn ${phanTramCao}%</b> so với trung bình quốc gia.`;
    }

    // 9. Đề xuất chiến lược hành động thông minh
    let advice = document.getElementById('adviceBox');
    let maxCarbon = Math.max(carbonXang, carbonDien, carbonRac, carbonNuoc);
    
    if(maxCarbon === carbonXang) {
        advice.innerHTML = "💡 <b>Chiến lược hành động:</b> Khí thải từ việc di chuyển xe máy chiếm tỷ trọng lớn nhất. Gia đình bồ nên cân nhắc chuyển sang đi chung xe, sử dụng xe đạp điện hoặc đổ dòng <b>Xăng sinh học cao cấp E10</b> để giảm bớt ô nhiễm nhé.";
    } else if(maxCarbon === carbonDien) {
        advice.innerHTML = "💡 <b>Chiến lược hành động:</b> Thiết bị điện trong nhà đang tiêu thụ lượng điện lớn. Hãy rèn luyện thói quen tắt bớt đèn, rút hẳn phích cắm khi không dùng và đặt nhiệt độ máy lạnh từ 26°C trở lên.";
    } else if(maxCarbon === carbonRac) {
        advice.innerHTML = "💡 <b>Chiến lược hành động:</b> Rác thải sinh hoạt nhà bồ đang sinh ra khí Mê-tan rất cao. Hãy hạn chế sử dụng túi nilon, hộp nhựa một lần và tích cực thực hiện phân loại rác tái chế ngay tại nguồn.";
    } else {
        advice.innerHTML = "💡 <b>Chiến lược hành động:</b> Lượng nước tiêu thụ hàng tháng đang chiếm ưu thế phát thải. Hãy kiểm tra lại hệ thống đường ống để tránh rò rỉ và tái sử dụng nước rửa rau để tưới cây nhé!";
    }
}

// Hệ thống tính điểm Thử thách sống xanh
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

// Kích hoạt tính toán ngay khi trang web vừa mở lên
window.onload = function() {
    tinhToanToanBo();
    tinhDiemRank();
};