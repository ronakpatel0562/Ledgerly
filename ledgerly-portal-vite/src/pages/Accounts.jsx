import React, { useEffect, useState } from 'react'

export default function Accounts({ apiBase }){
  const [accounts, setAccounts] = useState(null)
  useEffect(()=>{
    let mounted = true
    async function load(){
      try{ const res = await fetch(apiBase + '/accounts'); const data = await res.json(); if(mounted) setAccounts(data) }catch(e){}
    }
    load()
    return ()=> mounted=false
  }, [apiBase])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Accounts</h3>
      {accounts ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-4">
            <h4 className="font-semibold">Ledger Summary</h4>
            {(accounts.ledgerSummary||[]).map(a => <div key={a.account} className="text-sm text-gray-600">{a.account}: ${a.balance}</div>)}
          </div>
          <div className="card p-4">
            <h4 className="font-semibold">Balance Sheet</h4>
            <div className="text-sm text-gray-600">Assets: ${accounts.balanceSheet.assets}</div>
            <div className="text-sm text-gray-600">Liabilities: ${accounts.balanceSheet.liabilities}</div>
          </div>
        </div>
      ) : <div className="text-sm text-gray-500">No account data</div>}
    </div>
  )
}
