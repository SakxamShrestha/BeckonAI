'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Sparkles, Users } from 'lucide-react'

const TRUST_POINTS = [
  { Icon: ShieldCheck, text: 'Your data is never shared or sold' },
  { Icon: Sparkles,   text: 'Personalized to your business from day one' },
  { Icon: Users,      text: 'Join 100+ local businesses already using Beckon' },
]

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  function handleGoogleSignIn() {
    setLoading(true)
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .login-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Dot grid */
        .login-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: radial-gradient(circle, #d4d8ff 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }
        .login-page > * { position: relative; z-index: 1; }

        /* Google button */
        .google-btn {
          transition: box-shadow 0.15s ease, transform 0.1s ease, background 0.15s ease;
          border: 1.5px solid #E0E0E0;
        }
        .google-btn:hover:not(:disabled) {
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          transform: translateY(-1px);
          border-color: #CACACA;
        }
        .google-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .google-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Fade up animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fu { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards; opacity: 0; }
        .fu-1 { animation-delay: 0.05s; }
        .fu-2 { animation-delay: 0.15s; }
        .fu-3 { animation-delay: 0.25s; }
        .fu-4 { animation-delay: 0.35s; }

        /* Spinner */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid #ddd;
          border-top-color: #3B59FF;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        /* Trust item hover */
        .trust-item {
          transition: background 0.15s ease;
        }
        .trust-item:hover {
          background: #f5f7ff !important;
        }
      `}</style>

      <div className="login-page min-h-screen flex flex-col" style={{ background: '#FAFAFA' }}>

        {/* Top bar */}
        <header style={{ borderBottom: '1px solid #EBEBEB', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)' }}
          className="sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#3B59FF' }}>
                <span className="text-white font-extrabold text-xs">B</span>
              </div>
              <span className="font-extrabold text-base" style={{ color: '#1A1A1A', letterSpacing: '-0.3px' }}>Beckon</span>
            </Link>
            <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: '#666' }}>
              <ArrowLeft size={14} /> Back to home
            </Link>
          </div>
        </header>

        {/* Main — centred card */}
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-sm">

            {/* Logo mark */}
            <div className="fu fu-1 text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                style={{ background: '#EEF1FF' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#3B59FF' }}>
                  <span className="text-white font-extrabold text-lg">B</span>
                </div>
              </div>
              <h1 className="font-extrabold text-2xl" style={{ color: '#1A1A1A', letterSpacing: '-0.6px' }}>
                Welcome to Beckon
              </h1>
              <p className="text-sm mt-1.5" style={{ color: '#888' }}>
                Sign in to manage your business offers
              </p>
            </div>

            {/* Card */}
            <div className="fu fu-2 rounded-2xl p-7"
              style={{
                background: '#fff',
                border: '1px solid #EBEBEB',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.08)',
              }}>

              <p className="text-xs font-bold uppercase tracking-widest mb-5 text-center"
                style={{ color: '#AAA', letterSpacing: '0.1em' }}>
                Continue with
              </p>

              {/* Google button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="google-btn w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl bg-white font-semibold text-sm"
                style={{ color: '#1A1A1A' }}
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    <span style={{ color: '#888' }}>Signing in…</span>
                  </>
                ) : (
                  <>
                    {/* Official Google "G" logo */}
                    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M47.532 24.552c0-1.636-.145-3.2-.415-4.695H24.48v8.879h12.984c-.56 3.018-2.255 5.574-4.806 7.29v6.061h7.779c4.548-4.19 7.095-10.36 7.095-17.535z" fill="#4285F4"/>
                      <path d="M24.48 48c6.516 0 11.982-2.16 15.975-5.853l-7.778-6.061c-2.16 1.449-4.919 2.307-8.197 2.307-6.305 0-11.644-4.258-13.553-9.981H2.868v6.254C6.843 42.892 15.07 48 24.48 48z" fill="#34A853"/>
                      <path d="M10.927 28.412A14.405 14.405 0 0 1 9.9 24c0-1.539.264-3.034.737-4.412v-6.254H2.868A23.95 23.95 0 0 0 .48 24c0 3.87.928 7.532 2.588 10.666l8.07-6.254z" fill="#FBBC05"/>
                      <path d="M24.48 9.607c3.554 0 6.74 1.222 9.25 3.62l6.94-6.94C36.461 2.388 30.996 0 24.48 0 15.07 0 6.843 5.108 2.868 13.334l8.07 6.254c1.9-5.723 7.248-9.981 13.543-9.981z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>

              <p className="text-xs text-center mt-4" style={{ color: '#BBB' }}>
                By signing in you agree to our{' '}
                <Link href="/" className="underline underline-offset-2" style={{ color: '#999' }}>Terms</Link>
                {' '}and{' '}
                <Link href="/" className="underline underline-offset-2" style={{ color: '#999' }}>Privacy Policy</Link>.
              </p>
            </div>

            {/* Trust points */}
            <div className="fu fu-3 mt-5 rounded-2xl overflow-hidden"
              style={{ border: '1px solid #EBEBEB', background: '#fff' }}>
              {TRUST_POINTS.map(({ Icon, text }, i) => (
                <div key={text}
                  className="trust-item flex items-center gap-3 px-5 py-3.5"
                  style={{
                    borderBottom: i < TRUST_POINTS.length - 1 ? '1px solid #F0F0F0' : 'none',
                    background: '#fff',
                  }}>
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: '#EEF1FF' }}>
                    <Icon size={13} style={{ color: '#3B59FF' }} />
                  </div>
                  <p className="text-xs font-medium" style={{ color: '#666' }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Back link */}
            <p className="fu fu-4 text-center text-xs mt-6" style={{ color: '#BBB' }}>
              Not a business owner?{' '}
              <Link href="/contact" className="font-semibold underline underline-offset-2"
                style={{ color: '#3B59FF' }}>
                Get in touch
              </Link>
            </p>
          </div>
        </main>
      </div>
    </>
  )
}
