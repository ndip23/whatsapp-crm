import { useState, useMemo, useEffect } from 'react'
import { 
  MessageCircle, CheckCircle, Clock, 
  AlertCircle, Search, Calendar, 
  Users, ChevronRight, X, Loader2, Filter, History 
} from 'lucide-react'
import { viewShifts } from '../services/shiftService'
import { getConversations } from '../services/conversationService'
import { showToast } from '../utils/toast'

const ShiftLogPage = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  
  // UI States
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLog, setSelectedLog] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // --- 1. DATA FETCHING (Live Sync) ---
  const fetchLogs = async () => {
    try {
      setLoading(true)
      // We fetch shifts and conversations to build the "Log" view
      const [shiftsData, convosData] = await Promise.all([
        viewShifts(),
        getConversations()
      ])

      // Logic: Map shifts to their associated conversations based on date/agents
      // In a real production app, you would have a dedicated /api/shift/logs endpoint
      const combinedLogs = (shiftsData || []).map(shift => ({
        ...shift,
        // Mocking association logic for display until a dedicated Log API exists
        associatedConversations: (convosData.conversations || []).slice(0, 3) 
      }))

      setLogs(combinedLogs)
    } catch (error) {
      showToast('Failed to load shift audit logs', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLogs() }, [])

  // --- 2. FILTERING ---
  const filteredLogs = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return logs.filter(log => 
      log.name?.toLowerCase().includes(term) ||
      log.startTime?.includes(term)
    )
  }, [logs, searchTerm])

  const currentItems = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusColor = (status) => {
    switch (status) {
      case 'solved': return 'text-emerald-500 bg-emerald-50'
      case 'pending': return 'text-amber-500 bg-amber-50'
      case 'escalated': return 'text-red-500 bg-red-50'
      default: return 'text-slate-400 bg-slate-50'
    }
  }

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-6 text-slate-800 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <History size={28} className="text-emerald-500" />
            Shift Audit Log
          </h1>
          <p className="text-slate-500 text-sm font-medium">Historical record of agent shifts and outcomes</p>
        </div>
        <div className="flex gap-2">
           <div className="relative w-full md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
             <input 
               type="text" 
               placeholder="Search logs..." 
               className="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-emerald-500 shadow-sm"><Filter size={18}/></button>
        </div>
      </div>

      {/* Grid Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <tr>
                <th className="px-8 py-5">Shift Period</th>
                <th className="px-8 py-5">Active Agents</th>
                <th className="px-8 py-5 text-center">Outcome Stats</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentItems.map((log) => (
                <tr key={log._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black">
                         <Calendar size={18} />
                       </div>
                       <div>
                         <div className="font-black text-slate-800">{log.name}</div>
                         <div className="text-[10px] font-bold text-slate-400 uppercase">{log.startTime} — {log.endTime}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex -space-x-2">
                       {[1, 2].map(i => (
                         <div key={i} className="h-7 w-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-black">A</div>
                       ))}
                       <div className="h-7 w-7 rounded-full border-2 border-white bg-emerald-500 text-white flex items-center justify-center text-[9px] font-black">+1</div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                     <div className="flex justify-center gap-4">
                        <div className="text-center">
                           <div className="text-xs font-black text-emerald-500">12</div>
                           <div className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">Solved</div>
                        </div>
                        <div className="text-center">
                           <div className="text-xs font-black text-amber-500">4</div>
                           <div className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">Pending</div>
                        </div>
                        <div className="text-center">
                           <div className="text-xs font-black text-red-500">1</div>
                           <div className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">Alerts</div>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                     <button 
                       onClick={() => { setSelectedLog(log); setShowDetailModal(true); }}
                       className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                     >
                       Inspect
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-slate-50">
           {currentItems.map(log => (
             <div key={log._id} className="p-5 flex items-center justify-between" onClick={() => { setSelectedLog(log); setShowDetailModal(true); }}>
                <div className="space-y-1">
                   <div className="font-black text-slate-800">{log.name}</div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase">{log.startTime} - {log.endTime}</div>
                </div>
                <ChevronRight size={20} className="text-slate-300" />
             </div>
           ))}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {showDetailModal && selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
           <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col h-[80vh] overflow-hidden">
              
              {/* Header */}
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
                 <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-slate-900 text-emerald-400 rounded-2xl flex items-center justify-center font-black">
                      <History size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-800 leading-none">{selectedLog.name}</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                        <Clock size={12}/> Shift Snapshot Report
                      </p>
                    </div>
                 </div>
                 <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={28}/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                       <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Total Load</h4>
                       <div className="text-2xl font-black text-slate-800">18 Chats</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                       <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Avg. Response</h4>
                       <div className="text-2xl font-black text-emerald-500">1.4m</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                       <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Resolution</h4>
                       <div className="text-2xl font-black text-blue-500">88%</div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Conversations During Shift</h4>
                    <div className="space-y-3">
                       {selectedLog.associatedConversations?.map((conv, idx) => (
                         <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-emerald-200 transition-all shadow-sm">
                            <div className="flex items-center gap-4">
                               <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-black">{conv.client?.name?.charAt(0)}</div>
                               <div>
                                  <div className="text-sm font-black text-slate-800">{conv.client?.name}</div>
                                  <div className="text-[10px] font-bold text-slate-400 italic">"{conv.lastMessage?.slice(0, 40)}..."</div>
                               </div>
                            </div>
                            <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusColor(conv.status)}`}>
                               {conv.status}
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                    All conversation history is archived and encrypted
                 </p>
              </div>
           </div>
        </div>
      )}
    </div>
  )
}

export default ShiftLogPage