import React, { useEffect, useState } from 'react'

export default function Purchase({ apiBase }){
  const [list, setList] = useState([])
  useEffect(()=>{
    let mounted = true
    async function load(){
      try{ const res = await fetch(apiBase + '/purchase'); const data = await res.json(); if(mounted) setList(data) }catch(e){}
    }
    load()
    return ()=> mounted=false
  }, [apiBase])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Purchase</h3>
      <div className="space-y-2">
        {list.map(p => (
          <div key={p.id} className="card p-3 flex justify-between items-center">
            <div><div className="font-medium">{p.id} — {p.vendor}</div><div className="text-sm text-gray-500">{p.date}</div></div>
            <div className="text-sm font-semibold">${p.total}</div>
          </div>
        ))}
        {!list.length && <div className="text-sm text-gray-500">No purchases</div>}
      </div>
    </div>
  )
}
