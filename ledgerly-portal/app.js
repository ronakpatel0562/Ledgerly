// Ledgerly — SPA logic with API wiring + local fallback

const DEFAULT_FAVS = [
  { id: 'purchase-bill', title: 'Purchase bill', color: 'bg-teal-500', page: 'purchase' },
  { id: 'deposit-receipt', title: 'Deposit receipt', color: 'bg-green-600', page: 'accounts' },
  { id: 'make-payment', title: 'Making a payment', color: 'bg-yellow-400', page: 'accounts' },
  { id: 'balance-sheet', title: 'Balance sheet', color: 'bg-red-500', page: 'accounts' }
];

const API_BASE = 'http://localhost:4000/api'; // mock API server (see server/server.js)

// Utilities
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

function saveFavs(list){ localStorage.setItem('ledgerly.favs', JSON.stringify(list)); }

async function fetchJson(path){
  try{
    const res = await fetch(`${API_BASE}${path}`);
    if(!res.ok) throw new Error('bad');
    return await res.json();
  }catch(e){ return null; }
}

async function loadFavs(){
  // try API first
  const api = await fetchJson('/favs');
  if(api && Array.isArray(api) && api.length) return api.map(mapServerFavToUi);

  // then localStorage
  try{
    const raw = localStorage.getItem('ledgerly.favs');
    if(raw){
      const parsed = JSON.parse(raw);
      if(Array.isArray(parsed) && parsed.length) return parsed;
    }
  }catch(e){}

  return DEFAULT_FAVS.slice();
}

function mapServerFavToUi(s){
  const colorMap = { teal: 'bg-teal-500', green: 'bg-green-600', yellow: 'bg-yellow-400', red: 'bg-red-500' };
  return { id: s.id, title: s.title, color: colorMap[s.color] || 'bg-gray-600', page: s.page };
}

// Render favorite cards
async function renderFavs(){
  const grid = $('#fav-grid');
  grid.innerHTML = '';
  const favs = await loadFavs();
  // persist if loaded from API (so user can remove locally)
  saveFavs(favs);

  favs.forEach(f => {
    const card = document.createElement('article');
    card.className = `card p-4 text-white ${f.color}`;
    card.setAttribute('tabindex','0');
    card.setAttribute('role','button');
    card.setAttribute('aria-label', f.title + ' favorite');
    card.innerHTML = `
      <div class="flex justify-between items-start">
        <h3 class="fav-card-title">${f.title}</h3>
        <div class="flex items-center gap-2">
          <button class="more-btn text-white bg-black/20 px-2 py-1 rounded text-xs" data-page="${f.page}">More info</button>
          <button class="remove-btn text-white/40 hover:text-white text-sm" aria-label="Remove ${f.title}" title="Remove">✕</button>
        </div>
      </div>
    `;
    // events
    card.querySelector('.remove-btn').addEventListener('click', (ev)=>{
      ev.stopPropagation();
      removeFav(f.id);
    });
    card.querySelector('.more-btn').addEventListener('click', (ev)=>{
      ev.stopPropagation();
      navigateTo(f.page);
    });
    card.addEventListener('click', ()=> navigateTo(f.page));
    grid.appendChild(card);
  });
}

function removeFav(id){
  const favs = JSON.parse(localStorage.getItem('ledgerly.favs') || '[]').filter(x => x.id !== id);
  saveFavs(favs);
  renderFavs();
}

