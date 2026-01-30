import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 font-mono">
            Get In <span className="text-blue-500">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-4" />
          <p className="text-gray-400 font-mono">~/contact $ cat message.txt</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info Terminal */}
          <div className="terminal-window rounded-xl overflow-hidden">
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center border-b border-black/50">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 text-center text-[10px] font-mono text-gray-500 ml-[-40px]">
                contact_info.sh — bash
              </div>
            </div>

            <div className="bg-[#1e1e1e] p-8 space-y-6">
              <h3 className="text-xl font-bold text-white mb-6 font-mono">$ cat contact.txt</h3>

              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-start space-x-3">
                  <Mail size={18} className="text-blue-400 mt-1" />
                  <div>
                    <div className="text-gray-500">EMAIL:</div>
                    <div className="text-white">omarabovli@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin size={18} className="text-green-400 mt-1" />
                  <div>
                    <div className="text-gray-500">LOCATION:</div>
                    <div className="text-white">Tanta, Egypt</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone size={18} className="text-blue-400 mt-1" />
                  <div>
                    <div className="text-gray-500">PHONE:</div>
                    <div className="text-white">+201069466522</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="text-gray-500 text-xs font-mono mb-3">$ ls social_links/</div>
                <div className="flex space-x-3">
                  <a
                    href="https://github.com/OmarAbovli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#3a3a3c] hover:bg-[#48484a] text-white rounded font-mono text-sm transition-all"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/omar-abovli-3652b1263"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#3a3a3c] hover:bg-[#48484a] text-white rounded font-mono text-sm transition-all"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/povli_pv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#3a3a3c] hover:bg-[#48484a] text-white rounded font-mono text-sm transition-all"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Terminal */}
          <div className="terminal-window rounded-xl overflow-hidden">
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center border-b border-black/50">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 text-center text-[10px] font-mono text-gray-500 ml-[-40px]">
                send_message.sh — vim
              </div>
            </div>

            <div className="bg-[#1e1e1e] p-8">
              {submitted ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-green-400 text-6xl">✓</div>
                    <div className="font-mono text-green-400">
                      $ Message sent successfully!
                    </div>
                    <div className="text-gray-500 text-sm font-mono">
                      I'll get back to you soon.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-500 font-mono text-xs mb-2">
                      $ echo "NAME" {">"} name.txt
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#2c2c2e] border border-white/10 rounded text-white font-mono placeholder-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Your name..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 font-mono text-xs mb-2">
                      $ echo "EMAIL" {">"} email.txt
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#2c2c2e] border border-white/10 rounded text-white font-mono placeholder-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 font-mono text-xs mb-2">
                      $ cat {">"} message.txt
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-[#2c2c2e] border border-white/10 rounded text-white font-mono placeholder-gray-600 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      placeholder="Your message here..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono rounded transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                  >
                    <Send size={16} />
                    $ ./send_message.sh
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
