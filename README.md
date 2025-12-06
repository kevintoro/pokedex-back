# 🧑‍💻 Pokedex API

Welcome to the **Pokedex API**!  
A simple RESTful API to discover and explore a world of Pokemon.

---

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/kevintoro/pokedex-back.git
   cd pokedex-back
   ```
2. **Install NestJS CLI (if you don't have it yet)**
   ```bash
   npm install -g @nestjs/cli
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Configure Environment**
   - Copy `.env.example` to `.env` and edit as needed:
     ```bash
     cp .env.example .env
     ```

5. **Start MongoDB via Docker**  
   _Requires [Docker](https://www.docker.com/) installed._
   ```bash
   docker-compose up -d
   ```

6. **Run the app**
   ```bash
   npm run dev
   ```

7. **Open the app**  
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Features

- 🔥 RESTful API for Pokémon data
- ⚡ Powered by MongoDB and NestJS

---

## 🛠️ Useful Commands

| Command                 | Description                   |
|-------------------------|-------------------------------|
| `npm run dev`           | Start in development mode      |
| `docker-compose up`     | Start MongoDB in Docker        |
| `npm run build`         | Build for production           |
| `npm start`             | Run the production build       |

---


## 📚 Contributing

Pull requests welcome! For major changes, please open an issue first.
