import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "How I Can Help", href: "#help" },
  { label: "Methods", href: "#methods" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const offset = 72
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#FAFAF7]/95 backdrop-blur-md shadow-sm border-b border-[#D9E6D3]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#5E8A4A] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-[#2D3748] tracking-tight text-lg leading-none">
              GET ORGANIZED!
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 rounded-md text-sm font-medium text-[#6B7C5E] hover:text-[#5E8A4A] hover:bg-[#EFF5EC] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              size="sm"
              className="ml-3 bg-[#5E8A4A] hover:bg-[#4A7038] text-white"
              onClick={() => handleNavClick("#contact")}
            >
              Schedule a Consultation
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-[#6B7C5E] hover:bg-[#EFF5EC] transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-[#FAFAF7] border-b border-[#D9E6D3] shadow-md md:hidden"
          >
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-3 py-2.5 rounded-md text-sm font-medium text-[#2D3748] hover:bg-[#EFF5EC] hover:text-[#5E8A4A] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                className="mt-2 bg-[#5E8A4A] hover:bg-[#4A7038] text-white"
                onClick={() => handleNavClick("#contact")}
              >
                Schedule a Consultation
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
