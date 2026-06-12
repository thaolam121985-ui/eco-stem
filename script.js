function tinhToanToanBo() {
    // 1. Đọc dữ liệu từ 5 phần nhập liệu cũ của bồ
    let litXang = parseFloat(document.getElementById("litXang").value);
    let heSoXang = parseFloat(document.getElementById("loaiXang").value);
    let kwhDien = parseFloat(document.getElementById("kwhDien").value);
    let kgRac = parseFloat(document.getElementById("kgRac").value);
    let khoiNuoc = parseFloat(document.getElementById("khoiNuoc").value);
    let kgGas = parseFloat(document.getElementById("kgGas").value);

    // 2. Cập nhật số hiển thị text cạnh thanh kéo slider
    document.getElementById("valXang").innerText = litXang;
    document.getElementById("valDien").innerText = kwhDien;
    document.getElementById("valRac").innerText = kgRac;
    document.getElementById("valNuoc").innerText = khoiNuoc;
    document.getElementById("valGas").innerText = kgGas;

    // 3. Công thức tính toán cũ của bồ (Hệ số bổ sung chuẩn môi trường cho Nước và Gas)
    let carbonXang = litXang * heSoXang;
    let carbonDien = kwhDien * 0.8;
    let carbonRac = (kgRac * 4) * 2.5;
    let carbonNuoc = khoiNuoc * 0.3; // Hệ số mẫu nước sạch
    let carbonGas = kgGas * 3.0;     // Hệ số mẫu khí Gas hóa lỏng LPG

    let tongCong = carbonXang + carbonDien + carbonRac + carbonNuoc + carbonGas;

    // 4. Đẩy kết quả ra màn hình tổng
    document.getElementById("tongCarbon").innerText = tongCong.toFixed(2);

    // 5. Tính toán tăng giảm thanh tiến trình tự động (Tối đa mốc 1000kg)
    let phanTram = (tongCong / 1000) * 100;
    if (phanTram > 100) phanTram = 100;
    document.getElementById("progressBar").style.width = phanTram + "%";

    // 6. Đưa ra lời khuyên và đổi Emoji trạng thái đồng bộ
    let loiKhuyen = "";
    if (tongCong < 200) {
        loiKhuyen = "🌱 Tuyệt vời! Chỉ số phát thải của bạn rất thấp. Bạn đang bảo vệ hành tinh cực kỳ tốt.";
        capNhatEmoji("🍃");
        doiMauBar("#10b981");
    } else if (tongCong >= 200 && tongCong < 500) {
        loiKhuyen = "⚠️ Lượng khí thải ở mức trung bình. Hãy chú ý tiết kiệm điện nước và giảm rác thải sinh hoạt nhé.";
        capNhatEmoji("🟡");
        doiMauBar("#f59e0b");
    } else {
        loiKhuyen = "🚨 Báo động! Dấu chân Carbon của bạn quá cao. Cần đổi sang lối sống xanh và tiết kiệm năng lượng ngay lập tức.";
        capNhatEmoji("❌");
        doiMauBar("#ef4444");
    }

    document.getElementById("loiKhuyen").innerText = loiKhuyen;
}

// Cập nhật tất cả các Emoji trạng thái cũ
function capNhatEmoji(emoji) {
    document.getElementById("emojiXang").innerText = emoji;
    document.getElementById("emojiDien").innerText = emoji;
    document.getElementById("emojiRac").innerText = emoji;
    document.getElementById("emojiNuoc").innerText = emoji;
    document.getElementById("emojiGas").innerText = emoji;
}

// Đổi màu thanh tiến trình trực quan
function doiMauBar(color) {
    document.getElementById("progressBar").style.backgroundColor = color;
}

// Chạy tính toán tự động khi vừa mở trang
window.onload = tinhToanToanBo;