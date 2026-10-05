import express from 'express'
import pg from 'pg'

process.loadEnvFile()

const { DATABASE_URL, ADMIN_PASSWORD, PORT = 3001 } = process.env
const pool = new pg.Pool({ connectionString: DATABASE_URL })

await pool.query(`
  CREATE TABLE IF NOT EXISTS messages (
    id         SERIAL PRIMARY KEY,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    message    TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`)

const app = express()
app.use(express.json({ limit: '20kb' }))

app.post('/api/messages', async (req, res) => {
  const name = String(req.body?.name ?? '').trim()
  const email = String(req.body?.email ?? '').trim()
  const message = String(req.body?.message ?? '').trim()

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' })
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return res.status(400).json({ error: 'Un des champs est trop long.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Adresse email invalide.' })
  }

  await pool.query('INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)', [
    name,
    email,
    message,
  ])
  res.status(201).json({ ok: true })
})

// Lecture réservée : le mot de passe admin est envoyé dans l'en-tête Authorization
app.get('/api/messages', async (req, res) => {
  if (!ADMIN_PASSWORD || req.get('Authorization') !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Mot de passe incorrect.' })
  }
  const { rows } = await pool.query(
    'SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC',
  )
  res.json(rows)
})

app.delete('/api/messages/:id', async (req, res) => {
  if (!ADMIN_PASSWORD || req.get('Authorization') !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Mot de passe incorrect.' })
  }
  await pool.query('DELETE FROM messages WHERE id = $1', [Number(req.params.id)])
  res.status(204).end()
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Erreur serveur.' })
})

app.listen(PORT, () => console.log(`API prête sur http://localhost:${PORT}`))
