import { motion, useInView } from "motion/react"
import { useRef } from "react"
import {
  CalendarDays,
  ListTodo,
  BellRing,
  Backpack,
  Smartphone,
  Timer,
  ClipboardList,
  BookOpen,
  Home,
  Monitor,
} from "lucide-react"

const methods = [
  {
    icon: CalendarDays,
    title: "Calendar System",
    description: "Creating a calendar system that works for the student's individual needs.",
  },
  {
    icon: ListTodo,
    title: "Running To-Do List",
    description: "Making a running To-Do list that is easily created and carried out daily.",
  },
  {
    icon: BellRing,
    title: "Reminder System",
    description: "Implementing a reminder system and the strategic use of alarms as needed.",
  },
  {
    icon: Backpack,
    title: "Workspace & Backpack",
    description: "Setting up a functional, organized workspace and backpack system.",
  },
  {
    icon: Smartphone,
    title: "Cross-Device Sync",
    description:
      "Learning to sync a computer calendar with phone apps for seamless integration.",
  },
  {
    icon: Timer,
    title: "Time Management",
    description: "Establishing effective time management strategies for everyday tasks.",
  },
  {
    icon: ClipboardList,
    title: "Assignment Review",
    description:
      "Reviewing upcoming assignment due dates, exams, and projects to stay ahead.",
  },
  {
    icon: BookOpen,
    title: "Long-Term Planning",
    description:
      "Setting up a schedule to prepare for long-term assignments and exams in advance.",
  },
  {
    icon: Home,
    title: "Life Responsibilities",
    description:
      "Organizing tasks outside of school, such as chores and daily life responsibilities.",
  },
  {
    icon: Monitor,
    title: "Digital Tools",
    description:
      "Implementing My Study Life or another platform specifically for school work.",
  },
]

function AnimatedCard({
  method,
  index,
}: {
  method: (typeof methods)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 5) * 0.07 }}
    >
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="flex gap-4 p-5 rounded-xl border border-[#D9E6D3] bg-white hover:bg-[#FAFAF7] hover:shadow-sm transition-all h-full"
      >
        <div className="shrink-0 w-10 h-10 rounded-lg bg-[#EFF5EC] flex items-center justify-center mt-0.5">
          <method.icon className="w-5 h-5 text-[#5E8A4A]" />
        </div>
        <div>
          <h3 className="font-semibold text-[#2D3748] text-sm mb-1">{method.title}</h3>
          <p className="text-xs text-[#6B7C5E] leading-relaxed">{method.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Methods() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })

  return (
    <section id="methods" className="py-24 bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-[#5E8A4A] uppercase tracking-widest mb-3">
            Methods
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3748] mb-4">
            Functional strategies for everyday tasks
          </h2>
          <p className="max-w-2xl mx-auto text-[#6B7C5E] text-base sm:text-lg leading-relaxed">
            Sessions provide practical, proven techniques your student can start using
            immediately — building habits that grow with them through school and beyond.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 [&>*:last-child]:sm:col-span-2 [&>*:last-child]:lg:col-span-1 [&>*:last-child]:xl:col-span-1">
          {methods.map((method, i) => (
            <AnimatedCard key={i} method={method} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
