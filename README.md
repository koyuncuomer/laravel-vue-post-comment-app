# Laravel ve Vue.js Kullanıcı Post ve Yorum Uygulaması
Bu proje, Laravel (backend) ve Vue.js (frontend) kullanılarak geliştirilmiş, kullanıcıların post ve yorum oluşturabileceği bir uygulamadır. Veritabanı olarak SQLite kullanılmaktadır.
### Genel Bakış
Bu uygulama şu özellikleri içermektedir:

- Kullanıcılar hesap oluşturarak giriş yapabilir.
- Kullanıcılar yeni gönderiler oluşturabilir, düzenleyebilir ve silebilir.
- Her gönderiye yorum yapılabilir.
- API ile veri alışverişi yapılmaktadır.
- Frontend Vue.js, backend ise Laravel kullanılarak geliştirilmiştir.

> Kaynak olarak [Learn With Jon](https://www.youtube.com/@LearnWithJonVadar) YouTube kanalından faydalanılmıştır.



https://github.com/user-attachments/assets/e1fdb23e-578f-463c-b33d-28a3a34072bf



## Kurulum

### Gereksinimler

- PHP (>=8.1)
- Composer
- Node.js (>=16.0)
- SQLite
- NPM (>=8.0)
- Laravel (11.x)
- Vue.js (3.x)

### Backend Kurulumu

1. Backend dizinine gidin:
   
   ```
   cd backend
   ```
2. Bağımlılıkları yükleyin:
   
   ```
   composer install
   ```
3. .env dosyasını oluşturun ve yapılandırın:
   
   ```
   copy .env.example .env
   ```
   ya da
   ```
   cp .env.example .env
   ```
   Veritabanı yapılandırmasında `DB_CONNECTION=sqlite` olarak ayarlayın.
4. `database` klasörü içinde `database.sqlite` dosyasını oluşturun.
5. Veritabanını çalıştırın:
   
   ```
   php artisan migrate
   ```
6. Sunucuyu başlatın:
   
   ```
   php artisan serve
   ```

### Frontend Kurulumu

1. Frontend dizinine gidin:
   
   ```
   cd frontend
   ```
2. Gerekli paketleri yükleyin:
   
   ```
   npm install
   ```
3. Frontend dizininde `vite.config.js` dosyasında tanımlı API URL'sinin doğru olduğundan emin olun.

4. Sunucuyu başlatın: 
   
   ```
   npm run dev
   ```
