'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Users,
  Calendar,
  Sparkles,
  ClipboardList,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/slots', label: 'Slow Slots', icon: Calendar },
  { href: '/offers/generate', label: 'Generate Offers', icon: Sparkles },
  { href: '/offers', label: 'Offer History', icon: ClipboardList },
]

function NavLink({ href, label, icon: Icon, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  )
}

function MobileNavLink({ href, label, icon: Icon, active }) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      <Icon size={20} />
      <span className="truncate max-w-[56px] text-center">{label}</span>
    </Link>
  )
}

export function Nav() {
  const pathname = usePathname()

  const isActive = (href) => {
    if (href === '/offers' && pathname === '/offers') return true
    if (href === '/offers/generate' && pathname.startsWith('/offers/generate'))
      return true
    if (href !== '/offers' && href !== '/offers/generate')
      return pathname.startsWith(href)
    return false
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 border-r bg-card h-screen sticky top-0 p-4 gap-2">
        {/* Logo */}
        <div className="flex items-center gap-2 px-3 py-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">B</span>
          </div>
          <span className="font-bold text-lg text-foreground">Beckon</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={isActive(item.href)}
            />
          ))}
        </nav>

        <Button
          variant="ghost"
          className="justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut size={18} />
          Sign out
        </Button>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t flex items-center justify-around px-2 py-1 safe-area-bottom">
        {navItems.map((item) => (
          <MobileNavLink
            key={item.href}
            {...item}
            active={isActive(item.href)}
          />
        ))}
      </nav>
    </>
  )
}
