import React, { useEffect, useState } from 'react'

export default function Settings({ apiBase }){
  const [s, setS] = useState(null)
  useEffect(()=>{
    let mounted = true
    async function load(){
      try{ const res = await fetch(apiBase + '/settings'); const data = await res.json(); if(mounted) setS(data) }catch(e){}
    }
    load()
    return ()=> mounted=false
  }, [apiBase])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Settings</h3>
      <div className="text-sm text-gray-600">Company: {s?.company||'—'}</div>
      <div className="text-sm text-gray-600">Year: {s?.year||'—'}</div>
    </div>
  )
}
