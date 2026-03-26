import { useState, useMemo, useEffect } from 'react'
import { Search, Clock, User, Calendar, MessageCircle, X, Loader2, ChevronRight, Phone } from 'lucide-react'
import { getConversations, getSingleConversation } from '../services/conversationService'
import { showToast } from '../utils/toast'

const PendingConversationsPage = () => {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [detailsLoading, setDetailsLoading] = useState(false)
  
  // UI States
  const [searchTerm, setSearchTerm] = useState('')
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // --- 1. FETCH LIVE CONVERSATIONS ---
  const fetchPendingData = async () => {
    try {
      setLoading(true)
      const data = await getConversations()
      // Filter for 'open' or 'unassigned' status which represents "Pending"
      const pendingList = (data.conversations || []).filter(c => 
        c.status === 'open' || c.status === 'unassigned'
      )
      setConversations(pendingList)
    } catch (error) {
      showToast('Error syncing conversations', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPendingData() }, [])

  // --- 2. FETCH SINGLE CONVO DETAILS (Messages) ---
  const handleShowConversation = async (convoId) => {
    try {
      setDetailsLoading(true)
      const data = await getSingleConversation(convoId)
      setSelectedConversation(data.conversation)
      setShowChatModal(true)
    } catch (error) {
      showToast('Could not load chat history', 'error')
    } finally {
      setDetailsLoading(false)
    }
  }

  // --- 3. FILTERING & SEARCH ---
  const filteredConversations = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return conversations.filter(c => 
      c.client?.name?.toLowerCase().includes(term) ||
      c.lastMessage?.toLowerCase().includes(term) ||
      c.assignedAgent?.name?.toLowerCase().includes(term)
    )
  }, [conversations, searchTerm])

  const currentItems = filteredConversations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-6 text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800 flex items-center gap-2">
            <Clock className="text-amber-500" size={28} />
            Pending Queue
          </h1>
          <p className="text-slate-500 text-sm font-medium">Conversations awaiting agent or client response</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search clients or messages..." 
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-4 focus:ring-amber-500/10 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Current Agent</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4">Recent Snippet</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm font-medium text-slate-600">
              {currentItems.map((convo) => (
                <tr key={convo._id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {convo.client?.name || 'Unknown Client'}
                    <div className="text-[10px] text-slate-400 font-bold">{convo.client?.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    {convo.assignedAgent ? (
                       <span className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase">
                         <div className="h-2 w-2 rounded-full bg-emerald-500"/> {convo.assignedAgent.name}
                       </span>
                    ) : (
                       <span className="text-slate-300 italic text-xs">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">
                    {convo.lastMessageAt ? new Date(convo.lastMessageAt).toLocaleString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate italic text-slate-400">
                    "{convo.lastMessage || 'No messages yet'}"
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleShowConversation(convo._id)}
                      disabled={detailsLoading}
                      className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-600 text-[10px] font-black uppercase rounded-lg hover:bg-amber-100 transition-all active:scale-95"
                    >
                      {detailsLoading ? <Loader2 size={12} className="animate-spin"/> : <MessageCircle size={12}/>}
                      View Chat
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
            <div key={convo._id} className="p-4 flex items-center justify-between bg-white hover:bg-slate-50" onClick={() => handleShowConversation(convo._id)}>
               <div className="space-y-1">
                 <div className="font-black text-slate-800">{convo.client?.name}</div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase">{convo.assignedAgent?.name || 'Unassigned'}</div>
               </div>
               <ChevronRight size={20} className="text-slate-300" />
            </div>
          ))}
        </div>
      </div>

      {/* CHAT MODAL */}
      {showChatModal && selectedConversation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col h-[85vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center font-black">
                  {selectedConversation.client?.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 leading-none">{selectedConversation.client?.name}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Pending Interaction</p>
                </div>
              </div>
              <button onClick={() => setShowChatModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24}/></button>
            </div>

            <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
              {/* Sidebar: Client Meta */}
              <div className="w-full md:w-72 bg-slate-50/50 border-r border-slate-100 p-6 space-y-6">
                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-2">Client Info</h4>
                   <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><Phone size={14} className="text-slate-300"/> {selectedConversation.client?.phoneNumber}</div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><User size={14} className="text-slate-300"/> ID: {selectedConversation.client?._id.slice(-6)}</div>
                   </div>
                </div>

                <div className="pt-4">
                   <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 space-y-2">
                      <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Status Warning</p>
                      <p className="text-xs font-medium text-amber-800 leading-relaxed italic">"This conversation is currently waiting for input."</p>
                   </div>
                </div>
              </div>

              {/* Main: Chat View */}
              <div className="flex-1 flex flex-col bg-white">
                 <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/20">
                    {selectedConversation.messages?.map((msg, idx) => {
                      const isAgent = msg.senderType === 'agent'
                      return (
                        <div key={idx} className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
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
                 
                 <div className="p-6 bg-white border-t border-slate-50 flex justify-center">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                      <MessageCircle size={14}/> Open the main dashboard to reply to this client
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

export default PendingConversationsPage