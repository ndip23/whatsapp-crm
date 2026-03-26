import { useState, useMemo, useEffect } from 'react'
import { Search, User, Calendar, MessageCircle, CheckCircle, Clock, AlertCircle, Plus, Edit, X, Loader2, Globe, Phone } from 'lucide-react'
import { showToast } from '../utils/toast'
import { viewClients, editClient } from '../services/clientService'
import { getAllUsers } from '../services/adminService'

const ClientListPage = () => {
  const [clients, setClients] = useState([])
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)

  // UI States
  const [searchTerm, setSearchTerm] = useState('')
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedUser, setSelectedUser] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // --- 1. DATA FETCHING ---
  const fetchData = async () => {
    try {
      setLoading(true)
      const [clientData, agentData] = await Promise.all([
        viewClients(),
        getAllUsers()
      ])
      // Handle potential object wrap { clients: [] }
      setClients(Array.isArray(clientData) ? clientData : clientData.clients || [])
      setAgents(Array.isArray(agentData) ? agentData : agentData.agents || [])
    } catch (error) {
      showToast('Failed to fetch clients', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  // --- 2. FILTERING ---
  const filteredClients = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return clients.filter(c => 
      c.name?.toLowerCase().includes(term) || 
      c.phoneNumber?.includes(term) ||
      c.email?.toLowerCase().includes(term)
    )
  }, [clients, searchTerm])

  const currentItems = filteredClients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // --- 3. ACTIONS ---
  const handleOpenAssign = (client) => {
    setSelectedClient(client)
    setSelectedUser(client.assignedAgent || '')
    setShowAssignModal(true)
  }

  const handleAssignSubmit = async (e) => {
    e.preventDefault()
    if (!selectedUser) return showToast('Please select an agent', 'error')

    try {
      await editClient(selectedClient._id, { assignedAgent: selectedUser, status: 'assigned' })
      showToast('Client assigned successfully', 'success')
      setShowAssignModal(false)
      fetchData()
    } catch (error) {
      showToast('Assignment failed', 'error')
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      solved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      pending: 'bg-amber-50 text-amber-600 border-amber-100',
      escalated: 'bg-red-50 text-red-600 border-red-100',
      unassigned: 'bg-slate-50 text-slate-400 border-slate-100'
    }
    const icons = {
      solved: <CheckCircle size={12} />,
      pending: <Clock size={12} />,
      escalated: <AlertCircle size={12} />,
      unassigned: <User size={12} />
    }
    return (
      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${styles[status] || styles.unassigned}`}>
        {icons[status]}
        {status || 'Unknown'}
      </span>
    )
  }

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
    </div>
  )

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Client Directory</h1>
          <p className="text-slate-500 text-sm font-medium">Manage leads and conversation assignments</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, phone or email..." 
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid View for Mobile / Table for Desktop */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Assigned Agent</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentItems.map((client) => (
                <tr key={client._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black">
                        {client.name?.charAt(0)}
                      </div>
                      <div className="font-bold text-slate-800">{client.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-semibold text-slate-500 flex flex-col gap-1">
                      <span className="flex items-center gap-1.5"><Phone size={12} className="text-slate-300"/>{client.phoneNumber}</span>
                      <span className="flex items-center gap-1.5"><Globe size={12} className="text-slate-300"/>{client.country || 'International'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(client.status || 'unassigned')}</td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-slate-400 italic">
                      {client.assignedAgent ? <span className="text-emerald-600">@{client.assignedAgent.name || client.assignedAgent}</span> : 'Waiting for agent...'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenAssign(client)} className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all" title="Assign Agent"><User size={18}/></button>
                      <button onClick={() => { setSelectedClient(client); setShowChatModal(true); }} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="View Conversation"><MessageCircle size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-slate-50">
          {currentItems.map(client => (
            <div key={client._id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black">{client.name?.charAt(0)}</div>
                  <div className="font-bold text-slate-800">{client.name}</div>
                </div>
                {getStatusBadge(client.status)}
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>{client.phoneNumber}</span>
                <div className="flex gap-4">
                  <User size={18} onClick={() => handleOpenAssign(client)}/>
                  <MessageCircle size={18} onClick={() => { setSelectedClient(client); setShowChatModal(true); }}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ASSIGN MODAL */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 text-slate-800">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
            <h3 className="text-xl font-black mb-2">Assign Agent</h3>
            <p className="text-slate-500 text-sm mb-6 font-medium">Select a team member to handle <span className="text-emerald-600 font-bold">{selectedClient.name}</span></p>
            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <select 
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
                value={selectedUser}
                onChange={e => setSelectedUser(e.target.value)}
              >
                <option value="">Select an agent...</option>
                {agents.map(agent => <option key={agent._id} value={agent._id}>{agent.name} ({agent.role})</option>)}
              </select>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAssignModal(false)} className="flex-1 py-3 text-sm font-bold text-slate-400">Cancel</button>
                <button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-3 text-sm font-bold shadow-lg shadow-emerald-100 transition-all">Assign Now</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHAT PREVIEW MODAL */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col h-[80vh] overflow-hidden text-slate-800">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black">{selectedClient.name?.charAt(0)}</div>
                  <div>
                    <div className="font-black leading-none">{selectedClient.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{selectedClient.phoneNumber}</div>
                  </div>
               </div>
               <button onClick={() => setShowChatModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-4">
               <div className="bg-white p-4 rounded-2xl rounded-bl-none max-w-xs shadow-sm border border-slate-100 text-sm font-medium">
                  Hello, I'm looking for support regarding my recent order.
                  <div className="text-[9px] text-slate-300 mt-1 font-bold">10:45 AM</div>
               </div>
               <div className="bg-emerald-500 text-white p-4 rounded-2xl rounded-br-none max-w-xs ml-auto shadow-md shadow-emerald-100 text-sm font-medium">
                  Hi! I'm happy to help. Can you provide your order ID?
                  <div className="text-[9px] text-emerald-200 mt-1 font-bold text-right">10:47 AM</div>
               </div>
            </div>

            <div className="p-6 bg-white border-t border-slate-50">
               <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-center text-xs font-black uppercase tracking-widest">
                  Preview Mode - You cannot reply from this list
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientListPage