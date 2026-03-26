import { useState, useMemo, useEffect } from 'react'
import { Edit, Trash2, UserPlus, Search, Shield, Loader2, X, AlertTriangle } from 'lucide-react'
import { showToast } from '../utils/toast'
import { getAllUsers, deleteUser, updateUser, createUser } from '../services/adminService'

const AdminManagementPage = () => {
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('users') // 'users' or 'admins'
  
  // Modal States
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [editingUser, setEditingUser] = useState(null)

  // Form State (Matches your User.js Model)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '' // Only for new users
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // --- 1. BACKEND INTEGRATION ---
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await getAllUsers()
      setAllUsers(data)
    } catch (error) {
      showToast('Connection to backend failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  // --- 2. LOGIC & FILTERING ---
  const filteredByTab = useMemo(() => {
      if (!Array.isArray(allUsers)) return [];
    return activeTab === 'users' 
      ? allUsers.filter(u => u.role === 'AGENT')
      : allUsers.filter(u => u.role === 'ADMIN' || u.role === 'SUPER_ADMIN')
  }, [allUsers, activeTab])

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return filteredByTab.filter(u => 
      u.name?.toLowerCase().includes(term) || u.email?.toLowerCase().includes(term)
    )
  }, [filteredByTab, searchTerm])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // --- 3. ACTIONS ---
  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user)
      setFormData({ name: user.name, email: user.email, role: user.role, password: '' })
    } else {
      setEditingUser(null)
      setFormData({ name: '', email: '', role: activeTab === 'users' ? 'AGENT' : 'ADMIN', password: '' })
    }
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingUser) {
        await updateUser(editingUser._id, formData)
        showToast('Update successful', 'success')
      } else {
        await createUser(formData)
        showToast('User created', 'success')
      }
      setShowModal(false)
      fetchUsers()
    } catch (error) {
      showToast(error.response?.data?.message || 'Error saving data', 'error')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteUser(userToDelete._id)
      showToast('Deleted successfully', 'success')
      setShowDeleteConfirm(false)
      fetchUsers()
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
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-xl font-bold text-gray-800">Staff Management</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-600 active:scale-95"
        >
          <UserPlus size={18} />
          <span>Add New {activeTab === 'users' ? 'Agent' : 'Admin'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('users')}
          className={`px-6 py-2 text-sm font-medium transition-all ${activeTab === 'users' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500 hover:text-emerald-500'}`}
        >
          Agents
        </button>
        <button 
          onClick={() => setActiveTab('admins')}
          className={`px-6 py-2 text-sm font-medium transition-all ${activeTab === 'admins' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500 hover:text-emerald-500'}`}
        >
          Admins & Super Admins
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search name or email..." 
          className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Modern Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Role</th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentItems.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.email}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleOpenModal(user)} className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-emerald-500">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => { setUserToDelete(user); setShowDeleteConfirm(true); }} className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-500">Showing {currentItems.length} of {filteredData.length} results</p>
        <div className="flex gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="rounded border border-gray-200 px-3 py-1 text-xs font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="rounded border border-gray-200 px-3 py-1 text-xs font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* CREATE/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">{editingUser ? 'Edit User' : 'Add User'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                <input required type="text" className="w-full rounded-lg border border-gray-200 p-2 text-sm outline-none focus:border-emerald-500" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                <input required type="email" className="w-full rounded-lg border border-gray-200 p-2 text-sm outline-none focus:border-emerald-500" 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              {!editingUser && (
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                  <input required type="password" placeholder="Min 6 characters" className="w-full rounded-lg border border-gray-200 p-2 text-sm outline-none focus:border-emerald-500" 
                    value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
              )}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Role</label>
                <select className="w-full rounded-lg border border-gray-200 p-2 text-sm outline-none focus:border-emerald-500" 
                  value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="AGENT">Agent</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800">Cancel</button>
                <button type="submit" className="rounded-lg bg-emerald-500 px-6 py-2 text-sm font-bold text-white hover:bg-emerald-600 transition-colors">Save User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle size={24} />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Are you sure?</h3>
            <p className="mb-6 text-sm text-gray-500">This will permanently delete <span className="font-bold text-gray-700">{userToDelete?.name}</span>. This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-600">Cancel</button>
              <button onClick={handleDelete} className="rounded-lg bg-red-500 px-6 py-2 text-sm font-bold text-white hover:bg-red-600 transition-all active:scale-95">Delete Forever</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminManagementPage