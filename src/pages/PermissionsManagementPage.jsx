import { useState, useMemo, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, X, Search, ShieldCheck, Loader2, AlertTriangle } from 'lucide-react'
import { showToast } from '../utils/toast'
import { getAllPermissions, createPermission, updatePermission, deletePermission } from '../services/permissionService'

const PermissionsManagementPage = () => {
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(true)
  
  // UI States
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [permissionToDelete, setPermissionToDelete] = useState(null)
  const [editingPermission, setEditingPermission] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Form State
  const [formData, setFormData] = useState({ name: '', description: '' })

  // --- 1. DATA FETCHING ---
  const fetchPermissions = async () => {
    try {
      setLoading(true)
      const data = await getAllPermissions()
      setPermissions(data)
    } catch (error) {
      showToast('Failed to load permissions', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPermissions() }, [])

  // --- 2. FILTERING ---
  const filteredPermissions = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return permissions.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term)
    )
  }, [permissions, searchTerm])

  // --- 3. CRUD ACTIONS ---
  const handleOpenModal = (p = null) => {
    if (p) {
      setEditingPermission(p)
      setFormData({ name: p.name, description: p.description })
    } else {
      setEditingPermission(null)
      setFormData({ name: '', description: '' })
    }
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingPermission) {
        await updatePermission(editingPermission._id, formData)
        showToast('Permission updated', 'success')
      } else {
        await createPermission(formData)
        showToast('Permission created', 'success')
      }
      setShowModal(false)
      fetchPermissions()
    } catch (error) {
      showToast('Action failed', 'error')
    }
  }

  const handleDelete = async () => {
    try {
      await deletePermission(permissionToDelete._id)
      showToast('Permission removed', 'success')
      setShowDeleteConfirm(false)
      fetchPermissions()
    } catch (error) {
      showToast('Delete failed', 'error')
    }
  }

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <ShieldCheck size={28} className="text-emerald-500" />
            System Permissions
          </h1>
          <p className="text-slate-500 text-sm font-medium">Define access levels for dashboard features</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-slate-200"
        >
          <Plus size={18} />
          <span>New Permission</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
        <input 
          type="text" 
          placeholder="Filter by name or description..." 
          className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-slate-600 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid Table */}
      <div className="bg-white rounded-[2rem] border border-slate-50 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-50">
            <tr>
              <th className="px-8 py-5">Permission Module</th>
              <th className="px-8 py-5">Description</th>
              <th className="px-8 py-5 text-right">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredPermissions.map((p) => (
              <tr key={p._id} className="group hover:bg-emerald-50/30 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                    <span className="font-black text-slate-700 text-sm">{p.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                  {p.description || <span className="text-slate-300 italic">No description provided</span>}
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(p)} className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all">
                      <Edit size={16}/>
                    </button>
                    <button onClick={() => { setPermissionToDelete(p); setShowDeleteConfirm(true); }} className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all">
                      <Trash2 size={16}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPermissions.length === 0 && (
          <div className="p-20 text-center space-y-2">
            <ShieldCheck size={48} className="mx-auto text-slate-100" />
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No permissions found</p>
          </div>
        )}
      </div>

      {/* CREATE/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-slate-800">{editingPermission ? 'Edit Security Rule' : 'New Security Rule'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">System Name</label>
                <input 
                  required type="text" placeholder="e.g. USER_WRITE_ACCESS"
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Rule Description</label>
                <textarea 
                  placeholder="Describe what this permission allows..."
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none h-32 resize-none"
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 text-sm font-black text-slate-400 hover:text-slate-600 transition-colors">Discard</button>
                <button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl py-4 text-sm font-black shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2">
                  <Save size={18}/> {editingPermission ? 'Update Rule' : 'Save Rule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-10 text-center shadow-2xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-500 shadow-inner">
              <AlertTriangle size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Delete Rule?</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">Removing <span className="font-black text-slate-800">"{permissionToDelete?.name}"</span> might break access for several roles.</p>
            <div className="flex flex-col gap-3">
              <button onClick={handleDelete} className="w-full bg-red-500 hover:bg-red-600 text-white rounded-2xl py-4 text-sm font-black transition-all shadow-lg shadow-red-100">Yes, Remove Rule</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="w-full py-2 text-xs font-black text-slate-400 uppercase tracking-widest">Cancel Action</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PermissionsManagementPage