// // "use client";

// // import React, { useState } from 'react';
// // import { Mail, Lock, Eye, EyeOff, Receipt, Smartphone, Loader2 } from 'lucide-react';

// // export default function App() {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //     rememberMe: false
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: type === 'checkbox' ? checked : value
// //     }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setIsLoading(true);
    
// //     // Simulate API call for Next.js backend/NextAuth
// //     await new Promise(resolve => setTimeout(resolve, 1500));
    
// //     console.log('Login attempt with:', formData);
// //     setIsLoading(false);
// //     // In a real Next.js app, you'd route here, e.g., router.push('/dashboard')
// //   };
// //   return (
// //     <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-blue-100 selection:text-blue-900">
// //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className="flex justify-center text-blue-600">
// //           <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm">
// //             <Receipt className="h-8 w-8" />
// //           </div>
// //         </div>
// //         <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
// //           GST Billing Pro
// //         </h2>
// //         <p className="mt-2 text-center text-sm text-slate-600">
// //           Securely login to manage your invoices. {' '}
// //           <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
// //             Create an account
// //           </a>
// //         </p>
// //       </div>
// //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
// //           <form className="space-y-6" onSubmit={handleSubmit}>
// //             {/* Email Field */}
// //             <div>
// //               <label htmlFor="email" className="block text-sm font-medium text-slate-700">
// //                 Email address
// //               </label>
// //               <div className="mt-1 relative rounded-md shadow-sm">
// //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                   <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
// //                 </div>
// //                 <input
// //                   id="email"
// //                   name="email"
// //                   type="email"
// //                   autoComplete="email"
// //                   required
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg h-11 focus:ring-blue-500 focus:border-blue-500 border bg-slate-50 focus:bg-white transition-colors"
// //                   placeholder="you@example.com"
// //                 />
// //               </div>
// //             </div>
// //             {/* Password Field */}
// //             <div>
// //               <label htmlFor="password" className="block text-sm font-medium text-slate-700">
// //                 Password
// //               </label>
// //               <div className="mt-1 relative rounded-md shadow-sm">
// //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                   <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
// //                 </div>
// //                 <input
// //                   id="password"
// //                   name="password"
// //                   type={showPassword ? 'text' : 'password'}
// //                   autoComplete="current-password"
// //                   required
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   className="block w-full pl-10 pr-10 sm:text-sm border-slate-300 rounded-lg h-11 focus:ring-blue-500 focus:border-blue-500 border bg-slate-50 focus:bg-white transition-colors"
// //                   placeholder="••••••••"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
// //                 >
// //                   {showPassword ? (
// //                     <EyeOff className="h-5 w-5" aria-hidden="true" />
// //                   ) : (
// //                     <Eye className="h-5 w-5" aria-hidden="true" />
// //                   )}
// //                 </button>
// //               </div>
// //             </div>
// //             {/* Remember & Forgot Password */}
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center">
// //                 <input
// //                   id="rememberMe"
// //                   name="rememberMe"
// //                   type="checkbox"
// //                   checked={formData.rememberMe}
// //                   onChange={handleChange}
// //                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
// //                 />
// //                 <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-700 cursor-pointer">
// //                   Remember me
// //                 </label>
// //               </div>

// //               <div className="text-sm">
// //                 <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
// //                   Forgot your password?
// //                 </a>
// //               </div>
// //             </div>
// //             {/* Submit Button */}
// //             <div>
// //               <button
// //                 type="submit"
// //                 disabled={isLoading}
// //                 className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
// //               >
// //                 {isLoading ? (
// //                   <>
// //                     <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
// //                     Authenticating...
// //                   </>
// //                 ) : (
// //                   'Sign in to Dashboard'
// //                 )}
// //               </button>
// //             </div>
// //           </form>
// //           {/* Social Logins */}
// //           <div className="mt-8">
// //             <div className="relative">
// //               <div className="absolute inset-0 flex items-center">
// //                 <div className="w-full border-t border-slate-200" />
// //               </div>
// //               <div className="relative flex justify-center text-sm">
// //                 <span className="px-2 bg-white text-slate-500">Or continue with</span>
// //               </div>
// //             </div>
// //             <div className="mt-6 grid grid-cols-2 gap-3">
// //               <div>
// //                 <a
// //                   href="#"
// //                   className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors gap-2"
// //                 >
// //                   <svg className="w-5 h-5" viewBox="0 0 24 24">
// //                     <path
// //                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
// //                       fill="#4285F4"
// //                     />
// //                     <path
// //                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
// //                       fill="#34A853"
// //                     />
// //                     <path
// //                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
// //                       fill="#FBBC05"
// //                     />
// //                     <path
// //                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
// //                       fill="#EA4335"
// //                     />
// //                   </svg>
// //                   <span>Google</span>
// //                 </a>
// //               </div>
// //               <div>
// //                 <a
// //                   href="#"
// //                   className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors gap-2"
// //                 >
// //                   <Smartphone className="w-5 h-5 text-slate-600" />
// //                   <span>OTP Login</span>
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Mail, Lock, Eye, EyeOff, Receipt, Smartphone, Loader2 } from 'lucide-react';

