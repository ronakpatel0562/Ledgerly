import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import FavGrid from './components/FavGrid'
import Dashboard from './pages/Dashboard'
import Party from './pages/Party'
import Purchase from './pages/Purchase'
import Sales from './pages/Sales'
import Accounts from './pages/Accounts'
import CRM from './pages/CRM'
import Settings from './pages/Settings'

const API_BASE = 'http://localhost:4000/api'

export default function App(){
  const [page, setPage] = useState('dashboard')

  useEffect(()=>{
    document.title = 'Ledgerly — '+page
  }, [page])

  function renderPage(){
    switch(page){
      case 'dashboard': return <Dashboard apiBase={API_BASE} />
      case 'party': return <Party />
      case 'purchase': return <Purchase apiBase={API_BASE} />
      case 'sales': return <Sales apiBase={API_BASE} />
      case 'accounts': return <Accounts apiBase={API_BASE} />
      case 'crm': return <CRM apiBase={API_BASE} />
      case 'settings': return <Settings apiBase={API_BASE} />
      default: return <div className="p-6">Unknown page</div>
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      <Sidebar onNavigate={setPage} />
      <div className="flex-1">
        <Topbar />
        <main className="p-4">
          <section className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Favourite Menu</h2>
              <div className="text-sm text-gray-500">Customize quick actions</div>
            </div>
            <FavGrid onNavigate={setPage} apiBase={API_BASE} />
          </section>

          <section id="content-area" className="bg-white border rounded p-6 min-h-[50vh]">
            { renderPage() }
          </section>
        </main>
      </div>
    </div>
  )
}
