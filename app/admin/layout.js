import '../globals.css'

export const metadata = {
  title: 'Admin Panel — Muzammal Hussain',
  robots: 'noindex',
}

export default function AdminLayout({ children }) {
  return (
    <div style={{ cursor: 'auto', minHeight: '100vh' }}>
      {children}
    </div>
  )
}
