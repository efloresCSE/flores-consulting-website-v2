"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  BookOpen,
  Users,
  Target,
  GraduationCap,
  Play,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Props interfaces
interface VideoPlayerProps {
  videoPath: string
  thumbnailPath?: string
  title?: string
  description?: string
  compact?: boolean
  aspectRatio?: string
}

interface PDFViewerProps {
  pdfPath: string
  previewPath?: string
  title?: string
  compact?: boolean
  aspectRatio?: string
}

// Video Player Component with Dynamic Thumbnails
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoPath,
  thumbnailPath,
  title,
  description,
  compact = false,
  aspectRatio = "16/9",
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [dynamicThumbnail, setDynamicThumbnail] = useState<string | null>(null)
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(false)
  const [thumbnailError, setThumbnailError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const generateThumbnail = (video: HTMLVideoElement): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        reject(new Error("Canvas context not available"))
        return
      }

      canvas.width = video.videoWidth || 640
      canvas.height = video.videoHeight || 360

      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const dataURL = canvas.toDataURL("image/jpeg", 0.8)
        resolve(dataURL)
      } catch (thumbnailGenerationError) {
        reject(thumbnailGenerationError)
      }
    })
  }

  useEffect(() => {
    if (videoPath && !dynamicThumbnail && !thumbnailPath) {
      setIsLoadingThumbnail(true)
      setThumbnailError(false)

      const video = document.createElement("video")
      video.crossOrigin = "anonymous"
      video.preload = "metadata"
      video.muted = true

      const cleanup = () => {
        video.removeEventListener("loadedmetadata", onLoadedMetadata)
        video.removeEventListener("seeked", onSeeked)
        video.removeEventListener("error", onVideoError)
      }

      const onLoadedMetadata = () => {
        const seekTime = Math.min(1, video.duration * 0.1)
        video.currentTime = seekTime
      }

      const onSeeked = async () => {
        try {
          const thumbnail = await generateThumbnail(video)
          setDynamicThumbnail(thumbnail)
        } catch {
          setThumbnailError(true)
        } finally {
          setIsLoadingThumbnail(false)
          cleanup()
        }
      }

      const onVideoError = () => {
        setIsLoadingThumbnail(false)
        setThumbnailError(true)
        cleanup()
      }

      video.addEventListener("loadedmetadata", onLoadedMetadata)
      video.addEventListener("seeked", onSeeked)
      video.addEventListener("error", onVideoError)

      video.src = videoPath

      return cleanup
    }
  }, [videoPath, dynamicThumbnail, thumbnailPath])

  if (videoPath && !isPlaying) {
    const thumbnailSrc = dynamicThumbnail || thumbnailPath

    return (
      <div className="relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer" style={{ aspectRatio }}>
        {isLoadingThumbnail ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-500 text-sm">Generating thumbnail...</p>
            </div>
          </div>
        ) : thumbnailSrc && !thumbnailError ? (
          <Image
            src={thumbnailSrc || "/placeholder.svg"}
            alt={title || "Video thumbnail"}
            width={640}
            height={360}
            className="w-full h-full object-cover"
            onError={() => setThumbnailError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              {title && <p className="text-gray-600 font-medium text-sm">{title}</p>}
              <p className="text-gray-500 text-xs mt-1">Click to play video</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
          <div
            className={`${compact ? "w-12 h-12" : "w-20 h-20"} bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg`}
            onClick={() => setIsPlaying(true)}
          >
            <Play className={`${compact ? "w-4 h-4" : "w-8 h-8"} text-white ml-1`} />
          </div>
        </div>

        {title && !compact && !isLoadingThumbnail && thumbnailSrc && !thumbnailError && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-white font-medium text-sm">{title}</p>
            {description && <p className="text-white/80 text-xs mt-1">{description}</p>}
          </div>
        )}
      </div>
    )
  }

  if (videoPath && isPlaying) {
    return (
      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio }}>
        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-full h-full object-cover"
          onEnded={() => setIsPlaying(false)}
          crossOrigin="anonymous"
        >
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio }}>
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
        <div className="text-center">
          <div
            className={`${compact ? "w-8 h-8" : "w-20 h-20"} bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-${compact ? "1" : "3"} hover:bg-blue-600 transition-colors cursor-pointer`}
          >
            <Play className={`${compact ? "w-3 h-3" : "w-8 h-8"} text-white`} />
          </div>
          {title && <p className={`text-gray-600 font-medium ${compact ? "text-xs" : ""}`}>{title}</p>}
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
      </div>
    </div>
  )
}

