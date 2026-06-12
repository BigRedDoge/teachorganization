import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

const ease = "easeOut" as const

export function Hero() {
  const scrollToContact = () => {
    const target = document.querySelector("#contact")
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  const scrollDown = () => {
    const target = document.querySelector("#help")
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFAF7]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #D9E6D3 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #EFF5EC 0%, transparent 40%)`,
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-[#EFF5EC] text-[#5E8A4A] text-sm font-medium px-4 py-1.5 rounded-full mb-8 border border-[#D9E6D3]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#5E8A4A]" />
          Organizational Coaching For Students
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#2D3748] leading-[1.1] tracking-tight mb-6"
        >
          GET <span className="text-[#5E8A4A]">ORGANIZED!</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.35 }}
          className="space-y-2 mb-10"
        >
          <p className="text-lg sm:text-xl text-[#6B7C5E] italic">
            "Organize a student and you help them for a day."
          </p>
          <p className="text-lg sm:text-xl text-[#5E8A4A] font-semibold italic">
            "Teach a student to get organized and you help them for life."
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.45 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-[#6B7C5E] leading-relaxed mb-10"
        >
          My goal is to help young people become more efficient learners.
          I provide organizational coaching for middle school, high school,
          and college students &mdash; giving them the skills to manage their time,
          reduce stress, and build lasting independence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-[#5E8A4A] hover:bg-[#4A7038] text-white px-8 h-12 text-base font-medium shadow-md hover:shadow-lg transition-all"
            onClick={scrollToContact}
          >
            Schedule a Free Consultation
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#D9E6D3] text-[#5E8A4A] hover:bg-[#EFF5EC] h-12 text-base"
            onClick={scrollDown}
          >
            Learn More
          </Button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          onClick={scrollDown}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#6B7C5E] hover:text-[#5E8A4A] transition-colors"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
