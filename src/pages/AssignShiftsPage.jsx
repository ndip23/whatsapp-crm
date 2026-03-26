import { useState, useMemo, useEffect } from 'react'
import { Edit, Trash2, Plus, Users, Search, Clock, Calendar, X, Check, Loader2, User } from 'lucide-react'
import { showToast } from '../utils/toast'
import { viewShifts, assignShiftAgent } from '../services/shiftService'
import { getAllUsers } from '../services/adminService'

const AssignShiftsPage = () => {
  // Data States
  const [shifts, setShifts] = useState([])
  const [agents, setAgents] = useState([])
  const [assignments, setAssignments] = useState([]) // Typically fetched from a "view-assignments" endpoint
  const [loading, setLoading] = useState(true)

  // UI States
  const [showModal, setShowModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUserDetails, setSelectedUserDetails] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Form State
  const [formData, setFormData] = useState({
    shiftId: '',
    userIds: [],
    date: new Date().toISOString().split('T')[0]
  })

  // --- 1. DATA FETCHING ---
  const fetchData = async () => {
    try {
      setLoading(true)
      const [shiftsData, agentsData] = await Promise.all([
        viewShifts(),
        getAllUsers() // Reusing your admin service to get AGENTS
      ])
      setShifts(shiftsData || [])
      setAgents(Array.isArray(agentsData) ? agentsData.filter(u => u.role === 'AGENT') : [])
      
      // Mocking assignments for now as there wasn't a "view-assignments" service provided
      // In a real scenario, you'd fetch this from the backend
      setAssignments([
        { _id: '1', shiftId: shiftsData[0]?._id, userIds: [agentsData[0]?._id], date: '2023-12-01' }
      ])
    } catch (error) {
      showToast('Failed to load shift data', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  // --- 2. FILTERING & SEARCH ---
  const filteredAssignments = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return assignments.filter(asn => {
      const shift = shifts.find(s => s._id === asn.shiftId)
      return shift?.name?.toLowerCase().includes(term) || asn.date.includes(term)
    })
  }, [assignments, searchTerm, shifts])

  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage)
  const currentItems = filteredAssignments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // --- 3. ACTIONS ---
  const toggleUserSelection = (userId) => {
    setFormData(prev => ({
      ...prev,
      userIds: prev.userIds.includes(userId)
        ? prev.userIds.filter(id => id !== userId)
        : [...prev.userIds, userId]
    }))
  }

  const handleOpenModal = (assignment = null) => {
    if (assignment) {
      setFormData({ shiftId: assignment.shiftId, userIds: assignment.userIds, date: assignment.date })
    } else {
      setFormData({ shiftId: '', userIds: [], date: new Date().toISOString().split('T')[0] })
    }
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.shiftId || formData.userIds.length === 0) {
      return showToast('Please select a shift and at least one agent', 'error')
    }

    try {
      // Loop through selected users and assign them (matching your shiftService.js logic)
      await Promise.all(formData.userIds.map(userId => 
        assignShiftAgent(userId, { shiftId: formData.shiftId, date: formData.date })
      ))
      
      showToast('Shifts assigned successfully', 'success')
      setShowModal(false)
      fetchData()
    } catch (error) {
      showToast('Assignment failed', 'error')
    }
  }

  const viewAssignedUsers = (userIds) => {
    const details = userIds.map(id => agents.find(a => a._id === id)).filter(Boolean)
    setSelectedUserDetails(details)
    setShowUserModal(true)
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
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Assign Shifts</h1>
          <p className="text-slate-500 text-sm font-medium">Schedule agents to available time slots</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95"
        >
          <Plus size={20} />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by shift name or date (YYYY-MM-DD)..." 
            className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Desktop Table / Mobile Cards */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Shift Details</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Staff Count</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentItems.map((asn) => {
                const shift = shifts.find(s => s._id === asn.shiftId)
                return (
                  <tr key={asn._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                          <Clock size={18} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{shift?.name || 'Deleted Shift'}</div>
                          <div className="text-xs text-slate-400 font-medium">{shift?.startTime} - {shift?.endTime}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-slate-300" />
                        {asn.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => viewAssignedUsers(asn.userIds)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-lg text-xs font-bold transition-all"
                      >
                        <Users size={14} />
                        {asn.userIds?.length || 0} Agents
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(asn)} className="p-2 text-slate-300 hover:text-emerald-500 transition-colors"><Edit size={18}/></button>
                        <button className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-slate-50">
          {currentItems.map(asn => {
             const shift = shifts.find(s => s._id === asn.shiftId)
             return (
               <div key={asn._id} className="p-4 space-y-3">
                 <div className="flex justify-between items-start">
                    <div className="font-bold text-slate-800">{shift?.name}</div>
                    <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{asn.date}</div>
                 </div>
                 <div className="flex items-center justify-between">
                    <button onClick={() => viewAssignedUsers(asn.userIds)} className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Users size={14}/> {asn.userIds?.length} Agents assigned
                    </button>
                    <div className="flex gap-2">
                      <Edit size={18} className="text-slate-400" onClick={() => handleOpenModal(asn)}/>
                      <Trash2 size={18} className="text-red-400"/>
                    </div>
                 </div>
               </div>
             )
          })}
        </div>
      </div>

      {/* ASSIGNMENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800">Assign Work Shift</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Shift Template</label>
                  <select 
                    className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500/20"
                    value={formData.shiftId}
                    onChange={e => setFormData({...formData, shiftId: e.target.value})}
                  >
                    <option value="">Select a shift...</option>
                    {shifts.map(s => <option key={s._id} value={s._id}>{s.name} ({s.startTime}-{s.endTime})</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Shift Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500/20"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Select Agents ({formData.userIds.length})</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2">
                  {agents.map(agent => (
                    <div 
                      key={agent._id}
                      onClick={() => toggleUserSelection(agent._id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.userIds.includes(agent._id) ? 'border-emerald-500 bg-emerald-50' : 'border-slate-50 bg-slate-50 hover:border-slate-200'}`}
                    >
                      <div className={`p-2 rounded-lg ${formData.userIds.includes(agent._id) ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        <User size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-slate-800 truncate">{agent.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">{agent.role}</div>
                      </div>
                      {formData.userIds.includes(agent._id) && <Check size={16} className="text-emerald-600" />}
                    </div>
                  ))}
                </div>
              </div>
            </form>

            <div className="p-6 bg-slate-50 rounded-b-3xl flex gap-3">
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-sm font-bold text-slate-400">Cancel</button>
              <button onClick={handleSubmit} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 transition-all">Confirm Assignment</button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW USERS MODAL */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black text-slate-800">Assigned Agents</h3>
              <button onClick={() => setShowUserModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
            </div>
            <div className="space-y-3">
              {selectedUserDetails.map(user => (
                <div key={user._id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
                  <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                    {user.name?.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{user.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{user.email}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowUserModal(false)} className="w-full mt-6 bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-xl text-sm font-bold transition-all">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssignShiftsPage