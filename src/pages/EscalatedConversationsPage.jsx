import { useState, useMemo, useEffect } from 'react'
import { Search, AlertCircle, MessageCircle, X, ShieldAlert, Clock, Loader2 } from 'lucide-react'
import { getConversations, getSingleConversation } from '../services/conversationService'
import { showToast } from '../utils/toast'

const EscalatedConversationsPage = () => {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [detailsLoading, setDetailsLoading] = useState(false)
  
  // UI States
  const [searchTerm, setSearchTerm] = useState('')
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // --- 1. FETCH LIVE DATA ---
  const fetchEscalatedData = async () => {
    try {
      setLoading(true)
      const data = await getConversations()
      // Filter for only 'escalated' status from your database
      const escalatedList = (data.conversations || []).filter(c => c.status === 'escalated')
      setConversations(escalatedList)
    } catch (error) {
      showToast('Error loading escalated queue', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEscalatedData() }, [])

  // --- 2. VIEW FULL HISTORY ---
  const handleReview = async (convoId) => {
    try {
      setDetailsLoading(true)
      const data = await getSingleConversation(convoId)
      setSelectedConversation(data.conversation)
      setShowChatModal(true)
    } catch (error) {
      showToast('Could not retrieve chat details', 'error')
    } finally {
      setDetailsLoading(false)
    }
  }

  // --- 3. FILTERING ---
  const filteredConversations = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return conversations.filter(c => 
      c.client?.name?.toLowerCase().includes(term) ||
      c.reason?.toLowerCase().includes(term)
    )
  }, [conversations, searchTerm])

  const currentItems = filteredConversations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-red-500" />
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-6 text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800 flex items-center gap-2">
            <ShieldAlert className="text-red-500" size={28} />
            Escalation Queue
          </h1>
          <p className="text-slate-500 text-sm font-medium">Cases flagged for administrative review</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" placeholder="Search client name..." 
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-widest">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Assigned Agent</th>
              <th className="px-6 py-4">Wait Time</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {currentItems.map((conv) => (
              <tr key={conv._id} className="hover:bg-red-50/20 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800">
                  {conv.client?.name || 'Unknown'}
                  <div className="text-[10px] text-slate-400 font-bold tracking-tight">{conv.client?.phoneNumber}</div>
                </td>
                <td className="px-6 py-4 text-slate-500 font-medium">
                  {conv.assignedAgent?.name || 'Unassigned'}
                </td>
                <td className="px-6 py-4 text-red-500 font-black text-xs">
                  {conv.updatedAt ? new Date(conv.updatedAt).toLocaleTimeString() : 'Recently'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleReview(conv._id)}
                    className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-lg hover:bg-slate-800 transition-all active:scale-95"
                  >
                    {detailsLoading ? <Loader2 className="animate-spin" size={12}/> : 'REVIEW'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredConversations.length === 0 && (
          <div className="p-20 text-center text-slate-300 font-bold uppercase text-xs tracking-widest">No escalated cases</div>
        )}
      </div>

      {/* CHAT MODAL */}
      {showChatModal && selectedConversation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col h-[85vh] overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-4 text-slate-800">
                <div className="h-12 w-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center font-black">
                  {selectedConversation.client?.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-black leading-none">{selectedConversation.client?.name}</h3>
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-1">Flagged Conversation</p>
                </div>
              </div>
              <button onClick={() => setShowChatModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
               {selectedConversation.messages?.map((msg, i) => {
                 const isAgent = msg.senderType === 'agent'
                 return (
                   <div key={i} className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[75%] p-4 rounded-3xl shadow-sm text-sm font-medium ${isAgent ? 'bg-emerald-500 text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'}`}>
                        {msg.content}
                        <div className={`text-[9px] mt-1 font-bold ${isAgent ? 'text-emerald-100' : 'text-slate-300'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                     </div>
                   </div>
                 )
               })}
            </div>

            <div className="p-4 bg-red-50 border-t border-red-100 text-center">
               <p className="text-[10px] font-black text-red-600 uppercase tracking-widest flex items-center justify-center gap-2">
                 <AlertCircle size={14}/> Read-Only Audit View
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EscalatedConversationsPage