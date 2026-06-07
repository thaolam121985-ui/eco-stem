import streamlit as st

# 1. CẤU HÌNH TRANG WEB APP
st.set_page_config(page_title="EcoFootprint - Sống Xanh", page_icon="🌿", layout="centered")

# Hệ số phát thải CO2 chuẩn tại Việt Nam (kg CO2 / đơn vị tiêu thụ)
K_XANG_THUONG = 2.3  
K_XANG_E10 = 2.07    
K_DIEN = 0.8         
K_RAC = 0.5          

# 2. TIÊU ĐỀ ỨNG DỤNG
st.title("🌿 EcoFootprint: Nền Tảng Tính Toán Dấu Chân Carbon")
st.write("Dự án nghiên cứu, đo lường lượng phát thải khí nhà kính và đề xuất lối sống xanh cho học sinh.")

st.write("---")

# 3. NHẬP DỮ LIỆU TIÊU THỤ THỰC TẾ
st.header("📊 1. Nhập chỉ số tiêu thụ hàng tháng")

loai_xang = st.selectbox("Loại nhiên liệu xe máy gia đình thường dùng:", ["Xăng thông thường (A95 / E5)", "Xăng sinh học cao cấp E10"])
lit_xang = st.slider("Số lít xăng tiêu thụ trong tháng (lít):", 0, 100, 15)
so_dien = st.slider("Điện năng tiêu thụ của gia đình (kWh / Chữ điện):", 0, 500, 80)
kg_rac = st.slider("Khối lượng rác thải sinh hoạt bỏ ra (kg):", 0, 50, 10)

# Tính toán logic phát thải
if loai_xang == "Xăng sinh học cao cấp E10":
    carbon_xang = lit_xang * K_XANG_E10
else:
    carbon_xang = lit_xang * K_XANG_THUONG

carbon_dien = so_dien * K_DIEN
carbon_rac = kg_rac * K_RAC
tong_carbon = carbon_xang + carbon_dien + carbon_rac

st.write("---")

# 4. KẾT QUẢ PHÂN TÍCH
st.header("📉 2. Kết quả phân tích nguồn phát thải")
st.subheader(f"Tổng lượng phát thải: {tong_carbon:.2f} kg CO2 / tháng")

if tong_carbon < 60:
    st.info("🌟 Tuyệt vời! Bạn đang duy trì một lối sống Xanh rất lý tưởng cho môi trường.")
elif 60 <= tong_carbon <= 180:
    st.warning("⚠️ Mức trung bình! Bạn vẫn có thể tối ưu hơn bằng các biện pháp tiết kiệm năng lượng.")
else:
    st.error("🚨 Báo động! Lượng khí thải của bạn đang ở mức cao. Cần thực hiện các biện pháp cắt giảm ngay!")

st.write("🔬 **Chi tiết lượng phát thải từng phần:**")
st.write(f"- 🛵 Nhiên liệu xe máy: {carbon_xang:.2f} kg CO2")
st.write(f"- 🔌 Điện năng sinh hoạt: {carbon_dien:.2f} kg CO2")
st.write(f"- 🗑️ Rác thải tiêu dùng: {carbon_rac:.2f} kg CO2")

st.write("---")

# 5. GIẢI THÍCH CÔNG THỨC TOÁN HỌC
st.header("📖 3. Giải thích công thức tính toán")
st.write("Ứng dụng áp dụng công thức tính toán lượng phát thải dựa trên các hệ số quy đổi môi trường:")

# Trình bày công thức dạng text rõ ràng, không lo lỗi font hay lỗi kí tự
st.code("Tổng phát thải = (Sản lượng Xăng x Hệ số Xăng) + (Sản lượng Điện x Hệ số Điện) + (Khối lượng Rác x Hệ số Rác)")

st.write("**Cơ sở dữ liệu hệ số quy đổi (K):**")
st.write("- **Hệ số Xăng thường:** 2.3 (Đốt 1 lít xăng thải ra 2.3kg CO2).")
st.write("- **Hệ số Xăng sinh học E10:** 2.07 (Cắt giảm 10% phát thải nhờ cồn sinh học thân thiện).")
st.write("- **Hệ số Điện sinh hoạt:** 0.8 (Tính trên mạng lưới điện tiêu chuẩn khí thải phát điện).")
st.write("- **Hệ số Rác thải:** 0.5 (Lượng khí nhà kính sinh ra trong quá trình chôn lấp, phân hủy rác hữu cơ).")

st.write("---")

# 6. ĐỀ XUẤT GIẢI PHÁP THỰC TẾ
st.header("💡 4. Đề xuất giải pháp cắt giảm khả thi")

if carbon_xang > max(carbon_dien, carbon_rac):
    st.success("🚲 **Giải pháp đi lại:** Tăng cường đi bộ hoặc đi xe đạp với các quãng đường ngắn dưới 2km. Chuyển sang dùng xăng sinh học để bảo vệ bầu không khí tốt hơn.")
elif carbon_dien > max(carbon_xang, carbon_rac):
    st.success("🔌 **Giải pháp năng lượng:** Tắt các thiết bị điện khi ra khỏi phòng, sử dụng đèn LED tiết kiệm điện và tận dụng tối đa ánh sáng tự nhiên vào ban ngày.")
else:
    st.success("🛍️ **Giải pháp tiêu dùng:** Thực hiện phân loại rác tại nguồn, hạn chế sử dụng túi nilon và đồ nhựa một lần bằng cách mang theo túi vải cá nhân.")

st.write("---")
st.caption("By Tran Chi Chuong -- Deril Tran")
st.caption("HGH")
