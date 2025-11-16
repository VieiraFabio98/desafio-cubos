import appDataSource from "../data-source"

export async function seed() {
  const connection = await appDataSource.initialize()

  await connection.query(`
    INSERT INTO users 
      (id, name, email, password, created_at, updated_at)
    VALUES
      (
        'de71dd13-ffd0-48af-a27f-d06c3b5f4c78',
        'Admin',
        'admin@email.com',
        '$2b$10$SlWxfPFKDO7emDOoron6HeV56TR5XD3L9OjSPYgvdpGMnE1nr0fBe',
        '2025-11-15 00:24:34.168',
        '2025-11-15 00:24:34.168'
      )
  `)

  console.log("Seed de user criada!")

  await connection.query(`
    INSERT INTO movies
      (id, user_id, title, original_title, description, duration, genre, director, poster_url, release_date, youtube_url, created_at, updated_at)
    VALUES
      ('9487a8f4-9be5-4378-91eb-42c6c5c72219', 'de71dd13-ffd0-48af-a27f-d06c3b5f4c78', 'Ainda Estou Aqui', 'Ainda Estou Aqui', 'Filme de Ditatura militar', '135 minutos', 'Drama', 'Walter Salles', 'https://desafio-cubos-bucket.s3.sa-east-1.amazonaws.com/7756e45392237651f602-ainda-estou-aqui.png', '2024-11-07', 'https://www.youtube.com/watch?v=_NzqP0jmk3o', '2025-11-15T00:44:02.421Z', '2025-11-15T00:44:02.421Z'),

      ('6275d33a-a1da-4ece-a043-d17208b59a67', 'de71dd13-ffd0-48af-a27f-d06c3b5f4c78', 'O Odio', 'La haine', 'Filme de violência', '98 minutos', 'Ação/Drama', 'Mathieu Kassovitz', 'https://desafio-cubos-bucket.s3.sa-east-1.amazonaws.com/fec88a765377430834ef-la-haine.png', '1995-12-01', 'https://www.youtube.com/watch?v=FKwcXt3JIaU', '2025-11-15T00:40:37.587Z', '2025-11-15T00:40:37.587Z'),

      ('c5ffa472-226a-4e67-8509-54112e38bb90', 'de71dd13-ffd0-48af-a27f-d06c3b5f4c78', 'OldBoy', 'OldBoy', 'Filme de vingança', '120 minutos', 'Ação/Drama', 'Park Chan-wook', 'https://desafio-cubos-bucket.s3.sa-east-1.amazonaws.com/d14127397ecb3c8c28b6-oldboy.png', '2005-05-13', 'https://www.youtube.com/watch?v=0BtI1cZwu-s', '2025-11-15T00:39:14.236Z', '2025-11-15T00:39:14.236Z'),

      ('3c648be1-c416-48ba-a268-1eaf4afce134', 'de71dd13-ffd0-48af-a27f-d06c3b5f4c78', 'O mal que nos habita', 'When Evil Lurkes', 'Filme de Terror', '100 minutos', 'Terror', 'Demian Rugna', 'https://desafio-cubos-bucket.s3.sa-east-1.amazonaws.com/162c791b6c103b995850-when-evil-lurkes.png', '2023-10-06', 'https://www.youtube.com/watch?v=YrTnV6gNzno', '2025-11-15T00:42:12.363Z', '2025-11-15T00:42:12.363Z'),

      ('9ecd5589-fb5c-421a-b290-a1652405a762', 'de71dd13-ffd0-48af-a27f-d06c3b5f4c78', 'Django Livre', 'Django Unchained', 'Filme de velho-oeste', '165 minutos', 'Ação', 'Tarantino', 'https://desafio-cubos-bucket.s3.sa-east-1.amazonaws.com/ad655e3417e297c390f0-django.png', '2008-07-18', 'https://www.youtube.com/watch?v=0fUCuvNlOCg', '2025-11-15T00:37:30.989Z', '2025-11-15T00:37:30.989Z'),

      ('4bf6318b-33e6-4278-b288-0f9d2a72f0e7', 'de71dd13-ffd0-48af-a27f-d06c3b5f4c78', 'Batman Cavaleiro das Trevas', 'Batman The Dark Knight', 'Filme de heroi', '152 minutos', 'Heroi', 'Nolan', 'https://desafio-cubos-bucket.s3.sa-east-1.amazonaws.com/a3920651a311bce361f1-batman-dark-knight.png', '2008-07-18', 'https://www.youtube.com/watch?v=EXeTwQWrcwY', '2025-11-15T00:35:47.149Z', '2025-11-15T00:35:47.149Z'),

      ('64c02963-9b6c-4334-8961-39763cc45dec', 'de71dd13-ffd0-48af-a27f-d06c3b5f4c78', 'Interestelar', 'Interestelar', 'Filme que se passa no espaço', '189 minutos', 'Ficção Científica', 'Nolan', 'https://desafio-cubos-bucket.s3.sa-east-1.amazonaws.com/9beb9f5fa18cd9d4b046-interestelar.png', '2014-06-11', 'https://www.youtube.com/watch?v=zSWdZVtXT7E', '2025-11-15T00:33:49.410Z', '2025-11-15T00:33:49.410Z')
  `)

  console.log("Seed de filmes criada!")

  await connection.destroy()
}

seed()
  .then(() => {
    console.log("Seed finalizada!")
    process.exit(0)
  })
  .catch((err) => {
    console.error("Erro ao rodar seed:", err)
    process.exit(1)
  })

