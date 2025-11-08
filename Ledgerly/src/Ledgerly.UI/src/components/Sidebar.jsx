import React from 'react'

export default function Sidebar({ onNavigate }){
  const items = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'party', label: 'Party' },
    { key: 'purchase', label: 'Purchase' },
    { key: 'sales', label: 'Sales' },
    { key: 'accounts', label: 'Accounts' },
    { key: 'crm', label: 'CRM' },
    { key: 'settings', label: 'Settings' }
  ]

  return (
    <nav className="w-64 bg-gray-800 text-gray-100 hidden md:block" aria-label="Main navigation">
      <div className="p-4 flex items-center gap-3 border-b border-gray-700">
        <div className="h-10 w-10 rounded bg-green-500 flex items-center justify-center font-bold">L</div>
        <div>
          <div className="text-sm font-semibold">Ledgerly</div>
          <div className="text-xs text-gray-300">Green Store</div>
        </div>
      </div>
      <div className="p-3">
        <button className="w-full text-left px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring">★ Favourite Menu</button>
      </div>
      <ul className="p-3 space-y-1 text-sm">
        {items.map(i => (
          <li key={i.key}>
            <button onClick={() => onNavigate(i.key)} className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700">{i.label}</button>
          </li>
        ))}
      </ul>
      <div className="mt-auto p-4 text-xs text-gray-400 border-t border-gray-700">Powered by Green Circle Technology</div>
    </nav>
  )
}
