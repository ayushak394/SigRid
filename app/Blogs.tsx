"use client"
import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Loader2, ExternalLink, ChevronDown } from "lucide-react"

interface Blog {
  title: string
  url: string
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [activeSection, setActiveSection] = useState<number | null>(null)

  const getRandomReadingTime = () => Math.floor(Math.random() * 8) + 3

  useEffect(() => {
    const fetchData = async () => {
      const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID
      const RANGE = process.env.NEXT_PUBLIC_RANGE
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`

      try {
        const response = await axios.get(url)
        const rows = response.data.values

        if (rows) {
          const formatted = rows.map(([title, url]: [string, string]) => ({
            title,
            url,
          }))
          setBlogs(formatted)
        } else {
          setError("No blog data found.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load blog data.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index)
  }

  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-teal-50 to-white">
      <div className="container max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-4 py-2 rounded-full bg-teal-50 border border-teal-100">
            <span className="text-sm font-medium text-teal-600">Latest Articles</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Insights From Our <span className="text-teal-600">Blog</span>
          </h2>

          <p className="text-lg text-slate-600">
            Stay informed with the latest research, tips, and success stories from our smoking cessation experts.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-teal-600 animate-spin mb-4" />
            <p className="text-slate-600 text-lg">Loading blogs...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl text-center">
            <p className="text-lg">{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {blogs.map((blog, index) => {
              const readingTime = getRandomReadingTime()
              const isEven = index % 2 === 0
              const isActive = activeSection === index

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    className={`overflow-hidden border-0 shadow-lg transition-all duration-300 ${
                      isActive ? "shadow-xl ring-2 ring-teal-300" : "hover:shadow-xl"
                    }`}
                  >
                    <CardContent className="p-0">
                      <div
                        className={`p-6 ${
                          isEven
                            ? "bg-gradient-to-r from-slate-100 to-slate-200"
                            : "bg-gradient-to-r from-teal-600 to-teal-700 text-white"
                        }`}
                      >
                        <div className="flex flex-wrap justify-between items-center gap-4">
                          <div>
                            <h3 className={`text-2xl font-bold ${isEven ? "text-slate-800" : "text-white"}`}>
                              {blog.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-4">
                            <div
                              className={`hidden sm:flex items-center gap-4 text-sm ${isEven ? "text-teal-100" : "text-slate-500"}`}
                            ></div>
                            <Button
                              variant={isEven ? "secondary" : "default"}
                              size="sm"
                              className={`${
                                isEven
                                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                                  : "bg-white/20 hover:bg-white/30 text-white"
                              }`}
                              onClick={() => toggleSection(index)}
                            >
                              {isActive ? "Hide Content" : "Read Article"}
                              <ChevronDown
                                className={`ml-1 h-4 w-4 transition-transform ${isActive ? "rotate-180" : ""}`}
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          isActive ? "max-h-[600px]" : "max-h-0"
                        }`}
                      >
                        <div className="flex justify-center items-center w-full bg-white py-6">
                          <div className="w-full max-w-4xl">
                            <iframe
                              src={`${blog.url}?embedded=true`}
                              width="100%"
                              height="600"
                              style={{ border: "none" }}
                              title={blog.title}
                              className="bg-white w-full"
                            />
                          </div>
                        </div>
                      </div>
                      <div className={`p-4 border-t ${isActive ? "bg-slate-50" : "hidden"}`}>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-slate-500">
                            <span>Viewing article preview</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-teal-200 text-teal-600 hover:bg-teal-50"
                            onClick={() => window.open(blog.url, "_blank")}
                          >
                            Open Full Article
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
        <div className="mt-12 text-center"></div>
      </div>
    </section>
  )
}

export default BlogList