// Simple routing (page: dashboard, purchase, sales, accounts, crm, settings)
async function navigateTo(page){
  const area = $('#content-area');
  area.innerHTML = '';
  if(page === 'dashboard'){
    // fetch small summaries from API
    const [purchase, sales, accounts] = await Promise.all([
      fetchJson('/purchase'),
      fetchJson('/sales'),
      fetchJson('/accounts')
    ]);
    area.innerHTML = `<h3 class=\\"text-xl font-semibold mb-2\\">Dashboard</h3>`;
    const s = document.createElement('div');
    s.className = 'grid grid-cols-1 md:grid-cols-3 gap-4';
    s.innerHTML = `
      <div class=\\"card p-4\\"><h4 class=\\"font-semibold\\">Recent Purchases</h4>${(purchase||[]).slice(0,3).map(p=>`<div class=\\"text-sm text-gray-600\\">${p.id} — ${p.vendor} — $${p.total}</div>`).join('')||'<div class=\\"text-sm text-gray-500\\">No data</div>'}</div>
      <div class=\\"card p-4\\"><h4 class=\\"font-semibold\\">Recent Sales</h4>${(sales||[]).slice(0,3).map(s=>`<div class=\\"text-sm text-gray-600\\">${s.id} — ${s.customer} — $${s.total}</div>`).join('')||'<div class=\\"text-sm text-gray-500\\">No data</div>'}</div>
      <div class=\\"card p-4\\"><h4 class=\\"font-semibold\\">Accounts Summary</h4>${accounts?((accounts.ledgerSummary||[]).map(a=>`<div class=\\"text-sm text-gray-600\\">${a.account}: $${a.balance}</div>`).join('')):'<div class=\\"text-sm text-gray-500\\">No data</div>'}</div>
    `;
    area.appendChild(s);
  }else if(page === 'purchase'){
    const purchase = await fetchJson('/purchase');
    area.innerHTML = `<h3 class=\\"text-xl font-semibold mb-2\\">Purchase</h3>`;
    const list = document.createElement('div');
    list.className = 'space-y-2';
    (purchase||[]).forEach(p => {
      const el = document.createElement('div');
      el.className = 'card p-3 flex justify-between items-center';
      el.innerHTML = `<div><div class=\\"font-medium\\">${p.id} — ${p.vendor}</div><div class=\\"text-sm text-gray-500\\">${p.date}</div></div><div class=\\"text-sm font-semibold\\">$${p.total}</div>`;
      list.appendChild(el);
    });
    area.appendChild(list);
  }else if(page === 'sales'){
    const sales = await fetchJson('/sales');
    area.innerHTML = `<h3 class=\\"text-xl font-semibold mb-2\\">Sales</h3>`;
    const list = document.createElement('div');
    (sales||[]).forEach(s => {
      const el = document.createElement('div');
      el.className = 'card p-3 flex justify-between items-center';
      el.innerHTML = `<div><div class=\\"font-medium\\">${s.id} — ${s.customer}</div><div class=\\"text-sm text-gray-500\\">${s.date}</div></div><div class=\\"text-sm font-semibold\\">$${s.total}</div>`;
      list.appendChild(el);
    });
    area.appendChild(list);
  }else if(page === 'accounts'){
    const accounts = await fetchJson('/accounts');
    area.innerHTML = `<h3 class=\\"text-xl font-semibold mb-2\\">Accounts</h3>`;
    if(accounts){
      area.innerHTML += `<div class=\\"grid grid-cols-1 md:grid-cols-2 gap-4\\"><div class=\\"card p-4\\"><h4 class=\\"font-semibold\\">Ledger Summary</h4>${(accounts.ledgerSummary||[]).map(a=>`<div class=\\"text-sm text-gray-600\\">${a.account}: $${a.balance}</div>`).join('')}</div><div class=\\"card p-4\\"><h4 class=\\"font-semibold\\">Balance Sheet</h4><div class=\\"text-sm text-gray-600\\">Assets: $${accounts.balanceSheet.assets}</div><div class=\\"text-sm text-gray-600\\">Liabilities: $${accounts.balanceSheet.liabilities}</div></div></div>`;
    }else area.innerHTML += '<div class=\\"text-sm text-gray-500\\">No account data</div>';
  }else if(page === 'crm'){
    const crm = await fetchJson('/crm');
    area.innerHTML = `<h3 class=\\"text-xl font-semibold mb-2\\">CRM</h3>`;
    const list = document.createElement('div');
    (crm||[]).forEach(t => {
      const el = document.createElement('div');
      el.className = 'card p-3';
      el.innerHTML = `<div class=\\"font-medium\\">${t.title}</div><div class=\\"text-sm text-gray-500\\">Due: ${t.due} — ${t.status}</div>`;
      list.appendChild(el);
    });
    area.appendChild(list);
  }else if(page === 'settings'){
    const s = await fetchJson('/settings');
    area.innerHTML = `<h3 class=\\"text-xl font-semibold mb-2\\">Settings</h3><div class=\\"text-sm text-gray-600\\">Company: ${s?.company||'—'}</div><div class=\\"text-sm text-gray-600\\">Year: ${s?.year||'—'}</div>`;
  }else{
    area.innerHTML = `<h3 class=\\"text-xl font-semibold mb-2\\">${page}</h3><p class=\\"text-sm text-gray-600\\">Content for ${page}.</p>`;
  }
  // update active nav state
  $$('.nav-btn').forEach(b=> b.classList.remove('bg-gray-200'));
  const btn = $(`.nav-btn[data-page=\\"${page}\\"]`);
  if(btn) btn.classList.add('bg-gray-200');
}

// Wire nav
function wireNav(){
  $$('.nav-btn').forEach(b => {
    b.addEventListener('click', ()=>{
      const page = b.dataset.page;
      navigateTo(page);
    });
  });
}

// mobile menu toggle
function wireMenuToggle(){
  $('#menu-toggle').addEventListener('click', ()=>{
    const nav = document.querySelector('nav[aria-label="Main navigation"]');
    nav.classList.toggle('open');
  });
}

// init
async function init(){
  await renderFavs();
  wireNav();
  wireMenuToggle();
  // initial page
  navigateTo('dashboard');
  // expose some dev helpers
  window.Ledgerly = { loadFavs, saveFavs, renderFavs, navigateTo };
}

document.addEventListener('DOMContentLoaded', init);
