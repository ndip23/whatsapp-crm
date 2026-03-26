import { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { showToast } from '../utils/toast'
import { User, Mail, Shield, Briefcase, Camera, Save, X, Loader2, Phone } from 'lucide-react'

const ProfilePage = () => {
  const { currentUser } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  // Initialize form with backend user data or fallback
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phoneNumber: '',
    department: 'Operations'
  })

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        role: currentUser.role || '',
        phoneNumber: currentUser.phoneNumber || '+1 (555) 000-0000',
        department: 'Operations'
      })
    }
  }, [currentUser])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simulate API update
    setTimeout(() => {
      showToast('Profile updated successfully!', 'success')
      setIsSaving(false)
      setIsEditing(false)
    }, 1000)
  }

  if (!currentUser) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4 md:p-6 pb-20">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="h-24 w-24 md:h-32 md:w-32 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center text-4xl font-black shadow-2xl shadow-emerald-200 transition-transform group-hover:scale-105">
              {formData.name?.charAt(0) || 'U'}
            </div>
            {isEditing && (
              <button className="absolute -bottom-2 -right-2 p-3 bg-white text-emerald-600 rounded-2xl shadow-xl border border-emerald-50 hover:bg-emerald-50 transition-all">
                <Camera size={20} />
              </button>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">{formData.name}</h1>
            <p className="text-emerald-600 font-black text-xs uppercase tracking-widest mt-1 flex items-center gap-2">
              <Shield size={14} /> {formData.role} ACCESS
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-xl shadow-slate-200"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 text-sm font-black text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSaving}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-xl shadow-emerald-100 flex items-center gap-2"
            >
              {isSaving ? <Loader2 className="animate-spin" size={18}/> : <><Save size={18}/> Save Changes</>}
            </button>
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info Card */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-10">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <ProfileField 
              label="Full Display Name" 
              name="name"
              icon={<User size={18}/>}
              value={formData.name} 
              isEditing={isEditing} 
              onChange={handleInputChange} 
            />

            <ProfileField 
              label="Email Address" 
              name="email"
              icon={<Mail size={18}/>}
              value={formData.email} 
              isEditing={isEditing} 
              onChange={handleInputChange} 
              type="email"
            />

            <ProfileField 
              label="Phone Number" 
              name="phoneNumber"
              icon={<Phone size={18}/>}
              value={formData.phoneNumber} 
              isEditing={isEditing} 
              onChange={handleInputChange} 
            />

            <ProfileField 
              label="Department" 
              name="department"
              icon={<Briefcase size={18}/>}
              value={formData.department} 
              isEditing={isEditing} 
              onChange={handleInputChange} 
            />

          </form>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl shadow-slate-200">
             <h4 className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-4">Security Status</h4>
             <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                   <span className="text-xs font-bold text-slate-400">Account Type</span>
                   <span className="text-xs font-black uppercase tracking-widest bg-white/10 px-2 py-1 rounded">PRO</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                   <span className="text-xs font-bold text-slate-400">WhatsApp Sync</span>
                   <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Active</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-xs font-bold text-slate-400">Last Password Change</span>
                   <span className="text-xs font-bold text-slate-200">3 months ago</span>
                </div>
             </div>
          </div>

          <div className="bg-emerald-50 rounded-[2rem] p-8 border border-emerald-100">
             <h4 className="text-[10px] font-black uppercase text-emerald-700 tracking-[0.2em] mb-4">Quick Tip</h4>
             <p className="text-xs font-medium text-emerald-800 leading-relaxed">
               Updating your profile name will change how clients see your name when you respond on WhatsApp.
             </p>
          </div>
        </div>

      </div>
    </div>
  )
}

// --- SUB-COMPONENT: FIELD ---
const ProfileField = ({ label, name, value, isEditing, onChange, icon, type="text" }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{label}</label>
    <div className={`relative group flex items-center transition-all ${isEditing ? 'bg-slate-50 rounded-2xl ring-2 ring-transparent focus-within:ring-emerald-500/20' : ''}`}>
      <div className={`absolute left-4 ${isEditing ? 'text-slate-300 group-focus-within:text-emerald-500' : 'text-emerald-500'} transition-colors`}>
        {icon}
      </div>
      {isEditing ? (
        <input 
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-none py-4 pl-12 pr-4 text-sm font-bold text-slate-700 outline-none"
        />
      ) : (
        <div className="py-4 pl-12 pr-4 text-sm font-black text-slate-800 tracking-tight">
          {value || <span className="text-slate-300 italic font-medium">Not specified</span>}
        </div>
      )}
    </div>
  </div>
)

export default ProfilePage