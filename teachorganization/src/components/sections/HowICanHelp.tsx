import { motion } from "motion/react"
import { useInView } from "motion/react"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  TrendingUp,
  UserCheck,
  Calendar,
  Shield,
  LayoutDashboard,
} from "lucide-react"

const benefits = [
  { icon: Clock, text: "Teach them to manage their time and meet obligations" },
  { icon: TrendingUp, text: "Reduce stress as their productivity and school management improves" },
  { icon: UserCheck, text: "Facilitate independence from their parents" },
  { icon: Calendar, text: "Create a student-friendly calendar system" },
  { icon: Shield, text: "Help the student gain control over their school life" },
  { icon: LayoutDashboard, text: "Look at workspaces and make them manageable" },
]

const studentTiers = [
  {
    level: "Middle School",
    color: "bg-[#EFF5EC] border-[#C3DDB8]",
    badgeColor: "bg-[#D9E6D3] text-[#3A5E2A]",
    description:
      "Teach the fundamentals of organization and set up systems early in their educational career — building habits that last a lifetime.",
  },
  {
    level: "High School",
    color: "bg-[#FDF7F2] border-[#EDCDB5]",
    badgeColor: "bg-[#F5E6D8] text-[#8B5E3C]",
    description:
      "Help manage their busy lives and teach them the skills they will need for college — balancing sports, jobs, and academics.",
  },
  {
    level: "College",
    color: "bg-[#F7F4FC] border-[#C8BEE0]",
    badgeColor: "bg-[#EAE4F5] text-[#5B4A8A]",
    description:
      "Applying organizational skills to address the new demands of life and education away from home.",
  },
]

function SectionInView({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function HowICanHelp() {
  return (
    <section id="help" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <SectionInView className="text-center mb-16">
          <p className="text-sm font-semibold text-[#5E8A4A] uppercase tracking-widest mb-3">
            How I Can Help
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3748] mb-4">
            As your child's organizational coach, I can:
          </h2>
          <p className="max-w-2xl mx-auto text-[#6B7C5E] text-base sm:text-lg leading-relaxed">
            Students bombarded with homework deadlines, sports, jobs, and other activities
            must be able to manage their commitments. Anxiety and stress can quickly turn to
            avoidance — organization is essential to their success.
          </p>
        </SectionInView>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {benefits.map((benefit, i) => (
            <SectionInView key={i}>
              <motion.div
                whileHover={{ y: -2, scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border-[#D9E6D3] bg-[#FAFAF7] shadow-none hover:shadow-sm transition-shadow">
                  <CardContent className="p-5 flex gap-4 items-start">
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-[#EFF5EC] flex items-center justify-center mt-0.5">
                      <benefit.icon className="w-4 h-4 text-[#5E8A4A]" />
                    </div>
                    <p className="text-sm text-[#2D3748] leading-relaxed">{benefit.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </SectionInView>
          ))}
        </div>

        {/* Student tiers */}
        <SectionInView className="text-center mb-10">
          <p className="text-sm font-semibold text-[#5E8A4A] uppercase tracking-widest mb-3">
            Who I Work With
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#2D3748]">
            Coaching tailored to every stage
          </h3>
        </SectionInView>

        <div className="grid sm:grid-cols-3 gap-5">
          {studentTiers.map((tier, i) => (
            <SectionInView key={i}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className={`rounded-xl border p-6 h-full ${tier.color}`}
              >
                <Badge className={`mb-4 font-semibold text-xs ${tier.badgeColor} border-0`}>
                  {tier.level}
                </Badge>
                <p className="text-sm text-[#2D3748] leading-relaxed">{tier.description}</p>
              </motion.div>
            </SectionInView>
          ))}
        </div>
      </div>
    </section>
  )
}
