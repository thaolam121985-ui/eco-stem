import streamlit as st

# 1. CẤU HÌNH TRANG WEB APP
st.set_page_config(page_title="EcoFootprint - Sống Xanh", page_icon="🌿", layout="centered")

# Hệ số phát thải CO2 chuẩn (Dữ liệu thực tế theo quy chuẩn môi trường tại Việt Nam)
HE_SO_XANG_THUONG = 2.3  
HE_SO_XANG_E10 = 2.07    
HE_SO_DIEN = 0.8         
HE_SO_RAC_THAI = 0.5     

# 2. GIAO DIỆN TIÊU ĐỀ CHÍNH
st.title(" EcoFootprint: Nền Tảng Tính Toán Dấu Chân Carbon")
st.write("Dự án nghiên cứu, đo lường lượng phát thải khí nhà kính và đề xuất lối sống xanh cho học sinh.")

st.markdown("---")

# 3. PHẦN 1: THU THẬP DỮ LIỆU TIÊU THỤ THỰC TẾ
st.subheader("1. Nhập chỉ số tiêu thụ hàng tháng")

loai_xang = st.selectbox("Loại nhiên liệu xe máy thường dùng:", ["Xăng thông thường (A95 / E5)", "Xăng sinh học cao cấp E10"])
lit_xang = st.slider("Số lít xăng tiêu thụ trong tháng (lít):", min_value=0, max_value=100, value=15)
so_dien = st.slider("Điện năng tiêu thụ của gia đình (kWh / Chữ điện):", min_value=0, max_value=500, value=80)
kg_rac = st.slider("Khối lượng rác thải sinh hoạt bỏ ra (kg):", min_value=0, max_value=50, value=10)

if loai_xang == "Xăng sinh học cao cấp E10":
    carbon_xang = lit_xang * HE_SO_XANG_E10
else:
    carbon_xang = lit_xang * HE_SO_XANG_THUONG

carbon_dien = so_dien * HE_SO_DIEN
carbon_rac = kg_rac * HE_SO_RAC_THAI
tong_carbon = carbon_xang + carbon_dien + carbon_rac

st.markdown("---")

# 4. PHẦN 2: KẾT QUẢ VÀ TRỰC QUAN HÓA TỶ LỆ PHÁT THẢI
st.subheader(" 2. Kết quả phân tích nguồn phát thải")
st.metric(label="Tổng lượng phát thải CO2 của bạn", value=f"{tong_carbon:.2f} kg CO2 / tháng")

if tong_carbon < 60:
    st.success(" Tuyệt vời! Bạn đang duy trì một lối sống Xanh rất lý tưởng cho môi trường.")
elif 60 <= tong_carbon <= 180:
    st.warning(" Mức trung bình! Bạn vẫn có thể tối ưu hơn bằng các biện pháp tiết kiệm điện.")
else:
    st.error(" Báo động! Lượng khí thải của bạn đang ở mức quá cao. Cần hành động ngay!")

# Thay thế biểu đồ tròn bằng các thanh tiến trình hiển thị tỷ lệ thông minh
if tong_carbon > 0:
    st.write("Phân tích chi tiết tỷ lệ các nguồn gây phát thải:")
    
    phan_tram_xang = int((carbon_xang / tong_carbon) * 100)
    phan_tram_dien = int((carbon_dien / tong_carbon) * 100)
    phan_tram_rac = int((carbon_rac / tong_carbon) * 100)
    
    st.write(f" Xăng xe máy: **{phan_tram_xang}%** ({carbon_xang:.1f} kg CO2)")
    st.progress(phan_tram_xang / 100)
    
    st.write(f" Điện sinh hoạt: **{phan_tram_dien}%** ({carbon_dien:.1f} kg CO2)")
    st.progress(phan_tram_dien / 100)
    
    st.write(f" Rác thải sinh hoạt: **{phan_tram_rac}%** ({carbon_rac:.1f} kg CO2)")
    st.progress(phan_tram_rac / 100)

st.markdown("---")

# 5. PHẦN 3: GIẢI THÍCH CÔNG THỨC TOÁN HỌC & KHOA HỌC
st.subheader("📖 3. Giải thích công thức và Cơ sở dữ liệu")
st.latex(r"E_{total} = (V_{xang} \times K_{xang}) + (E_{dien} \times K_{dien}) + (W_{rac} \times K_{rac})")

st.markdown("""
**Định nghĩa các đại lượng:**
* **$E_{total}$**: Tổng dấu chân Carbon phát thải ra môi trường ($kg\ CO_2$).
* **$V_{xăng}$**, **$E_{điện}$**, **$W_{rác}$**: Số lượng tiêu thụ thực tế đầu vào thu được từ người dùng.
* **$K$ (Hệ số quy đổi chuẩn quốc gia)**: 
    * $K_{Xăng\ thường} = 2.3$ | $K_{Xăng\ E10} = 2.07$
    * $K_{Điện} = 0.8$ | $K_{Rác} = 0.5$
""")

st.markdown("---")

# 6. PHẦN 4: ĐỀ XUẤT GIẢI PHÁP HÀNH ĐỘNG THỰC TẾ & GAME ĐỔI RANK
st.subheader(" 4. Đề xuất giải pháp & Hệ thống nhiệm vụ")

if carbon_xang > max(carbon_dien, carbon_rac):
    st.info(" Giải pháp cho Đi lại:** Hãy ưu tiên đi bộ hoặc đi xe đạp cho quãng đường ngắn. Sử dụng **Xăng sinh học E10** để cắt giảm ngay 10% lượng khí thải khi di chuyển bằng xe máy.")
elif carbon_dien > max(carbon_xang, carbon_rac):
    st.info(" Giải pháp cho Năng lượng:** Hãy tắt và rút phích cắm các thiết bị điện khi không sử dụng nhằm tiết kiệm điện năng sinh hoạt.")
else:
    st.info(" Giải pháp cho Tiêu dùng:** Hạn chế túi nilon, thực hiện phân loại rác thải nhựa tái chế ngay tại nhà.")

st.markdown("---")
st.write("Tích chọn nhiệm vụ bạn đã làm hôm nay để tính Rank cấp độ sống xanh:")
diem_game = 0
nv1 = st.checkbox("Đi bộ / xe đạp dưới 2km hoặc sử dụng xe điện công cộng")
nv2 = st.checkbox("Tắt điều hòa khi ra ngoài, rút phích cắm thiết bị không xài")
nv3 = st.checkbox("Dùng bình nước cá nhân, từ chối đồ nhựa dùng 1 lần")

if nv1: diem_game += 20
if nv2: diem_game += 20
if nv3: diem_game += 20

st.write(f"**Điểm hành động của bạn:** `{diem_game}` điểm")
if diem_game == 0:
    st.code("Cấp bậc: 🥚 Trứng Non Sống Xanh")
elif 1 <= diem_game <= 40:
    st.info("Cấp bậc: 🌱 Chiến Binh Tập Sự")
else:
    st.success("Cấp bậc: 👑 HUYỀN THOẠI BẢO VỆ MÔI TRƯỜNG!")

st.markdown("---")
st.caption("By Tran Chi Chuong -- Deril Tran")
