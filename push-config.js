/*
 * Cấu hình Firebase Cloud Messaging cho thông báo đẩy. Các giá trị này là thông tin công khai của ứng dụng web,
 * không phải mật khẩu (khóa bí mật FCM_SA nằm trong Script Properties của Apps Script).
 * null = chưa bật thông báo đẩy; số trên biểu tượng (khi mở app) vẫn chạy.
 * Mẫu khi bật:
 * window.QLX_PUSH = { vapidKey: '<Web Push certificate key>', firebase: { apiKey: '…', projectId: '…', messagingSenderId: '…', appId: '…' } };
 */
window.QLX_PUSH = null;
