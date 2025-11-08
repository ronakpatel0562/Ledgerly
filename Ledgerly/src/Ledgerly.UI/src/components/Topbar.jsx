import React from 'react'

export default function Topbar(){
  return (
    <header className="bg-white border-b border-gray-200 p-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="md:hidden p-2 rounded bg-gray-100">☰</div>
        <div className="text-sm text-gray-500">CELL POINT GENERAL TRADING LLC</div>
      </div>
      <div className="flex items-center gap-3">
        <select className="border rounded px-2 py-1 text-sm">
          <option>2024-2025</option>
          <option selected>2025-2026</option>
        </select>
        <div className="text-sm text-gray-500">04-11-2025</div>
      </div>
    </header>
  )
}
