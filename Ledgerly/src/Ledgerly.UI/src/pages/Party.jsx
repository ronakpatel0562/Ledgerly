import React, { useState } from 'react';

const initialParties = [
  { id: 1, name: 'પટેલ (Patel)', mobile: '8200484939', city: '', balance: 500100 },
  { id: 2, name: 'bhavesh oil (bhaveshbhai)', mobile: '9173200600', city: '', balance: 100000 },
  { id: 3, name: 'shankarbhai (shankarbhai)', mobile: '9824913589', city: '', balance: 0 },
  { id: 4, name: 'Dasharathbhai (Dasharathbhai)', mobile: '9033320949', city: '', balance: -2000 },
  { id: 5, name: 'Nemji (Nemji)', mobile: '7874558105', city: '', balance: 0 },
  { id: 6, name: 'Nemji (Nemji)', mobile: '7874558105', city: 'Radhanpur', balance: 0 },
  { id: 7, name: 'Shree Gajanand agro industries (Rakesh Bhai)', mobile: '00000000', city: '', balance: 285000 },
  { id: 8, name: 'Vijay (Vijay)', mobile: '9904817148', city: '', balance: 0 },
  { id: 9, name: 'પટેલ(Patel)', mobile: '9998434877', city: '', balance: 4200 },
  { id: 10, name: 'ભક્ત(भक्त)', mobile: '9099583252', city: '', balance: -1900 }
];

function Party() {
  const [parties, setParties] = useState(() => {
    const saved = localStorage.getItem('parties');
    return saved ? JSON.parse(saved) : initialParties;
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '', mobile: '', city: '', balance: 0, firm: '', address: '', gstin: '', email: '', accountGroup: 'Debtors', state: 'Gujarat', billingAddress: '', openingType: 'To Collect'
  });
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);

  React.useEffect(() => {
    localStorage.setItem('parties', JSON.stringify(parties));
  }, [parties]);

  const [tab, setTab] = useState('all');
  const filtered = parties.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    if (tab === 'all') return matchesSearch;
    if (tab === 'collect') return matchesSearch && (p.openingType === 'To Collect' || (!p.openingType && p.balance >= 0));
    if (tab === 'pay') return matchesSearch && (p.openingType === 'To Pay' || (!p.openingType && p.balance < 0));
    return matchesSearch;
  });

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editId) {
      setParties(parties.map(p => p.id === editId ? { ...form, id: editId } : p));
    } else {
      setParties([...parties, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
    setForm({ name: '', mobile: '', city: '', balance: 0, firm: '', address: '', gstin: '', email: '', accountGroup: 'Debtors', state: 'Gujarat', billingAddress: '', openingType: 'To Collect' });
    setEditId(null);
  }

  function handleEdit(party) {
    setForm(party);
    setEditId(party.id);
    setShowForm(true);
  }

  function handleDelete(id) {
    setParties(parties.filter(p => p.id !== id));
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Parties</h2>
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex gap-2 items-center">
          <button className="bg-teal-500 text-white px-4 py-2 rounded" onClick={() => { setShowForm(true); setEditId(null); }}>+ Create Party</button>
          <div className="ml-4 flex gap-1">
            <button onClick={() => setTab('all')} className={`px-3 py-1 rounded ${tab==='all'?'bg-blue-500 text-white':'bg-gray-200'}`}>All</button>
            <button onClick={() => setTab('collect')} className={`px-3 py-1 rounded ${tab==='collect'?'bg-green-500 text-white':'bg-gray-200'}`}>To Collect</button>
            <button onClick={() => setTab('pay')} className={`px-3 py-1 rounded ${tab==='pay'?'bg-red-500 text-white':'bg-gray-200'}`}>To Pay</button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-2 py-1"
        />
      </div>
      {!showForm ? (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th>No</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} className={i % 2 ? 'bg-gray-50' : ''}>
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.mobile}</td>
                <td>{p.city}</td>
                <td>{p.balance}</td>
                <td>
                  <button className="bg-green-500 text-white px-2 py-1 rounded mr-1" onClick={() => handleEdit(p)}>A</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <form className="bg-white border rounded p-4 grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSave}>
          <div>
            <label className="block font-semibold">Firm Name *</label>
            <input name="firm" value={form.firm} onChange={handleFormChange} className="border px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Firm Address</label>
            <input name="address" value={form.address} onChange={handleFormChange} className="border px-2 py-1 w-full" />
          </div>
          <div>
            <label className="block font-semibold">GSTIN</label>
            <input name="gstin" value={form.gstin} onChange={handleFormChange} className="border px-2 py-1 w-full" />
          </div>
          <div>
            <label className="block font-semibold">Person Name</label>
            <input name="name" value={form.name} onChange={handleFormChange} className="border px-2 py-1 w-full" required />
          </div>
          <div>
            <label className="block font-semibold">Mobile Number</label>
            <input name="mobile" value={form.mobile} onChange={handleFormChange} className="border px-2 py-1 w-full" />
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <input name="email" value={form.email} onChange={handleFormChange} className="border px-2 py-1 w-full" />
          </div>
          <div>
            <label className="block font-semibold">City</label>
            <input name="city" value={form.city} onChange={handleFormChange} className="border px-2 py-1 w-full" />
          </div>
          <div>
            <label className="block font-semibold">Account Group *</label>
            <select name="accountGroup" value={form.accountGroup} onChange={handleFormChange} className="border px-2 py-1 w-full">
              <option>Debtors</option>
              <option>Creditors</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">State *</label>
            <select name="state" value={form.state} onChange={handleFormChange} className="border px-2 py-1 w-full">
              <option>Gujarat</option>
              <option>Maharashtra</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Opening</label>
            <div className="flex gap-2">
              <input name="balance" type="number" value={form.balance} onChange={handleFormChange} className="border px-2 py-1 w-1/2" />
              <select name="openingType" value={form.openingType} onChange={handleFormChange} className="border px-2 py-1 w-1/2">
                <option>To Collect</option>
                <option>To Pay</option>
              </select>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold">Billing Address</label>
            <input name="billingAddress" value={form.billingAddress} onChange={handleFormChange} className="border px-2 py-1 w-full" />
          </div>
          <div className="flex items-end gap-2">
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => { setShowForm(false); setEditId(null); }}>Back</button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Party;
