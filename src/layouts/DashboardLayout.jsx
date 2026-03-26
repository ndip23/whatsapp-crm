import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation, Link, NavLink } from 'react-router-dom'
import { 
  Bell, LogOut, Users, MessageCircle, ChevronDown, 
  Home, Shield, Clock, MessageSquare, Settings, 
  UserCheck, CheckCircle, Menu, X, AlertCircle, LayoutDashboard,
  UserCircle, Heart, Activity, FileText, User, Phone, Info
} from 'lucide-react'
import NotificationsCenter from '../components/NotificationsCenter'
import { useUser } from '../context/UserContext'
import { logout } from '../services/authService'

const DashboardLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({ admin: true, shifts: true, clients: true })
  
  const { currentUser, notifications } = useUser()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }))
  }

  // --- UI COMPONENTS ---

  const SidebarItem = ({ to, icon, label, badge = null }) => (
    <NavLink 
      to={to} 
      end={to === '/dashboard'}
      className={({ isActive }) => `
        flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-200 group
        ${isActive 
          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}
      `}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {badge && <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">{badge}</span>}
    </NavLink>
  )

  const CollapsibleHeader = ({ label, icon, isOpen, onClick }) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3 text-slate-400 hover:text-slate-600 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="opacity-50">{icon}</div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
      </div>
      <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  )

  return (
    <div className="flex h-screen bg-slate-50 p-4 gap-4 overflow-hidden font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. SIDEBAR (Floating Card) */}
      <aside className={`
        fixed inset-y-4 left-4 w-72 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 z-50 
        lg:relative lg:inset-0 transform transition-transform duration-500 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[120%] lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-200">
              <MessageCircle size={24} fill="currentColor" />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tighter">W-CS</span>
          </div>
          <button className="lg:hidden p-2 text-slate-300" onClick={() => setIsSidebarOpen(false)}><X/></button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar">
          <SidebarItem to="/dashboard" icon={<LayoutDashboard size={20}/>} label="Overview" />
          {(currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && (
          <div className="pt-4">
            <CollapsibleHeader 
              label="Staff Control" 
              icon={<Shield size={16}/>} 
              isOpen={expandedMenus.admin} 
              onClick={() => toggleMenu('admin')} 
            />
            <div className={`space-y-1 overflow-hidden transition-all duration-300 ${expandedMenus.admin ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <SidebarItem to="/dashboard/admin" icon={<Users size={18}/>} label="Users" />
              <SidebarItem to="/dashboard/admin/roles" icon={<UserCheck size={18}/>} label="Access Roles" />
              <SidebarItem to="/dashboard/admin/permissions" icon={<Shield size={18}/>} label="Permissions" />
            </div>
          </div> )}
            {(currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && (
          <div className="pt-4">
            <CollapsibleHeader 
              label="Operations" 
              icon={<Activity size={16}/>} 
              isOpen={expandedMenus.shifts} 
              onClick={() => toggleMenu('shifts')} 
            />
            <div className={`space-y-1 overflow-hidden transition-all duration-300 ${expandedMenus.shifts ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <SidebarItem to="/dashboard/shifts/manage" icon={<Clock size={18}/>} label="Shift Templates" />
              <SidebarItem to="/dashboard/shifts/assign" icon={<UserCircle size={18}/>} label="Assign Duties" />
              <SidebarItem to="/dashboard/shifts/log" icon={<FileText size={18}/>} label="Audit Logs" />
            </div>
          </div> )}

          <div className="pt-4">
            <CollapsibleHeader 
              label="CRM" 
              icon={<Heart size={16}/>} 
              isOpen={expandedMenus.clients} 
              onClick={() => toggleMenu('clients')} 
            />
            <div className={`space-y-1 overflow-hidden transition-all duration-300 ${expandedMenus.clients ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              {(currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPER_ADMIN') && (<SidebarItem to="/dashboard/clients/list" icon={<Users size={18}/>} label="Client Directory" /> )}
              <SidebarItem to="/dashboard/clients/pending" icon={<Clock size={18}/>} label="Pending queue" />
              <SidebarItem to="/dashboard/clients/solved" icon={<CheckCircle size={18}/>} label="Archive" />
              <SidebarItem to="/dashboard/clients/escalated" icon={<AlertCircle size={18}/>} label="Escalations" />
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-slate-50 space-y-4">
           <Link to="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 text-slate-400 font-bold hover:text-slate-600 transition-colors">
              <Settings size={20}/> <span>Settings</span>
           </Link>
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 text-red-500 rounded-2xl font-black text-sm hover:bg-red-100 transition-all shadow-sm">
              <LogOut size={20}/> <span>Sign Out</span>
           </button>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA (Floating Card) */}
      <main className="flex-1 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col relative">
        
        {/* Header (Glassmorphism) */}
        <header className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 bg-slate-50 rounded-xl text-slate-600" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20}/>
            </button>
            <h1 className="text-sm font-black uppercase tracking-[0.25em] text-slate-400">
              {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 bg-slate-50 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
            >
              <Bell size={20} />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </button>

            <Link to="/dashboard/profile" className="flex items-center gap-3 group">
              <div className="text-right hidden md:block">
                <p className="text-xs font-black text-slate-800 leading-none group-hover:text-emerald-600 transition-colors">{currentUser?.name || "Member"}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{currentUser?.role || "Staff"}</p>
              </div>
              <div className="h-11 w-11 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-500 border-2 border-white shadow-sm group-hover:shadow-emerald-100 group-hover:border-emerald-100 transition-all overflow-hidden">
                {currentUser?.avatar ? <img src={currentUser.avatar} alt="me" /> : currentUser?.name?.charAt(0)}
              </div>
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto bg-slate-50/40 p-6 md:p-10 custom-scrollbar relative">
          {showNotifications && (
            <div className="absolute top-4 right-4 z-50 w-80 animate-in slide-in-from-top-4 duration-300">
              <NotificationsCenter onClose={() => setShowNotifications(false)} />
            </div>
          )}
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout