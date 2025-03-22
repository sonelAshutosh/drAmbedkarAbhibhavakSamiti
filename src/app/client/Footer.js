import {
  CornerDownRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative text-primary-dark py-6">
      {/* Background Image Section */}
      <div
        className="relative w-full min-h-[400px] bg-cover bg-center bg-no-repeat px-4 md:px-10 lg:px-20 flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: "url('/images/footer_bg.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content (Remains Bright) */}
        <div className="relative w-full flex flex-col md:flex-row md:justify-between items-center md:items-start gap-6 text-center md:text-left">
          {/* Left Section - Visitors & Feedback */}
          <div className="flex flex-col items-center md:items-start">
            <p className="font-semibold">Website Visitors: 6,962,672</p>
            <p className="text-sm">
              Last Update: <strong>10 Jan 2025, 12:18 PM</strong>
            </p>
            <button className="mt-3 px-4 py-2 border border-white rounded-lg hover:bg-white/20">
              📝 Feedback
            </button>
            {/* Social Media Icons */}
            <div className="mt-4 flex space-x-3">
              <Link href="/" className="hover:opacity-80">
                <Facebook />
              </Link>
              <Link href="/" className="hover:opacity-80">
                <Instagram />
              </Link>
              <Link href="/" className="hover:opacity-80">
                <Twitter />
              </Link>
              <Link href="/" className="hover:opacity-80">
                <Youtube />
              </Link>
            </div>
          </div>

          {/* Middle Section - Quick Links */}
          <div>
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {['Home', 'About Us', 'Contact Us'].map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-center md:justify-start gap-2 font-semibold"
                >
                  <CornerDownRight />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="font-bold text-lg">Contact E-mail</h3>
            <p className="text-sm">drambedkarabhibhavaksamiti@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-4 text-center text-sm px-4">
        <p className="text-gray-600 py-1">
          Website designed and developed by{' '}
          <Link href="#" className="hover:text-accent-base font-semibold">
            @shutosh
          </Link>
        </p>
        <p className="py-1">© {currentYear} Copyright. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
