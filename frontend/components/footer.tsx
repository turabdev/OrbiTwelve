import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/logos/white.webp";
import { BsInstagram, BsGlobe } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";

export default function Footer() {
  return (
    <footer className="relative m-4 md:m-8 rounded-4xl md:rounded-[50px] bg-black py-10 md:py-14 overflow-hidden min-h-187.5 md:h-187.5">
      {/* Top Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-y-10 gap-x-50 sm:gap-y-0 pt-8 md:pt-12 justify-items-center sm:justify-items-start px-6 sm:pl-37.5 sm:pr-0">
        {/* Email */}
        <div className="grid gap-y-4 md:gap-y-6 sm:mr-24 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white">Email</h3>

          <a href="mailto:hello@orbitwelve.com" className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00ADD3] hover:text-cyan-300 transition-colors break-all sm:break-normal">
            hello@orbitwelve.com
          </a>
        </div>

        {/* Navigation */}
        <div className="grid gap-y-3 text-white text-center sm:text-left">
          <span className="cursor-pointer hover:text-[#00ADD3]">Hero</span>
          <span className="cursor-pointer hover:text-[#00ADD3]">About</span>
          <span className="cursor-pointer hover:text-[#00ADD3]">Services</span>
          <span className="cursor-pointer hover:text-[#00ADD3]">Reviews</span>
          <span className="cursor-pointer hover:text-[#00ADD3]">Projects</span>
        </div>

        {/* Navigation */}
        <div className="grid gap-y-3 text-white h-10 text-center sm:text-left">
          <span className="cursor-pointer hover:text-[#00ADD3]">Blog</span>
          <span className="cursor-pointer hover:text-[#00ADD3]">Contact</span>
          <span className="cursor-pointer hover:text-[#00ADD3]">FAQs</span>
        </div>
      </section>

      {/* Social Links */}
      <section className="grid grid-cols-2 gap-x-20 sm:gap-x-12 gap-y-4 w-fit mx-auto sm:mx-0 text-white mt-12 md:mt-16 mb-12 md:mb-16  sm:pl-25 sm:pr-0">
        <Link
          href="https://instagram.com"
          target="_blank"
          className="flex items-center gap-3 hover:text-[#00ADD3] transition-colors"
        >
          <BsInstagram size={22} />
          <span>Instagram</span>
        </Link>

        <Link
          href="https://x.com"
          target="_blank"
          className="flex items-center gap-3 hover:text-[#00ADD3] transition-colors"
        >
          <FaXTwitter size={20} />
          <span>X</span>
        </Link>

        <Link
          href="https://linkedin.com"
          target="_blank"
          className="flex items-center gap-3 hover:text-[#00ADD3] transition-colors"
        >
          <CiLinkedin size={24} />
          <span>LinkedIn</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-3 hover:text-[#00ADD3] transition-colors"
        >
          <BsGlobe size={20} />
          <span>Website</span>
        </Link>
      </section>

      {/* Logo */}
      <Link href="/" className="block px-6 sm:pl-[100px] sm:pr-0">
        <Image
          src={Logo}
          alt="Orbitwelve Logo"
          width={700}
          className="w-full max-w-[280px] sm:max-w-none sm:w-auto h-auto"
          priority
        />
      </Link>

      {/* Bottom Divider */}
      <div className="w-full h-px bg-white mt-14"></div>

      {/* Bottom Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 text-sm text-white px-6 sm:pl-26 sm:pr-26 pt-6">
        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            href="/privacy"
            className="hover:text-[#00ADD3] transition-colors"
          >
            Privacy
          </Link>

          <Link
            href="/terms"
            className="hover:text-[#00ADD3] transition-colors"
          >
            Terms
          </Link>

          <Link
            href="/cookies"
            className="hover:text-[#00ADD3] transition-colors"
          >
            Cookies
          </Link>
        </div>

        <p>© 2026 Zypher Agency. All rights reserved.</p>
      </div>
    </footer>
  );
}
