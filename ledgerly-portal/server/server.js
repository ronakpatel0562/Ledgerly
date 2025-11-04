// Simple zero-dependency HTTP API server for Ledgerly mock
// Run with: node server/server.js

const http = require('http');
const url = require('url');
const port = process.env.PORT || 4000;

const data = {
  favs: [
    { id: 'purchase-bill', title: 'Purchase bill', color: 'teal', page: 'purchase' },
    { id: 'deposit-receipt', title: 'Deposit receipt', color: 'green', page: 'accounts' },
    { id: 'make-payment', title: 'Making a payment', color: 'yellow', page: 'accounts' },
    { id: 'balance-sheet', title: 'Balance sheet', color: 'red', page: 'accounts' }
  ],
  purchase: [
    { id: 'P-1001', vendor: 'Acme Supplies', date: '2025-10-28', total: 1250.50, status: 'Paid' },
    { id: 'P-1002', vendor: 'PaperWorks', date: '2025-11-01', total: 560.00, status: 'Due' }
  ],
  sales: [
    { id: 'S-2001', customer: 'Green Mart', date: '2025-10-30', total: 2300.00, status: 'Paid' }
  ],
  accounts: {
    ledgerSummary: [
      { account: 'Cash', balance: 10234.50 },
      { account: 'Bank', balance: 45900.00 }
    ],
    balanceSheet: { assets: 56134.5, liabilities: 12000.0, equity: 44134.5 }
  },
  crm: [
    { id: 'T-1', title: 'Call: Green Mart', due: '2025-11-05', status: 'open' }
  ],
  settings: { company: 'CELL POINT GENERAL TRADING LLC', year: '2025-2026' }
};

function sendJson(res, obj, code=200){
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(obj));
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  if(req.method === 'OPTIONS') return sendJson(res, {}, 204);

  if(parsed.pathname === '/api/favs') return sendJson(res, data.favs);
  if(parsed.pathname === '/api/purchase') return sendJson(res, data.purchase);
  if(parsed.pathname === '/api/sales') return sendJson(res, data.sales);
  if(parsed.pathname === '/api/accounts') return sendJson(res, data.accounts);
  if(parsed.pathname === '/api/crm') return sendJson(res, data.crm);
  if(parsed.pathname === '/api/settings') return sendJson(res, data.settings);

  // root info
  if(parsed.pathname === '/api') return sendJson(res, { status: 'ok', endpoints: ['/api/favs','/api/purchase','/api/sales','/api/accounts','/api/crm','/api/settings']});

  // not found
  sendJson(res, { error: 'Not found' }, 404);
});

server.listen(port, () => console.log(`Ledgerly mock API server listening at http://localhost:${port}`));
