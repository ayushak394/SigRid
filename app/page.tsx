"use client"
import BlogList from "./Blogs"
import Queries from "./Queries"
import ScrollToTop from "./ScrollIndicator"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  ChevronRight,
  Heart,
  Shield,
  Zap,
  Award,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  ThumbsUp,
  Clock3,
  Play,
  Plus,
  Minus,
  LifeBuoy,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)
  const [selectedFaqCategory, setSelectedFaqCategory] = useState("all")
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)

  const toggleMinimize = () => setIsMinimized(!isMinimized)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
      rootMargin: "-100px 0px -300px 0px",
    })

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      observer.observe(section)
    })

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const faqCategories = ["all", "product", "usage", "safety", "results"]

  const faqItems = [
    {
      question: "How many nicotine doses are in one bottle of SigRid?",
      answer:
        "Each bottle contains 400 metered doses, each dose delivering 0.5mg of nicotine, making it a long-lasting solution for your quitting journey.",
      category: "product",
      icon: <Clock3 className="h-5 w-5" />,
    },
    {
      question: "Is SigRid considered safe to use as a quitting aid?",
      answer:
        "SigRid has been clinically tested and is safe for adults when used as directed. As with any nicotine replacement therapy, it's not recommended for pregnant women, people with certain cardiovascular conditions, or those under 18. Always consult with your healthcare provider before starting any smoking cessation program.",
      category: "safety",
      icon: <AlertCircle className="h-5 w-5" />,
    },
    {
      question: "What is the recommended duration to use SigRid?",
      answer:
        "The recommended treatment period is 12 weeks, with a gradual reduction in usage over time. Most users start seeing a significant reduction in cravings within the first week and can be completely smoke-free within 4-8 weeks. Your individual journey may vary based on your smoking history and personal factors.",
      category: "usage",
      icon: <Clock3 className="h-5 w-5" />,
    },
    {
      question: "Can I combine SigRid with other nicotine therapies?",
      answer:
        "It's generally not recommended to use multiple nicotine replacement therapies simultaneously unless specifically advised by your healthcare provider. SigRid is designed to be effective on its own, but your doctor may recommend a combination approach in certain cases.",
      category: "usage",
      icon: <Info className="h-5 w-5" />,
    },
    {
      question: "What are the possible side effects of using SigRid?",
      answer:
        "Some users may experience mild nasal irritation, sneezing, watery eyes, or throat irritation when first using SigRid. These effects typically subside as your body adjusts to the product. If you experience severe or persistent side effects, discontinue use and consult with your healthcare provider.",
      category: "safety",
      icon: <AlertCircle className="h-5 w-5" />,
    },
    {
      question: "How fast can I expect to see results with SigRid?",
      answer:
        "Most users report a significant reduction in cravings within minutes of using SigRid, which is much faster than other nicotine replacement therapies. The overall success of your quit attempt depends on consistent use and combining SigRid with behavioral strategies for quitting.",
      category: "results",
      icon: <ThumbsUp className="h-5 w-5" />,
    },
  ]

  const filteredFaqs =
    selectedFaqCategory === "all" ? faqItems : faqItems.filter((item) => item.category === selectedFaqCategory)

  const navItems = [
    { href: "#hero", label: "Home", section: "hero" },
    { href: "#about-us", label: "About", section: "about-us" },
    { href: "#KeyMetrics", label: "Key Metrics", section: "KeyMetrics" },
    { href: "#features", label: "Features", section: "features" },
    { href: "#how-to-use", label: "How to Use", section: "how-to-use" },
    { href: "#testimonials", label: "Testimonials", section: "testimonials" },
    { href: "#blog", label: "Blog", section: "blog" },
    { href: "#faq", label: "FAQ's", section: "faq" },
    { href: "#contact", label: "Contact", section: "contact" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrollY > 50 ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent",
        )}
      >
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <span className="text-3xl font-bold text-teal-600">SigRid</span>
          </Link>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-white md:hidden"
            >
              <ul className="flex flex-col items-center gap-8 text-lg">
                {navItems.map((item) => (
                  <motion.li
                    key={item.section}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "relative font-medium transition-colors hover:text-teal-600",
                        activeSection === item.section ? "text-teal-600" : "text-slate-700",
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                      {activeSection === item.section && (
                        <motion.span
                          className="absolute -bottom-1 left-0 h-0.5 w-full bg-teal-500"
                          layoutId="mobileNavIndicator"
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          <nav className="hidden md:block">
            <ul className="flex items-center gap-10">
              {navItems.map((item) => (
                <li key={item.section}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative font-medium transition-colors hover:text-teal-600",
                      activeSection === item.section ? "text-teal-600" : "text-slate-700",
                    )}
                  >
                    {item.label}
                    {activeSection === item.section && (
                      <motion.span
                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-teal-500"
                        layoutId="desktopNavIndicator"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4 z-50">
            <Button variant="ghost" size="icon" className="md:hidden text-slate-700 z-50" onClick={toggleMenu}>
              {isMenuOpen ? (
                <motion.div initial={{ rotate: 0 }} animate={{ rotate: 90 }} transition={{ duration: 0.3 }}>
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 10 }} transition={{ duration: 0.2 }}>
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section id="hero" className="relative min-h-[100vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-50/90 to-white/80" />
          </div>

          <div className="container relative z-10 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="inline-block px-6 py-3 rounded-full bg-teal-50 border border-teal-100">
                  <span className="text-base font-medium text-teal-600">Redefining Smoking Cessation</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900">
                  <span className="block">Sigrid</span>
                  <span className="text-teal-600 block mt-3">Quit Smoking For Good</span>
                </h1>

                <p className="text-2xl text-slate-600">
                  Nicotine Nasal Spray BP 20ml - The most effective way to manage cravings.
                </p>

                <div className="flex flex-wrap gap-6 pt-6">
                  <Button
                    size="lg"
                    className="bg-teal-600 hover:bg-teal-700 text-white text-lg py-6 px-8"
                    onClick={() => {
                      const section = document.getElementById("about-us")
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative h-[300px] md:h-[400px] rounded-full overflow-hidden">
                  <Image
                    src="/EntryPic.png"
                    alt="SigRid Product"
                    fill
                    className="object-cover rounded-2xl shadow-xl"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="about-us" className="py-24 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-block px-4 py-2 rounded-full bg-teal-50 border border-teal-100">
                <span className="text-sm font-medium text-teal-600">Our Story</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                About <span className="text-teal-600">SigRid</span>
              </h2>

              <p className="text-lg text-slate-600">A new chapter, free from nicotine addiction</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/AboutUsPicOne.png?height=500&width=600&text=SigRid+Team"
                    alt="SigRid Team"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h3>
                        <p className="text-slate-700">
                          At SigRid, we believe quitting nicotine is not only about stopping a habit — it's about
                          helping people heal their health, their relationships, and their lives.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg text-slate-700">
                  Our first product — the Nicotine Nasal Spray — is specially designed to give quick relief from
                  cravings. Research shows that fast-acting support helps people avoid relapse and stay committed to
                  quitting. Our goal is to provide healthcare professionals with effective tools that make it easier for
                  patients to break free from addiction.
                </p>

                <p className="text-lg text-slate-700">
                  We are proud to work alongside India's healthcare community to build a healthier, stronger,
                  nicotine-free future. Together, we can bring real change — one patient, one family, and one success
                  story at a time.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                className="space-y-6 order-2 lg:order-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg text-slate-700">
                  At SigRid, we believe nicotine addiction is not just a health problem — it affects a person's mind,
                  family, relationships, and overall quality of life. In India, according to the Global Adult Tobacco
                  Survey (GATS-2), around 28.6% of adults use tobacco, and many struggle silently with the harmful
                  effects of nicotine.
                </p>

                <p className="text-lg text-slate-700">
                  Along with serious health risks like cancer, heart disease, and lung problems, nicotine addiction
                  often causes emotional stress, family issues, financial problems, and mental health challenges like
                  anxiety and depression.
                </p>

                <p className="text-lg text-slate-700">
                  Doctors, nurses, and healthcare workers across India see these effects every day. We started SigRid
                  because we saw an urgent need for better, faster solutions to help patients quit nicotine
                  successfully.
                </p>
              </motion.div>

              <motion.div
                className="relative order-1 lg:order-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/AboutUsPicTwo.png?height=500&width=600&text=Our+Mission"
                    alt="SigRid Mission"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
                        <p className="text-slate-700">
                          To provide effective tools that make it easier for patients to break free from nicotine
                          addiction and reclaim their lives.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="KeyMetrics" className="py-24 bg-gradient-to-b from-white to-teal-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-4 py-2 rounded-full bg-teal-50 border border-teal-100">
                  <span className="text-sm font-medium text-teal-600">Key Statistics</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                  The Urgency of Our <span className="text-teal-600">Mission</span>
                </h2>

                <p className="text-lg text-slate-600">
                  Tracking key metrics helps us measure the urgency of our mission in fighting nicotine addiction and
                  helping people quit smoking for a healthier future. Every day, thousands of lives are lost to
                  tobacco-related illnesses.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card className="border-l-4 border-l-teal-500 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-1">
                        <h3 className="text-3xl font-bold text-teal-600">8M+</h3>
                        <p className="text-sm text-slate-600">Deaths from Tobacco Use Per Year</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-emerald-500 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-1">
                        <h3 className="text-3xl font-bold text-emerald-600">100K+</h3>
                        <p className="text-sm text-slate-600">Deaths from Secondhand Smoke</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-amber-500 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-1">
                        <h3 className="text-3xl font-bold text-amber-600">20+</h3>
                        <p className="text-sm text-slate-600">Types of Cancer Linked to Smoking</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-amber-500 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-1">
                        <h3 className="text-3xl font-bold text-amber-600">$300B+</h3>
                        <p className="text-sm text-slate-600">Annual Healthcare Costs</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => window.open("https://www.who.int/news-room/fact-sheets/detail/tobacco", "_blank")}
                >
                  View All Metrics
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                  <Image src="/KeyMetrics.jpg" alt="Smoking Health Impact" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Did You Know?</h3>
                      <p className="text-slate-700">
                        Quitting smoking is one of the most important steps you can take for your health. Within just 20
                        minutes of quitting, your heart rate drops to a normal level.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-block px-4 py-2 rounded-full bg-teal-50 border border-teal-100">
                <span className="text-sm font-medium text-teal-600">Why Choose SigRid?</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                Features That Make <span className="text-teal-600">The Difference</span>
              </h2>

              <p className="text-lg text-slate-600">
                Our innovative approach to smoking cessation combines cutting-edge technology with deep understanding of
                addiction psychology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Zap className="h-6 w-6 text-white" />,
                  title: "Rapid Absorption",
                  description:
                    "SigRid's proprietary formula ensures the fastest nicotine absorption rate available in the market.",
                  color: "bg-teal-600",
                  delay: 0.1,
                },
                {
                  icon: <Shield className="h-6 w-6 text-white" />,
                  title: "Quick Craving Relief",
                  description:
                    "Experience immediate satisfaction with our fast-acting formula designed to address cravings instantly.",
                  color: "bg-emerald-600",
                  delay: 0.2,
                },
                {
                  icon: <Award className="h-6 w-6 text-white" />,
                  title: "Superior NRT Performance",
                  description:
                    "Delivers nicotine more rapidly than any other Nicotine Replacement Therapy on the market today.",
                  color: "bg-amber-600",
                  delay: 0.3,
                },
                {
                  icon: <Heart className="h-6 w-6 text-white" />,
                  title: "Withdrawal Management",
                  description:
                    "Effectively manages uncomfortable withdrawal symptoms to keep you comfortable throughout your journey.",
                  color: "bg-rose-600",
                  delay: 0.4,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                >
                  <div className="h-full rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 group-hover:translate-y-[-5px]">
                    <div className="p-6 space-y-4">
                      <div className={`h-14 w-14 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                      <p className="text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-20">
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 z-0">
                  <Image src="/ProductPicBackground.png" alt="SigRid Product Banner" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-teal-900/80" />
                </div>

                <div className="relative z-10 p-12 md:p-16 text-white">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h3 className="text-3xl font-bold">Ready to Experience the SigRid Difference?</h3>
                      <p className="text-lg text-teal-50">
                        Join thousands of successful quitters who have transformed their lives with our revolutionary
                        product.
                      </p>

                      <ul className="space-y-3">
                        {[
                          "Clinically proven results",
                          "Fast-acting formula",
                          "Personalized support",
                          "Money-back guarantee",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-teal-300 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative w-[280px] h-[300px] mx-auto">
                      <Image
                        src="/ProductPic.png"
                        alt="SigRid Product"
                        width={280}
                        height={300}
                        className="object-contain mx-auto drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="how-to-use" className="py-24 bg-gradient-to-b from-white to-teal-50">
          <div className="container space-y-20">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-block px-4 py-2 rounded-full bg-teal-50 border border-teal-100">
                <span className="text-sm font-medium text-teal-600">Usage Instructions</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                How to <span className="text-teal-600">Use SigRid</span> Effectively
              </h2>

              <p className="text-lg text-slate-600">
                Follow these simple steps to maximize the effectiveness of SigRid and support your journey to becoming
                smoke-free.
              </p>
            </div>

            <div className="mb-20">
              <motion.div
                className="relative w-full rounded-xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative aspect-[16/9] w-full">
                  {" "}
                  <Image src="/HowToUse.png" alt="SigRid Trial Instructions" fill className="object-cover" priority />
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <motion.div
                className="space-y-12"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-10">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-full flex-shrink-0 mt-1">
                      <span className="font-semibold text-teal-600">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Prepare the Spray</h3>
                      <p className="text-slate-600">
                        Before using SigRid for the first time, prime the spray by pumping it several times until a fine
                        mist appears. Hold the bottle upright with your thumb at the bottom and your index and middle
                        fingers on either side of the nozzle.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-full flex-shrink-0 mt-1">
                      <span className="font-semibold text-teal-600">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Position Correctly</h3>
                      <p className="text-slate-600">
                        Tilt your head back slightly and insert the tip of the bottle into one nostril, pointing toward
                        the back of your nose, not upward. Block the other nostril with your finger.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-full flex-shrink-0 mt-1">
                      <span className="font-semibold text-teal-600">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Apply One Dose</h3>
                      <p className="text-slate-600">
                        Breathe in gently through your nose while pressing firmly on the pump to release one spray. Wait
                        a few minutes before using in the other nostril if needed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-full flex-shrink-0 mt-1">
                      <span className="font-semibold text-teal-600">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Follow Dosage Guidelines</h3>
                      <p className="text-slate-600">
                        Use 1-2 sprays per nostril when you feel a craving coming on, with a maximum of 5 doses per hour
                        and 40 doses per day. Gradually reduce usage over the 12-week program.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-100 shadow-sm">
                  <h3 className="flex items-center gap-3 text-xl font-semibold text-indigo-900 mb-4">
                    <LifeBuoy className="h-6 w-6 text-indigo-600" />
                    Pro Tips for Best Results
                  </h3>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="text-indigo-800">
                        Avoid sniffing, swallowing, or inhaling deeply while spraying
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="text-indigo-800">Use when cravings start, not after they're intense</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="text-indigo-800">Combine with behavioral strategies for best results</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="text-indigo-800">Store at room temperature away from direct sunlight</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                className="space-y-12"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Video Tutorial</h3>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    {videoPlaying ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/iAO-Bxvctqs?autoplay=1"
                        title="SigRid Tutorial Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0"
                      />
                    ) : (
                      <>
                        <Image
                          src="/ThumbNail.png?height=720&width=1280&text=SigRid+Tutorial+Video"
                          alt="Video thumbnail"
                          fill
                          className="object-cover opacity-70"
                          priority
                        />
                        <Button
                          className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-teal-600/90 hover:bg-teal-600 text-white flex items-center justify-center group"
                          onClick={() => setVideoPlaying(true)}
                        >
                          <Play className="h-10 w-10 fill-current group-hover:scale-110 transition-transform" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Why Watch The Tutorial?</h4>
                  <p className="text-slate-600 mb-4">
                    Our video tutorial provides a detailed visual guide to using SigRid correctly. Proper technique
                    ensures maximum effectiveness and comfort during use.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">See proper technique demonstrated by experts</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-24 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-block px-4 py-2 rounded-full bg-teal-50 border border-teal-100">
                <span className="text-sm font-medium text-teal-600">Success Stories</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Testimonials</h2>

              <p className="text-lg text-slate-600">
                Hear from people who have successfully quit smoking with SigRid and transformed their lives for the
                better.
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-full"
              >
                <Card className="overflow-hidden shadow-xl bg-teal-50 rounded-2xl h-full border border-teal-100">
                  <CardContent className="p-0 h-full">
                    <div className="flex flex-col h-full">
                      <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 rounded-b-none rounded-t-2xl">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                            <Image
                              src="/Testimonial1.png?height=64&width=64&text=JD"
                              alt="John Doe"
                              width={128}
                              height={128}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          <div>
                            <h4 className="text-xl font-semibold text-white">Devansh Chaudhary</h4>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex-grow space-y-4">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-slate-700 italic text-lg p-2">
                          "Thanks to Sigrid, I finally managed to kick the smoking habit for good."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-full"
              >
                <Card className="overflow-hidden shadow-xl bg-teal-50 rounded-2xl h-full border border-teal-100">
                  <CardContent className="p-0 h-full">
                    <div className="flex flex-col h-full">
                      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 rounded-b-none rounded-t-2xl">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                            <Image
                              src="/Testimonial3.png?height=64&width=64&text=JD"
                              alt="John Doe"
                              width={128}
                              height={128}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          <div>
                            <h4 className="text-xl font-semibold text-white">Akshay Tyagi</h4>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex-grow space-y-4">
                        <div className="flex text-amber-400">
                          {[...Array(4)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-slate-700 italic text-lg p-2">
                          "I have been using Sigrid for 2 weeks now, and I have almost stopped smoking cigarettes.
                          Whenever I feel the need to smoke, I use the spray, and the cravings go away."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-full"
              >
                <Card className="overflow-hidden shadow-xl bg-teal-50 rounded-2xl h-full border border-teal-100">
                  <CardContent className="p-0 h-full">
                    <div className="flex flex-col h-full">
                      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 rounded-b-none rounded-t-2xl">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                            <Image
                              src="/Testimonial2.png?height=64&width=64&text=JD"
                              alt="John Doe"
                              width={128}
                              height={128}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          <div>
                            <h4 className="text-xl font-semibold text-white">Isha Lal Chandani</h4>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex-grow space-y-4">
                        <div className="flex text-amber-400">
                          {[...Array(4)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-slate-700 italic text-lg p-2">
                          "I started smoking as my work got very stressful. Thanks to Sigrid, I no longer have to be
                          awkward in my workplace."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <BlogList />

        <section id="faq" className="py-24 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-block px-4 py-2 rounded-full bg-teal-50 border border-teal-100">
                <span className="text-sm font-medium text-teal-600">Frequently Asked Questions</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                Common <span className="text-teal-600">Questions</span> About SigRid
              </h2>

              <p className="text-lg text-slate-600">
                Find answers to the most common questions about our product and smoking cessation journey.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {faqCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedFaqCategory(category)}
                    className={`px-5 py-2.5 rounded-full capitalize font-medium transition-all ${
                      selectedFaqCategory === category
                        ? "bg-teal-600 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="grid gap-6">
                {filteredFaqs.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div
                      className={`bg-gradient-to-r from-teal-50 to-slate-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ${
                        activeFaq === index ? "ring-2 ring-teal-300" : ""
                      }`}
                    >
                      <div className="flex items-center cursor-pointer p-6" onClick={() => toggleFaq(index)}>
                        <div className="flex-1 flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center bg-teal-600 text-white shadow-md transition-transform ${
                              activeFaq === index ? "rotate-12" : "group-hover:rotate-3"
                            }`}
                          >
                            {item.icon}
                          </div>
                          <h3 className="text-xl font-bold text-slate-800">{item.question}</h3>
                        </div>
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm transition-all duration-300 ${
                            activeFaq === index ? "bg-teal-600 text-white rotate-180" : "text-teal-600"
                          }`}
                        >
                          {activeFaq === index ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </div>
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          activeFaq === index ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <div className="p-6 pt-0 border-t border-teal-100 ml-16 mr-6 text-slate-600">
                          <p className="text-lg">{item.answer}</p>

                          {activeFaq === index && (
                            <motion.div
                              className="mt-4 flex justify-end"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            ></motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-12 bg-white-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <div className="inline-block px-4 py-1 rounded-full bg-teal-50 border border-teal-100">
                <span className="text-sm font-medium text-teal-600">Get In Touch</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                We're Here To <span className="text-teal-600">Support Your Journey</span>
              </h2>
              <p className="text-base text-slate-600">
                Have questions about SigRid or need support with your smoking cessation journey? Our team of experts is
                ready to help you every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <div className="flex flex-col gap-4 h-full lg:order-1 order-2">
                <div className="h-full w-full rounded-xl overflow-hidden shadow-md">
                  <iframe
                    className="w-full h-full"
                    style={{ width: "100%", height: "100%", border: 0 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3484.4377171868846!2d75.7252501!3d29.151770900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391233260346ecf1%3A0xe584bd3122f2b703!2s1645%2C%20Railway%20Rd%2C%20Mehta%20Nagar%2C%20Hisar%2C%20Haryana%20125011!5e0!3m2!1sen!2sin!4v1745952971343!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="SigRid Location"
                  />
                </div>

                <Card className="shadow-md">
                  <CardContent className="pt-3 pb-3 px-4 space-y-3">
                    {[
                      {
                        icon: <MapPin className="h-5 w-5 text-teal-600" />,
                        title: "Address",
                        text: "1645, Railway Rd, Mehta Nagar, Hisar, Haryana 125011",
                      },
                      {
                        icon: <Phone className="h-5 w-5 text-teal-600" />,
                        title: "Call Us",
                        text: "+91 7027742069",
                      },
                      {
                        icon: <Mail className="h-5 w-5 text-teal-600" />,
                        title: "Email Us",
                        text: "info@sigrid.in",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 text-sm">{item.title}</h3>
                          <p className="text-slate-600 text-sm">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 flex flex-col lg:order-2 order-1">
                <Card className="flex-1 shadow-md h-full bg-indigo-100 bg-opacity-100 rounded-2xl">
                  <CardContent className="py-6 px-6 flex flex-col justify-between h-full">
                    <Queries />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ScrollToTop />

      <footer className="py-1 bg-black bg-opacity-82 mt-10">
        {" "}
        <div className="container max-w-6xl mx-auto px-2 space-y-6">
          {" "}
          <div className="space-y-2">
            {" "}
            <h3 className="text-2xl font-light tracking-[0.2em] text-[#a8bdb1] uppercase bold pt-2">
              <b>The fresh start you've been waiting for.</b>{" "}
            </h3>{" "}
          </div>
          <div className="text-center space-y-4"></div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-[#c8d8d0] pt-10">
            {" "}
            <div className="md:col-span-5 grid grid-cols-2 gap-8">
              {" "}
              <div className="space-y-3">
                {" "}
                <h4 className="text-m font-normal uppercase tracking-widest text-white">Useful Links </h4>{" "}
                <ul className="space-y-2">
                  {" "}
                  <li>
                    {" "}
                    <Link href="#" className="transition-colors tracking-wide  text-sm font-light  text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="#about-us" className=" text-white transition-colors tracking-wide  text-sm font-light">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#how-to-use" className="text-white transition-colors tracking-wide  text-sm font-light">
                      How to Use
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-m font-normal text-white uppercase tracking-widest">Help</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="#contact" className="text-white transition-colors tracking-wide  text-sm font-light">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="#faq" className=" text-white transition-colors tracking-wide  text-sm font-light">
                      FAQ's
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-7 md:pl-10 md:border-l border-[#c8d8d0] space-y-6">
              <p className=" text-white text-base font-light leading-snug">
                SigRid delivers the nicotine in lower quantities than you generally get from cigarettes or other tobacco
                products. Your body gradually adapts to lower levels of nicotine until you no longer need any, thus
                helping you quit.
              </p>
              <div className="flex items-center">
                <div className="h-px flex-grow bg-[#c8d8d0]"></div>
                <div className="mx-4 text-white uppercase">A step closer towards victory</div>
                <div className="h-px flex-grow bg-[#c8d8d0]"></div>
              </div>
            </div>
          </div>
          <div className="text-center pt-6 border-t border-[#c8d8d0]">
            <p className=" text-white text-xs tracking-[0.2em] uppercase font-light pb-2">© 2025 BY SIGRID</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
