import { useState } from 'react'
import { 
  Bell, Shield, Monitor, MessageSquare, 
  Download, Globe, Moon, Save, 
  Loader2, Smartphone, Mail, MessageCircle 
} from 'lucide-react'
import { showToast } from '../utils/toast'

const SettingsPage = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    notifications: { email: true, push: true, sms: false },
    privacy: { profileVisibility: 'contacts', lastSeen: true, readReceipts: true },
    appearance: { theme: 'light', language: 'english' },
    chat: { 
      enterToSend: true, 
      mediaVisibility: true, 
      autoDownload: { images: true, videos: false, docs: false } 
    }
  })

  const toggle = (path) => {
    const keys = path.split('.')
    setSettings(prev => {
      const newSettings = { ...prev }
      let current = newSettings
      for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]]
      current[keys[keys.length - 1]] = !current[keys[keys.length - 1]]
      return newSettings
    })
  }

  const update = (path, val) => {
    const keys = path.split('.')
    setSettings(prev => {
      const newSettings = { ...prev }
      let current = newSettings
      for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]]
      current[keys[keys.length - 1]] = val
      return newSettings
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      showToast('Configuration synced successfully', 'success')
    }, 1000)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-6 pb-20 text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">System Configuration</h1>
          <p className="text-slate-500 text-sm font-medium">Global preferences for your dashboard experience</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-xl shadow-emerald-100 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20}/> : <><Save size={18}/> Sync Changes</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. NOTIFICATIONS CARD */}
        <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 space-y-6">
          <SectionHeader icon={<Bell className="text-blue-500"/>} title="Notifications" subtitle="Stay updated on client activity" />
          <div className="space-y-6">
            <ToggleRow 
              title="Email Alerts" desc="Send daily summaries to your inbox" 
              active={settings.notifications.email} onClick={() => toggle('notifications.email')} 
              icon={<Mail size={16}/>}
            />
            <ToggleRow 
              title="Push Notifications" desc="Browser alerts for incoming WhatsApp messages" 
              active={settings.notifications.push} onClick={() => toggle('notifications.push')} 
              icon={<Smartphone size={16}/>}
            />
            <ToggleRow 
              title="SMS Critical Alerts" desc="SMS for system outages or escalations" 
              active={settings.notifications.sms} onClick={() => toggle('notifications.sms')} 
              icon={<MessageCircle size={16}/>}
            />
          </div>
        </section>

        {/* 2. CHAT & MEDIA CARD */}
        <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 space-y-6">
          <SectionHeader icon={<MessageSquare className="text-emerald-500"/>} title="Chat Settings" subtitle="WhatsApp interaction behavior" />
          <div className="space-y-6">
            <ToggleRow 
              title="Enter to Send" desc="Send message immediately upon hitting Enter" 
              active={settings.chat.enterToSend} onClick={() => toggle('chat.enterToSend')} 
            />
            <div className="pt-4 border-t border-slate-50 space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Auto-Download Media</h4>
              <div className="flex flex-wrap gap-2">
                <FilterChip label="Images" active={settings.chat.autoDownload.images} onClick={() => toggle('chat.autoDownload.images')} />
                <FilterChip label="Videos" active={settings.chat.autoDownload.videos} onClick={() => toggle('chat.autoDownload.videos')} />
                <FilterChip label="Docs" active={settings.chat.autoDownload.docs} onClick={() => toggle('chat.autoDownload.docs')} />
              </div>
            </div>
          </div>
        </section>

        {/* 3. APPEARANCE & LOCALIZATION */}
        <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 space-y-6">
          <SectionHeader icon={<Monitor className="text-purple-500"/>} title="Appearance" subtitle="Customize your workspace UI" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <SelectBox 
                label="Visual Theme" icon={<Moon size={14}/>} 
                val={settings.appearance.theme} onChange={v => update('appearance.theme', v)}
                options={[{l: 'Light Mode', v: 'light'}, {l: 'Dark Mode', v: 'dark'}]}
             />
             <SelectBox 
                label="System Language" icon={<Globe size={14}/>} 
                val={settings.appearance.language} onChange={v => update('appearance.language', v)}
                options={[{l: 'English', v: 'english'}, {l: 'Spanish', v: 'spanish'}, {l: 'French', v: 'french'}]}
             />
          </div>
        </section>

        {/* 4. PRIVACY QUICK-ACCESS */}
        <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col justify-between overflow-hidden relative">
           <div className="relative z-10 space-y-4">
              <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400">
                <Shield size={24} />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Security Hardening</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                Adjust how your profile appears to clients and team members on the WhatsApp gateway.
              </p>
              <button className="mt-4 bg-white text-slate-900 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors">
                Open Privacy Portal
              </button>
           </div>
           {/* Decorative background circle */}
           <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-emerald-500/10 rounded-full blur-3xl" />
        </section>

      </div>
    </div>
  )
}

// --- REUSABLE UI COMPONENTS ---

const SectionHeader = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
    <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center">{icon}</div>
    <div>
      <h3 className="text-lg font-black text-slate-800 leading-tight">{title}</h3>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">{subtitle}</p>
    </div>
  </div>
)

const ToggleRow = ({ title, desc, active, onClick, icon }) => (
  <div className="flex items-center justify-between group cursor-pointer" onClick={onClick}>
    <div className="flex-1 space-y-1">
      <div className="flex items-center gap-2">
        {icon && <span className="text-slate-400">{icon}</span>}
        <h4 className="text-sm font-black text-slate-700 group-hover:text-emerald-600 transition-colors">{title}</h4>
      </div>
      <p className="text-xs text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
    <div className={`w-11 h-6 rounded-full relative transition-all duration-300 ${active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
      <div className={`absolute top-1 bg-white h-4 w-4 rounded-full transition-all duration-300 shadow-sm ${active ? 'left-6' : 'left-1'}`} />
    </div>
  </div>
)

const SelectBox = ({ label, val, onChange, options, icon }) => (
  <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-3">
    <div className="flex items-center gap-2 text-slate-400 uppercase font-black text-[9px] tracking-widest">
      {icon} {label}
    </div>
    <select 
      value={val} onChange={e => onChange(e.target.value)}
      className="w-full bg-transparent border-none text-sm font-bold text-slate-800 outline-none focus:ring-0 cursor-pointer"
    >
      {options.map(opt => <option key={opt.v} value={opt.v}>{opt.l}</option>)}
    </select>
  </div>
)

const FilterChip = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
  >
    {label}
  </button>
)

export default SettingsPage