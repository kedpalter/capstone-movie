## Setup and Run
- Tạo Server ở Docker và nết nối với Table Plus
- Import **capstone-movie.sql** vào table plus. Có thể Ctrl A + Ctrl Enter để chạy đồng loạt
- Import 5 Collections trong **src/common/postman** vào Postman
- Set domain trong Postman: http://localhost:3053/api
- Tạo và cấu hình file .env
  DATABASE_URL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,


## APIs

## Auth
- POST /auth/register              → Đăng ký
- POST /auth/login                 → Đăng nhập
- POST /auth/refresh-token         → Refresh accessToken
- PUT  /auth/change-password       → Đổi mật khẩu

## Cinema
- GET    /cinema/all-brands            → Lấy danh sách Brand (Hệ thóng rạp)
- GET    /cinema                       → Lấy chi tiết Brand (Cinema theo BrandId)
- GET    /cinema/showtimeByBrand       → Lấy lịch chiếu theo Brand
- GET    /cinema/showtimeByCinema      → Lấy lịch chiếu theo Cinema
- GET    /cinema/showtimeByMovie       → Lấy lịch chiếu theo Movie
- GET    /cinema/seat-list             → Lấy danh sách ghế
- POST   /cinema/add-showtime          → Thêm lịch chiếu
- PUT    /cinema/edit-showtime         → Sửa lịch chiếu
- DELETE /cinema/delete-showtime       → Xóa lịch chiếu
- POST   /cinema/add-cinema            → Thêm cinema
- GET    /cinema/detail                → Lấy chi tiết cinema
- PUT    /cinema/edit-cinema           → Sửa cinema
- DELETE /cinema/delete-cinema         → Xóa cinema
- POST   /cinema/add-screen            → Thêm screen
- PUT    /cinema/edit-screen           → Sửa screen
- DELETE /cinema/delete-screen         → Xóa screen
- POST   /cinema/add-seat              → Thêm ghế
- DELETE /cinema/delete-seat           → Xóa ghế

## Movie
- GET    /movie/banners            → Lấy danh sách banner phim
- POST   /movie/add-banner         → Thêm banner phim
- DELETE /movie/delete-banner      → Xóa banner phim
- GET    /movie/all-movies         → Lấy danh sách phim
- GET    /movie/:id                → Lấy chi tiết phim
- POST   /movie/add-movie          → Thêm phim
- PUT    /movie/edit-movie         → Sửa phim
- DELETE /movie/delete-movie       → Xóa phim

## User
- GET    /user/get-roles           → Lấy danh sách quyền (user, admin)
- GET    /user/profile             → Lấy thông tin tài khoản
- PUT    /user/update-profile      → Cập nhật thông tin tài khoản
- DELETE /user/delete-acount       → Xóa tài khoản
- GET    /user/all-users           → Lấy danh sách người dùng (admin)
- POST   /user/add-new             → Thêm người dùng mới (admin)
- PUT    /user/set-role            → Phân quyền cho người dùng (admin)

## Booking
- GET    /booking/avail-seats         → Kiểm tra ghế trống
- POST   /booking/buy-tickets         → Đặt vé
- GET    /booking/my-tickets          → Lấy danh sách vé đã đặt