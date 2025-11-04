import React, { useEffect, useState } from 'react'

export default function Sales({ apiBase }){
  const [list, setList] = useState([])
  useEffect(()=>{
    let mounted = true
    async function load(){
      try{ const res = await fetch(apiBase + '/sales'); const data = await res.json(); if(mounted) setList(data) }catch(e){}
    }
    load()
    return ()=> mounted=false
  }, [apiBase])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Sales</h3>
      <div className="space-y-2">
        {list.map(s => (
          <div key={s.id} className="card p-3 flex justify-between items-center">
            <div><div className="font-medium">{s.id} — {s.customer}</div><div className="text-sm text-gray-500">{s.date}</div></div>
            <div className="text-sm font-semibold">${s.total}</div>
          </div>
        ))}
        {!list.length && <div className="text-sm text-gray-500">No sales</div>}
      </div>
    </div>
  )
}
