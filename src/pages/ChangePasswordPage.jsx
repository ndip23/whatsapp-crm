import { useState } from 'react'
import { Eye, EyeOff, Lock, ShieldCheck, KeyRound, Loader2 } from 'lucide-react'
import { showToast } from '../utils/toast'
// import { changePassword } from '../services/authService' // Assuming this service exists

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const toggleVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.currentPassword) newErrors.currentPassword = 'Required'
    if (!formData.newPassword) {
      newErrors.newPassword = 'Required'
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Must be at least 8 characters'
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      setIsSubmitting(true)
      // Logic for backend call would go here:
      // await changePassword(formData) 
      
      showToast('Password updated successfully', 'success')
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      showToast(err.message || 'Failed to update password', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Security Settings</h1>
        <p className="text-slate-500 text-sm font-medium">Keep your account safe by updating your password regularly</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left side: Requirements info */}
        <div className="space-y-4">
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <h4 className="text-xs font-black uppercase text-emerald-700 tracking-widest mb-3 flex items-center gap-2">
              <ShieldCheck size={14} /> Requirements
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <div className="h-1 w-1 rounded-full bg-emerald-500" /> At least 8 characters
              </li>
              <li className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <div className="h-1 w-1 rounded-full bg-emerald-500" /> Must match confirmation
              </li>
              <li className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <div className="h-1 w-1 rounded-full bg-slate-300" /> Mix of letters & numbers
              </li>
            </ul>
          </div>
        </div>

        {/* Right side: The Form */}
        <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Current Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Current Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type={showPasswords.current ? 'text' : 'password'}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-12 text-sm focus:ring-2 transition-all ${errors.currentPassword ? 'ring-2 ring-red-100' : 'focus:ring-emerald-500/20'}`}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => toggleVisibility('current')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                >
                  {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.currentPassword && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.currentPassword}</p>}
            </div>

            <hr className="border-slate-50" />

            {/* New Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">New Password</label>
              <div className="relative group">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type={showPasswords.new ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-12 text-sm focus:ring-2 transition-all ${errors.newPassword ? 'ring-2 ring-red-100' : 'focus:ring-emerald-500/20'}`}
                  placeholder="Create new password"
                />
                <button 
                  type="button"
                  onClick={() => toggleVisibility('new')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.newPassword}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Confirm New Password</label>
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type={showPasswords.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-12 text-sm focus:ring-2 transition-all ${errors.confirmPassword ? 'ring-2 ring-red-100' : 'focus:ring-emerald-500/20'}`}
                  placeholder="Repeat new password"
                />
                <button 
                  type="button"
                  onClick={() => toggleVisibility('confirm')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                >
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 text-white rounded-2xl py-4 text-sm font-black shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Update Account Password'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPage