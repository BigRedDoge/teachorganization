import { useState } from "react"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactFormValues } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Video, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type SubmitStatus = "idle" | "loading" | "success" | "error"

export function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle")
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: "-80px" })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Server error")
      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-[#5E8A4A] uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3748] mb-4">
            Ready to get organized?
          </h2>
          <p className="max-w-xl mx-auto text-[#6B7C5E] text-base sm:text-lg leading-relaxed">
            Feel free to reach out with any questions or to schedule a free consultation.
            All student sessions are held on Zoom.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-[#EFF5EC] rounded-2xl border border-[#C3DDB8]">
                <CheckCircle2 className="w-12 h-12 text-[#5E8A4A] mb-4" />
                <h3 className="text-xl font-bold text-[#2D3748] mb-2">Message Sent!</h3>
                <p className="text-[#6B7C5E] mb-6">
                  Thank you for reaching out. I'll get back to you shortly.
                </p>
                <Button
                  variant="outline"
                  className="border-[#5E8A4A] text-[#5E8A4A] hover:bg-[#EFF5EC]"
                  onClick={() => setStatus("idle")}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[#2D3748] font-medium text-sm">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    {...register("name")}
                    className={cn(
                      "border-[#D9E6D3] focus-visible:ring-[#5E8A4A] bg-[#FAFAF7]",
                      errors.name && "border-red-400 focus-visible:ring-red-400"
                    )}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[#2D3748] font-medium text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className={cn(
                      "border-[#D9E6D3] focus-visible:ring-[#5E8A4A] bg-[#FAFAF7]",
                      errors.email && "border-red-400 focus-visible:ring-red-400"
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-[#2D3748] font-medium text-sm">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your student and how I can help…"
                    rows={5}
                    {...register("message")}
                    className={cn(
                      "border-[#D9E6D3] focus-visible:ring-[#5E8A4A] bg-[#FAFAF7] resize-none",
                      errors.message && "border-red-400 focus-visible:ring-red-400"
                    )}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Something went wrong. Please try again or reach out by phone.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#5E8A4A] hover:bg-[#4A7038] text-white h-11 font-medium"
                >
                  {status === "loading" ? "Sending…" : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="rounded-xl border border-[#D9E6D3] bg-[#FAFAF7] p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#EFF5EC] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#5E8A4A]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#6B7C5E] uppercase tracking-wide mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+18603054922"
                    className="text-[#2D3748] font-semibold hover:text-[#5E8A4A] transition-colors text-lg"
                  >
                    860-305-4922
                  </a>
                </div>
              </div>

              <div className="h-px bg-[#D9E6D3]" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#EFF5EC] flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5 text-[#5E8A4A]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#6B7C5E] uppercase tracking-wide mb-1">
                    Session Format
                  </p>
                  <p className="text-[#2D3748] font-semibold">All sessions on Zoom</p>
                  <p className="text-xs text-[#6B7C5E] mt-0.5">
                    Work from the comfort of home
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#D9E6D3] bg-[#EFF5EC] p-6">
              <p className="text-sm font-semibold text-[#2D3748] mb-2">
                Heather Clifford
              </p>
              <p className="text-xs text-[#6B7C5E] leading-relaxed">
                Organizational Coach for Students · BA Health Science, Simmons University ·
                MA Occupational Therapy, Boston University
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
