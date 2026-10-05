import { useEffect, useState } from 'react'
import './App.css'

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })

function Admin() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('admin') || '')
  const [messages, setMessages] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      document.documentElement.dataset.theme = localStorage.getItem('theme') || 'light'
    } catch {
      document.documentElement.dataset.theme = 'light'
    }
  }, [])

  const load = async (pwd = password) => {
    setError('')
    try {
      const res = await fetch('/api/messages', { headers: { Authorization: `Bearer ${pwd}` } })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Chargement impossible.')
      sessionStorage.setItem('admin', pwd)
      setMessages(data)
    } catch (err) {
      sessionStorage.removeItem('admin')
      setMessages(null)
      setError(err.message === 'Failed to fetch' ? 'Serveur injoignable.' : err.message)
    }
  }

  useEffect(() => {
    if (password) load(password)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const remove = async (id) => {
    if (!confirm('Supprimer ce message ?')) return
    const res = await fetch(`/api/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${password}` },
    })
    if (res.ok) setMessages((list) => list.filter((m) => m.id !== id))
  }

  const logout = () => {
    sessionStorage.removeItem('admin')
    setPassword('')
    setMessages(null)
  }

  if (!messages) {
    return (
      <main className="admin">
        <form
          className="card admin-login"
          onSubmit={(e) => {
            e.preventDefault()
            load()
          }}
        >
          <h1>Messages reçus</h1>
          <label>
            Mot de passe admin
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              autoFocus
              required
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Se connecter
          </button>
          {error && <p className="form-status error">{error}</p>}
        </form>
      </main>
    )
  }

  return (
    <main className="admin">
      <header className="admin-head">
        <h1>Messages reçus ({messages.length})</h1>
        <div className="admin-actions">
          <button className="btn" type="button" onClick={() => load()}>
            Actualiser
          </button>
          <button className="btn" type="button" onClick={logout}>
            Déconnexion
          </button>
          <a className="btn" href="/">
            Retour au site
          </a>
        </div>
      </header>

      {messages.length === 0 ? (
        <p className="admin-empty">Aucun message pour le moment.</p>
      ) : (
        <ul className="admin-list">
          {messages.map((m) => (
            <li className="card admin-msg" key={m.id}>
              <div className="admin-msg-head">
                <strong>{m.name}</strong>
                <a href={`mailto:${m.email}`}>{m.email}</a>
                <time dateTime={m.created_at}>{dateFormat.format(new Date(m.created_at))}</time>
              </div>
              <p>{m.message}</p>
              <button className="admin-delete" type="button" onClick={() => remove(m.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default Admin
