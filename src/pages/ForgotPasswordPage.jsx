import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ChevronLeft, ShieldCheck, Loader2, ArrowRight, MessageSquare } from 'lucide-react'
import { showToast } from '../utils/toast'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState(1) // 1: email, 2: code, 3: new password
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulation of API call
    setTimeout(() => {
      setStep(2)
      setIsSubmitting(false)
      showToast('Verification code sent!', 'success')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-500/10 p-8 md:p-10 border border-white/50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 mb-4">
            <MessageSquare size={32} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Security Recovery</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Step {step} of 3</p>
        </div>

        {/* STEP 1: EMAIL ENTRY */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="text-center">
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Enter your registered email address to receive a 6-digit recovery code.</p>
            </div>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <input 
                type="email" required placeholder="name@company.com"
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button disabled={isSubmitting} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl py-4 text-sm font-black shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50">
              {isSubmitting ? <Loader2 className="animate-spin" size={20}/> : <>Send Recovery Code <ArrowRight size={18}/></>}
            </button>
          </form>
        )}

        {/* STEP 2: CODE VERIFICATION */}
        {step === 2 && (
          <CodeVerification onBack={() => setStep(1)} onNext={() => setStep(3)} />
        )}

        {/* STEP 3: NEW PASSWORD */}
        {step === 3 && (
          <NewPassword onFinish={() => {
            showToast('Security updated!', 'success')
            navigate('/login')
          }} />
        )}

        {/* Footer Link */}
        <button 
          onClick={() => navigate('/login')}
          className="mt-8 flex items-center justify-center gap-2 w-full text-slate-400 hover:text-slate-600 text-xs font-black uppercase tracking-widest transition-colors"
        >
          <ChevronLeft size={16} /> Back to Sign In
        </button>
      </div>
    </div>
  )
}

// --- SUB-COMPONENT: 6-DIGIT CODE ---
const CodeVerification = ({ onBack, onNext }) => {
  const [code, setCode] = useState(Array(6).fill(''))
  const [timer, setTimer] = useState(60)
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]

  useEffect(() => {
    const countdown = timer > 0 && setInterval(() => setTimer(timer - 1), 1000)
    return () => clearInterval(countdown)
  }, [timer])

  const handleChange = (index, val) => {
    if (isNaN(val)) return
    const newCode = [...code]
    newCode[index] = val.substring(val.length - 1)
    setCode(newCode)
    if (val && index < 5) inputRefs[index + 1].current.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) inputRefs[index - 1].current.focus()
  }

  const handleVerify = () => {
    if (code.join('') === '123456') { // Mock validation
      showToast('Code Verified', 'success')
      onNext()
    } else {
      showToast('Invalid Code', 'error')
    }
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="text-center text-slate-500 text-sm font-medium">We've sent a code to your email.</div>
      <div className="flex justify-between gap-2">
        {code.map((digit, i) => (
          <input 
            key={i} ref={inputRefs[i]} type="text" maxLength="1" 
            className="w-12 h-14 bg-slate-50 border-none rounded-xl text-center text-xl font-black text-emerald-600 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all"
            value={digit} onChange={(e) => handleChange(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)}
          />
        ))}
      </div>
      <button onClick={handleVerify} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl py-4 text-sm font-black shadow-lg shadow-emerald-100 transition-all">
        Verify Identity
      </button>
      <div className="text-center">
        {timer > 0 ? (
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Resend available in {timer}s</p>
        ) : (
          <button onClick={() => setTimer(60)} className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:text-emerald-600">Resend New Code</button>
        )}
      </div>
    </div>
  )
}

// --- SUB-COMPONENT: NEW PASSWORD ---
const NewPassword = ({ onFinish }) => {
  const [show, setShow] = useState(false)
  const [pass, setPass] = useState({ p1: '', p2: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pass.p1.length < 8) return showToast('Password too short', 'error')
    if (pass.p1 !== pass.p2) return showToast('Passwords mismatch', 'error')
    onFinish()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-right-4 duration-300">
       <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500" size={20} />
          <input 
            type={show ? 'text' : 'password'} required placeholder="New Password"
            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
            value={pass.p1} onChange={(e) => setPass({...pass, p1: e.target.value})}
          />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
            {show ? <EyeOff size={18}/> : <Eye size={18}/>}
          </button>
       </div>
       <div className="relative group">
          <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500" size={20} />
          <input 
            type={show ? 'text' : 'password'} required placeholder="Confirm Password"
            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
            value={pass.p2} onChange={(e) => setPass({...pass, p2: e.target.value})}
          />
       </div>
       <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl py-4 text-sm font-black shadow-lg shadow-emerald-100 transition-all active:scale-95">
         Update Password & Login
       </button>
    </form>
  )
}

export default ForgotPasswordPage