import streamlit as st
import matplotlib.pyplot as plt

# 1. CẤU HÌNH TRANG WEB APP
st.set_page_config(page_title="EcoFootprint - Sống Xanh", page_icon="🌿", layout="centered")

# Hệ số phát thải CO2 chuẩn (Dữ liệu thực tế theo quy chuẩn môi trường tại Việt Nam)
# Đơn vị: kg CO2 phát thải trên mỗi đơn vị tiêu thụ
HE_SO_XANG_THUONG = 2.3  # 1 lít xăng máy thải ra ~2.3 kg CO2
HE_SO_XANG_E10 = 2.07    # Xăng sinh học E10 giảm 10% phát thải so với xăng thường
HE_SO_DIEN = 0.8         # 1 số điện (kWh) ở VN thải ra ~0.8 kg CO2 (do dùng nhiệt điện than)
HE_SO_RAC_THAI = 0.5     # 1 kg rác thải sinh hoạt phân hủy/xử lý thải ra ~0.5 kg CO2

# 2. GIAO DIỆN TIÊU ĐỀ CHÍNH
st.title("🌿 EcoFootprint: Nền Tảng Tính Toán Dấu Chân Carbon")
st.write("Dự án nghiên cứu, đo lường lượng phát thải khí nhà kính và đề xuất lối sống xanh cho học sinh.")

st.markdown("---")

# 3. PHẦN 1: THU THẬP DỮ LIỆU TIÊU THỤ THỰC TẾ
st.subheader("📊 1. Nhập chỉ số tiêu thụ hàng tháng")
st.write("Hãy điền số liệu tiêu thụ thực tế của gia đình bạn để hệ thống phân tích:")

loai_xang = st.selectbox("Loại nhiên liệu xe máy thường dùng:", ["Xăng thông thường (A95 / E5)", "Xăng sinh học cao cấp E10"])
lit_xang = st.slider("Số lít xăng tiêu thụ trong tháng (lít):", min_value=0, max_value=100, value=15)

so_dien = st.slider("Điện năng tiêu thụ của gia đình (kWh / Chữ điện):", min_value=0, max_value=500, value=80)
kg_rac = st.slider("Khối lượng rác thải sinh hoạt bỏ ra (kg):", min_value=0, max_value=50, value=10)

# Xử lý Logic tính toán dựa trên loại xăng người dùng chọn
if loai_xang == "Xăng sinh học cao cấp E10":
    carbon_xang = lit_xang * HE_SO_XANG_E10
else:
    carbon_xang = lit_xang * HE_SO_XANG_THUONG

carbon_dien = so_dien * HE_SO_DIEN
carbon_rac = kg_rac * HE_SO_RAC_THAI

# Tổng lượng phát thải Carbon
tong_carbon = carbon_xang + carbon_dien + carbon_rac

st.markdown("---")

# 4. PHẦN 2: KẾT QUẢ VÀ BIỂU ĐỒ TRỰC QUAN
st.subheader("📉 2. Kết quả phân tích & Biểu đồ tỷ lệ")
st.metric(label="Tổng lượng phát thải CO2 của bạn", value=f"{tong_carbon:.2f} kg CO2 / tháng")

# Đánh giá mức độ ô nhiễm bằng màu sắc sinh động
if tong_carbon < 60:
    st.success("🌟 Tuyệt vời! Bạn đang duy trì một lối sống Xanh rất lý tưởng cho môi trường.")
elif 60 <= tong_carbon <= 180:
    st.warning("⚠️ Mức trung bình! Bạn vẫn có thể tối ưu hơn bằng các biện pháp tiết kiệm điện và đi bộ.")
else:
    st.error("🚨🚨 Báo động! Lượng khí thải của bạn đang ở mức quá cao. Cần hành động ngay!")

# Vẽ biểu đồ tròn phân tích nguồn gây ô nhiễm chính
if tong_carbon > 0:
    fig, ax = plt.subplots(figsize=(5, 5))
    fig.patch.set_facecolor('#0e1117')  # Đặt nền trùng với giao diện tối của Streamlit
    ax.set_facecolor('#0e1117')
    
    labels = ['Xăng xe máy', 'Điện sinh hoạt', 'Rác thải']
    sizes = [carbon_xang, carbon_dien, carbon_rac]
    colors = ['#ff9999', '#66b3ff', '#99ff99']
    
    ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90, colors=colors, textprops={'color':"w", 'fontsize':12})
    ax.axis('equal')  
    st.pyplot(fig)

