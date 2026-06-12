import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "This is awesome! My daughter came downstairs last night just BEAMING! Thank you for working your magic so fast. You immediately put her at ease, validated her struggles and proposed an approachable plan.",
    author: "Barbara",
  },
  {
    quote:
      "Our daughter benefitted tremendously from working with Heather. Heather has been patient, kind, encouraging. Heather's material has been incredibly helpful to our daughter and she continues to use what she learned.",
    author: "Doug",
  },
  {
    quote:
      "Heather helped my 8th grade son with a complete system of organization. This not only helped him ensure that his assignments were all clearly kept in one place, but helped him with time management for his assignments and for test preparation. Having this system allowed him to feel more confident in his school work, thus alleviating some anxiety he had been experiencing. Heather's approach is kind, understanding and effective.",
    author: "Sherri",
  },
]

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.12 }}
      className="h-full"
    >
      <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="h-full">
        <Card className="h-full border-[#D9E6D3] bg-[#FAFAF7] shadow-none hover:shadow-sm transition-shadow">
          <CardContent className="p-7 flex flex-col h-full">
            <Quote className="w-8 h-8 text-[#C3DDB8] mb-4 shrink-0" />
            <p className="text-[#2D3748] leading-relaxed flex-1 text-sm sm:text-base italic">
              "{testimonial.quote}"
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#5E8A4A] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                {testimonial.author[0]}
              </div>
              <p className="font-semibold text-[#2D3748] text-sm">~{testimonial.author}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export function Testimonials() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })

  return (
    <section id="testimonials" className="py-24 bg-[#FAFAF7]">
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
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3748] mb-4">
            What families are saying
          </h2>
          <p className="max-w-xl mx-auto text-[#6B7C5E] text-base sm:text-lg leading-relaxed">
            Real results from real students — more confidence, less stress, and systems
            that actually stick.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
