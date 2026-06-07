import streamlit as st

# 1. CẤU HÌNH TRANG WEB
st.set_page_config(page_title="EcoFootprint - Cần Thơ", page_icon="🌿", layout="centered")

# Hệ số phát thải chuẩn thực tế tại Việt Nam (kg CO2 / đơn vị tiêu thụ)
K_XANG_THUONG = 2.3  # 1 lít xăng máy thải ra ~2.3 kg CO2
K_XANG_E10 = 2.07    # Xăng sinh học E10 giúp giảm 10% lượng phát thải
K_DIEN = 0.8         # 1 kWh điện tiêu thụ tương đương ~0.8 kg CO2
K_RAC = 0.5          # 1 kg rác thải sinh hoạt phát sinh ~0.5 kg CO2 khi xử lý

# 2. GIAO DIỆN TIÊU ĐỀ
st.title("🌿 EcoFootprint: Nền Tảng Tính Toán Dấu Chân Carbon")
st.write("Dự án nghiên cứu khoa học, đo lường lượng phát thải khí nhà kính và đề xuất lối sống xanh cho học sinh.")

st.write("---")

# 3. THU THẬP CHỈ SỐ TIÊU THỤ THỰC TẾ
st.header("📊 1. Chỉ số tiêu thụ hàng tháng")
st.write("Vui lòng nhập số liệu thực tế tiêu thụ của gia đình bạn để hệ thống bắt đầu phân tích:")

loai_xang = st.selectbox("Loại nhiên liệu xe máy thường dùng:", ["Xăng thông thường (A95 / E5)", "Xăng sinh học cao cấp E10"])
lit_xang = st.slider("Số lít xăng tiêu thụ trong tháng (lít):", 0, 100, 15)
so_dien = st.slider("Điện năng tiêu thụ của gia đình (kWh / Chữ điện):", 0, 500, 80)
kg_rac = st.slider("Khối lượng rác thải sinh hoạt bỏ ra (kg):", 0, 50, 10)

# Xử lý thuật toán logic toán học
if loai_xang == "Xăng sinh học cao cấp E10":
    carbon_xang = lit_xang * K_XANG_E10
else:
    carbon_xang = lit_xang * K_XANG_THUONG

carbon_dien = so_dien * K_DIEN
carbon_rac = kg_rac * K_RAC
tong_carbon = carbon_xang + carbon_dien + carbon_rac

st.write("---")

# 4. TRỰC QUAN HÓA KẾT QUẢ PHÂN TÍCH
st.header("📉 2. Kết quả phân tích nguồn phát thải")
st.subheader(f"Tổng lượng phát thải: {tong_carbon:.2f} kg CO2 / tháng")

# Đánh giá cảnh báo mức độ tác động môi trường
if tong_carbon < 60:
    st.info("🌟 Tuyệt vời! Gia đình bạn đang duy trì một lối sống Xanh rất lý tưởng.")
elif 60 <= tong_carbon <= 180:
    st.warning("⚠️ Mức trung bình! Bạn có thể tối ưu hơn bằng cách tiết kiệm điện và đi xe đạp.")
else:
    st.error("🚨🚨 Báo động! Lượng khí thải đang ở mức quá cao. Cần thực hiện các giải pháp cắt giảm ngay!")

# Biểu diễn trực quan tỷ lệ phần trăm động (Thay thế hoàn hảo cho matplotlib)
if tong_carbon > 0:
    st.write("🔬 **Tỷ lệ phân bổ các nguồn phát thải sinh hoạt:**")
    
    pt_xang = carbon_xang / tong_carbon
    pt_dien = carbon_dien / tong_carbon
    pt_rac = carbon_rac / tong_carbon
    
    st.write(f"🛵 Nhiên liệu di chuyển: **{pt_xang*100:.1f}%** ({carbon_xang:.2f} kg CO2)")
    st.progress(pt_xang)
    
    st.write(f"🔌 Điện năng tiêu thụ: **{pt_dien*100:.1f}%** ({carbon_dien:.2f} kg CO2)")
    st.progress(pt_dien)
    
    st.write(f"🗑️ Rác thải sinh hoạt: **{pt_rac*100:.1f}%** ({carbon_rac:.2f} kg CO2)")
    st.progress(pt_rac)

st.write("---")

# 5. GIẢI THÍCH CÔNG THỨC TOÁN HỌC KHÁCH QUAN
st.header("📖 3. Công thức toán học và Cơ sở dữ liệu")
st.write("Hệ thống tự động tính toán dựa trên các quy chuẩn toán học định lượng khí nhà kính quốc tế:")

# Xuất hộp thuật toán rõ ràng, tránh lỗi ký tự LaTeX trên cloud
st.code("Tổng phát thải (E) = (V_xăng × K_xăng) + (E_điện × K_điện) + (W_rác × K_rác)")

st.markdown("""
**Ý nghĩa các đại lượng toán học:**
* **$E$**: Tổng dấu chân Carbon phát thải sinh hoạt ($kg\ CO_2$).
* **$V_{xăng}$**, **$E_{điện}$**, **$W_{rác}$**: Lần lượt là các chỉ số đầu vào thu được từ thanh trượt của người dùng.
* **$K$ (Hệ số phát thải)**: Được quy định cụ thể theo báo cáo môi trường thực tế:
    * $K_{Xăng\ thường} = 2.3$ (Phát thải tiêu chuẩn của động cơ đốt trong).
    * $K_{Xăng\ E10} = 2.07$ (Giảm 10% lượng phát thải nhờ tích hợp cồn sinh học làm từ sắn hoặc ngô).
    * $K_{Điện} = 0.8$ (Tính toán dựa trên cơ cấu nguồn điện sinh hoạt lưới quốc gia).
    * $K_{Rác} = 0.5$ (Lượng khí nhà kính sinh ra trong quá trình thu gom, phân hủy rác hữu cơ).
""")

st.write("---")

# 6. ĐỀ XUẤT GIẢI PHÁP HÀNH ĐỘNG THỰC TẾ
st.header("💡 4. Đề xuất giải pháp cắt giảm Carbon khả thi")

if carbon_xang > max(carbon_dien, carbon_rac):
    st.success("🚲 **Giải pháp cho Đi lại:** Ưu tiên đi xe đạp hoặc đi bộ đối với các quãng đường ngắn dưới 2km. Khi đồng hành cùng gia đình bằng xe máy, hãy lựa chọn dòng xăng sinh học để cắt giảm phát thải trực tiếp.")
elif carbon_dien > max(carbon_xang, carbon_rac):
    st.success("🔌 **Giải pháp cho Năng lượng:** Triển khai tắt hoàn toàn các thiết bị điện khi không ở trong phòng. Tận dụng nguồn ánh sáng tự nhiên và cài đặt nhiệt độ điều hòa không khí hợp lý từ 26°C.")
else:
    st.success("🛍️ **Giải pháp cho Tiêu dùng:** Thực hiện phân loại rác hữu cơ và rác tái chế ngay tại nhà. Hạn chế sử dụng đồ nhựa dùng một lần bằng cách luôn chuẩn bị túi vải khi đi mua sắm.")

st.write("---")
st.caption("By Tran Chi Chuong -- Deril Tran")
