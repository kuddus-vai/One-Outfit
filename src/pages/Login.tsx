import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, KeyRound, AlertCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAdmin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      // Check if Admin Credentials
      if (cleanEmail === 'test@gmail.com') {
        const res = login(cleanEmail, password);
        if (res.success) {
          setIsLoading(false);
          navigate('/admin');
          return;
        } else {
          setIsLoading(false);
          setErrorMessage('Password incorrect for test@gmail.com (Default: 12345678)');
          return;
        }
      }

      // Customer login simulation
      setIsLoading(false);
      navigate('/account');
    }, 600);
  };

  const handleFillAdmin = () => {
    setEmail('test@gmail.com');
    setPassword('12345678');
    setErrorMessage('');
  };

  return (
    <div className="flex min-h-[75vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-neutral-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white font-black text-2xl leading-none pb-1 shadow-md">
            1
          </div>
        </div>
        <h2 className="mt-6 text-center text-2xl font-black leading-9 tracking-tight text-neutral-950 uppercase">
          Sign In to One Outfit
        </h2>
        <p className="text-center text-xs text-neutral-500 mt-1">
          Access your account, order tracking, or admin control dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 shadow-sm rounded-2xl border border-neutral-200">
        {/* Admin Quick Fill Banner */}
        <div className="mb-6 p-3.5 bg-neutral-900 text-white rounded-xl flex items-center justify-between border border-neutral-800">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-white shrink-0" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider">Admin Login Access</p>
              <p className="text-[10px] text-neutral-300 font-mono">test@gmail.com • Pass: 12345678</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleFillAdmin}
            className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 rounded-md transition-colors"
          >
            Auto Fill
          </button>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
              Email Address / Phone
            </label>
            <div className="mt-1.5">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@gmail.com"
                className="block w-full rounded-xl border border-neutral-300 py-2.5 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black text-xs px-3.5 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Password
              </label>
              <div className="text-xs">
                <a href="#/account" className="font-semibold text-neutral-500 hover:text-black">
                  Forgot?
                </a>
              </div>
            </div>
            <div className="mt-1.5">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full rounded-xl border border-neutral-300 py-2.5 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black text-xs px-3.5 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-xl bg-black px-4 py-3 text-xs font-black leading-6 text-white shadow-sm hover:bg-neutral-800 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black uppercase tracking-widest disabled:opacity-70 transition-all items-center gap-2"
            >
              {isLoading ? (
                'Authenticating...'
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-col items-center gap-2 text-center text-xs text-neutral-500">
          <div>
            Direct Admin Portal Link:{' '}
            <Link to="/admin" className="font-bold text-black hover:underline uppercase">
              Go to /admin
            </Link>
          </div>
          <div>
            Not a member?{' '}
            <Link to="/register" className="font-bold text-black hover:underline">
              Create customer account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
