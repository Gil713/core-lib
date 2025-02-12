export const PATH_IMAGES = "/images/";
export const PATH_PROMOTION_URL = `${PATH_IMAGES}promotion/`;
export const PATH_ICON_HOT_URL = `${PATH_IMAGES}common/`;
export const PATH_PROMOTION_MENU_URL = `${PATH_IMAGES}promotion/menu/`;

export const TRANSACTION_MODAL_TYPE = {
  TRANSACTIONS: "transactions",
  BETS: "bets",
};

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL:
    /(?=.*^[0-9a-zA-Z@.]+$)(?=.*^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$).*/,
  PASSWORD: /^.{6,32}$/,
  PHONE_NUMBER: /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/,
};

// Messages
export const MESSAGES = {
  NOTIFICATION: {
    ERROR_WRONG_TIMES: "Bạn đã vượt quá 10 lần đăng nhập. Vui lòng thử lại sau 2 giờ",
    API_ERROR_COMMON: "Có lỗi xảy ra. Vui lòng thử lại sau",
    API_ERROR_TOKEN: "Phiên đăng nhập của bạn đã hết hạn.",
    LOGIN_SUCCESSFULLY: "Đăng nhập thành công!",
    REGISTER_SUCCESSFULLY: "Tạo Tài Khoản thành công!",
    EMAIL_NOT_REGISTERED: "Email không tồn tại trong hệ thống.",
    EMAIL_SENT: "Email đã được gửi, vui lòng kiểm tra hộp thư để cập nhật thông tin.",
    CHANGE_PASSWORD_SUCCESSFULLY: "Thay đổi mật khẩu thành công",
    RESET_PASSWORD_EXPIRED: "Kích hoạt khôi phục mật khẩu đã hết hạn. Vui lòng thử lại.",
    UPDATE_INFO_SUCCESSFULLY: "Cập nhật thông tin tài khoản thành công",
    UPDATE_INFO_UNSUCCESSFULLY: "Cập nhật thông tin tài khoản không thành công",
    ADD_BANK_SUCCESSFULLY: "Thêm tài khoản ngân hàng thành công",
    ADD_BANK_UNSUCCESSFULLY: "Thêm tài khoản ngân hàng thất bại.",
    COPY_MESSAGE_SUCCESSFULLY: "Đã sao chép!",
    SEND_VERIFY_EMAIL_SUCCESSFULLY: "Xác Nhận Đã Được gửi đến email của bạn",
    SEND_VERIFY_EMAIL_UNSUCCESSFULLY: "Xác thực email thất bại.",
    COPIED_MESSAGE: "Đã Copy!",
    CANCEL_PROMOTION_SUCCESSFULLY: "Đã hủy khuyến mãi thành công.",
  },
  WITHDRAW: {
    NOT_REACH_REWARD: "Bạn chưa hoàn thành doanh thu.",
    ERROR_WITHDRAW: "Có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ hỗ trợ viên để được hỗ trợ.",
    WITHDRAW_BANK_SUCCESSFULLY: "Rút đang được duyệt",
    NOT_ENOUGH_BALANCE: "Không đủ số dư",
    DEPOSIT_CARD_SUCCESSFULLY: "Tạo phiếu nạp thành công",
  },
};

export enum CARD_CODE {
  VIETTEL = "VIETTEL",
  VINAPHONE = "VINAPHONE",
  MOBIFONE = "MOBIFONE",
  ZING = "ZING",
}

export const BASE = {
  CASINO: "/livecasino",
  ACCOUNT: "/account",
  GUIDE: "/huong-dan",
  PROMOTION: "/khuyen-mai",
  SPORT: "/the-thao",
  NEWS: "/tin-tuc",
  GAME: "/game",
  INTRODUCTION: "/gioi-thieu",
};