// export default function App() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState(''); // Added error state
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setError(''); // Clear error when user types
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
    
//     // Simulate API call for Next.js backend/NextAuth
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     // Hardcoded credential check
//     if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
//       router.push('/dashboard');
//     } else {
//       setError('Invalid email or password.');
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-blue-100 selection:text-blue-900">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center text-blue-600">
//           <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm">
//             <Receipt className="h-8 w-8" />
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
//           GST Billing Pro
//         </h2>
//         <p className="mt-2 text-center text-sm text-slate-600">
//           Securely login to manage your invoices. {' '}
//           <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
//             Create an account
//           </a>
//         </p>
//       </div>
      
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
//           <form className="space-y-6" onSubmit={handleSubmit}>
            
//             {/* Error Message Display */}
//             {error && (
//               <div className="p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-600">
//                 {error}
//               </div>
//             )}

//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-slate-700">
//                 Email address
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg h-11 focus:ring-blue-500 focus:border-blue-500 border bg-slate-50 focus:bg-white transition-colors"
//                   placeholder="admin@example.com"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-slate-700">
//                 Password
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   autoComplete="current-password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="block w-full pl-10 pr-10 sm:text-sm border-slate-300 rounded-lg h-11 focus:ring-blue-500 focus:border-blue-500 border bg-slate-50 focus:bg-white transition-colors"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5" aria-hidden="true" />
//                   ) : (
//                     <Eye className="h-5 w-5" aria-hidden="true" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Remember & Forgot Password */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="rememberMe"
//                   name="rememberMe"
//                   type="checkbox"
//                   checked={formData.rememberMe}
//                   onChange={handleChange}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
//                 />
//                 <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-700 cursor-pointer">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
//                   Forgot your password?
//                 </a>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
//                     Authenticating...
//                   </>
//                 ) : (
//                   'Sign in to Dashboard'
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Social Logins */}
//           <div className="mt-8">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-slate-200" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-slate-500">Or continue with</span>
//               </div>
//             </div>
//             <div className="mt-6 grid grid-cols-2 gap-3">
//               <div>
//                 <a
//                   href="#"
//                   className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors gap-2"
//                 >
//                   <svg className="w-5 h-5" viewBox="0 0 24 24">
//                     <path
//                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                       fill="#4285F4"
//                     />
//                     <path
//                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                       fill="#34A853"
//                     />
//                     <path
//                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                       fill="#FBBC05"
//                     />
//                     <path
//                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                       fill="#EA4335"
//                     />
//                   </svg>
//                   <span>Google</span>
//                 </a>
//               </div>
//               <div>
//                 <a
//                   href="#"
//                   className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors gap-2"
//                 >
//                   <Smartphone className="w-5 h-5 text-slate-600" />
//                   <span>OTP Login</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail, Lock, Eye, EyeOff, Receipt, Smartphone, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setError(''); 
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Call NextAuth securely
    const result = await signIn('credentials', {
      redirect: false, 
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      setError('Invalid email or password.');
      setIsLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh(); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-blue-600">
          <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm">
            <Receipt className="h-8 w-8" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          GST Billing Pro
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Securely login to manage your invoices. {' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            Create an account
          </a>
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {error && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg h-11 focus:ring-blue-500 focus:border-blue-500 border bg-slate-50 focus:bg-white transition-colors"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 sm:text-sm border-slate-300 rounded-lg h-11 focus:ring-blue-500 focus:border-blue-500 border bg-slate-50 focus:bg-white transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-700 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Authenticating...
                  </>
                ) : (
                  'Sign in to Dashboard'
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span>Google</span>
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors gap-2"
                >
                  <Smartphone className="w-5 h-5 text-slate-600" />
                  <span>OTP Login</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}