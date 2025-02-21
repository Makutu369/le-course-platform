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
import { Heart, Users, HandIcon as PrayingHands } from "lucide-react";
import { LoginModal } from "./(components)/login-modal";
import ThemeToggle from "./(components)/theme-mode";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl tracking-tight mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Love Economy Church</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Available Courses
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              My Learning
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Resources
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LoginModal />
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-[80vh]">
          <div className="absolute inset-0">
            <Image
              src="/wtgf.jpg"
              alt="Church community learning together"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="relative z-10 flex min-h-[80vh] items-center text-white">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Love Economy Church training platform
                  </h1>
                  <p className="mx-auto max-w-[600px] text-xl text-white/85">
                    Access educational programs and spiritual development
                    courses
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse Courses
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Programs Section */}
        <section className=" bg-muted w-full py-16 md:py-24">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Current Programs
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Join our ongoing courses and grow with your church community
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Bible Study Foundations",
                "Prayer & Meditation",
                "Christian Leadership",
                "Family & Marriage",
                "Youth Ministry",
                "Community Service",
              ].map((category) => (
                <Link
                  key={category}
                  href="#"
                  className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-2">{category}</h3>
                  <p className="text-sm text-muted-foreground">
                    Starting next session
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Why Join Our Learning Community?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Discover the benefits of learning within our church community
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-center gap-8 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <PrayingHands className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Spiritual Growth</h3>
                <p className="text-sm text-muted-foreground">
                  Deepen your faith through structured learning and reflection
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Community Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Learn alongside fellow church members in a supportive
                  environment
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Personal Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Receive support from church leaders
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-16 md:py-24 bg-muted">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Testimonials
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Hear from members and leaders of our church
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-8 py-12 lg:grid-cols-3">
              {[
                {
                  quote:
                    "The Bible study course has deepened my understanding and strengthened my faith journey.",
                  name: "Sarah Johnson",
                  role: "Church Member",
                },
                {
                  quote:
                    "The marriage and family course provided valuable insights for our relationship.",
                  name: "David & Mary Wilson",
                  role: "Family Ministry",
                },
                {
                  quote:
                    "Youth leadership training has equipped me to better serve our young community.",
                  name: "Michael Thompson",
                  role: "Youth Ministry Volunteer",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between space-y-4 rounded-xl border p-6 shadow-sm"
                >
                  <p className="text-muted-foreground italic">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
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
        <section className="w-full py-16 md:py-24">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Common Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Find answers to frequently asked questions about our programs
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl w-full py-12">
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
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-muted">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Join Our Learning Community
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Start your journey of spiritual growth and learning today
                </p>
              </div>
              <div className="w-full max-w-md mx-auto space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  Join our churchs learning community and grow in faith together
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-6 md:py-0">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2024 Church Learning Center. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Contact Us
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Support
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              About
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
}
