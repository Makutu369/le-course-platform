export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heart, Users, HandIcon as PrayingHands, ArrowRight, ChevronRight } from "lucide-react";
import StartButton from "@/components/startbtn";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[55vh] md:min-h-[70vh] lg:min-h-[85vh]">
          <div className="absolute inset-0">
            <Image
              src="/wtgf.jpg"
              alt="Church community learning together"
              fill
              className="object-cover brightness-[0.35]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          </div>
          <div className="relative z-10 flex h-[55vh] md:min-h-[70vh] lg:min-h-[85vh] items-center text-white">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-start space-y-6 max-w-3xl">
                <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  <span className="w-2 h-2 bg-primary animate-pulse" />
                  Spiritual Growth Platform
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-black tracking-tight sm:text-6xl xl:text-7xl leading-[0.9]">
                    Love Economy
                    <br />
                    Church Training
                    <br />
                    <span className="text-primary">Platform</span>
                  </h1>
                  <p className="max-w-[600px] text-base sm:text-lg text-white/60 font-medium leading-relaxed">
                    Access educational programs and spiritual development courses designed for your holistic growth in faith and community.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <StartButton />
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                    <Link href="/courses" className="flex items-center gap-2">
                      Browse Courses
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Programs Section */}
        <section className="w-full py-20 md:py-28 bg-muted">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start space-y-2 mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Programs</p>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                Training Programs
              </h2>
              <div className="h-1 w-16 bg-primary mt-4" />
            </div>
            <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4 border-2 border-border">
              {[
                { name: "Temelios", desc: "Foundational course for new believers and spiritual growth." },
                { name: "Welcome To God's family", desc: "Introduction to the church community and core values." },
                { name: "Shepherds Training", desc: "Leadership development for aspiring church leaders." },
                { name: "Cell Shepherd Training", desc: "Intensive program for small group leadership." },
              ].map((category) => (
                <Link
                  key={category.name}
                  href="#"
                  className="group relative bg-card p-8 lg:p-10 hover:bg-accent/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">
                    {category.desc}
                  </p>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 md:py-28">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start space-y-2 mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Why Us</p>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                Why Join Our Learning Community?
              </h2>
              <p className="max-w-[700px] text-muted-foreground text-base mt-2">
                Discover the benefits of learning within our church community
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                {
                  icon: PrayingHands,
                  title: "Spiritual Growth",
                  desc: "Deepen your faith through structured learning and reflection guided by experienced leaders.",
                },
                {
                  icon: Users,
                  title: "Community Learning",
                  desc: "Learn alongside fellow church members in a supportive and collaborative environment.",
                },
                {
                  icon: Heart,
                  title: "Personal Guidance",
                  desc: "Receive one-on-one support from church leaders dedicated to your spiritual development.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group border-2 border-border p-8 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-20 md:py-28 bg-muted">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start space-y-2 mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Testimonials</p>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                What Our Members Say
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  quote:
                    "The Bible study course has deepened my understanding and strengthened my faith journey in ways I never expected.",
                  name: "Sarah Johnson",
                  role: "Church Member",
                },
                {
                  quote:
                    "The marriage and family course provided invaluable insights that transformed our daily relationship and communication.",
                  name: "David & Mary Wilson",
                  role: "Family Ministry",
                },
                {
                  quote:
                    "Youth leadership training has equipped me with practical tools to better serve and inspire our young community.",
                  name: "Michael Thompson",
                  role: "Youth Ministry Volunteer",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between border-2 border-border bg-card p-8 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="mb-6">
                    <div className="text-4xl text-primary/30 font-serif leading-none mb-4">&ldquo;</div>
                    <p className="text-muted-foreground leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 border-t border-border pt-6">
                    <div className="size-10 bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold tracking-tight">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground/60 font-medium uppercase tracking-wider">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-20 md:py-28">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
              <div className="flex flex-col space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">FAQ</p>
                <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                  Common Questions
                </h2>
                <p className="text-muted-foreground text-base mt-2">
                  Find answers to frequently asked questions about our programs
                </p>
              </div>
              <div>
                <Accordion type="single" collapsible className="w-full">
                  {[
                    {
                      question: "How do I join a course?",
                      answer:
                        "Simply sign up for an account, browse our available courses, and enroll in the ones that interest you. You'll receive confirmation and course details via email.",
                    },
                    {
                      question: "Are the courses free?",
                      answer:
                        "Yes, all our courses are free for church members. We believe in making spiritual education accessible to everyone in our community.",
                    },
                    {
                      question: "How long are the courses?",
                      answer:
                        "Course lengths vary depending on the subject matter. Most courses run for 6-8 weeks, with weekly sessions and flexible learning options.",
                    },
                    {
                      question: "Can I participate if I'm new to the church?",
                      answer:
                        "Our courses are open to all members of our church community, including newcomers. It's a great way to get involved and grow in faith.",
                    },
                  ].map((item, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b-2 border-border">
                      <AccordionTrigger className="text-left font-bold hover:text-primary transition-colors py-6">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                  Join Our Learning Community
                </h2>
                <p className="max-w-[600px] text-primary-foreground/70 text-base md:text-lg mx-auto">
                  Start your journey of spiritual growth and learning today
                </p>
              </div>
              <div className="w-full max-w-md mx-auto space-y-3 pt-4">
                <form className="flex gap-2">
                  <Input
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:border-white focus-visible:ring-white/20"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" className="bg-white text-primary hover:bg-white/90 font-bold">
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-primary-foreground/50 font-medium">
                  Join our church&apos;s learning community and grow in faith together.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-border bg-background py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-12">
            <div className="flex flex-col gap-4">
              <Link href="/" className="inline-block">
                <Image src="/logo-black.png" alt="" width={120} height={40} />
              </Link>
              <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-sm">
                Empowering the Love Economy Church through spiritual education, community development, and faith-based learning.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-6 justify-between">
              <div className="flex gap-8 items-center">
                <Link
                  href="#"
                  className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                >
                  Contact
                </Link>
                <Link
                  href="#"
                  className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                >
                  Support
                </Link>
                <Link
                  href="#"
                  className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                >
                  Privacy
                </Link>
              </div>
              <p className="text-xs font-medium text-muted-foreground/40 tracking-widest uppercase">
                © 2025 Love Economy Church. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
