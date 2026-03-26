import { useState } from 'react'
import { 
  Shield, Lock, UserX, Eye, Bell, 
  CheckCircle2, ChevronRight, UserCircle, 
  History, Users, Loader2, Save 
} from 'lucide-react'
import { showToast } from '../utils/toast'

const PrivacyPage = () => {
  const [activeSection, setActiveSection] = useState('privacy')
  const [isSaving, setIsSaving] = useState(false)
  
  const [settings, setSettings] = useState({
    profilePhoto: 'contacts',
    about: 'everyone',
    status: 'contacts',
    readReceipts: true,
    lastSeen: false,
    twoFactor: false,
    loginNotifications: true,
    blockedContacts: [] // Real data would come from backend
  })

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API Call
    setTimeout(() => {
      setIsSaving(false)
      showToast('Privacy preferences updated', 'success')
    }, 1000)
  }

  const sections = [
    { id: 'privacy', label: 'Privacy', icon: <Eye size={18}/> },
    { id: 'security', label: 'Security', icon: <Shield size={18}/> },
    { id: 'blocked', label: 'Blocked', icon: <UserX size={18}/> },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4 md:p-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Account Preferences</h1>
          <p className="text-slate-500 text-sm font-medium">Control your visibility and security settings</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-emerald-100 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20}/> : <><Save size={18}/> Save Changes</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDE NAV */}
        <div className="lg:col-span-1 space-y-2">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeSection === s.id ? 'bg-white text-emerald-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-10 space-y-10">
          
          {activeSection === 'privacy' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-6">
                <Header title="Personal Visibility" subtitle="Control who sees your WhatsApp-linked profile data." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <DropdownSetting label="Profile Photo" val={settings.profilePhoto} 
                     onChange={v => setSettings({...settings, profilePhoto: v})} 
                     icon={<UserCircle className="text-emerald-500"/>} />
                   <DropdownSetting label="About Info" val={settings.about} 
                     onChange={v => setSettings({...settings, about: v})} 
                     icon={<CheckCircle2 className="text-blue-500"/>} />
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-50">
                <Header title="Interaction Rules" subtitle="Manage receipts and activity tracking." />
                <ToggleSetting 
                  title="Read Receipts" 
                  desc="If turned off, you won't send or receive blue checks."
                  active={settings.readReceipts}
                  onClick={() => toggleSetting('readReceipts')}
                />
                <ToggleSetting 
                  title="Last Seen" 
                  desc="Hide your last active timestamp from other team members."
                  active={settings.lastSeen}
                  onClick={() => toggleSetting('lastSeen')}
                />
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               <Header title="Identity Protection" subtitle="Add extra layers of protection to your dashboard account." />
               <ToggleSetting 
                  title="Two-Step Verification" 
                  desc="Require a secure PIN when logging in from a new browser."
                  active={settings.twoFactor}
                  onClick={() => toggleSetting('twoFactor')}
                />
                <ToggleSetting 
                  title="Login Notifications" 
                  desc="Receive an email whenever your account is accessed."
                  active={settings.loginNotifications}
                  onClick={() => toggleSetting('loginNotifications')}
                />
                
                <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4">
                   <div className="flex items-center gap-3">
                      <Lock className="text-emerald-400" size={20}/>
                      <h4 className="text-sm font-black uppercase tracking-widest">Advanced Encryption</h4>
                   </div>
                   <p className="text-xs text-slate-400 font-medium leading-relaxed">
                     All WhatsApp messages and client data are encrypted using AES-256 standards before being stored in our database.
                   </p>
                </div>
            </div>
          )}

          {activeSection === 'blocked' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               <Header title="Blacklist" subtitle="Users in this list cannot initiate conversations with you." />
               
               {settings.blockedContacts.length === 0 ? (
                 <div className="py-20 text-center space-y-4 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                    <UserX className="mx-auto text-slate-200" size={48} />
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">No blocked contacts</p>
                 </div>
               ) : (
                 <div className="space-y-3">
                   {settings.blockedContacts.map((c, i) => (
                     <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 bg-slate-200 rounded-full" />
                           <span className="font-bold text-slate-700">{c}</span>
                        </div>
                        <button className="text-xs font-black text-red-500 uppercase tracking-tighter hover:underline">Unblock</button>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

// --- REUSABLE COMPONENTS ---

const Header = ({ title, subtitle }) => (
  <div className="space-y-1">
    <h3 className="text-xl font-black text-slate-800 tracking-tight">{title}</h3>
    <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">{subtitle}</p>
  </div>
)

const DropdownSetting = ({ label, val, onChange, icon }) => (
  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-3">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</span>
    </div>
    <select 
      value={val}
      onChange={e => onChange(e.target.value)}
      className="bg-transparent border-none text-sm font-bold text-slate-700 focus:ring-0 cursor-pointer outline-none"
    >
      <option value="everyone">Everyone</option>
      <option value="contacts">My Contacts Only</option>
      <option value="nobody">Private (Nobody)</option>
    </select>
  </div>
)

const ToggleSetting = ({ title, desc, active, onClick }) => (
  <div className="flex items-center justify-between gap-6 group cursor-pointer" onClick={onClick}>
    <div className="flex-1">
      <h4 className="text-sm font-black text-slate-700 transition-colors group-hover:text-emerald-600">{title}</h4>
      <p className="text-xs text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
    <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
       <div className={`absolute top-1 bg-white h-4 w-4 rounded-full transition-all duration-300 shadow-sm ${active ? 'left-7' : 'left-1'}`} />
    </div>
  </div>
)

export default PrivacyPage