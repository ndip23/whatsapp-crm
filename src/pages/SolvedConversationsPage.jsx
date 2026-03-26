import { useState, useMemo, useEffect } from 'react'
import { Search, CheckCircle, User, Calendar, MessageCircle, X, Loader2, ChevronRight, Phone, Info } from 'lucide-react'
import { getConversations, getSingleConversation } from '../services/conversationService'
import { showToast } from '../utils/toast'

const SolvedConversationsPage = () => {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [detailsLoading, setDetailsLoading] = useState(false)
  
  // UI States
  const [searchTerm, setSearchTerm] = useState('')
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // --- 1. FETCH LIVE SOLVED DATA ---
  const fetchSolvedData = async () => {
    try {
      setLoading(true)
      const data = await getConversations()
      // Filter for 'closed' or 'solved' status
      const solvedList = (data.conversations || []).filter(c => 
        c.status === 'closed' || c.status === 'solved'
      )
      setConversations(solvedList)
    } catch (error) {
      showToast('Sync failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSolvedData() }, [])

  // --- 2. FETCH SPECIFIC CHAT HISTORY ---
  const handleViewChat = async (convoId) => {
    try {
      setDetailsLoading(true)
      const data = await getSingleConversation(convoId)
      setSelectedConversation(data.conversation)
      setShowChatModal(true)
    } catch (error) {
      showToast('History could not be retrieved', 'error')
    } finally {
      setDetailsLoading(false)
    }
  }

  // --- 3. LOGIC ---
  const filteredConversations = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return conversations.filter(c => 
      c.client?.name?.toLowerCase().includes(term) ||
      c.assignedAgent?.name?.toLowerCase().includes(term)
    )
  }, [conversations, searchTerm])

  const currentItems = filteredConversations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-6 text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <CheckCircle className="text-emerald-500" size={28} />
            Archive: Solved Chats
          </h1>
          <p className="text-slate-500 text-sm font-medium">Historical records of completed interactions</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search archive..." 
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid List */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <tr>
                <th className="px-8 py-5">Client Name</th>
                <th className="px-8 py-5">Assigned Agent</th>
                <th className="px-8 py-5">Resolution Date</th>
                <th className="px-8 py-5 text-right">Records</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {currentItems.map((convo) => (
                <tr key={convo._id} className="hover:bg-emerald-50/20 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-800">
                    {convo.client?.name || 'Customer'}
                    <div className="text-[10px] text-slate-400 font-bold">{convo.client?.phoneNumber}</div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">
                      @{convo.assignedAgent?.name || 'System'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-400 font-bold text-xs">
                    {convo.updatedAt ? new Date(convo.updatedAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleViewChat(convo._id)}
                      disabled={detailsLoading}
                      className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase rounded-lg hover:bg-slate-800 transition-all active:scale-95"
                    >
                      {detailsLoading ? <Loader2 size={12} className="animate-spin"/> : 'Open Logs'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-slate-50">
           {currentItems.map(convo => (
             <div key={convo._id} className="p-5 flex items-center justify-between" onClick={() => handleViewChat(convo._id)}>
                <div className="space-y-1">
                   <div className="font-black text-slate-800">{convo.client?.name}</div>
                   <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Solved by {convo.assignedAgent?.name}</div>
                </div>
                <ChevronRight size={20} className="text-slate-300" />
             </div>
           ))}
        </div>
      </div>

      {/* CHAT LOG MODAL */}
      {showChatModal && selectedConversation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col h-[85vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-emerald-100">
                  {selectedConversation.client?.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 leading-none">{selectedConversation.client?.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle className="text-emerald-500" size={14}/>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Resolution Confirmed</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowChatModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"><X size={28}/></button>
            </div>

            <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
              {/* Sidebar: Archive Stats */}
              <div className="w-full md:w-80 bg-slate-50/50 border-r border-slate-100 p-8 space-y-8 overflow-y-auto">
                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-200 pb-2">Audit Info</h4>
                   <div className="space-y-3">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-300 uppercase">Handled By</span>
                        <span className="text-sm font-bold text-slate-700">{selectedConversation.assignedAgent?.name || 'System'}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-300 uppercase">Phone Link</span>
                        <span className="text-sm font-bold text-slate-700">{selectedConversation.client?.phoneNumber}</span>
                      </div>
                   </div>
                </div>

                <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl">
                   <h4 className="text-[10px] font-black uppercase text-emerald-400 tracking-widest mb-4 flex items-center gap-2"><Info size={14}/> Archive Note</h4>
                   <p className="text-xs font-medium text-slate-400 leading-relaxed italic">
                     "This conversation was moved to the archive because the client confirmed the resolution."
                   </p>
                </div>
              </div>

              {/* Main: Chat View */}
              <div className="flex-1 flex flex-col bg-white">
                 <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-slate-50/20">
                    {selectedConversation.messages?.map((msg, idx) => {
                      const isAgent = msg.senderType === 'agent'
                      return (
                        <div key={idx} className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] p-4 rounded-3xl shadow-sm text-sm font-medium ${isAgent ? 'bg-emerald-500 text-white rounded-br-none shadow-emerald-100' : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'}`}>
                            {msg.content}
                            <div className={`text-[9px] mt-1 font-bold ${isAgent ? 'text-emerald-100' : 'text-slate-300'}`}>
                               {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                 </div>
                 
                 {/* Bottom Banner */}
                 <div className="p-6 bg-emerald-50 border-t border-emerald-100 text-center">
                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest flex items-center justify-center gap-2">
                      <CheckCircle size={14}/> Read Only Historical Record
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SolvedConversationsPage