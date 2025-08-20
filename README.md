#  Subscription Tracker

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.java.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.4-green.svg)](https://spring.io/projects/spring-boot)
[![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53.0.20-purple.svg)](https://expo.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)

**Subscription Tracker**, kullanıcıların abonelik hizmetlerini takip etmelerini sağlayan modern bir mobil uygulama ve backend sistemi.

##  Özellikler

- **Güvenli Kimlik Doğrulama**: JWT tabanlı authentication sistemi
- **Kullanıcı Yönetimi**: Kayıt, giriş ve profil yönetimi
- **Abonelik Takibi**: Hizmet adı, fiyat, başlangıç tarihi ve tekrarlama periyodu
- **Cross-Platform**: iOS ve Android için React Native
- **Modern Backend**: Spring Boot 3.2.4 ile RESTful API
- **Veritabanı**: PostgreSQL ile güvenilir veri saklama

##  Mimari

```
subscription-master/
├── src/                    # Backend (Spring Boot)
│   ├── main/java/
│   │   └── com/burcinozkan/subs/
│   │       ├── config/     # Konfigürasyon sınıfları
│   │       ├── controller/ # REST API controllers
│   │       ├── dto/        # Data Transfer Objects
│   │       ├── model/      # JPA entity sınıfları
│   │       ├── repository/ # Data access layer
│   │       └── service/    # Business logic
│   └── resources/
│       └── application.properties
├── subs-app/               # Frontend (React Native + Expo)
│   ├── app/               # Expo Router screens
│   ├── components/        # Reusable components
│   ├── api/               # API integration
│   └── utils/             # Utility functions
└── docs/                  # Proje dokümantasyonu
```

##  Kurulum

### Gereksinimler

- **Java 17** veya üzeri
- **Node.js 18** veya üzeri
- **PostgreSQL 15** veya üzeri
- **Maven 3.6** veya üzeri
- **Expo CLI** (global olarak kurulu)


##  Kullanım

### Kullanıcı Kaydı
1. Uygulamayı açın
2. "Register" butonuna tıklayın
3. Ad, soyad, email ve şifre bilgilerinizi girin
4. "Register" butonuna tıklayın

### Giriş Yapma
1. Email ve şifrenizi girin
2. "Login" butonuna tıklayın
3. Başarılı giriş sonrası ana sayfaya yönlendirileceksiniz

### Abonelik Ekleme
1. Ana sayfada "+" butonuna tıklayın
2. Hizmet adı, fiyat, başlangıç tarihi ve tekrarlama periyodunu girin
3. "Save" butonuna tıklayın

### Abonelikleri Görüntüleme
- Ana sayfada tüm abonelikleriniz listelenecektir
- Her abonelik için detay bilgileri görüntülenir

##  API Endpoints

### Authentication
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi

### Users
- `GET /api/users/{id}` - Kullanıcı bilgilerini getir
- `PUT /api/users/{id}` - Kullanıcı bilgilerini güncelle

### Subscriptions
- `GET /api/subscriptions` - Tüm abonelikleri getir
- `POST /api/subscriptions` - Yeni abonelik ekle
- `PUT /api/subscriptions/{id}` - Abonelik güncelle
- `DELETE /api/subscriptions/{id}` - Abonelik sil

## 🛠 Teknolojiler

### Backend
- **Java 17** - Modern Java özellikleri
- **Spring Boot 3.2.4** - Hızlı geliştirme framework'ü
- **Spring Data JPA** - Veritabanı işlemleri
- **PostgreSQL** - İlişkisel veritabanı
- **JWT** - JSON Web Token authentication
- **Lombok** - Boilerplate code azaltma
- **Maven** - Dependency management

### Frontend
- **React Native 0.79.5** - Cross-platform mobil geliştirme
- **Expo 53.0.20** - Geliştirme araçları ve servisleri
- **TypeScript 5.8.3** - Tip güvenli JavaScript
- **Expo Router** - File-based routing
- **Axios** - HTTP client
- **React Navigation** - Navigasyon çözümü

##  Güvenlik

### Mevcut Özellikler
- JWT tabanlı authentication
- Password validation
- CORS configuration
- Secure token storage

### İyileştirme Önerileri
- Password hashing (BCrypt)
- Input validation ve sanitization
- Rate limiting
- HTTPS enforcement
- API key management