// PDF Viewer Component with PNG Previews
const PDFViewer: React.FC<PDFViewerProps> = ({ pdfPath, previewPath, title, compact = false, aspectRatio = "4/3" }) => {
  if (pdfPath) {
    return (
      <div className={`bg-white rounded-lg overflow-hidden shadow-sm`}>
        <div className="relative" style={{ aspectRatio }}>
          <Image
            src={previewPath || "/placeholder.svg"}
            alt={`${title || "PDF"} preview`}
            width={400}
            height={300}
            className="w-full h-full object-cover border-b border-gray-200"
          />
        </div>
        <div className="p-3 text-center">
          <a
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-${compact ? "3" : "4"} py-${compact ? "1.5" : "2"} text-${compact ? "xs" : "sm"} font-medium rounded cursor-pointer transition-colors`}
          >
            <Download className={`${compact ? "w-3 h-3" : "w-4 h-4"}`} />
            {title || "Read Me"}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-sm`}>
      <div className="relative bg-gray-100" style={{ aspectRatio }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div
              className={`${compact ? "w-8 h-10" : "w-12 h-14"} bg-red-500 rounded flex items-center justify-center mx-auto mb-2`}
            >
              <svg className={`${compact ? "w-4 h-4" : "w-6 h-6"} text-white`} fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className={`text-gray-500 ${compact ? "text-xs" : "text-sm"}`}>PDF Preview</p>
          </div>
        </div>
      </div>
      <div className="p-3 text-center">
        <Button
          className={`bg-red-600 hover:bg-red-700 text-white px-${compact ? "3" : "4"} py-${compact ? "1.5" : "2"} text-${compact ? "xs" : "sm"} cursor-pointer`}
        >
          {title || "Read Me"}
        </Button>
      </div>
    </div>
  )
}

const SampleWorkCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sampleWorks = [
    {
      id: 1,
      title: "High Quality Learning Experiences",
      icon: <Target className="h-6 w-6" />,
      content: (
        <div className="h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">High Quality Learning Experiences</h3>
                <div className="w-20 h-1 bg-yellow-500 mb-8"></div>
              </div>
              <div className="space-y-6 text-lg text-gray-600">
                <p className="leading-relaxed">
                  I have served as the curriculum expert and learning experience designer on many top interactive
                  pieces, such as <em className="font-semibold text-gray-900">Ruff, Ruff, Repairs</em>. Advancing the
                  development of content by identifying learning objectives, developing creative proposals, reviewing
                  creative pitches, wireframes, script, and content builds.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                  <p className="text-gray-700 text-lg">
                    <strong>Featured:</strong> <em>Ruff, Ruff, Repairs</em> lets little builders play with literacy
                    activities while interacting with Rubble and his family to repair buildings in Builder Cove.
                  </p>
                </div>
                <div className="pt-4">
                  <p className="text-gray-600 leading-relaxed">
                    This interactive experience combines educational content with engaging gameplay, creating meaningful
                    learning opportunities that resonate with young learners and support their developmental needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Card className="overflow-hidden shadow-2xl max-w-lg w-full">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-8 text-white text-center">
                  <h4 className="font-bold text-xl mb-3">LOOK INSIDE</h4>
                  <h3 className="text-3xl font-bold">Ruff, Ruff Repairs</h3>
                </div>
                <div className="p-8">
                  <VideoPlayer
                    videoPath={"ruff-ruff-repairs.mp4"}
                    title="Ruff, Ruff Repairs Demo"
                    description="Click to play interactive preview"
                  />
                  <div className="mt-6 text-center">
                    <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium">
                      Interactive Learning Game
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Designing Experiences for Families",
      icon: <Users className="h-6 w-6" />,
      content: (
        <div className="h-full flex items-center justify-center">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Designing Experiences for Families</h3>
              <div className="w-16 h-1 bg-yellow-500 mx-auto mb-3"></div>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                Creating caregiver resources that complement digital interactive content and support shared experiences.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Noggin Knows Books */}
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-5 text-white shadow-xl">
                <div className="text-center mb-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mb-2">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-1">Interactive Stories</h4>
                  <h3 className="text-xl font-bold">Noggin Knows Books</h3>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 mb-3">
                  <VideoPlayer videoPath={"nogging-knows-book.mp4"} title="Interactive Story Demo" compact={true} />
                </div>
                <p className="text-white/90 text-center text-xs">
                  Interactive stories with dialogic questions for deeper conversation during shared reading.
                </p>
              </div>
              {/* Right Side - Reading Guide */}
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-5 text-white shadow-xl">
                <div className="text-center mb-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mb-2">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-1">Reading Guide</h4>
                  <h3 className="text-xl font-bold">Shared Techniques</h3>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 mb-3">
                  <PDFViewer
                    pdfPath={"dialogic-reading.pdf"}
                    previewPath="dialogic-reading-cover.png"
                    title="Download PDF Guide"
                    compact={true}
                  />
                </div>
                <p className="text-white/90 text-center text-xs">
                  Techniques for maximizing shared reading with digital and print books.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Impactful Formative Research",
      icon: <BookOpen className="h-6 w-6" />,
      content: (
        <div className="h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Impactful Formative Research</h3>
                <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
              </div>
              <div className="space-y-6 text-lg text-gray-600">
                <p className="leading-relaxed">
                  As a lead researcher, I have carried out formative learning impact evaluations for linear and
                  interactive content and provided ongoing recommendations to quickly improve content at various phases
                  of development on an iterative basis, like our award-winning Blue&apos;s Clues and You game.
                </p>
                <p className="leading-relaxed">
                  I designed testing protocols, conducted 1-on-1 Zoom sessions with children & caregivers, and presented
                  findings with design recommendations.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <p className="text-gray-700 text-lg">
                    <strong>Featured:</strong> Noggin&apos;s award-winning Blue&apos;s Clues game brings players to
                    Blue&apos;s world and teaches them about caring for animals!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Card className="overflow-hidden shadow-2xl max-w-lg w-full">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-8 text-white text-center">
                  <h4 className="font-bold text-xl mb-3">AWARD-WINNING GAME</h4>
                  <h3 className="text-3xl font-bold">Blue&apos;s Clues & You</h3>
                </div>
                <div className="p-8">
                  <VideoPlayer
                    videoPath={"BCY Farm.mp4"}
                    title="Blue&apos;s Clues Game Demo"
                    description="Click to play interactive preview"
                  />
                  <div className="mt-6 text-center">
                    <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium">
                      Award-Winning Educational Game
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Creating for Belonging",
      icon: <Users className="h-6 w-6" />,
      content: (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 lg:p-6 h-full">
          <div className="max-w-5xl mx-auto h-full flex flex-col justify-center">
            <div className="text-center mb-4">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">Creating for Belonging</h3>
              <div className="w-12 h-1 bg-purple-500 mx-auto mb-3"></div>
              <p className="text-gray-800 text-sm max-w-3xl mx-auto">
                My lived experience navigating bilingualism and multicultural contexts ensures content supports children
                in feeling they belong while being culturally, linguistically, and developmentally appropriate.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-4 items-start">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 text-sm">Inclusive Design Principles:</h4>
                <ul className="space-y-1">
                  <li className="flex items-start">
                    <CheckCircle className="h-3 w-3 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 text-xs">Multicultural character representation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-3 w-3 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 text-xs">Accessibility-first content design</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-3 w-3 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 text-xs">Culturally responsive learning materials</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-3 w-3 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 text-xs">Universal design for learning (UDL)</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <Card className="bg-white/90 backdrop-blur border-purple-200">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-2 text-white text-center">
                    <h4 className="font-bold text-xs mb-1">FEATURED PROJECT</h4>
                    <h3 className="text-sm font-bold">Family Picture Maker</h3>
                  </div>
                  <div className="p-2">
                    <VideoPlayer videoPath={"family-maker.mp4"} title="Play Demo" compact={true} aspectRatio="16/9" />
                    <p className="text-gray-700 text-xs mt-2">
                      Empowers children to create family portraits while encouraging thinking about similarities and
                      differences.
                    </p>
                  </div>
                </Card>
              </div>
              <div className="space-y-2">
                <Card className="bg-white/90 backdrop-blur border-pink-200">
                  <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 text-white text-center">
                    <h4 className="font-bold text-xs mb-1">FEATURED PROJECT</h4>
                    <h3 className="text-sm font-bold">Juego de las Estatuas</h3>
                  </div>
                  <div className="p-2">
                    <PDFViewer
                      pdfPath={"estatuas.pdf"}
                      previewPath="estatuas.png"
                      title="Read Me"
                      compact={true}
                      aspectRatio="4/3"
                    />
                    <p className="text-gray-700 text-xs mt-2">
                      Helps children learn different sounds of music from various cultures while moving their bodies.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: "Academic Research and Expertise",
      icon: <GraduationCap className="h-6 w-6" />,
      content: (
        <div className="h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Academic Research and Expertise</h3>
                <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  I am dedicated to understanding how children make sense of technology and digital media, how digital
                  tools affect cognitive development & learning outcomes, and to developing approaches that support
                  young learners in today&apos;s digital landscape.
                </p>
                <p>
                  My areas of expertise include children&apos;s symbolic development, best practices in educational
                  media, and interactions between culture, language, and technology.
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-gray-700">
                    <strong>Research Areas:</strong> Early childhood education, educational technology, multicultural
                    learning environments, and family engagement in digital learning.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">Academic Contributions:</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const publicationsDiv = document.getElementById("publications-list")
                      if (publicationsDiv) {
                        publicationsDiv.style.display = publicationsDiv.style.display === "none" ? "block" : "none"
                      }
                    }}
                    className="text-xs cursor-pointer"
                  >
                    View Publications
                  </Button>
                </div>
                <div
                  id="publications-list"
                  style={{ display: "none" }}
                  className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto"
                >
                  <div className="space-y-2 text-xs text-gray-600">
                    <p>
                      • Hwang, J. K., Mancilla-Martinez, J., Flores, I., & McClain, J. B. (2022). The relationship among
                      home language use, parental beliefs, and Spanish-speaking children&apos;s vocabulary.
                      International journal of bilingual education and bilingualism, 25(4), 1175-1193.
                    </p>
                    <p>
                      • McClain, J. B., Mancilla-Martinez, J., Flores, I., & Buckley, L. (2021). Translanguaging to
                      support emergent bilingual students in English dominant preschools. Bilingual Research Journal,
                      44(2), 158–173.
                    </p>
                    <p>
                      • Russo Johnson, C., Flores, I., & Troseth, G. L. (2021). Do young children of the &quot;selfie
                      generation&quot; understand digital photos as representations? Human Behavior and Emerging
                      Technologies, 3(4), 512–524.
                    </p>
                    <p>
                      • Troseth, G. L., Strouse, G. A., Flores, I., Stuckelman, Z. D., & Johnson, C. R. (2020). An
                      enhanced eBook facilitates parent–child talk during shared reading by families of low
                      socioeconomic status. Early childhood research quarterly, 50, 45–58.
                    </p>
                    <p>
                      • Flores, I. (2020). The Role of Symbolic Experience in Learning to use Scale Models [PhD thesis].
                      Vanderbilt University.
                    </p>
                    <p>
                      • Hwang, J. K., Mancilla-Martinez, J., McClain, J. B., Oh, M. H., & Flores, I. (2020).
                      Spanish-speaking English learners&apos; English language and literacy skills. Applied
                      Psycholinguistics, 41(1), 1–24.
                    </p>
                    <p>
                      • Rasmussen, E. E., Strouse, G. A., Colwell, M. J., et al. (2019). Promoting preschoolers&apos;
                      emotional competence through prosocial TV and mobile app use. Media Psychology, 22(1), 1–22.
                    </p>
                    <p>
                      • Troseth, G. L., Flores, I., & Stuckelman, Z. D. (2019). When representation becomes reality:
                      Interactive digital media and symbolic development. Advances in child development and behavior,
                      56, 65–108.
                    </p>
                    <p>
                      • Flores, I. (2017). Language brokering during shared ebook reading [Masters Thesis]. Vanderbilt
                      University.
                    </p>
                    <p>
                      • Troseth, G. L., Mancilla-Martinez, J., & Flores, I. (2018). Bilingual Children: Active Language
                      Learners as Language Brokers. Active Learning from Infancy to Childhood, 233–259.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Peer-reviewed journal publications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Conference presentations and keynotes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Grant-funded research projects</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Collaborative research partnerships</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center p-6 border-2 border-blue-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-sm text-gray-600">Publications</div>
                </Card>
                <Card className="text-center p-6 border-2 border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                  <div className="text-sm text-gray-600">Presentations</div>
                </Card>
                <Card className="text-center p-6 border-2 border-purple-200">
                  <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
                  <div className="text-sm text-gray-600">Research Grants</div>
                </Card>
                <Card className="text-center p-6 border-2 border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">10+</div>
                  <div className="text-sm text-gray-600">Collaborations</div>
                </Card>
              </div>
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Research Focus Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge className="bg-blue-100 text-blue-800 mr-2 mb-2">Early Childhood Development</Badge>
                    <Badge className="bg-green-100 text-green-800 mr-2 mb-2">Educational Technology</Badge>
                    <Badge className="bg-purple-100 text-purple-800 mr-2 mb-2">Multicultural Education</Badge>
                    <Badge className="bg-orange-100 text-orange-800 mr-2 mb-2">Family Engagement</Badge>
                    <Badge className="bg-pink-100 text-pink-800 mr-2 mb-2">Digital Learning</Badge>
                    <Badge className="bg-indigo-100 text-indigo-800 mr-2 mb-2">Child Development</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sampleWorks.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sampleWorks.length) % sampleWorks.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative">
      {/* Desktop Carousel */}
      <div className="hidden md:block">
        {/* Navigation Arrows */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="bg-white shadow-lg hover:bg-gray-50 border-gray-200 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="bg-white shadow-lg hover:bg-gray-50 border-gray-200 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {/* Content */}
        <div className="mx-12">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center space-x-2 text-yellow-600">{sampleWorks[currentSlide].icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{sampleWorks[currentSlide].title}</h3>
            </div>
          </div>
          <div className="h-[700px] overflow-y-auto">{sampleWorks[currentSlide].content}</div>
        </div>
        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {sampleWorks.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${index === currentSlide ? "bg-yellow-500" : "bg-gray-300 hover:bg-gray-400"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        {/* Slide Counter */}
        <div className="text-center mt-4 text-sm text-gray-500">
          {currentSlide + 1} of {sampleWorks.length}
        </div>
      </div>
      {/* Mobile Tab Navigation */}
      <div className="md:hidden">
        {/* Tab Navigation */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 text-center mb-4">Tap to explore different work samples</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sampleWorks.map((work, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border-2 cursor-pointer ${index === currentSlide
                  ? "bg-yellow-500 text-white border-yellow-500 shadow-lg transform scale-105"
                  : "bg-white text-gray-700 border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 shadow-sm"
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${index === currentSlide ? "bg-white/20" : "bg-gray-100"}`}>
                    <div className={index === currentSlide ? "text-white" : "text-yellow-600"}>{work.icon}</div>
                  </div>
                  <span className="text-left flex-1 leading-tight">{work.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Mobile Content */}
        <div className="px-4">
          <div className="min-h-[500px]">{sampleWorks[currentSlide].content}</div>
        </div>
      </div>
    </div>
  )
}

export { SampleWorkCarousel }
