'use client'

import { useState, useEffect } from 'react'

interface Project {
  id: string
  title: string
  subtitle?: string
  image: string
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall'
  position: { top: string; left: string; zIndex: number }
  direction: 'left' | 'right' | 'top' | 'bottom'
}

// Compact project layout with many images in a shorter page
const projects: Project[] = [
  // First viewport (0-100vh) - 8 images
  {
    id: 'revalux',
    title: 'REVALUX',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&crop=center',
    size: 'tall',
    position: { top: '12%', left: '28%', zIndex: 25 },
    direction: 'left'
  },
  {
    id: 'space-awareness',
    title: 'SPACE OF AWARENESS',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop&crop=center',
    size: 'wide',
    position: { top: '50%', left: '8%', zIndex: 20 },
    direction: 'right'
  },
  {
    id: 'selcouth',
    title: 'SELCOUTH',
    image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=350&h=400&fit=crop&crop=center',
    size: 'medium',
    position: { top: '8%', left: '68%', zIndex: 22 },
    direction: 'left'
  },
  {
    id: 'bg1',
    title: '',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=220&h=280&fit=crop&crop=center',
    size: 'small',
    position: { top: '5%', left: '5%', zIndex: 8 },
    direction: 'left'
  },
  {
    id: 'bg2',
    title: '',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=180&h=240&fit=crop&crop=center',
    size: 'small',
    position: { top: '15%', left: '85%', zIndex: 6 },
    direction: 'right'
  },
  {
    id: 'bg3',
    title: '',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop&crop=center',
    size: 'small',
    position: { top: '35%', left: '45%', zIndex: 10 },
    direction: 'left'
  },
  {
    id: 'bg4',
    title: '',
    image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=160&h=220&fit=crop&crop=center',
    size: 'small',
    position: { top: '25%', left: '85%', zIndex: 6 },
    direction: 'right'
  },
  {
    id: 'bg5',
    title: '',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=190&h=140&fit=crop&crop=center',
    size: 'small',
    position: { top: '70%', left: '5%', zIndex: 14 },
    direction: 'left'
  },

  // Second viewport (100-200vh) - 7 images
  {
    id: 'symnosyne',
    title: 'SYMNOSYNE',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop&crop=center',
    size: 'wide',
    position: { top: '125%', left: '25%', zIndex: 18 },
    direction: 'right'
  },
  {
    id: 'escapism',
    title: 'ESCAPISM',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=280&h=400&fit=crop&crop=center',
    size: 'medium',
    position: { top: '105%', left: '75%', zIndex: 16 },
    direction: 'left'
  },
  {
    id: 'serenity',
    title: 'SERENITY',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=350&h=450&fit=crop&crop=center',
    size: 'tall',
    position: { top: '150%', left: '5%', zIndex: 24 },
    direction: 'right'
  },
  {
    id: 'bg6',
    title: '',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=140&h=180&fit=crop&crop=center',
    size: 'small',
    position: { top: '125%', left: '85%', zIndex: 6 },
    direction: 'right'
  },
  {
    id: 'bg7',
    title: '',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=250&h=180&fit=crop&crop=center',
    size: 'small',
    position: { top: '140%', left: '2%', zIndex: 4 },
    direction: 'left'
  },
  {
    id: 'bg8',
    title: '',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&h=160&fit=crop&crop=center',
    size: 'small',
    position: { top: '170%', left: '50%', zIndex: 5 },
    direction: 'right'
  },
  {
    id: 'bg9',
    title: '',
    image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=160&h=120&fit=crop&crop=center',
    size: 'small',
    position: { top: '180%', left: '60%', zIndex: 7 },
    direction: 'left'
  },

  // Third viewport (200-300vh) - 8 images
  {
    id: 'ethereal',
    title: 'ETHEREAL',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&crop=center',
    size: 'wide',
    position: { top: '225%', left: '60%', zIndex: 19 },
    direction: 'left'
  },
  {
    id: 'luminance',
    title: 'LUMINANCE',
    image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=300&h=400&fit=crop&crop=center',
    size: 'medium',
    position: { top: '225%', left: '15%', zIndex: 21 },
    direction: 'right'
  },
  {
    id: 'whispers',
    title: 'WHISPERS',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=350&h=500&fit=crop&crop=center',
    size: 'tall',
    position: { top: '250%', left: '70%', zIndex: 23 },
    direction: 'left'
  },
  {
    id: 'bg10',
    title: '',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150&fit=crop&crop=center',
    size: 'small',
    position: { top: '210%', left: '8%', zIndex: 9 },
    direction: 'right'
  },
  {
    id: 'bg11',
    title: '',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=180&h=200&fit=crop&crop=center',
    size: 'small',
    position: { top: '280%', left: '85%', zIndex: 6 },
    direction: 'left'
  },
  {
    id: 'bg12',
    title: '',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=180&fit=crop&crop=center',
    size: 'small',
    position: { top: '220%', left: '15%', zIndex: 8 },
    direction: 'right'
  },
  {
    id: 'bg13',
    title: '',
    image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=170&h=140&fit=crop&crop=center',
    size: 'small',
    position: { top: '270%', left: '75%', zIndex: 5 },
    direction: 'left'
  },
  {
    id: 'bg14',
    title: '',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=160&h=200&fit=crop&crop=center',
    size: 'small',
    position: { top: '230%', left: '45%', zIndex: 7 },
    direction: 'right'
  },

  // Fourth viewport (300-400vh) - 7 images
  {
    id: 'mystique',
    title: 'MYSTIQUE',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=450&h=300&fit=crop&crop=center',
    size: 'wide',
    position: { top: '325%', left: '10%', zIndex: 17 },
    direction: 'right'
  },
  {
    id: 'enigma',
    title: 'ENIGMA',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=280&h=380&fit=crop&crop=center',
    size: 'medium',
    position: { top: '375%', left: '65%', zIndex: 20 },
    direction: 'left'
  },
  {
    id: 'cascade',
    title: 'CASCADE',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=320&h=420&fit=crop&crop=center',
    size: 'medium',
    position: { top: '300%', left: '25%', zIndex: 22 },
    direction: 'right'
  },
  {
    id: 'bg15',
    title: '',
    image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=170&h=140&fit=crop&crop=center',
    size: 'small',
    position: { top: '320%', left: '75%', zIndex: 5 },
    direction: 'left'
  },
  {
    id: 'bg16',
    title: '',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=160&h=200&fit=crop&crop=center',
    size: 'small',
    position: { top: '320%', left: '45%', zIndex: 7 },
    direction: 'right'
  },
  {
    id: 'bg17',
    title: '',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=140&h=160&fit=crop&crop=center',
    size: 'small',
    position: { top: '370%', left: '85%', zIndex: 6 },
    direction: 'left'
  },
  {
    id: 'bg18',
    title: '',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=180&h=150&fit=crop&crop=center',
    size: 'small',
    position: { top: '320%', left: '8%', zIndex: 8 },
    direction: 'right'
  },

  // Fifth viewport (400-500vh) - 8 images
  {
    id: 'prism',
    title: 'PRISM',
    image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=400&h=350&fit=crop&crop=center',
    size: 'wide',
    position: { top: '425%', left: '45%', zIndex: 18 },
    direction: 'left'
  },
  {
    id: 'nebula',
    title: 'NEBULA',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=450&fit=crop&crop=center',
    size: 'tall',
    position: { top: '425%', left: '8%', zIndex: 25 },
    direction: 'right'
  },
  {
    id: 'spectrum',
    title: 'SPECTRUM',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=350&h=280&fit=crop&crop=center',
    size: 'wide',
    position: { top: '475%', left: '75%', zIndex: 16 },
    direction: 'left'
  },
  {
    id: 'bg19',
    title: '',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=180&fit=crop&crop=center',
    size: 'small',
    position: { top: '420%', left: '65%', zIndex: 5 },
    direction: 'left'
  },
  {
    id: 'bg20',
    title: '',
    image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=160&h=140&fit=crop&crop=center',
    size: 'small',
    position: { top: '420%', left: '25%', zIndex: 7 },
    direction: 'right'
  },
  {
    id: 'bg21',
    title: '',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150&fit=crop&crop=center',
    size: 'small',
    position: { top: '470%', left: '8%', zIndex: 9 },
    direction: 'right'
  },
  {
    id: 'bg22',
    title: '',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=180&h=200&fit=crop&crop=center',
    size: 'small',
    position: { top: '480%', left: '85%', zIndex: 6 },
    direction: 'left'
  },
  {
    id: 'bg23',
    title: '',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=180&fit=crop&crop=center',
    size: 'small',
    position: { top: '420%', left: '15%', zIndex: 8 },
    direction: 'right'
  },

  // Sixth viewport (500-600vh) - 7 images
  {
    id: 'aurora',
    title: 'AURORA',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=320&h=400&fit=crop&crop=center',
    size: 'medium',
    position: { top: '525%', left: '20%', zIndex: 21 },
    direction: 'right'
  },
  {
    id: 'zenith',
    title: 'ZENITH',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
    size: 'wide',
    position: { top: '575%', left: '55%', zIndex: 19 },
    direction: 'left'
  },
  {
    id: 'celestial',
    title: 'CELESTIAL',
    image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=280&h=380&fit=crop&crop=center',
    size: 'medium',
    position: { top: '525%', left: '12%', zIndex: 23 },
    direction: 'right'
  },
  {
    id: 'bg24',
    title: '',
    image: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=170&h=140&fit=crop&crop=center',
    size: 'small',
    position: { top: '520%', left: '75%', zIndex: 5 },
    direction: 'left'
  },
  {
    id: 'bg25',
    title: '',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=160&h=200&fit=crop&crop=center',
    size: 'small',
    position: { top: '520%', left: '45%', zIndex: 7 },
    direction: 'right'
  },
  {
    id: 'bg26',
    title: '',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=140&h=160&fit=crop&crop=center',
    size: 'small',
    position: { top: '570%', left: '85%', zIndex: 6 },
    direction: 'left'
  },
  {
    id: 'bg27',
    title: '',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=180&h=150&fit=crop&crop=center',
    size: 'small',
    position: { top: '520%', left: '8%', zIndex: 8 },
    direction: 'right'
  }
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)

    // Handle scroll events
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Handle mouse movement for parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'w-28 h-32 md:w-40 md:h-48 lg:w-48 lg:h-56'
      case 'medium':
        return 'w-48 h-56 md:w-64 md:h-80 lg:w-80 lg:h-96'
      case 'large':
        return 'w-56 h-72 md:w-80 md:h-96 lg:w-96 lg:h-[28rem]'
      case 'wide':
        return 'w-64 h-40 md:w-80 md:h-48 lg:w-[26rem] lg:h-56'
      case 'tall':
        return 'w-40 h-64 md:w-56 md:h-80 lg:w-72 lg:h-[26rem]'
      default:
        return 'w-48 h-56 md:w-56 md:h-64 lg:w-64 lg:h-72'
    }
  }

  const getInitialTransform = (direction: string) => {
    switch (direction) {
      case 'left':
        return 'translateX(-100vw) translateY(0)'
      case 'right':
        return 'translateX(100vw) translateY(0)'
      case 'top':
        return 'translateX(0) translateY(-100vh)'
      case 'bottom':
        return 'translateX(0) translateY(100vh)'
      default:
        return 'translateX(0) translateY(0)'
    }
  }

  // Calculate animation progress based on scroll position
  const getAnimationProgress = (projectTop: string) => {
    const topPercent = parseFloat(projectTop.replace('%', ''))
    const topPixels = (topPercent / 100) * window.innerHeight
    const scrollThreshold = 200 // pixels before the element to start animation
    const animationRange = 400 // pixels over which the animation happens
    
    const distanceFromViewport = topPixels - scrollY
    const progress = Math.max(0, Math.min(1, (scrollThreshold - distanceFromViewport) / animationRange))
    
    return progress
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.3em] text-white">
            CALVIN PAUSANIA
          </h1>
          <button className="text-sm md:text-base font-light tracking-[0.2em] text-white hover:opacity-70 transition-opacity duration-300">
            MENU
          </button>
        </div>
      </header>

      {/* Main Content - Much shorter scrollable page with scattered images */}
      <main className="relative pt-16 md:pt-20 bg-black" style={{ height: '420vh' }}>
        {projects.map((project, index) => {
          const progress = getAnimationProgress(project.position.top)
          const isAnimated = progress > 0
          
          return (
            <div
              key={project.id}
              className={`absolute ${getSizeClasses(project.size)} project-item transform transition-all duration-[8000ms] ease-out`}
              style={{
                top: project.position.top,
                left: project.position.left,
                zIndex: project.position.zIndex,
                opacity: isAnimated ? progress : 0,
                transform: isAnimated 
                  ? `translate(0, 0) scale(${0.9 + progress * 0.1})` 
                  : getInitialTransform(project.direction),
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                // Add subtle parallax for background elements
                ...(!project.title && {
                  transform: isAnimated
                    ? `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px) scale(${0.9 + progress * 0.1})`
                    : getInitialTransform(project.direction)
                })
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden rounded-sm shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-[6000ms] ease-out"
                  loading="lazy"
                  onError={(e) => {
                    console.log('Image failed to load:', project.image)
                    e.currentTarget.style.display = 'none'
                  }}
                />

                {/* Shimmer effect on load */}
                <div className="absolute inset-0 animate-shimmer opacity-20 pointer-events-none" />

                {/* Project Info - Only show title, no hover effects */}
                {project.title && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                    <h2 
                      className="text-lg md:text-2xl lg:text-4xl font-light tracking-[0.15em] md:tracking-[0.2em] mb-3 md:mb-4 title-glow transform transition-all duration-[7000ms] ease-out"
                      style={{
                        opacity: isAnimated ? progress : 0,
                        transform: isAnimated ? 'translateY(0)' : 'translateY(20px)'
                      }}
                    >
                      {project.title}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Enhanced ambient background elements with subtle parallax */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse transition-transform duration-6000 ease-out"
            style={{
              transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)`
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse transition-transform duration-6000 ease-out"
            style={{
              animationDelay: '2s',
              transform: `translate(${(mousePosition.x - 50) * -0.05}px, ${(mousePosition.y - 50) * -0.05}px)`
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/2 to-transparent rounded-full blur-3xl animate-pulse transition-transform duration-8000 ease-out"
            style={{
              animationDelay: '1s',
              transform: `translate(-50%, -50%) translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`
            }}
          />
        </div>
      </main>
    </div>
  )
}
