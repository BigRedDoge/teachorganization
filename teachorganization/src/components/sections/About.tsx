import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { GraduationCap, Heart, Users } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import headshotUrl from "@/assets/heather-headshot.webp"

const credentials = [
  {
    icon: GraduationCap,
    label: "BA Health Science",
    sub: "Simmons University",
  },
  {
    icon: GraduationCap,
    label: "MA Occupational Therapy",
    sub: "Boston University",
  },
  {
    icon: Users,
    label: "Event Organizer",
    sub: "Up to 350 attendees",
  },
  {
    icon: Heart,
    label: "Parent Association President",
    sub: "Kingswood Oxford School",
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold text-[#5E8A4A] uppercase tracking-widest mb-3">
              About Me
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3748] mb-6 leading-tight">
              Hi, I'm Heather Clifford
            </h2>

            <div className="space-y-4 text-[#6B7C5E] leading-relaxed">
              <p>
                I have a BA in Health Science from Simmons University and an MA in Occupational
                Therapy from Boston University. The core principle of Occupational Therapy is to
                teach skills that put a person back in control of their life and ensure their
                independence.
              </p>
              <p>
                Using the collaboration of ideas, thinking outside the box, and making
                modifications as needed, I will help your student learn organizational skills that
                encourage them to become more self-reliant, confident, and successful.
              </p>
              <p>
                I have spent the past few years co-chairing large fundraising committees and
                organizing events for up to 350 people. I also spent two years as the president
                of the Kingswood Oxford School Parent Association, managing over a hundred
                volunteers throughout that time.
              </p>
              <p>
                I started <strong className="text-[#2D3748] font-semibold">GET ORGANIZED!</strong> so
                I could help students create functional systems that work within their needs. I
                create a stress-free environment that facilitates solutions to the everyday issues
                that students contend with. My goal is to instill feelings of confidence, success,
                and independence so they can take control of their lives.
              </p>
            </div>

            <Separator className="my-8 bg-[#D9E6D3]" />

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((cred, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-md bg-[#EFF5EC] flex items-center justify-center mt-0.5">
                    <cred.icon className="w-4 h-4 text-[#5E8A4A]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#2D3748] leading-tight">
                      {cred.label}
                    </p>
                    <p className="text-xs text-[#6B7C5E]">{cred.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Decorative background blob */}
              <div className="absolute -inset-4 rounded-3xl bg-[#EFF5EC] -z-10 rotate-2" />
              <img
                src={headshotUrl}
                alt="Heather Clifford — Organizational Coach"
                className="relative w-full max-w-sm rounded-2xl object-cover shadow-lg"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white border border-[#D9E6D3] rounded-xl px-4 py-3 shadow-md">
                <p className="text-xs font-semibold text-[#2D3748]">All Sessions</p>
                <p className="text-sm font-bold text-[#5E8A4A]">on Zoom</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
