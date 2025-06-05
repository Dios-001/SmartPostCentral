"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { avatar, avatar1, avatar2, avatar3, avatar4 } from "@/lib/avatars";
import { sendToWaitlist } from "@/lib/data";
import {
  Bell,
  Send,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Globe,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [location, setlocation] = useState(Object);

  useEffect(() => {
    const getClientLocation = async () => {
      const res = await fetch("https://ipinfo.io/json");
      const locationData = await res.json();
      setlocation(locationData);
    };

    getClientLocation();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      await sendToWaitlist(formData, location); // Assuming sendToWaitlist is callable from client
      setSubmitted(true);
      setError("");
    } catch (err) {
      setError(`${err}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans text-gray-800">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Send className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold">SmartPostCentral</span>
        </div>
        <div>
          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            About
          </button>
          <button
            className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            onClick={scrollToTop}
          >
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-16 pb-24 lg:flex items-center">
        <div className="lg:w-1/2 lg:pr-12">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full mb-4">
            Coming Soon • Alpha Release
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Publish content across{" "}
            <span className="text-blue-600">all platforms</span> with a single
            click
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Save time and reach more people by posting your content to multiple
            social media and blogging platforms simultaneously.
          </p>

          {/* Waitlist Form */}
          <div className="mb-8 max-w-md" id="waitlist-form">
            {!submitted ? (
              <div className="flex flex-col sm:flex-row">
                <div className="flex-grow mb-2 sm:mb-0 sm:mr-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address"
                  />
                  {error && (
                    <p className="mt-1 text-red-500 text-sm">{error}</p>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Join Waitlist
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">
                    Thanks for joining our waitlist!
                  </p>
                  <p className="text-green-600">
                    We&#39;ll notify you when we&#39;re ready for early access.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Social Proof */}
          <div className="text-sm text-gray-500">
            <p className="mb-2">Join our growing community of early adopters</p>
            <div className="flex -space-x-2">
              {[
                avatar4.src,
                avatar1.src,
                avatar2.src,
                avatar3.src,
                avatar.src,
              ].map((src, idx) => (
                <Image
                  key={idx}
                  width={100}
                  src={src}
                  height={100}
                  alt={`Avatar ${idx + 1}`}
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                />
              ))}
              <div className="w-9 h-9 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-sm font-semibold text-blue-600">
                +118
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <div className="bg-white rounded-xl shadow-xl p-6 relative">
            <div className="absolute -top-3 -left-3 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              Preview
            </div>
            <div className="flex justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Send className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <div className="font-medium">New Post</div>
                  <div className="text-sm text-gray-500">Draft</div>
                </div>
              </div>
              <button className="px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                Publish All
              </button>
            </div>
            <div className="mb-4">
              <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded-full w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="h-24 bg-gray-100 rounded-lg"></div>
              <div className="h-24 bg-gray-100 rounded-lg"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                <Twitter className="w-4 h-4 mr-1" />
                Twitter
                <CheckCircle className="w-4 h-4 ml-1 text-green-500" />
              </div>
              <div className="flex items-center px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                <Instagram className="w-4 h-4 mr-1" />
                Instagram
                <CheckCircle className="w-4 h-4 ml-1 text-green-500" />
              </div>
              <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                <Facebook className="w-4 h-4 mr-1" />
                Facebook
                <CheckCircle className="w-4 h-4 ml-1 text-green-500" />
              </div>
              <div className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                <Linkedin className="w-4 h-4 mr-1" />
                LinkedIn
                <CheckCircle className="w-4 h-4 ml-1 text-green-500" />
              </div>
              <div className="flex items-center px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                <Globe className="w-4 h-4 mr-1" />
                Blog
                <CheckCircle className="w-4 h-4 ml-1 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why SmartPostCentral?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform streamlines your content distribution workflow,
              saving you time and expanding your reach.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                One-Click Publishing
              </h3>
              <p className="text-gray-600">
                Write once and publish everywhere. No more copying and pasting
                between different platforms.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Platforms</h3>
              <p className="text-gray-600">
                Connect all your social media accounts and blogs in one place
                for seamless distribution.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Analytics & Insights
              </h3>
              <p className="text-gray-600">
                Track performance across all platforms with unified analytics
                and engagement metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Be among the first to try SmartPostCentral
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Our alpha release is coming soon. Join the waitlist now and get
            early access to our platform.
          </p>
          <button
            className="px-8 py-3 bg-white text-blue-600 text-lg font-medium rounded-lg hover:bg-blue-50 transition-colors"
            onClick={scrollToTop}
          >
            Join Waitlist
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-200 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Send className="w-6 h-6 text-white" />
                <span className="text-xl font-bold text-white">
                  SmartPostCentral
                </span>
              </div>
              <p className="max-w-xs">
                Publish your content across multiple platforms with just one
                click.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-medium mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <button className="hover:text-white transition-colors">
                      About
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      Careers
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      Contact
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-medium mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <button className="hover:text-white transition-colors">
                      Blog
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      Documentation
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      FAQ
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-medium mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <button className="hover:text-white transition-colors">
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button className="hover:text-white transition-colors">
                      Terms of Service
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center">
            <p>
              &copy; {new Date().getFullYear()} SmartPostCentral. All rights
              reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
