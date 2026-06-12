// Logic xử lý tính toán số liệu khí thải động
function tinhToanToanBo() {
    let heSoXang = parseFloat(document.getElementById('loaiXang').value);
    let litXang = parseFloat(document.getElementById('litXang').value);
    let soDien = parseFloat(document.getElementById('soDien').value);
    let kgRac = parseFloat(document.getElementById('kgRac').value);

    // Cập nhật giá trị text hiển thị bên cạnh label
    document.getElementById('valXang').innerText = litXang;
    document.getElementById('valDien').innerText = soDien;
    document.getElementById('valRac').innerText = kgRac;

    // Tính toán lượng Carbon
    let carbonXang = litXang * heSoXang;
    let carbonDien = soDien * 0.8;
    let carbonRac = kgRac * 0.5;
    let tong = carbonXang + carbonDien + carbonRac;

    document.getElementById('tongCarbon').innerText = tong.toFixed(2) + " kg CO2 / tháng";

    // Phân loại trạng thái Xanh/Cảnh báo
    let status = document.getElementById('statusText');
    if(tong < 60) {
        status.innerText = "🌟 Tuyệt vời! Bạn đang duy trì lối sống rất Xanh.";
        status.style.color = "#56d364";
    } else if(tong <= 180) {
        status.innerText = "⚠️ Mức trung bình! Vẫn có thể tối ưu hơn nữa.";
        status.style.color = "#e3b341";
    } else {
        status.innerText = "🚨 Báo động! Mức phát thải quá cao, cần cắt giảm!";
        status.style.color = "#f85149";
    }

    // Cập nhật các thanh tiến trình (%) và số kg cụ thể
    if(tong > 0) {
        let pXang = (carbonXang / tong) * 100;
        let pDien = (carbonDien / tong) * 100;
        let pRac = (carbonRac / tong) * 100;

        document.getElementById('ptXang').innerText = pXang.toFixed(1) + "%";
        document.getElementById('barXang').style.width = pXang + "%";
        document.getElementById('txtXangKg').innerText = carbonXang.toFixed(1) + " kg CO2";

        document.getElementById('ptDien').innerText = pDien.toFixed(1) + "%";
        document.getElementById('barDien').style.width = pDien + "%";
        document.getElementById('txtDienKg').innerText = carbonDien.toFixed(1) + " kg CO2";

        document.getElementById('ptRac').innerText = pRac.toFixed(1) + "%";
        document.getElementById('barRac').style.width = pRac + "%";
        document.getElementById('txtRacKg').innerText = carbonRac.toFixed(1) + " kg CO2";
    }

    // So sánh với mức chuẩn trung bình của học sinh
    let soSanhBox = document.getElementById('compareBox');
    let mucChuan = 120;
    if (tong < mucChuan) {
        let phanTramThap = ((mucChuan - tong) / mucChuan * 100).toFixed(0);
        soSanhBox.innerHTML = `📉 Lượng khí thải của bạn <b>thấp hơn ${phanTramThap}%</b> so với mức trung bình hộ học sinh.`;
    } else {
        let phanTramCao = ((tong - mucChuan) / mucChuan * 100).toFixed(0);
        soSanhBox.innerHTML = `📈 Lượng khí thải của bạn <b>cao hơn ${phanTramCao}%</b> so với mức trung bình hộ học sinh.`;
    }

    // Đưa ra lời khuyên thông minh dựa trên nguồn phát thải lớn nhất
    let advice = document.getElementById('adviceBox');
    if(carbonXang > carbonDien && carbonXang > carbonRac) {
        advice.innerHTML = "🚲 <b>Đi lại:</b> Ô nhiễm từ xăng xe đang lớn nhất. Nên tăng cường đi bộ, đi xe đạp hoặc đổi sang dòng <b>Xăng sinh học E10</b> để bớt khí thải độc hại.";
    } else if(carbonDien > carbonXang && carbonDien > carbonRac) {
        advice.innerHTML = "🔌 <b>Điện năng:</b> Tiêu thụ điện đang chiếm ưu thế. Tập thói quen tắt đèn quạt khi ra khỏi phòng và đặt điều hòa trên 26°C nha bồ.";
    } else {
        advice.innerHTML = "🛍️ <b>Tiêu dùng:</b> Lượng rác thải sinh hoạt khá cao. Hạn chế bao nilon và thực hiện phân loại rác tái chế ngay tại phòng bếp nhé!";
    }
}

// Logic tính điểm Rank (Gamification)
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

// Hàm hỗ trợ click vào vùng item nhiệm vụ vẫn trigger checkbox
function toggleCheck(id) {
    let cb = document.getElementById(id);
    cb.checked = !cb.checked;
    tiemDiemRank(); // Gọi lại tính điểm
}

// Chạy khởi tạo ứng dụng khi load trang
tinhToanToanBo();
tinhDiemRank();