CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
)

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL UNIQUE,
    'userId' INTERGER NOT NULL REFERENCES users(id),
    "createdAt" TIMESTAMP DEFAULT NOW()
)

CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    "shortURL" TEXT NOT NULL UNIQUE,
    "visitCount" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER REFERENCES users(id),
    "createdAt" TIMESTAMP DEFAULT NOW()
)