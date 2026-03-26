import { useState, useMemo, useEffect } from 'react'
import { useChat } from '../context/ChatContext'
import { useUser } from '../context/UserContext'
import { 
  Search, Paperclip, Send, MessageCircle, Clock, 
  CheckCircle, Maximize2, MessageSquare, TrendingUp, 
  AlertCircle, Loader2, User, BarChart3
} from 'lucide-react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { getDashboardStats, getAgentPerformance, getMessagesByDay } from '../services/dashboardService'
import { showToast } from '../utils/toast'

const DashboardPage = () => {
  const { currentUser } = useUser()
  const { conversations, activeConversation, selectConversation, sendMessage } = useChat()
  
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState(null)
  const [agents, setAgents] = useState([])
  const [chartData, setChartData] = useState([]) // For Messages By Day
  const [loading, setLoading] = useState(true)

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // 1. Fetch data based on role
      const [liveStats, dailyMessages] = await Promise.all([
        getDashboardStats(),
        getMessagesByDay()
      ])
      
      setStats(liveStats)
      setChartData(dailyMessages)

      // 2. Only Admin fetches the team list
      if (currentUser?.role !== 'AGENT') {
        const liveAgents = await getAgentPerformance()
        setAgents(liveAgents)
      }
    } catch (err) {
      console.error("Sync Error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentUser) loadDashboardData()
  }, [currentUser])

  const filteredConversations = useMemo(() => {
    return (conversations || []).filter(conv => 
      conv.client?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [conversations, searchTerm])

  const handleSend = (e) => {
    e.preventDefault()
    if (message.trim() && activeConversation) {
      sendMessage(activeConversation.id, message)
      setMessage('')
    }
  }

  if (loading) return (
    <div className="flex h-[80vh] items-center justify-center">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
    </div>
  )

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* 1. LIVE STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="My Leads" 
          val={stats?.totalClients || 0} 
          icon={<MessageSquare/>} color="text-blue-600" bg="bg-blue-50" 
        />
        <StatCard 
          label="Open Chats" 
          val={stats?.openConversations || 0} 
          icon={<Clock/>} color="text-emerald-600" bg="bg-emerald-50" 
        />
        <StatCard 
          label="Closed Chats" 
          val={stats?.closedConversations || 0} 
          icon={<CheckCircle/>} color="text-purple-600" bg="bg-purple-50" 
        />
        <StatCard 
          label="Active Agents" 
          val={stats?.agentsOnDuty || 0} 
          icon={<User/>} color="text-orange-600" bg="bg-orange-50" 
        />
      </div>

      {/* 2. MAIN CHAT & ANALYTICS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chat Window (Large) */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex h-[600px]">
          {/* Sidebar: List */}
          <div className="hidden md:flex flex-col w-72 border-r border-slate-50 bg-slate-50/30">
            <div className="p-4 bg-white border-b border-slate-50">
              <input 
                type="text" placeholder="Search chats..." 
                className="w-full bg-slate-50 border-none rounded-xl py-2 px-4 text-xs font-bold outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <ConversationItem key={conv.id} conv={conv} isActive={activeConversation?.id === conv.id} onSelect={() => selectConversation(conv)} />
              ))}
            </div>
          </div>
          {/* Chat Panel */}
          <div className="flex-1 flex flex-col">
            {activeConversation ? (
              <>
                <div className="p-4 border-b border-slate-50 bg-white/80 backdrop-blur-md">
                  <h3 className="text-sm font-black text-slate-800">{activeConversation.client}</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                  {activeConversation.messages?.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
                </div>
                <div className="p-4 bg-white border-t border-slate-50">
                  <form onSubmit={handleSend} className="flex gap-2 bg-slate-50 p-2 rounded-2xl">
                    <input value={message} onChange={e => setMessage(e.target.value)} className="flex-1 bg-transparent border-none text-sm outline-none pl-2" placeholder="Message..." />
                    <button type="submit" className="bg-emerald-500 text-white p-2 rounded-xl"><Send size={16}/></button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-300 italic">Select a chat</div>
            )}
          </div>
        </div>

        {/* Analytics Side Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm h-full">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-500"/> Daily Message Volume
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 3. AGENT TABLE (Admin Only) */}
      {currentUser?.role !== 'AGENT' && (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
             <BarChart3 size={16} className="text-blue-500"/> Team Performance
           </h3>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                  <tr>
                    <th className="pb-4">Agent</th>
                    <th className="pb-4 text-center">Handled</th>
                    <th className="pb-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {agents.map((agent) => (
                    <tr key={agent._id} className="hover:bg-slate-50">
                      <td className="py-4 font-bold text-slate-700">{agent.name}</td>
                      <td className="py-4 text-center font-black text-slate-400">{agent.totalConversationsHandled || 0}</td>
                      <td className="py-4 text-right">
                        <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${agent.activeStatus ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-50'}`}>
                          {agent.activeStatus ? 'Online' : 'Offline'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>
      )}
    </div>
  )
}

const StatCard = ({ label, val, icon, color, bg }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
    <div className={`p-4 rounded-2xl ${bg} ${color} shadow-inner`}>{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</p>
      <p className="text-2xl font-black text-slate-800 tracking-tight">{val}</p>
    </div>
  </div>
)

const ConversationItem = ({ conv, isActive, onSelect }) => (
  <div onClick={onSelect} className={`p-5 flex gap-4 cursor-pointer transition-all border-l-4 ${isActive ? 'bg-emerald-50 border-emerald-500' : 'border-transparent hover:bg-slate-50'}`}>
    <div className="h-10 w-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-black shrink-0">{conv.client?.charAt(0)}</div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-black text-slate-800 truncate">{conv.client}</span>
      </div>
      <p className="text-[10px] text-slate-400 truncate font-medium">{conv.lastMessage}</p>
    </div>
  </div>
)

const MessageBubble = ({ msg }) => (
  <div className={`flex ${msg.senderType === 'agent' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm font-medium ${msg.senderType === 'agent' ? 'bg-emerald-500 text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'}`}>
      {msg.content}
    </div>
  </div>
)

export default DashboardPage