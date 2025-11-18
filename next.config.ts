import type { NextConfig } from "next";
const nextConfig = {
  images: {
    domains: ['dabiua.com'], // 👈 Простой способ
    // ИЛИ используйте remotePatterns (но правильный синтаксис):
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dabiua.com',
        // port: '', // удалите эту строку
        pathname: '/content/images/**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
  },
}

export default nextConfig

// const nextConfig: NextConfig = {
//   /* config options here */
// images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'dabiua.com',
//         port: '',
//         pathname: '/content/images/**',
//       },
//       {
//         protocol: 'https', 
//         hostname: 'dabiua.com',
//         port: '',
//         pathname: '/**', // все пути на этом домене
//       },
//       // Добавьте другие домены по необходимости
//     ],
//     formats: ['image/webp', 'image/avif'],
//   },
// };

// export default nextConfig;

// 1. Настройка Next.js конфигурации
// javascript
// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       'dabiua.com',
//       'localhost', // для разработки
//       '127.0.0.1', // для разработки
//       // добавьте другие домены если нужно
//     ],
//     formats: ['image/webp', 'image/avif'],
//     // Опционально: настройка качества изображений
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//   },
// }

// module.exports = nextConfig
// 2. Если используете внешние домены (CDN)
// javascript
// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'dabiua.com',
//         port: '',
//         pathname: '/content/images/**',
//       },
//       {
//         protocol: 'https', 
//         hostname: 'dabiua.com',
//         port: '',
//         pathname: '/**', // все пути на этом домене
//       },
//       // Добавьте другие домены по необходимости
//     ],
//     formats: ['image/webp', 'image/avif'],
//   },
// }

// module.exports = nextConfig
// 3. Альтернативный подход с использованием unoptimized
// Если нужно отключить оптимизацию Next.js для изображений:

// javascript
// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     unoptimized: true, // 👈 отключает встроенную оптимизацию
//     domains: ['dabiua.com'], // всё равно нужно для валидации
//   },
// }

// module.exports = nextConfig
