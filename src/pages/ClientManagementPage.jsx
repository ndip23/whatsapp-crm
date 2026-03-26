import { useState, useMemo } from 'react'
import { Search, Filter, User, Phone, Globe, Tag, Plus, MessageSquare, Bell, Calendar, Loader2 } from 'lucide-react'
import { showToast } from '../utils/toast'

const ClientManagementPage = () => {
  const [clients, setClients] = useState([
    { id: 1, name: 'John Doe', phone: '+1 234 567 8900', email: 'john@example.com', country: 'USA', agent: 'Jane Smith', tags: ['New Lead', 'VIP'], notes: ['Initial inquiry about product features'] },
    { id: 2, name: 'Jane Smith', phone: '+44 123 456 7890', email: 'jane@uk.co', country: 'UK', agent: 'John Doe', tags: ['Closed Sale'], notes: ['Contract signed'] },
    { id: 3, name: 'Bob Johnson', phone: '+61 234 567 890', email: 'bob@oz.au', country: 'Australia', agent: 'Alice Brown', tags: ['New Lead'], notes: [] },
    { id: 4, name: 'Alice Brown', phone: '+1 987 654 3210', email: 'alice@ca.gov', country: 'Canada', agent: 'Bob Johnson', tags: ['VIP', 'Follow Up'], notes: ['Needs demo next week'] },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [selectedClient, setSelectedClient] = useState(clients[0]) // Default to first client

  // Get all unique tags for filter dropdown
  const allTags = useMemo(() => [...new Set(clients.flatMap(c => c.tags))], [clients])

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            client.phone.includes(searchTerm)
      const matchesFilter = filterTag === '' || client.tags.includes(filterTag)
      return matchesSearch && matchesFilter
    })
  }, [clients, searchTerm, filterTag])

  const getTagStyle = (tag) => {
    switch (tag) {
      case 'New Lead': return 'bg-blue-50 text-blue-600 border-blue-100'
      case 'VIP': return 'bg-purple-50 text-purple-600 border-purple-100'
      case 'Follow Up': return 'bg-amber-50 text-amber-600 border-amber-100'
      case 'Closed Sale': return 'bg-emerald-50 text-emerald-600 border-emerald-100'
      default: return 'bg-slate-50 text-slate-500 border-slate-100'
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-black tracking-tight text-slate-800">Client Management</h1>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <select
            className="w-full appearance-none bg-white border border-slate-100 rounded-2xl py-3 pl-12 pr-10 text-sm font-bold text-slate-600 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all shadow-sm"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <option value="">All Tags</option>
            {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
          </select>
        </div>
      </div>

      {/* Clients Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Assigned Agent</th>
              <th className="px-6 py-4">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredClients.map(client => (
              <tr 
                key={client.id} 
                onClick={() => setSelectedClient(client)}
                className={`cursor-pointer transition-colors ${selectedClient?.id === client.id ? 'bg-emerald-50/50' : 'hover:bg-slate-50/50'}`}
              >
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{client.name}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{client.country}</div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{client.phone}</td>
                <td className="px-6 py-4 text-sm font-bold text-emerald-600">@{client.agent}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {client.tags.map(tag => (
                      <span key={tag} className={`px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-tighter ${getTagStyle(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Panel Section */}
      {selectedClient && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Info Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-8">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center text-3xl font-black shadow-xl shadow-emerald-100">
                {selectedClient.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{selectedClient.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                   <span className="flex items-center gap-1 text-xs font-bold text-slate-400"><Globe size={14}/> {selectedClient.country}</span>
                   <span className="h-1 w-1 rounded-full bg-slate-200"/>
                   <span className="flex items-center gap-1 text-xs font-bold text-emerald-600"><User size={14}/> Assigned to {selectedClient.agent}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Phone size={16} className="text-slate-400"/>
                    <span className="text-sm font-bold text-slate-700">{selectedClient.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Tag size={16} className="text-slate-400"/>
                    <div className="flex gap-2">
                      {selectedClient.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-black text-emerald-600">#{tag.replace(' ', '')}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Notes ({selectedClient.notes.length})</h4>
                <div className="space-y-2">
                  {selectedClient.notes.length > 0 ? selectedClient.notes.map((note, idx) => (
                    <div key={idx} className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800 font-medium">
                      {note}
                    </div>
                  )) : (
                    <div className="text-sm text-slate-400 italic">No notes added yet.</div>
                  )}
                  <button className="text-xs font-black text-emerald-600 flex items-center gap-1 pt-2 hover:text-emerald-700">
                    <Plus size={14}/> ADD NOTE
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Tools in Details */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 p-3 rounded-2xl flex items-center justify-center gap-3 text-sm font-black transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                  <MessageSquare size={18}/> Send WhatsApp
                </button>
                <button className="w-full bg-slate-800 hover:bg-slate-700 p-3 rounded-2xl flex items-center justify-center gap-3 text-sm font-black transition-all">
                  <Calendar size={18}/> Schedule Call
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 flex items-center gap-2">
                <Bell size={14}/> Reminders
              </h4>
              <input type="datetime-local" className="w-full bg-slate-50 border-none rounded-xl p-3 text-xs font-bold text-slate-600 mb-3" />
              <button className="w-full bg-emerald-50 text-emerald-600 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-emerald-100">
                Set Follow-up
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default ClientManagementPage