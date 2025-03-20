import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-amber-50 to-amber-100 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-amber-600 text-white h-10 w-10 rounded-full flex items-center justify-center shadow-sm">
              <span className="font-bold text-xl">P</span>
            </div>
            <h1 className="font-bold text-2xl text-amber-800">Payment App</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/signin" className="px-4 py-2 text-amber-700 font-medium hover:text-amber-800 transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-sm transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-amber-100 py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Fast, Secure Money Transfers
            </h1>
            <p className="text-xl text-amber-800 mb-8">
              Send money instantly to anyone, anywhere. No hassle, no waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md text-center transition-all">
                Create Free Account
              </Link>
              <Link to="/signin" className="px-6 py-3 bg-white hover:bg-amber-50 text-amber-700 font-medium rounded-lg shadow-md text-center transition-all border border-amber-200">
                Sign In
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 -left-4 w-full h-full bg-amber-200 rounded-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-amber-300 rounded-lg"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <div className="bg-amber-600 text-white text-center py-3 rounded-t-lg -mt-6 -mx-6 mb-6">
                  <h3 className="font-bold">Simple Money Transfer</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <div className="h-10 w-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-medium">
                      <span>A</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-800">Aman Singh</h3>
                      <p className="text-sm text-amber-600">Recipient</p>
                    </div>
                  </div>
                  <div className="border border-amber-100 rounded-lg p-3">
                    <p className="text-sm text-amber-700 mb-1">Amount</p>
                    <p className="text-lg font-bold text-amber-900">₹ 1,500</p>
                  </div>
                  <button className="w-full py-3 bg-amber-600 text-white font-medium rounded-lg">
                    Send Money
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">Why Choose Our Payment App?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-amber-50 p-6 rounded-lg shadow-sm">
              <div className="bg-amber-600 h-12 w-12 rounded-lg flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-2">Instant Transfers</h3>
              <p className="text-amber-700">Send and receive money instantly with no processing delays or waiting periods.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-amber-50 p-6 rounded-lg shadow-sm">
              <div className="bg-amber-600 h-12 w-12 rounded-lg flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-2">Secure Transactions</h3>
              <p className="text-amber-700">Bank-grade security ensures your money and personal data are always protected.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-amber-50 p-6 rounded-lg shadow-sm">
              <div className="bg-amber-600 h-12 w-12 rounded-lg flex items-center justify-center text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-2">Easy User Search</h3>
              <p className="text-amber-700">Find friends and family quickly with our simple user search feature.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  <span>R</span>
                </div>
                <div>
                  <h3 className="font-bold text-amber-800">Rahul Sharma</h3>
                  <p className="text-sm text-amber-600">Business Owner</p>
                </div>
              </div>
              <p className="text-amber-700 italic">"This payment app has transformed how I handle my business transactions. Fast, reliable, and incredibly user-friendly!"</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  <span>P</span>
                </div>
                <div>
                  <h3 className="font-bold text-amber-800">Priya Patel</h3>
                  <p className="text-sm text-amber-600">Student</p>
                </div>
              </div>
              <p className="text-amber-700 italic">"Splitting bills with friends is no longer a headache. Just search, send, and it's done!"</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  <span>A</span>
                </div>
                <div>
                  <h3 className="font-bold text-amber-800">Amit Kumar</h3>
                  <p className="text-sm text-amber-600">Freelancer</p>
                </div>
              </div>
              <p className="text-amber-700 italic">"As a freelancer, getting paid used to be complicated. Now, my clients just send money instantly to my account. Love it!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-amber-100 text-xl mb-8 max-w-2xl mx-auto">Join thousands of users who are already enjoying fast, secure, and hassle-free money transfers.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="px-8 py-3 bg-white hover:bg-amber-50 text-amber-700 font-medium rounded-lg shadow-md text-center transition-all">
              Create Account
            </Link>
            <Link to="/signin" className="px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg shadow-md text-center transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-amber-600 text-white h-8 w-8 rounded-full flex items-center justify-center">
                  <span className="font-bold">P</span>
                </div>
                <h3 className="font-bold text-white">Payment App</h3>
              </div>
              <p className="text-amber-200 text-sm">The fastest and most secure way to send and receive money online.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/signin" className="text-amber-200 hover:text-white transition-colors">Sign In</Link></li>
                <li><Link to="/signup" className="text-amber-200 hover:text-white transition-colors">Create Account</Link></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-amber-200">support@paymentapp.com</li>
                <li className="text-amber-200">+91 123-456-7890</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-300 text-sm">
            <p>© {new Date().getFullYear()} Payment App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage