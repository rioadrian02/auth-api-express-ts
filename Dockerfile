# Langkah 1: Pilih base image
# Node.js 20 dengan Alpine Linux (versi ringan, ukuran kecil)
FROM node:20-alpine

# Langkah 2: Set working directory di dalam container
# Semua perintah berikutnya dijalankan dari folder ini
WORKDIR /app

# Langkah 3: Copy package.json dulu (sebelum kode)
# Kenapa terpisah? Karena Docker cache layer —
# kalau package.json tidak berubah, npm install tidak dijalankan ulang
COPY package*.json ./

# Langkah 4: Install dependencies
RUN npm install

# Langkah 5: Copy semua kode ke dalam container
COPY . .

# Langkah 6: Build TypeScript ke JavaScript
RUN npm run build

# Langkah 7: Expose port yang dipakai aplikasi
EXPOSE 3000

# Langkah 8: Perintah yang dijalankan saat container start
CMD ["node", "dist/app.js"]