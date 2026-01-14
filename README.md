# Telegram Clone - To'liq Messaging Ilovasi

Bu loyiha Telegram-ga o'xshagan to'liq funksional messaging ilovasidir. Real-time chat, foydalanuvchi autentifikatsiyasi, qidiruv va boshqa ko'plab xususiyatlarga ega.

## 🚀 Xususiyatlar

### ✅ Tayyor Xususiyatlar
- **Foydalanuvchi Autentifikatsiyasi**: Ro'yxatdan o'tish va kirish
- **Real-time Messaging**: Socket.io orqali jonli xabar almashish
- **Foydalanuvchi Qidiruvi**: Yangi foydalanuvchilarni topish
- **Chat Ro'yxati**: Barcha suhbatlarni ko'rish
- **Online Status**: Foydalanuvchilarning online holatini ko'rish
- **Typing Indicator**: Yozayotganini ko'rsatish
- **Profil Boshqaruvi**: Profil ma'lumotlarini tahrirlash
- **Responsive Dizayn**: Barcha qurilmalarda ishlaydi

### 🔄 Qo'shimcha Xususiyatlar (Kelajakda)
- Fayl yuborish
- Voice/Video qo'ng'iroqlar
- Guruh chatlari
- Xabarlarni tahrirlash/o'chirish
- Emoji picker
- Xabar qidiruvi

## 🛠 Texnologiyalar

### Backend
- **Node.js** - Server muhiti
- **Express.js** - Web framework
- **Socket.io** - Real-time aloqa
- **MongoDB** - Ma'lumotlar bazasi
- **Mongoose** - MongoDB ODM
- **JWT** - Autentifikatsiya
- **bcryptjs** - Parol shifrlash

### Frontend
- **React** - UI kutubxonasi
- **React Router** - Routing
- **Socket.io Client** - Real-time aloqa
- **Axios** - HTTP so'rovlar
- **React Icons** - Ikonkalar
- **CSS3** - Styling

## 📦 O'rnatish

### 1. Loyihani klonlash
```bash
git clone <repository-url>
cd telegram-clone
```

### 2. Barcha paketlarni o'rnatish
```bash
npm run install-all
```

### 3. MongoDB ishga tushirish
MongoDB serveringiz ishlab turganiga ishonch hosil qiling:
```bash
# Windows uchun
net start MongoDB

# macOS/Linux uchun
sudo systemctl start mongod
```

### 4. Environment o'zgaruvchilarini sozlash
`backend/.env` faylini tahrirlang:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/telegram-clone
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 5. Ilovani ishga tushirish
```bash
npm run dev
```

Bu buyruq bir vaqtda backend (port 5000) va frontend (port 3000) ni ishga tushiradi.

## 🌐 Foydalanish

1. **Ro'yxatdan o'tish**: http://localhost:3000/register ga o'ting
2. **Kirish**: Hisobingizga kiring
3. **Foydalanuvchi qidirish**: Qidiruv tugmasini bosing va yangi foydalanuvchilarni toping
4. **Chat boshlash**: Foydalanuvchini tanlab chat boshlang
5. **Xabar yuborish**: Xabar yozing va Enter bosing

## 📁 Loyiha Tuzilishi

```
telegram-clone/
├── backend/                 # Server kodi
│   ├── models/             # Ma'lumotlar modellari
│   ├── routes/             # API yo'nalishlari
│   ├── middleware/         # Middleware funksiyalar
│   └── server.js           # Asosiy server fayli
├── frontend/               # Client kodi
│   ├── src/
│   │   ├── components/     # React komponentlari
│   │   ├── contexts/       # React kontekstlari
│   │   └── App.js          # Asosiy App komponenti
│   └── public/             # Statik fayllar
└── package.json            # Asosiy paket konfiguratsiyasi
```

## 🔧 API Endpoints

### Autentifikatsiya
- `POST /api/auth/register` - Ro'yxatdan o'tish
- `POST /api/auth/login` - Kirish
- `GET /api/auth/me` - Joriy foydalanuvchi ma'lumotlari

### Foydalanuvchilar
- `GET /api/users/search` - Foydalanuvchi qidiruv
- `GET /api/users/:userId` - Foydalanuvchi profili
- `PUT /api/users/profile` - Profilni yangilash

### Chatlar
- `GET /api/chat` - Barcha chatlar
- `POST /api/chat/create` - Yangi chat yaratish
- `GET /api/chat/:chatId/messages` - Chat xabarlari
- `POST /api/chat/:chatId/messages` - Xabar yuborish
- `GET /api/chat/search` - Xabar qidiruv

## 🎨 Dizayn Xususiyatlari

- **Telegram-style UI**: Telegram-ga o'xshagan zamonaviy dizayn
- **Responsive Layout**: Mobil va desktop uchun moslashgan
- **Real-time Updates**: Jonli yangilanishlar
- **Smooth Animations**: Yumshoq animatsiyalar
- **Dark/Light Theme Ready**: Mavzu o'zgartirish uchun tayyor

## 🚀 Production uchun Deploy

### 1. Environment o'zgaruvchilarini sozlash
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
```

### 2. Frontend build qilish
```bash
cd frontend
npm run build
```

### 3. Server ishga tushirish
```bash
cd backend
npm start
```

## 🤝 Hissa qo'shish

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. O'zgarishlarni commit qiling (`git commit -m 'Add some AmazingFeature'`)
4. Branch ga push qiling (`git push origin feature/AmazingFeature`)
5. Pull Request oching

## 📝 Litsenziya

Bu loyiha MIT litsenziyasi ostida tarqatiladi.

## 📞 Aloqa

Savollar yoki takliflar uchun issue oching yoki pull request yuboring.

---

**Eslatma**: Bu loyiha ta'lim maqsadida yaratilgan va production muhitida ishlatishdan oldin qo'shimcha xavfsizlik choralarini ko'rish tavsiya etiladi.