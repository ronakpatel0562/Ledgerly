import React, { useEffect, useState } from 'react'

export default function CRM({ apiBase }){
  const [list, setList] = useState([])
  useEffect(()=>{
    let mounted = true
    async function load(){
      try{ const res = await fetch(apiBase + '/crm'); const data = await res.json(); if(mounted) setList(data) }catch(e){}
    }
    load()
    return ()=> mounted=false
  }, [apiBase])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">CRM</h3>
      <div className="space-y-2">
        {list.map(t => (
          <div key={t.id} className="card p-3">
            <div className="font-medium">{t.title}</div>
            <div className="text-sm text-gray-500">Due: {t.due} — {t.status}</div>
          </div>
        ))}
        {!list.length && <div className="text-sm text-gray-500">No tasks</div>}
      </div>
    </div>
  )
}
