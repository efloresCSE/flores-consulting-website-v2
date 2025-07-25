"use client"

import Image from "next/image"
import Link from "next/link"
import { Mail, Linkedin, CheckCircle, Users, BookOpen, Target, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SampleWorkCarousel } from "@/components/ui/sample-work-carousel"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm">F</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">FLORES</h1>
                <p className="text-xs text-gray-300">Consulting & Research</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link href="#home" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                Home
              </Link>
              <Link href="#about" className="hover:text-yellow-400 transition-colors">
                About
              </Link>
              <Link href="#services" className="hover:text-yellow-400 transition-colors">
                Services
              </Link>
              <Link href="#work" className="hover:text-yellow-400 transition-colors">
                Sample Work
              </Link>
              <Link href="#contact" className="hover:text-yellow-400 transition-colors">
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col space-y-1 p-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
              onClick={() => {
                const mobileMenu = document.getElementById("mobile-menu")
                if (mobileMenu) {
                  mobileMenu.classList.toggle("hidden")
                }
              }}
            >
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </button>
          </nav>

          {/* Mobile Navigation Menu */}
          <div id="mobile-menu" className="hidden md:hidden mt-4 pb-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4 pt-4">
              <Link
                href="#home"
                className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
                onClick={() => document.getElementById("mobile-menu")?.classList.add("hidden")}
              >
                Home
              </Link>
              <Link
                href="#about"
                className="hover:text-yellow-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById("mobile-menu")?.classList.add("hidden")}
              >
                About
              </Link>
              <Link
                href="#services"
                className="hover:text-yellow-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById("mobile-menu")?.classList.add("hidden")}
              >
                Services
              </Link>
              <Link
                href="#work"
                className="hover:text-yellow-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById("mobile-menu")?.classList.add("hidden")}
              >
                Sample Work
              </Link>
              <Link
                href="#contact"
                className="hover:text-yellow-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById("mobile-menu")?.classList.add("hidden")}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="mb-4 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                  Educational Technology Expert
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Welcome to Expert Educational Consulting
                </h1>
                <div className="w-16 h-1 bg-yellow-500 mt-4"></div>
              </div>

              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Dr. Israel Flores provides expertise in children&apos;s tech and media, early child development,
                  mixed-method research, multiculturalism, and learner-centered design to support clients in creating
                  engaging experiences that promote deeper learning and reflect the diversity of the world that children
                  play in.
                </p>
                <p>
                  With over a decade of experience in evaluating and developing educational content for use by children
                  and their caregivers, complemented by expertise as an academic researcher, Dr. Flores can support your
                  business or organization by driving impactful content creation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 cursor-pointer"
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Learn More About Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 bg-transparent cursor-pointer transition-all duration-200"
                  onClick={() => (window.location.href = "mailto:israel@floresconsultingllc.com")}
                >
                  Contact Me
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-yellow-500 shadow-2xl">
                  <Image
                    src="/images/dr-flores-headshot.jpg"
                    alt="Dr. Israel Flores"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-gray-900 p-4 rounded-full shadow-lg">
                  <BookOpen className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">About Dr. Israel Flores</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Dr. Israel Flores partners with industry leaders in education, technology, and media who are committed
                  to impacting the lives of children and their families through engaging educational experiences. With
                  over 10 years of experience evaluating, developing, and testing educational digital media, he brings a
                  unique blend of academic insight and industry expertise to drive business goals through
                  research-driven insights.
                </p>
                <p>
                  Before launching his consulting practice, Israel led learning design for children&apos;s content ages
                  2–7 at the award-winning Noggin by Nickelodeon. He specialized in developing content promoting math,
                  literacy, problem solving, and STEM skills, collaborating on beloved properties including Dora the
                  Explorer, Blues Clues, Peppa Pig, and Paw Patrol. As a curriculum expert, he created caregiver
                  resources and family activities that promoted Spanish language learning and extended digital
                  experiences into the physical world.
                </p>
                <p>
                  Born to Mexican immigrants, Israel&apos;s lived experience navigating bilingualism and multicultural
                  contexts shapes his work. He is passionate about ensuring content supports children and families in
                  feeling they belong while being culturally, linguistically, and developmentally appropriate. Israel
                  earned his Ph.D. in psychology from Vanderbilt University, where he explored digital media&apos;s role
                  in supporting learning outcomes among native and non-native English speakers, funded by the National
                  Science Foundation Graduate Research Fellowship Program.
                </p>
                <p>
                  When not developing children&apos;s content, Israel enjoys playing video games, woodworking, and
                  exploring nature with his wife and dogs.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Areas of Expertise:</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Early Child Development",
                    "Educational Technology",
                    "Mixed-Method Research",
                    "Multiculturalism",
                    "Learner-Centered Design",
                    "Content Evaluation",
                    "Academic Research",
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Academic Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ph.D. in Psychology from Vanderbilt University with NSF Graduate Research Fellowship funding.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Industry Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Led learning design at Noggin by Nickelodeon, working with iconic properties and cross-functional
                    teams.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cultural Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Bilingual background and passion for creating inclusive, culturally responsive educational content.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Specialized Consulting Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive expertise in educational technology, research, and content development tailored to your
              organization&apos;s unique needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Content Development Support</CardTitle>
                <CardDescription>
                  Expert consultation for creating effective, engaging, and educationally sound digital media
                  experiences for children.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Content audits and developmental alignment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    UX/UI design reviews and recommendations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Standards-aligned learning objectives
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Caregiver resources and extension activities
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Playtesting & Product Validation</CardTitle>
                <CardDescription>
                  Hands-on playtesting services observing real interactions between children and educational products.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Playtest session design and facilitation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Observational studies and interaction analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Feedback collection from children and caregivers
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Summative evaluations of products and content
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Consumer Insights Research</CardTitle>
                <CardDescription>
                  Research-driven insights into caregiver, educator, and family behaviors, preferences, and needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Surveys, interviews, and focus groups
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Behavioral and attitudinal trend analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Market segmentation and persona development
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Strategic recommendations for positioning
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Multicultural & Inclusive Content</CardTitle>
                <CardDescription>
                  Specialized consulting ensuring educational media authentically represents and resonates with diverse
                  audiences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Cultural representation audits and gap analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Recommendations for authentic content integration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Customized toolkits and resource development
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Culturally responsive learning frameworks
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Work Section */}
      <section id="work" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Sample Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore examples of high-quality learning experiences and comprehensive educational consulting across
              multiple domains.
            </p>
          </div>

          <SampleWorkCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Educational Content?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Let&apos;s work together to create engaging, impactful educational experiences that make a difference.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white bg-transparent cursor-pointer"
              onClick={() => (window.location.href = "mailto:israel@floresconsultingllc.com")}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-sm">F</span>
                </div>
                <div>
                  <h3 className="font-bold">FLORES</h3>
                  <p className="text-sm text-gray-300">Consulting & Research</p>
                </div>
              </div>
              <p className="text-gray-300">
                Expert educational consulting services focused on children&apos;s learning and development.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Educational Technology</li>
                <li>Research & Evaluation</li>
                <li>Content Development</li>
                <li>Multicultural Design</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-yellow-500" />
                  <a
                    href="mailto:israel@floresconsultingllc.com"
                    className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer"
                  >
                    israel@floresconsultingllc.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="h-5 w-5 text-yellow-500" />
                  <a
                    href="https://www.linkedin.com/in/flores-israel/"
                    className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Flores Consulting LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
