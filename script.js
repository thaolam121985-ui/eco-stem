// Hàm xử lý tính toán số liệu và cập nhật giao diện emoji động
function tinhToanToanBo() {
    let heSoXang = parseFloat(document.getElementById('loaiXang').value);
    let litXang = parseFloat(document.getElementById('litXang').value);
    let soDien = parseFloat(document.getElementById('soDien').value);
    let kgRac = parseFloat(document.getElementById('kgRac').value);

    // Cập nhật giá trị hiển thị chữ cạnh thanh trượt
    document.getElementById('valXang').innerText = litXang;
    document.getElementById('valDien').innerText = soDien;
    document.getElementById('valRac').innerText = kgRac;

    // TÍNH NĂNG 1: Thay đổi emoji động theo mức tiêu thụ
    let emojiXang = document.getElementById('emojiXang');
    if (litXang === 0) { emojiXang.innerText = "🚲"; }
    else if (litXang <= 20) { emojiXang.innerText = "🛵"; }
    else { emojiXang.innerText = "🚗💨"; emojiXang.style.transform = "scale(1.1)"; }

    let emojiDien = document.getElementById('emojiDien');
    if (soDien <= 50) { emojiDien.innerText = "🌱"; }
    else if (soDien <= 200) { emojiDien.innerText = "💡"; }
    else { emojiDien.innerText = "⚡🔥"; }

    let emojiRac = document.getElementById('emojiRac');
    if (kgRac <= 5) { emojiRac.innerText = "🍃"; }
    else if (kgRac <= 20) { emojiRac.innerText = "🗑️"; }
    else { emojiRac.innerText = "⚠️🏭"; }

    // Tính toán lượng Carbon sinh ra (kg CO2 / tháng)
    let carbonXang = litXang * heSoXang;
    let carbonDien = soDien * 0.8;
    let carbonRac = kgRac * 0.5;
    let tongThang = carbonXang + carbonDien + carbonRac;
    let tongNam = tongThang * 12;

    document.getElementById('tongCarbon').innerText = tongThang.toFixed(2) + " kg CO2 / tháng";

    // TÍNH NĂNG 2: Quy đổi ra số cây xanh cần trồng trong 1 năm
    let soCayCanTrong = Math.ceil(tongNam / 22);
    document.getElementById('treeCount').innerText = soCayCanTrong + " Cây xanh / năm";

    // Phân loại mức độ ô nhiễm
    let status = document.getElementById('statusText');
    if(tongThang < 60) {
        status.innerText = "🌟 Tuyệt vời! Gia đình bạn đang có dấu chân sinh thái rất nhỏ.";
        status.style.color = "#56d364";
    } else if(tongThang <= 180) {
        status.innerText = "⚠️ Mức trung bình! Hãy thực hiện thêm hành động xanh.";
        status.style.color = "#e3b341";
    } else {
        status.innerText = "🚨 Báo động! Lượng khí thải vượt ngưỡng an toàn!";
        status.style.color = "#f85149";
    }

    // Cập nhật biểu đồ phần trăm phân bổ
    if(tongThang > 0) {
        let pXang = (carbonXang / tongThang) * 100;
        let pDien = (carbonDien / tongThang) * 100;
        let pRac = (carbonRac / tongThang) * 100;

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

    // So sánh với mức chuẩn trung bình học sinh (120 kg CO2/tháng)
    let soSanhBox = document.getElementById('compareBox');
    let mucChuan = 120;
    if (tongThang < mucChuan) {
        let phanTramThap = ((mucChuan - tongThang) / mucChuan * 100).toFixed(0);
        soSanhBox.innerHTML = `📉 Chỉ số phát thải của bạn <b>thấp hơn ${phanTramThap}%</b> so với trung bình quốc gia.`;
    } else {
        let phanTramCao = ((tongThang - mucChuan) / mucChuan * 100).toFixed(0);
        soSanhBox.innerHTML = `📈 Chỉ số phát thải của bạn <b>cao hơn ${phanTramCao}%</b> so với trung bình quốc gia.`;
    }

    // Đề xuất giải pháp
    let advice = document.getElementById('adviceBox');
    if(carbonXang > carbonDien && carbonXang > carbonRac) {
        advice.innerHTML = "🚲 <b>Hành động:</b> Khí thải từ xe máy đang lớn nhất. Nên ưu tiên đi bộ, đi xe đạp hoặc khuyến khích gia đình đổi sang <b>Xăng sinh học E10</b> để bớt khí thải độc hại.";
    } else if(carbonDien > carbonXang && carbonDien > carbonRac) {
        advice.innerHTML = "🔌 <b>Hành động:</b> Tiêu thụ điện năng đang dẫn đầu nguồn ô nhiễm. Tập thói quen rút phích cắm các thiết bị điện khi không dùng và đặt điều hòa trên 26°C nha bồ.";
    } else {
        advice.innerHTML = "🛍️ <b>Hành động:</b> Lượng rác thải sinh hoạt phát sinh khá cao. Hãy hạn chế dùng đồ nhựa một lần và thực hiện phân loại rác tái chế ngay tại nhà nhé!";
    }
}

// Logic tính điểm Rank trò chơi
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

// Cấu hình tích hợp Trợ lý ảo Coze Web Chat
new CozeWebChat.ChatApp({
    config: {
        bot_id: "7345678901234567890", 
    },
    componentProps: {
        title: "Trợ lý Ảo EcoFootprint",
    },
});

// Chạy khởi tạo ứng dụng khi load trang web
tinhToanToanBo();
tinhDiemRank();
