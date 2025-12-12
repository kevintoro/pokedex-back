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

## 🌱 Seeding the Database

To load Pokémon data from the [PokeAPI](https://pokeapi.co/) into your database, use the provided seed endpoint.

### 1. Ensure the app and MongoDB are running

```bash
npm run dev
# In another terminal, ensure MongoDB is up via Docker if needed:
docker-compose up -d
```

### 2. Populate Pokémon data

You can trigger the seeding with an HTTP POST request:

```bash
curl -X POST "http://localhost:3000/seed"
```

- By default, this seeds **10 Pokémon** into the database.

**Seed a custom number:** Use the `total` query param for any amount (e.g., 50):

```bash
curl -X POST "http://localhost:3000/seed?total=50"
```

_Note: This operation will remove all previous Pokémon in the database and re-import from PokeAPI._

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
