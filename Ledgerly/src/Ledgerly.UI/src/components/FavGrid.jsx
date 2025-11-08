import React, { useEffect, useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const DEFAULT = [
  { id: 'purchase-bill', title: 'Purchase bill', color: 'bg-teal-500', page: 'purchase' },
  { id: 'deposit-receipt', title: 'Deposit receipt', color: 'bg-green-600', page: 'accounts' },
  { id: 'make-payment', title: 'Making a payment', color: 'bg-yellow-400', page: 'accounts' },
  { id: 'balance-sheet', title: 'Balance sheet', color: 'bg-red-500', page: 'accounts' }
]

function SortableItem({ id, f, onNavigate, remove }){
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto'
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      tabIndex={0}
      role="button"
      aria-label={`${f.title} favorite`}
      className={`card p-4 text-white ${f.color} ${isDragging ? 'opacity-80 shadow-lg' : ''}`}
      onClick={() => onNavigate(f.page)}
    >
      <div className="flex justify-between items-start">
        <h3 className="fav-card-title">{f.title}</h3>
        <div className="flex items-center gap-2">
          <button onClick={(e)=>{ e.stopPropagation(); onNavigate(f.page); }} className="more-btn text-white bg-black/20 px-2 py-1 rounded text-xs">More</button>
          <button onClick={(e)=>{ e.stopPropagation(); remove(f.id); }} className="remove-btn text-white/40 hover:text-white text-sm" aria-label={`Remove ${f.title}`}>✕</button>
        </div>
      </div>
    </article>
  )
}

export default function FavGrid({ onNavigate, apiBase }){
  const [favs, setFavs] = useState(DEFAULT)

  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        const res = await fetch(apiBase + '/favs')
        if(!res.ok) throw new Error('no')
        const data = await res.json()
        const mapped = data.map(s => ({ id: s.id, title: s.title, color: s.color ? `bg-${s.color}-500` : 'bg-gray-600', page: s.page }))
        if(mounted){ setFavs(mapped); localStorage.setItem('ledgerly.favs', JSON.stringify(mapped)); }
      }catch(e){
        try{ const raw = JSON.parse(localStorage.getItem('ledgerly.favs')|| 'null'); if(Array.isArray(raw)) setFavs(raw)}catch(e){}
      }
    }
    load()
    return ()=> mounted=false
  }, [apiBase])

  function persist(list){
    setFavs(list)
    localStorage.setItem('ledgerly.favs', JSON.stringify(list))
  }

  function remove(id){
    const next = favs.filter(f => f.id !== id)
    persist(next)
  }

  function handleDragEnd(event){
    const { active, over } = event
    if(!over) return
    if(active.id !== over.id){
      const oldIndex = favs.findIndex(i => i.id === active.id)
      const newIndex = favs.findIndex(i => i.id === over.id)
      const next = arrayMove(favs, oldIndex, newIndex)
      persist(next)
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={favs.map(f => f.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favs.map(f => (
            <SortableItem key={f.id} id={f.id} f={f} onNavigate={onNavigate} remove={remove} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
