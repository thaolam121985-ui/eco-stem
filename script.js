function tinhToanToanBo() {
    // 1. Lấy dữ liệu đầu vào từ các thanh trượt (Range)
    let litXang = parseFloat(document.getElementById("litXang").value);
    let heSoXang = parseFloat(document.getElementById("loaiXang").value);
    let kwhDien = parseFloat(document.getElementById("kwhDien").value);
    let kgRac = parseFloat(document.getElementById("kgRac").value);

    // 2. Hiển thị con số thực thời lên giao diện text cạnh thanh trượt
    document.getElementById("valXang").innerText = litXang;
    document.getElementById("valDien").innerText = kwhDien;
    document.getElementById("valRac").innerText = kgRac;

    // 3. Công thức tính toán phát thải (kg CO2 / tháng)
    // Hệ số: Điện Việt Nam ~ 0.8 kg CO2/kWh, Rác ~ 2.5 kg CO2/kg (tính theo tháng = tuần * 4)
    let carbonXang = litXang * heSoXang;
    let carbonDien = kwhDien * 0.8;
    let carbonRac = (kgRac * 4) * 2.5;

    let tongCong = carbonXang + carbonDien + carbonRac;

    // 4. In tổng kết quả ra màn hình bên phải (lấy 2 chữ số thập phân)
    document.getElementById("tongCarbon").innerText = tongCong.toFixed(2);

    // 5. Thay đổi icon trạng thái và đưa ra lời khuyên thông minh
    let loiKhuyen = "";
    if (tongCong < 150) {
        loiKhuyen = "🌱 Tuyệt vời! Lối sống của bạn rất xanh và thân thiện với môi trường. Hãy duy trì nhé!";
        capNhatEmoji("🍃");
    } else if (tongCong >= 150 && tongCong < 400) {
        loiKhuyen = "⚠️ Mức phát thải trung bình. Bạn nên thử tắt bớt thiết bị điện và đi bộ/xe đạp nhiều hơn.";
        capNhatEmoji("🟡");
    } else {
        loiKhuyen = "🚨 Báo động! Lượng khí thải của bạn khá cao. Hãy áp dụng ngay các mẹo tiết kiệm điện và giảm rác thải.";
        capNhatEmoji("❌");
    }

    document.getElementById("loiKhuyen").innerText = loiKhuyen;
}

function capNhatEmoji(emoji) {
    document.getElementById("emojiXang").innerText = emoji;
    document.getElementById("emojiDien").innerText = emoji;
    document.getElementById("emojiRac").innerText = emoji;
}

// Chạy tính toán lần đầu ngay khi trang web vừa tải xong
window.onload = tinhToanToanBo;