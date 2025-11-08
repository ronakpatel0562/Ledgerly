import React, { useEffect, useState, useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

function StatCard({ title, value, color='bg-white' }){
  return (
    <div className={`card p-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600">{title}</div>
          <div className="text-xl font-semibold">{value}</div>
        </div>
        <div className="h-12 w-12 rounded bg-white/20 flex items-center justify-center">📄</div>
      </div>
    </div>
  )
}

export default function Dashboard({ apiBase }){
  const [purchase, setPurchase] = useState([])
  const [sales, setSales] = useState([])
  const [accounts, setAccounts] = useState(null)

  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        const [pRes, sRes, aRes] = await Promise.all([
          fetch(apiBase + '/purchase'),
          fetch(apiBase + '/sales'),
          fetch(apiBase + '/accounts')
        ])
        const [p, s, a] = await Promise.all([pRes.json(), sRes.json(), aRes.json()])
        if(mounted){ setPurchase(p||[]); setSales(s||[]); setAccounts(a||null) }
      }catch(e){
        // ignore, keep defaults
      }
    }
    load()
    return ()=> mounted=false
  }, [apiBase])

  const billCount = purchase.length
  const paymentIn = sales.reduce((sum, x) => sum + (Number(x.total) || 0), 0)
  const paymentOut = purchase.reduce((sum, x) => sum + (Number(x.total) || 0), 0)
  const cash = useMemo(()=>{
    if(!accounts) return '—'
    const cashAcc = (accounts.ledgerSummary||[]).find(a => a.account.toLowerCase() === 'cash')
    return cashAcc ? cashAcc.balance : (accounts.balanceSheet ? (accounts.balanceSheet.assets - accounts.balanceSheet.liabilities) : '—')
  }, [accounts])

  // build monthly datasets (by month name)
  const months = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar']

  function toMonthIndex(dateStr){
    try{
      const d = new Date(dateStr)
      if(isNaN(d)) return null
      const m = d.getMonth() // 0..11
      const y = d.getFullYear()
      // map Apr(3)->0, May->1 ... Mar->11 for fiscal year starting Apr
      const order = (m - 3 + 12) % 12
      return order
    }catch(e){ return null }
  }

  const expenseByMonth = new Array(12).fill(0)
  const incomeByMonth = new Array(12).fill(0)

  purchase.forEach(p=>{ const i = toMonthIndex(p.date); if(i!=null) expenseByMonth[i] += Number(p.total||0) })
  sales.forEach(s=>{ const i = toMonthIndex(s.date); if(i!=null) incomeByMonth[i] += Number(s.total||0) })

  const chartData = {
    labels: months,
    datasets: [
      { label: 'Expense', data: expenseByMonth, backgroundColor: '#cbd5e1' },
      { label: 'INCOME', data: incomeByMonth, backgroundColor: '#3b82f6' }
    ]
  }

  const chartOptions = { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <StatCard title="Bill" value={billCount} color="bg-white" />
        <StatCard title="Payment IN" value={paymentIn.toFixed(2)} color="bg-green-100" />
        <StatCard title="Payment Out" value={paymentOut.toFixed(2)} color="bg-red-100" />
        <StatCard title="Cash" value={typeof cash === 'number' ? cash.toFixed(2) : cash} color="bg-yellow-100" />
      </div>

      <div className="card">
        <div className="bg-green-600 p-3 text-white font-semibold rounded-t">Month Status</div>
        <div className="p-4">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}
