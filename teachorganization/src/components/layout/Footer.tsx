import { BookOpen } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#2D3748] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#5E8A4A] flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-white tracking-tight">GET ORGANIZED!</span>
        </div>

        <p className="text-sm text-white/50 text-center">
          Organizational Coaching For Students &nbsp;·&nbsp; {currentYear} Heather Clifford
        </p>

        <a
          href="tel:+18603054922"
          className="text-sm text-white/70 hover:text-white transition-colors font-medium"
        >
          860-305-4922
        </a>
      </div>
    </footer>
  )
}
