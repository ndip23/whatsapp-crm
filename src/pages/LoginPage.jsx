import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Loader2, MessageCircle, ArrowRight } from 'lucide-react'
import { showToast } from '../utils/toast'
import { login } from '../services/authService'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await login({ email, password })
      if (response) {
        showToast('Access Granted', 'success')
        setTimeout(() => navigate('/dashboard'), 600)
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Authentication failed'
      showToast(msg, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-slate-100 flex items-center justify-center p-4 selection:bg-emerald-100 selection:text-emerald-900">
      
      <div className="w-full max-w-[440px] bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-500/10 p-10 md:p-12 border border-white relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 h-48 w-48 bg-emerald-100 rounded-full blur-3xl opacity-50" />

        {/* Brand Identity */}
        <div className="flex flex-col items-center mb-10 relative z-10">
          <div className="h-16 w-16 bg-emerald-500 text-white rounded-[1.25rem] flex items-center justify-center shadow-xl shadow-emerald-200 mb-6 group transition-transform hover:scale-105">
            <MessageCircle size={32} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Central Management System</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                type="email" required placeholder="name@company.com"
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Password</label>
              <Link to="/forgot-password" size={18} className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-tighter transition-colors">Forgot?</Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} required placeholder="••••••••"
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-1">
            <input type="checkbox" id="remember" className="h-4 w-4 rounded-md border-slate-200 text-emerald-500 focus:ring-emerald-500" />
            <label htmlFor="remember" className="text-xs font-bold text-slate-500 select-none">Keep me signed in</label>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl py-4 text-sm font-black shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:bg-slate-200 disabled:shadow-none"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20}/> : <>Sign Into Dashboard <ArrowRight size={18}/></>}
          </button>

        </form>

        {/* Footer */}
        <div className="mt-12 text-center relative z-10">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Secure Gateway v1.0</p>
        </div>

      </div>
    </div>
  )
}

export default LoginPage