st.markdown("---")

# 5. PHẦN 3: GIẢI THÍCH CÔNG THỨC TOÁN HỌC & KHOA HỌC
st.subheader("📖 3. Giải thích công thức và Cơ sở dữ liệu")
st.write("Ứng dụng áp dụng công thức toán học tính toán phát thải khí nhà kính tiêu chuẩn quốc tế:")

# Viết lại công thức gọn trên 1 dòng để tránh lỗi ngắt chuỗi văn bản
st.latex(r"E_{tong} = (V_{xang} \times K_{xang}) + (E_{dien} \times K_{dien}) + (W_{rac} \times K_{rac})")

st.markdown("""
**Trong đó các đại lượng được định nghĩa như sau:**
* **$E_{tong}$**: Tổng dấu chân Carbon phát thải ra môi trường (đơn vị: $kg\ CO_2$).
* **$V_{xăng}$**, **$E_{điện}$**, **$W_{rác}$**: Lần lượt là số lít xăng, số chữ điện (kWh), và số kg rác mà bạn nhập vào từ thanh trượt.
* **$K$ (Hệ số quy đổi thực tế)**: Là lượng $CO_2$ sinh ra trên một đơn vị tiêu thụ, dựa theo báo cáo môi trường quốc gia:
    * $K_{Xăng\ thường} = 2.3$ (Đốt 1 lít xăng thải ra 2.3kg khí nhà kính).
    * $K_{Xăng\ E10} = 2.07$ (Giảm 10% nhờ pha trộn 10% cồn sinh học làm từ sắn/ngô thân thiện môi trường).
    * $K_{Điện} = 0.8$ (Mạng lưới điện Việt Nam phụ thuộc nhiều vào nhiệt điện than nên hệ số phát thải khá cao).
    * $K_{Rác} = 0.5$ (Rác thải hữu cơ chôn lấp sinh ra khí Methane và $CO_2$ trong quá trình phân hủy).
""")

st.markdown("---")

# 6. PHẦN 4: ĐỀ XUẤT GIẢI PHÁP HÀNH ĐỘNG THỰC TẾ
st.subheader("💡 4. Đề xuất giải pháp cắt giảm Carbon khả thi")
st.write("Dựa trên số liệu tiêu thụ của bạn, đây là các giải pháp giúp bạn thu hẹp 'Dấu chân Carbon' của mình:")

# Đề xuất động theo chỉ số: Nếu chỉ số nào cao thì đẩy giải pháp đó lên đầu
if carbon_xang > max(carbon_dien, carbon_rac):
    st.info("🚲 **Giải pháp cho Đi lại:** Hãy ưu tiên đi bộ hoặc đi xe đạp đối với các quãng đường ngắn dưới 2km. Khi sử dụng xe máy cùng gia đình, hãy lựa chọn dòng **Xăng sinh học E10** để cắt giảm ngay 10% lượng khí độc hại.")
elif carbon_dien > max(carbon_xang, carbon_rac):
    st.info("🔌 **Giải pháp cho Năng lượng:** Hãy tắt và rút phích cắm các thiết bị điện khi không sử dụng. Cài đặt điều hòa nhiệt độ từ 26°C trở lên để vừa tiết kiệm tiền điện vừa giảm tải cho nhà máy điện.")
else:
    st.info("🛍️ **Giải pháp cho Tiêu dùng:** Thực hiện phân loại rác ngay tại nhà (tách riêng rác hữu cơ và rác tái chế). Hạn chế tối đa việc sử dụng túi nilon, ly nhựa dùng một lần bằng cách mang theo túi vải cá nhân.")

st.success("💪 **Hành động nhỏ - Ý nghĩa lớn:** Mỗi một hành động cắt giảm tiêu thụ của bạn hôm nay đều góp phần bảo vệ bầu không khí trong lành cho tương lai!")

st.markdown("---")
st.caption("By Tran Chi Chuong -- Deril Tran")