import { useState, useMemo, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, X, Search, Shield, User, Loader2, AlertTriangle, ChevronRight, CheckCircle2 } from 'lucide-react'
import { showToast } from '../utils/toast'
import { getAllRoles, createRole, updateRole, deleteRole } from '../services/roleService'
import { getAllPermissions } from '../services/permissionService'
import { getAllUsers } from '../services/adminService'

const RoleManagementPage = () => {
  const [roles, setRoles] = useState([])
  const [availablePermissions, setAvailablePermissions] = useState([])
  const [availableUsers, setAvailableUsers] = useState([])
  const [loading, setLoading] = useState(true)
  
  // UI States
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState(null)
  const [editingRole, setEditingRole] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Form State
  const [formData, setFormData] = useState({ name: '', description: '', permissions: [], users: [] })

  // --- 1. DATA FETCHING ---
  const fetchData = async () => {
    try {
      setLoading(true)
      const [rData, pData, uData] = await Promise.all([
        getAllRoles(),
        getAllPermissions(),
        getAllUsers()
      ])
      setRoles(rData)
      setAvailablePermissions(pData)
      setAvailableUsers(uData)
    } catch (error) {
      showToast('Failed to sync management data', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  // --- 2. FILTERING ---
  const filteredRoles = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return roles.filter(r => 
      r.name.toLowerCase().includes(term) || r.description?.toLowerCase().includes(term)
    )
  }, [roles, searchTerm])

  // --- 3. ACTIONS ---
  const handleOpenModal = (role = null) => {
    if (role) {
      setEditingRole(role)
      setFormData({ 
        name: role.name, 
        description: role.description, 
        permissions: role.permissions.map(p => p._id), 
        users: role.users.map(u => u._id) 
      })
    } else {
      setEditingRole(null)
      setFormData({ name: '', description: '', permissions: [], users: [] })
    }
    setShowModal(true)
  }

  const toggleItem = (listName, id) => {
    setFormData(prev => ({
      ...prev,
      [listName]: prev[listName].includes(id) 
        ? prev[listName].filter(item => item !== id) 
        : [...prev[listName], id]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingRole) {
        await updateRole(editingRole._id, formData)
        showToast('Role updated', 'success')
      } else {
        await createRole(formData)
        showToast('New role defined', 'success')
      }
      setShowModal(false)
      fetchData()
    } catch (error) {
      showToast('Operation failed', 'error')
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
            <Shield size={28} className="text-emerald-500" />
            Access Roles
          </h1>
          <p className="text-slate-500 text-sm font-medium">Group permissions into usable staff roles</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95"
        >
          <Plus size={18} />
          <span>Create New Role</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
        <input 
          type="text" 
          placeholder="Search by role name..." 
          className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <div key={role._id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="h-12 w-12 bg-slate-50 text-emerald-500 rounded-2xl flex items-center justify-center shadow-inner">
                <Shield size={24} />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleOpenModal(role)} className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"><Edit size={16}/></button>
                <button onClick={() => { setRoleToDelete(role); setShowDeleteConfirm(true); }} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16}/></button>
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-800 mb-2">{role.name}</h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6 line-clamp-2 italic">
              "{role.description || 'No description provided for this role.'}"
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-50">
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Permissions</span>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{role.permissions?.length || 0}</span>
               </div>
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Assigned Staff</span>
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{role.users?.length || 0}</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-800">{editingRole ? 'Update Role' : 'Define New Role'}</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Configuration Panel</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  
                  {/* Left: General Info */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Role Identifier</label>
                       <input 
                         className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none"
                         placeholder="e.g. Senior Support"
                         value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Role Mission Statement</label>
                       <textarea 
                         className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none h-32 resize-none"
                         placeholder="What does this role achieve?"
                         value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                       />
                    </div>

                    <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
                       <h4 className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-4 flex items-center gap-2"><CheckCircle2 size={14}/> Selected Metrics</h4>
                       <div className="flex gap-6">
                          <div>
                            <div className="text-2xl font-black">{formData.permissions.length}</div>
                            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Rights</div>
                          </div>
                          <div className="w-px bg-white/10" />
                          <div>
                            <div className="text-2xl font-black">{formData.users.length}</div>
                            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Members</div>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Right: Multi-Select Lists */}
                  <div className="space-y-8">
                     <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Select Permissions</h4>
                        <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                           {availablePermissions.map(p => (
                             <button 
                               key={p._id} type="button"
                               onClick={() => toggleItem('permissions', p._id)}
                               className={`text-left p-3 rounded-xl text-xs font-bold transition-all border-2 ${formData.permissions.includes(p._id) ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-50 bg-slate-50 text-slate-500 hover:border-slate-200'}`}
                             >
                               {p.name}
                             </button>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Assign Active Staff</h4>
                        <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                           {availableUsers.map(u => (
                             <button 
                               key={u._id} type="button"
                               onClick={() => toggleItem('users', u._id)}
                               className={`flex items-center gap-3 p-3 rounded-xl transition-all border-2 ${formData.users.includes(u._id) ? 'border-blue-500 bg-blue-50' : 'border-slate-50 bg-slate-50 hover:border-slate-200'}`}
                             >
                               <div className="h-6 w-6 rounded-lg bg-white flex items-center justify-center text-[10px] font-black shadow-sm">{u.name.charAt(0)}</div>
                               <span className={`text-xs font-bold ${formData.users.includes(u._id) ? 'text-blue-700' : 'text-slate-500'}`}>{u.name}</span>
                             </button>
                           ))}
                        </div>
                     </div>
                  </div>

               </div>
            </div>

            <div className="p-8 bg-slate-50 flex gap-4">
               <button type="button" onClick={() => setShowModal(false)} className="px-8 py-4 text-sm font-black text-slate-400">Discard</button>
               <button onClick={handleSubmit} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl text-sm font-black shadow-lg shadow-emerald-100 transition-all active:scale-95">
                 Save Role Configuration
               </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-10 text-center shadow-2xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-500">
              <AlertTriangle size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Delete this Role?</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed italic">"Removing this will unassign {roleToDelete?.users.length} staff members instantly."</p>
            <div className="flex flex-col gap-3">
              <button onClick={async () => { await deleteRole(roleToDelete._id); setShowDeleteConfirm(false); fetchData(); }} className="w-full bg-red-500 hover:bg-red-600 text-white rounded-2xl py-4 text-sm font-black transition-all">Destroy Role</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="w-full py-2 text-xs font-black text-slate-400 uppercase tracking-widest">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoleManagementPage