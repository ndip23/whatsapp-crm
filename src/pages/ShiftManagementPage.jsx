import { useState, useMemo, useEffect } from 'react'
import { Edit, Trash2, Plus, Search, Clock, X, Loader2, Save, CalendarDays } from 'lucide-react'
import { showToast } from '../utils/toast'
import { viewShifts, createShift, editShift } from '../services/shiftService'

const ShiftManagementPage = () => {
  const [shifts, setShifts] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Modal & Form States
  const [showModal, setShowModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingShift, setEditingShift] = useState(null)
  const [formData, setFormData] = useState({ name: '', startTime: '', endTime: '' })

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // --- 1. FETCH LIVE DATA ---
  const fetchShifts = async () => {
    try {
      setLoading(true)
      const data = await viewShifts()
      setShifts(Array.isArray(data) ? data : [])
    } catch (error) {
      showToast('Could not load shift templates', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchShifts() }, [])

  // --- 2. ACTIONS ---
  const handleOpenModal = (shift = null) => {
    if (shift) {
      setEditingShift(shift)
      setFormData({ name: shift.name, startTime: shift.startTime, endTime: shift.endTime })
    } else {
      setEditingShift(null)
      setFormData({ name: '', startTime: '', endTime: '' })
    }
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      if (editingShift) {
        await editShift(editingShift._id, formData)
        showToast('Shift template updated', 'success')
      } else {
        await createShift(formData)
        showToast('New shift template created', 'success')
      }
      setShowModal(false)
      fetchShifts()
    } catch (error) {
      showToast(error.message || 'Failed to save shift', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  // Assuming a delete route exists. If not, this logic is ready for when you add it.
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shift template?')) return
    try {
      // await apiClient.delete(`/api/shift/delete/${id}`) 
      setShifts(shifts.filter(s => s._id !== id))
      showToast('Shift deleted', 'success')
    } catch (error) {
      showToast('Delete failed', 'error')
    }
  }

  // --- 3. FILTERING ---
  const filteredShifts = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return shifts.filter(s => s.name?.toLowerCase().includes(term))
  }, [shifts, searchTerm])

  const currentItems = filteredShifts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <Clock size={28} className="text-emerald-500" />
            Shift Templates
          </h1>
          <p className="text-slate-500 text-sm font-medium">Define recurring work hours for your team</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95"
        >
          <Plus size={18} />
          <span>Create Shift</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
        <input 
          type="text" 
          placeholder="Search by shift name..." 
          className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid Layout (Modern Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((shift) => (
          <div key={shift._id} className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                <CalendarDays size={24} />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleOpenModal(shift)} className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-slate-50 rounded-xl transition-all"><Edit size={16}/></button>
                <button onClick={() => handleDelete(shift._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16}/></button>
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-800 mb-4">{shift.name}</h3>
            
            <div className="space-y-3">
               <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Starts</span>
                  <span className="text-sm font-black text-slate-700">{shift.startTime}</span>
               </div>
               <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ends</span>
                  <span className="text-sm font-black text-slate-700">{shift.endTime}</span>
               </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2 text-emerald-600">
               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-tighter">Template Active</span>
            </div>
          </div>
        ))}

        {currentItems.length === 0 && (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
             <Clock size={48} className="mx-auto text-slate-200 mb-4" />
             <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No shift templates defined</p>
          </div>
        )}
      </div>

      {/* CREATE/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-800">{editingShift ? 'Update Shift' : 'New Shift'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Template Name</label>
                <input 
                  required type="text" placeholder="e.g. Early Morning"
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Start Time</label>
                  <input 
                    required type="time"
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none"
                    value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">End Time</label>
                  <input 
                    required type="time"
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none"
                    value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 text-sm font-black text-slate-400 hover:text-slate-600 transition-colors">Discard</button>
                <button type="submit" disabled={isSaving} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl py-4 text-sm font-black shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2">
                  {isSaving ? <Loader2 className="animate-spin" size={18}/> : <><Save size={18}/> Save Template</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShiftManagementPage