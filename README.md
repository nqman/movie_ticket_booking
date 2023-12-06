Tạo folder:

- bắt đầu từ: src/

  - components/: Các common components được sử dụng nhiều nơi trong project
  - Ex: Card.jsx
  - Header/

    - Header.jsx
    - Header.model.scss
    - index.js

  - modules/: Chứa các components cấu tạo thành 1 chức năng hoặc 1 trang hoàn chỉnh
    - Home: tên của module
  - pages/: chứa các components cấu tạo thành 1 trang trong module
    - Home.jsx
  - components/: Các components được sử dụng nội bộ bên trong module
    - Banner
    - Showing
    - Cinema

  - details/: module hiển thị chi tiết và đặt vé cho 1 bộ phim
  - auth/: module quản lý xác thực người dùng như đăng nhập đăng ký
  - booking/: model quản lý đặt vé

- apis/: Setup thư viện gọi API và các hàm request API

- hooks/: Các custom hooks tái sử dụng trong project
- utils/: Các hàm tái sử dụng trong project
- styles/: Các file css/scss toàn cục