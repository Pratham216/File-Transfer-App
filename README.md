<div align="center">

<a name="top"></a>

# 🚀 **FILE TRANSFER APP** ⚡

### *Next-Gen File Sharing Across the Digital Universe*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.10.5-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Version](https://img.shields.io/badge/Version-v1.0.0-7c3aed?style=for-the-badge)](https://github.com/Pratham216/File-Transfer-App/releases/tag/v1.0.0)

**Lightning-fast, secure file sharing powered by cutting-edge technology**

[Live Demo](#-live-demo) • [Download](#-download) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) 

---

</div>

## 🚀 Live Demo

🔗 [Click here to try the app](https://file-transfer-app-axlw.vercel.app/)

---
## 📥 Download

### Windows Installer
- [Download TransferHub Setup v1.0.0](https://github.com/Pratham216/File-Transfer-App/releases/download/v1.0.0/TransferHub%20Setup%201.0.0.exe)

### All Releases
- [View all versions on GitHub Releases](https://github.com/Pratham216/File-Transfer-App/releases)

---
## ✨ **Features**

<div align="center">

| 🎯 **Core Features** | 🚀 **Advanced Features** |
|:---:|:---:|
| ⚡ **Instant Upload** | 🎨 **Futuristic UI/UX** |
| 📦 **Multi-File Support** | 📱 **QR Code Sharing** |
| 🗜️ **Auto ZIP Compression** | 📊 **Real-time Progress** |
| 🔗 **Shareable Links** | 🎭 **Smooth Animations** |
| 📤 **Drag & Drop Interface** | 🌈 **Gradient Effects** |

</div>

### 🎨 **User Experience**
- **Animated Backgrounds** - Dynamic gradient overlays with floating particles
- **Smooth Transitions** - Powered by Framer Motion for buttery-smooth animations
- **Responsive Design** - Works seamlessly across all devices
- **Real-time Feedback** - Live upload progress and status updates
- **QR Code Generation** - Instant QR codes for easy mobile sharing

### ⚡ **Performance**
- **Fast Uploads** - Optimized file handling with Multer
- **Smart Compression** - Automatic ZIP creation for multiple files
- **Efficient Storage** - Organized file management system
- **CORS Enabled** - Cross-origin resource sharing support

---

## 🛠️ **Tech Stack**

### **Frontend**
```
⚛️  React 18.3.1          - Modern UI library
🎨  Framer Motion 12.10.5  - Animation framework
📦  Vite 6.0.5             - Next-gen build tool
🎯  React Dropzone         - Drag & drop functionality
📱  QRCode.react           - QR code generation
🎭  AOS                    - Scroll animations
🔗  React Scroll           - Smooth scrolling
```

### **Backend**
```
🚀  Express 4.21.2         - Web framework
📤  Multer 1.4.5           - File upload handling
🗜️  Archiver 7.0.1         - ZIP compression
🌐  CORS 2.8.5             - Cross-origin support
⚙️  dotenv 16.4.7          - Environment variables
```

---

## 📦 **Installation**

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- Git

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/yourusername/file-transfer-app.git
cd file-transfer-app
```

### **Step 2: Install Backend Dependencies**
```bash
cd backend
npm install
```

### **Step 3: Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### **Step 4: Environment Setup**

Create a `.env` file in the `backend` directory:
```env
REACT_APP_NGROK_URL=http://your-ngrok-url:5000
```

Create a `.env` file in the `frontend` directory:
```env
VITE_NGROK_URL=http://your-ngrok-url:5000
```

---

## 🚀 **Usage**

### **Start the Backend Server**
```bash
cd backend
node server.js
```
The server will run on `http://localhost:5000` (or your configured IP)

### **Start the Frontend Development Server**
```bash
cd frontend
npm run dev
```
The app will be available at `http://localhost:5173`

### **Build for Production**
```bash
cd frontend
npm run build
```

### **Run Desktop App (Electron)**
```bash
# from project root
npm install
npm run dev
```

### **Build Windows Installer (Electron)**
```bash
# from project root
npm run build
```

---

## 📸 **Screenshots**

<div align="center">

### **Hero Section**
![Hero Section](https://via.placeholder.com/800x400/100a23/8b5cf6?text=Hero+Section+with+Animated+Background)

### **File Upload Interface**
![Upload Interface](https://via.placeholder.com/800x400/1e1b4b/22d3ee?text=Drag+%26+Drop+File+Upload)

### **QR Code Sharing**
![QR Code](https://via.placeholder.com/400x400/0f172a/10b981?text=QR+Code+Generation)

</div>

---

## 🎯 **How It Works**

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Client    │────────▶│   Frontend   │────────▶│   Backend   │
│  (Browser)  │         │   (React)    │         │  (Express)  │
└─────────────┘         └──────────────┘         └─────────────┘
                                                         │
                                                         ▼
                                                ┌──────────────┐
                                                │   File Store  │
                                                │   (uploads/)  │
                                                └──────────────┘
                                                         │
                                                         ▼
                                                ┌──────────────┐
                                                │  ZIP Archive │
                                                │  (if multiple)│
                                                └──────────────┘
```

1. **Upload** - Drag & drop or select files through the intuitive interface
2. **Process** - Backend handles file storage and ZIP compression (if multiple files)
3. **Share** - Get a shareable link and QR code instantly
4. **Download** - Recipients can download via link or scan QR code

---

## 🎨 **Project Structure**

```
file-transfer-app/
├── 📁 backend/
│   ├── 📄 server.js          # Express server configuration
│   ├── 📄 package.json       # Backend dependencies
│   └── 📁 uploads/           # File storage directory
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 Hero/      # Hero section component
│   │   │   ├── 📁 Navbar/    # Navigation component
│   │   │   ├── 📁 Stats/     # Statistics component
│   │   │   ├── 📁 HowItWorks/# How it works section
│   │   │   ├── 📁 Footer/    # Footer component
│   │   │   └── 📄 FileUpload.jsx  # Main upload component
│   │   ├── 📄 App.jsx        # Main app component
│   │   └── 📄 main.jsx       # Entry point
│   ├── 📄 package.json       # Frontend dependencies
│   └── 📄 vite.config.js     # Vite configuration
│
└── 📄 README.md              # This file
```

---

## 🔧 **Configuration**

### **File Size Limits**
Default maximum file size: **50MB per file**

To modify, edit `backend/server.js`:
```javascript
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });
```

### **Server Port & Host**
Edit `backend/server.js`:
```javascript
const PORT = 5000;
const HOST = 'your-ip-address';
```

---

## 🌟 **Key Features Explained**

### **Multi-File Handling**
- Single file → Direct download link
- Multiple files → Automatic ZIP compression
- Smart file organization with timestamped filenames

### **QR Code Integration**
- Instant QR code generation for easy mobile sharing
- High error correction level for reliability
- Clean, scannable design

### **Animation System**
- Framer Motion for smooth, performant animations
- Particle effects and gradient overlays
- Scroll-triggered animations with AOS

---

## 🤝 **Contributing**

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Author**

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 **Acknowledgments**

- [React](https://reactjs.org/) - The UI library
- [Express](https://expressjs.com/) - The web framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vite](https://vitejs.dev/) - Build tool
- All the amazing open-source contributors

---

<div align="center">

### ⚡ **Built with passion for the future of file sharing** ⚡

**⭐ Star this repo if you find it helpful! ⭐**

[⬆ Back to Top](#top)

</div>
