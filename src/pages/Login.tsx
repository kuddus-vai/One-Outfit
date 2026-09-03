import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      navigate('/account');
    }, 1000);
  };

  return (
    <div className="flex min-h-[70vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white font-bold text-2xl leading-none pb-1">
            1
          </div>
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 uppercase">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 shadow-sm rounded-lg border border-gray-200">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address or Phone
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-gray-600 hover:text-black">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-black px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black uppercase disabled:opacity-70"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="/register" className="font-semibold leading-6 text-black hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
