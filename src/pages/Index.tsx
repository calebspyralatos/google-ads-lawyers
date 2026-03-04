import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectImage } from "@/components/ui/project-image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { Star, TrendingUp, Target, Zap, Shield, CheckCircle, XCircle, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { MovingBorderButton } from "@/components/ui/moving-border-button";

const CountUpNumber = ({ value, duration = 2000 }: { value: string; duration?: number }) => {
  const [displayValue, setDisplayValue] = React.useState("0");
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Extract numeric value and detect decimal points
          const numericMatch = value.match(/[\d.]+/);
          const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
          const isPercentage = value.includes("%");
          const isDollar = value.includes("$");
          const isPound = value.includes("£");
          const hasK = value.includes("K") || value.includes("k");
          const hasDecimal = value.includes(".");

          // Count decimal places in original value
          const decimalPlaces = hasDecimal && numericMatch
            ? (numericMatch[0].split('.')[1] || '').length
            : 0;

          const startTime = Date.now();

          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const currentValue = hasDecimal
              ? (progress * numericValue).toFixed(decimalPlaces)
              : Math.floor(progress * numericValue).toString();

            let display = currentValue.toString();
            if (isDollar) display = hasK ? `$${display}K` : `$${display}`;
            if (isPound) display = hasK ? `£${display}K` : `£${display}`;
            if (isPercentage) display = `+${display}%`;

            setDisplayValue(display);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          animate();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return <div ref={elementRef}>{displayValue}</div>;
};
import heroProfile from "@/assets/hero-profile.png";
import promiseProfile from "@/assets/promise-profile.png";
import project1 from "@/assets/Case Study 1.png";
import project2 from "@/assets/Case Study 2.png";
import project3 from "@/assets/Case Study 3.png";
import upworkProof from "@/assets/Copy of upwork profile.png";
import courseImage from "@/assets/course-image.png";
import adamK from "@/assets/Adam K.jpeg";
import davidG from "@/assets/David G.webp";
import jankaM from "@/assets/Janka-Mifsud.png";
import brandonR from "@/assets/Brandon Rall.jpeg";
import alexC from "@/assets/Alex Chen.png";
import andyG from "@/assets/Andy G.jpeg";
import danielB from "@/assets/Daniel.webp";
import nathanielC from "@/assets/Nathaniel.jpg";
import websiteLogo from "@/assets/website-logo.png";
import nonCompete from "@/assets/non-compete.png";

// Logo imports
import logo1 from "@/assets/logos/1.png";
import logo2 from "@/assets/logos/2.png";
import logo3 from "@/assets/logos/3.png";
import logo4 from "@/assets/logos/4.png";
import logo5 from "@/assets/logos/5.png";
import logo6 from "@/assets/logos/6.png";
import logo7 from "@/assets/logos/7.png";
import logo8 from "@/assets/logos/8.png";
import logo9 from "@/assets/logos/9.png";
import logo10 from "@/assets/logos/10.png";
import logo11 from "@/assets/logos/11.png";
import logo12 from "@/assets/logos/12.png";
import logo13 from "@/assets/logos/13.png";
import logo14 from "@/assets/logos/14.png";
import logo15 from "@/assets/logos/15.png";
import logo16 from "@/assets/logos/16.png";

const testimonialVideos = [
  {
    vimeoUrl: "https://player.vimeo.com/video/1154293627?title=0&byline=0&portrait=0",
    alt: "Client Testimonial 1",
    name: "Jonathan R.",
    subtitle: "Appellate/Criminal Lawyer, New York"
  },
  {
    vimeoUrl: "https://player.vimeo.com/video/1154051560?title=0&byline=0&portrait=0",
    alt: "Client Testimonial 2",
    name: "Daniel J."
  },
  {
    vimeoUrl: "https://player.vimeo.com/video/1154051654?title=0&byline=0&portrait=0",
    alt: "Client Testimonial 3",
    name: "Emily L."
  },
  {
    vimeoUrl: "https://player.vimeo.com/video/1154051753?title=0&byline=0&portrait=0",
    alt: "Client Testimonial 4",
    name: "Logan C."
  },
  {
    vimeoUrl: "https://player.vimeo.com/video/1154051832?title=0&byline=0&portrait=0",
    alt: "Client Testimonial 5",
    name: "Allyca C."
  },
  {
    vimeoUrl: "https://player.vimeo.com/video/1154051869?title=0&byline=0&portrait=0",
    alt: "Client Testimonial 6",
    name: "John B."
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const iframeRefs = React.useRef<(HTMLIFrameElement | null)[]>([]);
  const touchStartX = React.useRef<number>(0);
  const touchEndX = React.useRef<number>(0);

  // Pause all videos when changing slides
  React.useEffect(() => {
    iframeRefs.current.forEach((iframe, index) => {
      if (iframe && index !== currentIndex) {
        // Send pause command to Vimeo player
        iframe.contentWindow?.postMessage('{"method":"pause"}', '*');
      }
    });
  }, [currentIndex]);

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialVideos.length);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialVideos.length) % testimonialVideos.length);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Minimum swipe distance to trigger

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped left - go to next
        handleNext();
      } else {
        // Swiped right - go to previous
        handlePrev();
      }
    }
  };

  return (
    <>
      <div
        className="relative w-full h-full flex items-center justify-center touch-pan-y"
      >
        {/* Mobile touch overlays on sides to capture swipe gestures - leave center open for video interaction */}
        <div
          className="absolute inset-y-0 left-0 w-[20%] z-[15] md:hidden"
          style={{ touchAction: 'pan-y' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
        <div
          className="absolute inset-y-0 right-0 w-[20%] z-[15] md:hidden"
          style={{ touchAction: 'pan-y' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />

        {testimonialVideos.map((video, index) => {
          const offset = index - currentIndex;
          const total = testimonialVideos.length;
          let pos = (offset + total) % total;
          if (pos > Math.floor(total / 2)) {
            pos = pos - total;
          }

          const isCenter = pos === 0;
          const isAdjacent = Math.abs(pos) === 1;

          return (
            <div
              key={index}
              className={cn(
                'absolute w-64 h-[360px] md:w-[400px] md:h-[600px] transition-all duration-500 ease-in-out',
                'flex items-center justify-center',
                !isCenter && 'pointer-events-none'
              )}
              style={{
                transform: `
                  translateX(${(pos) * 45}%)
                  scale(${isCenter ? 1 : isAdjacent ? 0.85 : 0.7})
                  rotateY(${(pos) * -10}deg)
                `,
                zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                opacity: isCenter ? 1 : isAdjacent ? 0.4 : 0,
                filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                visibility: Math.abs(pos) > 1 ? 'hidden' : 'visible',
              }}
            >
              <div className="w-full h-full flex flex-col">
                <div className="relative flex-1 rounded-3xl shadow-2xl overflow-visible">
                  {/* Green gradient border for active video */}
                  {isCenter && (
                    <div className="absolute -inset-[1.5px] rounded-3xl bg-gradient-to-r from-green-950 via-emerald-950 to-green-950 -z-10" />
                  )}

                  <div className={cn(
                    "relative w-full h-full rounded-3xl overflow-hidden bg-card",
                    isCenter ? "border-0" : "border-2 border-border/50"
                  )}>
                    <iframe
                      ref={(el) => (iframeRefs.current[index] = el)}
                      src={video.vimeoUrl}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      allowFullScreen
                      title={video.alt}
                    ></iframe>
                  </div>
                </div>
                <div className="pt-2 md:pt-4">
                  <p className="text-base md:text-xl font-bold text-white text-center">{video.name}</p>
                  {video.subtitle && <p className="text-xs md:text-sm text-white/60 text-center mt-0.5">{video.subtitle}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-20 bg-background/80 backdrop-blur-sm border-border/50"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-20 bg-background/80 backdrop-blur-sm border-border/50"
        onClick={handleNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </>
  );
};

const Index = () => {
  const [selectedTestimonial, setSelectedTestimonial] = React.useState<{ name: string; content: string; image: any } | null>(null);

  React.useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;

    // Also load Calendly CSS for the popup
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';

    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      document.body.appendChild(script);
    }
    if (!document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]')) {
      document.head.appendChild(link);
    }

    // Listen for Calendly events
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event === 'calendly.event_scheduled') {
        // Redirect to thank you page when meeting is scheduled
        window.location.href = '/thank-you';
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, []);

  const openCalendlyPopup = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/googleadsbycaleb/new-meetingg'
      });
    }
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 md:px-8 lg:px-16 pt-4 md:pt-8 pb-4 md:pb-12 relative overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle at center, hsl(145, 51%, 30%) 0%, hsl(145, 51%, 25%) 15%, hsl(145, 51%, 20%) 30%, hsl(145, 51%, 16%) 45%, transparent 70%)',
            filter: 'blur(80px)',
            mixBlendMode: 'screen'
          }}
        />
        <div className="absolute top-12 left-4 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:top-16 z-50">
          <img src={websiteLogo} alt="Logo" className="h-28 md:h-64 w-auto" />
        </div>
        <div className="absolute top-12 -translate-y-1/2 -right-2 md:top-16 md:right-8 z-50 scale-[0.8] md:scale-100">
          <MovingBorderButton duration={6000} onClick={() => openCalendlyPopup()}>
            Book a Call
          </MovingBorderButton>
        </div>
        <div className="max-w-[1200px] mx-auto flex flex-col md:grid md:grid-cols-2 gap-0 md:gap-12 items-center relative z-10 mt-10 md:mt-24">
          {/* Image first on mobile, second on desktop */}
          <div className="relative animate-fade-in-up flex justify-center items-center md:-mt-16 order-1 md:order-2">
            <img
              src={heroProfile}
              alt="Caleb Profile"
              className="max-w-[50%] md:max-w-[80%] h-auto object-contain"
            />
          </div>

          <div className="space-y-2 md:space-y-4 animate-fade-in text-center md:text-left order-2 md:order-1">
            <div className="backdrop-blur-sm rounded-2xl p-4 shadow-lg md:p-0 md:bg-transparent md:backdrop-blur-none md:shadow-none md:rounded-none bg-[#131316] md:!bg-transparent">
              <h1 className="text-3xl md:text-7xl font-bold leading-relaxed md:leading-[1.3]">
                I specialize in Google Ads for<br className="hidden md:block" /><span className="inline-block px-3 text-white rounded-full whitespace-nowrap md:mt-3" style={{ backgroundColor: '#385f3e', verticalAlign: 'middle', paddingTop: '0.5rem', paddingBottom: '0.75rem' }}>Law Firms</span>
              </h1>
            </div>
            <div className="space-y-2 md:space-y-4">
              <p className="text-lg md:text-2xl text-white">
                If you own a law firm, I will help you bring in more high-value cases and increase your revenue, by driving in more qualified leads and phone calls.
              </p>
            </div>

            <div className="pt-2">
              <MovingBorderButton duration={6000} onClick={() => openCalendlyPopup()}>
                Book a Call
              </MovingBorderButton>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section - Overlapping */}
      <div className="px-4 md:px-8 lg:px-16 relative mb-8 md:mb-20 mt-16 md:-mt-20 z-10">
        <div className="max-w-[1100px] mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 via-secondary/10 via-accent/10 to-accent/15 rounded-3xl blur-xl opacity-60" />
          <div className="relative backdrop-blur-sm rounded-2xl p-4 md:p-7 shadow-lg" style={{ backgroundColor: '#131316' }}>
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
              <div className="space-y-2 md:space-y-4 animate-fade-in max-w-2xl">
                <h2 className="text-4xl md:text-7xl font-bold leading-tight">
                  Hi, I'm Caleb.
                </h2>
                <p className="text-lg md:text-xl text-white leading-relaxed">
                  I've built my career on UpWork as a freelancer, and I specialize in Google Ads and Google Local Ads,<br className="hidden md:inline" />
                  <span className="inline-block px-2 text-white rounded-full mt-2" style={{ backgroundColor: '#385f3e', paddingTop: '0.25rem', paddingBottom: '0.5rem' }}>for law firms.</span>
                </p>
              </div>

              <div className="animate-fade-in-up">
                <ProjectImage
                  src={upworkProof}
                  alt="Upwork Profile - Top Rated Plus with 100% Job Success"
                  className="shadow-2xl pointer-events-none md:pointer-events-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Carousel */}
      <section className="pt-0 pb-6 md:pb-12 bg-background/50 overflow-hidden">
        <div className="relative mx-auto flex items-center justify-center">
          <Carousel
            opts={{ loop: true, watchDrag: false }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false })]}
          >
            <CarouselContent className="ml-0">
              {[logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11, logo12, logo13, logo14, logo15, logo16].map((logo, index) => (
                <CarouselItem
                  key={`logo-${index}`}
                  className="flex basis-auto justify-center pl-0"
                >
                  <div className="mx-6 md:mx-12 flex shrink-0 items-center justify-center">
                    <img
                      src={logo}
                      alt={`Client logo ${index + 1}`}
                      className="h-20 md:h-32 w-auto opacity-80 hover:opacity-100 transition-opacity pointer-events-auto"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* What Makes Me Different */}
      <section className="px-4 md:px-8 lg:px-16 pt-6 md:pt-32 pb-12 md:pb-32 bg-gradient-to-b from-background to-card/20 relative md:min-h-screen flex items-center">
        <div className="max-w-[1000px] mx-auto relative z-10 w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-2">
            What Makes Me <span className="inline-block px-2 md:px-4 py-1 md:py-3 text-white rounded-full text-3xl md:text-5xl" style={{ backgroundColor: '#385f3e', verticalAlign: 'text-bottom' }}>Different</span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto mb-6 md:mb-8 rounded-full" />

          <div className="space-y-3 md:space-y-5 text-center">
            <p className="text-lg md:text-2xl text-white leading-relaxed animate-fade-in font-semibold">
              I am a freelancer, and will always be.
            </p>

            <div className="border-b border-white/20 w-48 md:w-64 mx-auto" />

            <p className="text-lg md:text-2xl text-white leading-relaxed animate-fade-in font-semibold">
              Therefore, I am 100% the person running your ads.
            </p>

            <div className="border-b border-white/20 w-48 md:w-64 mx-auto" />

            <p className="text-lg md:text-2xl text-white leading-relaxed animate-fade-in font-semibold">
              So, no agencies or outsourcing the work to someone else.
            </p>

            <div className="border-b border-white/20 w-48 md:w-64 mx-auto" />

            <p className="text-lg md:text-2xl text-white leading-relaxed animate-fade-in font-semibold">
              I wake up & go to bed managing Google Ads for law firms.
            </p>

            <div className="border-b border-white/20 w-48 md:w-64 mx-auto" />

            <p className="text-lg md:text-2xl text-white leading-relaxed animate-fade-in font-semibold">
              Also, most marketers lack extensive experience running ads for law firms.
            </p>

            <div className="border-b border-white/20 w-48 md:w-64 mx-auto" />

            <p className="text-lg md:text-2xl text-white leading-relaxed animate-fade-in font-semibold">
              But, I have. Managing Google Ads repeatedly in one of the most expensive ad markets (the legal space), side by side with lawyers just like you.
            </p>

            <div className="border-b border-white/20 w-48 md:w-64 mx-auto" />

            <p className="text-lg md:text-2xl text-white leading-relaxed animate-fade-in font-semibold">
              So, I understand what it means to pay for very expensive clicks that don't convert.
            </p>

            <div className="border-b border-white/20 w-48 md:w-64 mx-auto" />

            <p className="text-lg md:text-2xl text-white leading-relaxed animate-fade-in font-semibold">
              When it comes to working with law firm owners, like you, on anything related to Google Ads, I've seen it all.
            </p>
          </div>

          <div className="text-center mt-4 md:mt-8">
            <MovingBorderButton duration={6000} onClick={() => openCalendlyPopup()}>
              Book a Call
            </MovingBorderButton>
          </div>
        </div>
      </section>

      {/* Non-Compete Policy Section */}
      <section className="px-4 md:px-8 lg:px-16 py-12 md:py-20 bg-card/30 relative">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-6 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6 animate-fade-in order-2 md:order-1">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center">
                My Strict Non-Compete Policy
              </h2>

              <div className="space-y-3 md:space-y-5 text-base md:text-xl text-white leading-relaxed text-center">
                <p>
                  Most agencies and freelancers work with multiple law firms that often are in the same practice area and state/city.
                </p>

                <p>
                  Firms pay high management fees each month, while their data and winning strategies are shared across competing ad accounts in the same market.
                </p>

                <p>
                  It's unfair — and more importantly, <span className="inline-block px-2 text-white rounded-full" style={{ backgroundColor: '#de3323', paddingTop: '0.15rem', paddingBottom: '0.35rem' }}>unethical.</span>
                </p>

                <p>
                  I take a different approach.
                </p>

                <p>
                  Out of respect for my clients, when I work with a law firm, I operate under a strict <span className="inline-block px-2 text-white rounded-full" style={{ backgroundColor: '#385f3e', paddingTop: '0.15rem', paddingBottom: '0.35rem' }}>non-compete policy.</span>
                </p>

                <p>
                  What this means is that if I manage the Google Ads for your firm, I will not work with another competing firm in your state and practice area for as long as we work together.
                </p>

                <div className="space-y-2 md:space-y-4 text-left inline-block">
                  <p className="font-semibold flex items-center justify-start gap-2 md:gap-3"><CheckCircle className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0" style={{ color: '#6bc741' }} />No conflicts of interest.</p>
                  <p className="font-semibold flex items-center justify-start gap-2 md:gap-3"><CheckCircle className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0" style={{ color: '#6bc741' }} />No competing strategies.</p>
                  <p className="font-semibold flex items-center justify-start gap-2 md:gap-3"><CheckCircle className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0" style={{ color: '#6bc741' }} />No divided attention.</p>
                </div>

                <p className="pt-2">
                  <span className="inline-block px-2 text-white rounded-full text-base md:text-xl" style={{ backgroundColor: '#385f3e', paddingTop: '0.25rem', paddingBottom: '0.5rem' }}>Your firm retains full exclusivity.</span>
                </p>
              </div>
            </div>

            <div className="relative animate-fade-in-up order-1 md:order-2 flex justify-center">
              <img
                src={nonCompete}
                alt="Non-Compete Policy"
                className="w-3/4 md:w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What It's Like Working With Me */}
      <section className="px-4 md:px-8 lg:px-16 py-12 md:py-20 bg-card/30 relative overflow-hidden">
        {/* Ambient animated background gradients */}
        <div
          className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 animate-pulse"
          style={{
            background: 'radial-gradient(circle at center, hsl(145, 51%, 40%) 0%, hsl(145, 51%, 30%) 20%, transparent 70%)',
            filter: 'blur(100px)',
            mixBlendMode: 'screen',
            animationDuration: '4s'
          }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15 animate-pulse"
          style={{
            background: 'radial-gradient(circle at center, hsl(200, 51%, 40%) 0%, hsl(180, 51%, 30%) 20%, transparent 70%)',
            filter: 'blur(100px)',
            mixBlendMode: 'screen',
            animationDuration: '5s',
            animationDelay: '1s'
          }}
        />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3 md:mb-4">
            What It's Like Working With Me
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto mb-4 md:mb-8 rounded-full" />

          <div className="relative w-full h-[420px] md:h-[650px] flex items-center justify-center [perspective:1000px]">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="px-4 md:px-8 lg:px-16 py-12 md:py-20 relative bg-background">
        <div className="max-w-[900px] mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3 md:mb-4">
            Recent Projects
          </h2>
          <div className="text-center text-white mb-4 md:mb-6 text-base md:text-2xl">
            <p>All conversions and CPL reflect form submissions and phone calls, only.</p>
            <p>No soft conversions are included, such as clicks, page views, etc.</p>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto mb-8 md:mb-16 rounded-full" />

          <div className="space-y-12 md:space-y-24">
            {/* Project 1 */}
            <div className="grid md:grid-cols-[1fr_1.1fr] gap-4 md:gap-8 items-center">
              <div className="space-y-3 md:space-y-6 animate-fade-in">
                <h3 className="text-2xl md:text-5xl font-bold text-center">
                  Law Firm<br />
                  Case Study #1
                </h3>
                <br className="hidden md:block" />
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                  <div className="pb-3 md:pb-6 border-b-2 rounded-lg text-center" style={{ borderColor: '#6bc741' }}>
                    <div className="text-xs md:text-sm text-white/60 mb-1 md:mb-2 uppercase tracking-wide">Amount Spent</div>
                    <div className="text-2xl md:text-4xl font-bold" style={{ color: '#6bc741' }}>
                      <CountUpNumber value="$11.9K" />
                    </div>
                  </div>
                  <div className="pb-3 md:pb-6 border-b-2 rounded-lg text-center" style={{ borderColor: '#6bc741' }}>
                    <div className="text-xs md:text-sm text-white/60 mb-1 md:mb-2 uppercase tracking-wide">CPL</div>
                    <div className="text-2xl md:text-4xl font-bold" style={{ color: '#c5fc68' }}>
                      <CountUpNumber value="$125.81" />
                    </div>
                  </div>
                </div>
                <div className="pb-3 md:pb-6 border-b-2 rounded-lg text-center" style={{ borderColor: '#6bc741' }}>
                  <div className="text-xs md:text-sm text-white/60 mb-1 md:mb-2 uppercase tracking-wide">Period</div>
                  <div className="text-xl md:text-3xl font-bold text-white">January 2026</div>
                </div>
              </div>
              <div className="relative group animate-fade-in-up">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-accent/15 via-primary/12 to-primary/15 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-70" />
                <ProjectImage
                  src={project1}
                  alt="Project 1"
                  className="relative shadow-2xl border border-accent/20"
                  interactive
                />
              </div>
            </div>

            {/* Project 2 */}
            <div className="grid md:grid-cols-[1.1fr_1fr] gap-4 md:gap-8 items-center">
              <div className="relative group order-2 md:order-1 animate-fade-in-up">
                <div className="absolute inset-0 bg-gradient-to-tl from-accent/20 via-accent/15 via-primary/12 to-primary/15 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-70" />
                <ProjectImage
                  src={project2}
                  alt="Project 2"
                  className="relative shadow-2xl border border-accent/20"
                  interactive
                />
              </div>
              <div className="space-y-3 md:space-y-6 order-1 md:order-2 animate-fade-in">
                <h3 className="text-2xl md:text-5xl font-bold text-center">
                  Law Firm<br />
                  Case Study #2
                </h3>
                <br className="hidden md:block" />
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                  <div className="pb-3 md:pb-6 border-b-2 rounded-lg text-center" style={{ borderColor: '#6bc741' }}>
                    <div className="text-xs md:text-sm text-white/60 mb-1 md:mb-2 uppercase tracking-wide">Amount Spent</div>
                    <div className="text-2xl md:text-4xl font-bold" style={{ color: '#6bc741' }}>
                      <CountUpNumber value="$56.7K" />
                    </div>
                  </div>
                  <div className="pb-3 md:pb-6 border-b-2 rounded-lg text-center" style={{ borderColor: '#6bc741' }}>
                    <div className="text-xs md:text-sm text-white/60 mb-1 md:mb-2 uppercase tracking-wide">CPL</div>
                    <div className="text-2xl md:text-4xl font-bold" style={{ color: '#c5fc68' }}>
                      <CountUpNumber value="$132" />
                    </div>
                  </div>
                </div>
                <div className="pb-3 md:pb-6 border-b-2 rounded-lg text-center" style={{ borderColor: '#6bc741' }}>
                  <div className="text-xs md:text-sm text-white/60 mb-1 md:mb-2 uppercase tracking-wide">Period</div>
                  <div className="text-xl md:text-3xl font-bold text-white">January 2025 - January 2026</div>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="grid md:grid-cols-[1fr_1.1fr] gap-4 md:gap-8 items-center">
              <div className="space-y-3 md:space-y-6 animate-fade-in">
                <h3 className="text-2xl md:text-5xl font-bold text-center">
                  Law Firm<br />
                  Case Study #3
                </h3>
                <br className="hidden md:block" />
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                  <div className="pb-3 md:pb-6 border-b-2 rounded-lg text-center" style={{ borderColor: '#6bc741' }}>
                    <div className="text-xs md:text-sm text-white/60 mb-1 md:mb-2 uppercase tracking-wide">Amount Spent</div>
                    <div className="text-2xl md:text-4xl font-bold" style={{ color: '#6bc741' }}>
                      <CountUpNumber value="$3.5K" />
                    </div>
                  </div>
                  <div className="pb-3 md:pb-6 border-b-2 rounded-lg text-center" style={{ borderColor: '#6bc741' }}>
                    <div className="text-xs md:text-sm text-white/60 mb-1 md:mb-2 uppercase tracking-wide">CPL</div>
                    <div className="text-2xl md:text-4xl font-bold" style={{ color: '#c5fc68' }}>
                      <CountUpNumber value="$97.50" />
                    </div>
                  </div>
                </div>
                <div className="pb-3 md:pb-6 border-b-2 rounded-lg text-center" style={{ borderColor: '#6bc741' }}>
                  <div className="text-xs md:text-sm text-white/60 mb-1 md:mb-2 uppercase tracking-wide">Period</div>
                  <div className="text-xl md:text-3xl font-bold text-white">January 2026</div>
                </div>
              </div>
              <div className="relative group animate-fade-in-up">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/15 via-primary/12 to-primary/15 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-70" />
                <ProjectImage
                  src={project3}
                  alt="Project 3"
                  className="relative shadow-2xl border border-accent/20"
                  interactive
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-16">
            <MovingBorderButton duration={6000} onClick={() => openCalendlyPopup()}>
              Book a Call
            </MovingBorderButton>
          </div>
        </div>
      </section>

      {/* Google Reviews Course Section */}
      <section className="px-4 md:px-8 lg:px-16 py-12 md:py-20 bg-card/30 relative">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-6 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-8 animate-fade-in">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center">
                Creator of the<br />Best-Selling Google Reviews Course
              </h2>

              <div className="space-y-3 md:space-y-6 text-base md:text-xl text-white leading-relaxed text-center">
                <p>
                  For local businesses, Google Reviews have become a critical factor in building trust and credibility and in determining whether potential clients decide to contact you.
                </p>

                <p>
                  And local businesses, like your law firm, needed something that actually works.
                </p>

                <p>
                  Something ethical.
                </p>

                <p>
                  Something proven.
                </p>

                <p>
                  So, I built it — the most advanced, proven, and effective system for gathering and managing Google reviews for any local business, especially law firms.
                </p>

                <p>
                  And each time lawyers have used it alongside Google Ads, it has helped them outrank competitors, stand out in their area & niche, and increase revenue consistently.
                </p>

                <p className="pt-4 md:pt-0">
                  <span className="inline-block px-2 text-white rounded-full text-base md:text-xl" style={{ backgroundColor: '#385f3e', paddingTop: '0.25rem', paddingBottom: '0.5rem' }}>Every law firm owner I work with gets free lifetime access to it.</span>
                </p>
              </div>
            </div>

            <div className="relative animate-fade-in-up">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/10 via-accent/10 to-accent/15 rounded-3xl blur-2xl opacity-60" />
              <ProjectImage
                src={courseImage}
                alt="Google Reviews Course"
                className="relative shadow-2xl pointer-events-none md:pointer-events-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-card/30 overflow-hidden relative">
        <div className="px-4 md:px-8 lg:px-16 relative z-10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-3 md:mb-4">
              People Who Trusted Me
            </h2>
            <p className="text-center text-white mb-4 md:mb-6 text-base md:text-2xl">
              The reviews below are real and can be verified on my{" "}
              <a
                href="https://www.upwork.com/freelancers/localgoogleadsbycaleb"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80 font-bold"
                style={{ color: '#63c341' }}
              >
                UpWork profile
              </a>
              <span className="text-white">.</span>
            </p>
            <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto mb-8 md:mb-16 rounded-full" />
          </div>
        </div>

        {/* Mobile Carousel with manual controls */}
        <div className="md:hidden relative px-4">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {[
              {
                name: "Adam K.",
                role: "CEO | Founder of Equa Agency",
                content: "Caleb is one of the best contractors I've ever worked with. Incredible at Google Ads.",
                image: adamK
              },
              {
                name: "David G.",
                role: "CEO | Founder of Five Loaves",
                content: "Caleb was excellent to work with. I vetted a handful of freelancers, but ended up working with Caleb due to a mix of his obvious expertise and his shared passion for the work I do for my specific clients. I plan to continue using Caleb going forward as I've already seen great results from his help with my Google ads just a month into the campaign. You will be in good hands if you decide to work with Caleb.",
                image: davidG
              },
              {
                name: "Janka M.",
                role: "CEO | Founder of Brainyyack",
                content: "Caleb was great to work with, very honest and available. He set up campaigns and took the time to explain how things work. I will work with him again.",
                image: jankaM
              },
              {
                name: "Brandon R.",
                role: "CEO | Founder of Novellus",
                content: "Caleb was great! Not only does he have an incredible amount of knowledge about Google Ads, but actively makes recommendations and suggestions to keep improving the account. He was very prompt in all communication and had incredible dedication to make the project a success!",
                image: brandonR
              },
              {
                name: "Alex C.",
                role: "CEO | Founder of Bright Sport",
                content: "I highly recommend Caleb for his outstanding work as our Google Media Buyer. His expertise significantly improved our online presence, optimizing campaigns for impressive results. Caleb is not only highly skilled but also a pleasure to work with, ensuring clear communication and a positive collaboration experience. We look forward to future projects together.",
                image: alexC
              },
              {
                name: "Daniel B.",
                role: "Head of Marketing at AlumComplete",
                content: "Working with Caleb was a great experience. He's a genuinely nice guy and has the skill we need to get the job done efficiently and at a high-quality level. He's a great communicator.",
                image: danielB
              },
              {
                name: "Andy G.",
                role: "CEO | Founder of Boost Education",
                content: "From the outset, it was evident that Caleb is truly an expert in the realm of Google Ads. His communication skills are exemplary, ensuring we were always on the same page and updated every step of the way. He possesses a deep understanding and a wealth of experience which became apparent as he diligently crafted our campaigns and steered our account to generate excellent leads with a remarkable ROI. Furthermore, Caleb consistently went above and beyond in his efforts, showcasing a level of dedication that is hard to come by. Even after ending this contract, he is still fully available to me which shows how much he cares for the teams he works with.",
                image: andyG
              },
              {
                name: "Nathaniel C.",
                role: "Head of Marketing at My Front Page",
                content: "Caleb delivered well on our Google Ads optimization. He went through and explained his experiences, and walked us through by way of video. He is very informative and insightful, and he knows what he is talking about. He was also genuinely invested in helping out our business and gave constructive criticism in a way that was not demeaning. His work was very well received, and I cannot recommend him enough.",
                image: nathanielC
              },
              {
                name: "Adam K.",
                role: "CEO | Founder of Equa Agency",
                content: "Caleb is one of the best contractors I've ever worked with. Incredible at Google Ads.",
                image: adamK
              },
              {
                name: "David G.",
                role: "CEO | Founder of Five Loaves",
                content: "Caleb was excellent to work with. I vetted a handful of freelancers, but ended up working with Caleb due to a mix of his obvious expertise and his shared passion for the work I do for my specific clients. I plan to continue using Caleb going forward as I've already seen great results from his help with my Google ads just a month into the campaign. You will be in good hands if you decide to work with Caleb.",
                image: davidG
              },
              {
                name: "Janka M.",
                role: "CEO | Founder of Brainyyack",
                content: "Caleb was great to work with, very honest and available. He set up campaigns and took the time to explain how things work. I will work with him again.",
                image: jankaM
              },
              {
                name: "Brandon R.",
                role: "CEO | Founder of Novellus",
                content: "Caleb was great! Not only does he have an incredible amount of knowledge about Google Ads, but actively makes recommendations and suggestions to keep improving the account. He was very prompt in all communication and had incredible dedication to make the project a success!",
                image: brandonR
              },
              {
                name: "Alex C.",
                role: "CEO | Founder of Bright Sport",
                content: "I highly recommend Caleb for his outstanding work as our Google Media Buyer. His expertise significantly improved our online presence, optimizing campaigns for impressive results. Caleb is not only highly skilled but also a pleasure to work with, ensuring clear communication and a positive collaboration experience. We look forward to future projects together.",
                image: alexC
              },
              {
                name: "Daniel B.",
                role: "Head of Marketing at AlumComplete",
                content: "Working with Caleb was a great experience. He's a genuinely nice guy and has the skill we need to get the job done efficiently and at a high-quality level. He's a great communicator.",
                image: danielB
              },
              {
                name: "Andy G.",
                role: "CEO | Founder of Boost Education",
                content: "From the outset, it was evident that Caleb is truly an expert in the realm of Google Ads. His communication skills are exemplary, ensuring we were always on the same page and updated every step of the way. He possesses a deep understanding and a wealth of experience which became apparent as he diligently crafted our campaigns and steered our account to generate excellent leads with a remarkable ROI. Furthermore, Caleb consistently went above and beyond in his efforts, showcasing a level of dedication that is hard to come by. Even after ending this contract, he is still fully available to me which shows how much he cares for the teams he works with.",
                image: andyG
              },
              {
                name: "Nathaniel C.",
                role: "Head of Marketing at My Front Page",
                content: "Caleb delivered well on our Google Ads optimization. He went through and explained his experiences, and walked us through by way of video. He is very informative and insightful, and he knows what he is talking about. He was also genuinely invested in helping out our business and gave constructive criticism in a way that was not demeaning. His work was very well received, and I cannot recommend him enough.",
                image: nathanielC
              }
            ].map((testimonial, index) => (
              <CarouselItem key={index} className="basis-[85%]">
                <Card
                  onClick={() => setSelectedTestimonial(testimonial)}
                  className="p-4 bg-card/80 backdrop-blur-sm border border-transparent hover:border-[#DF7606] transition-all shadow-xl cursor-pointer mx-auto max-w-[300px]"
                >
                <div className="flex items-center gap-1 mb-2 md:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 md:w-5 h-4 md:h-5" fill="#DF7606" color="#DF7606" />
                  ))}
                </div>
                <p className="text-base md:text-lg text-foreground mb-3 md:mb-5 leading-relaxed line-clamp-6">
                  {testimonial.content}
                </p>
                <div className="h-1 w-full bg-gradient-to-r from-primary to-accent mb-3 md:mb-5 rounded-full"></div>
                <div className="flex items-center gap-2 md:gap-3">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-gradient-to-br from-cta via-cta/80 to-accent flex items-center justify-center font-bold text-background text-xs md:text-sm flex-shrink-0">
                      {testimonial.name.split(' ')[0][0]}{testimonial.name.split(' ')[1][0]}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-sm md:text-base">{testimonial.name}</div>
                    <div className="text-xs md:text-sm text-white/70">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
              </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Desktop auto-scroll */}
        <div className="hidden md:block relative group">
          <div className={cn(
            "flex animate-scroll-right gap-8 w-max",
            "group-hover:[animation-play-state:paused]",
            selectedTestimonial && "[animation-play-state:paused]"
          )}>
            {[
              {
                name: "Adam K.",
                role: "CEO | Founder of Equa Agency",
                content: "Caleb is one of the best contractors I've ever worked with. Incredible at Google Ads.",
                image: adamK
              },
              {
                name: "David G.",
                role: "CEO | Founder of Five Loaves",
                content: "Caleb was excellent to work with. I vetted a handful of freelancers, but ended up working with Caleb due to a mix of his obvious expertise and his shared passion for the work I do for my specific clients. I plan to continue using Caleb going forward as I've already seen great results from his help with my Google ads just a month into the campaign. You will be in good hands if you decide to work with Caleb.",
                image: davidG
              },
              {
                name: "Janka M.",
                role: "CEO | Founder of Brainyyack",
                content: "Caleb was great to work with, very honest and available. He set up campaigns and took the time to explain how things work. I will work with him again.",
                image: jankaM
              },
              {
                name: "Brandon R.",
                role: "CEO | Founder of Novellus",
                content: "Caleb was great! Not only does he have an incredible amount of knowledge about Google Ads, but actively makes recommendations and suggestions to keep improving the account. He was very prompt in all communication and had incredible dedication to make the project a success!",
                image: brandonR
              },
              {
                name: "Alex C.",
                role: "CEO | Founder of Bright Sport",
                content: "I highly recommend Caleb for his outstanding work as our Google Media Buyer. His expertise significantly improved our online presence, optimizing campaigns for impressive results. Caleb is not only highly skilled but also a pleasure to work with, ensuring clear communication and a positive collaboration experience. We look forward to future projects together.",
                image: alexC
              },
              {
                name: "Daniel B.",
                role: "Head of Marketing at AlumComplete",
                content: "Working with Caleb was a great experience. He's a genuinely nice guy and has the skill we need to get the job done efficiently and at a high-quality level. He's a great communicator.",
                image: danielB
              },
              {
                name: "Andy G.",
                role: "CEO | Founder of Boost Education",
                content: "From the outset, it was evident that Caleb is truly an expert in the realm of Google Ads. His communication skills are exemplary, ensuring we were always on the same page and updated every step of the way. He possesses a deep understanding and a wealth of experience which became apparent as he diligently crafted our campaigns and steered our account to generate excellent leads with a remarkable ROI. Furthermore, Caleb consistently went above and beyond in his efforts, showcasing a level of dedication that is hard to come by. Even after ending this contract, he is still fully available to me which shows how much he cares for the teams he works with.",
                image: andyG
              },
              {
                name: "Nathaniel C.",
                role: "Head of Marketing at My Front Page",
                content: "Caleb delivered well on our Google Ads optimization. He went through and explained his experiences, and walked us through by way of video. He is very informative and insightful, and he knows what he is talking about. He was also genuinely invested in helping out our business and gave constructive criticism in a way that was not demeaning. His work was very well received, and I cannot recommend him enough.",
                image: nathanielC
              },
              {
                name: "Adam K.",
                role: "CEO | Founder of Equa Agency",
                content: "Caleb is one of the best contractors I've ever worked with. Incredible at Google Ads.",
                image: adamK
              },
              {
                name: "David G.",
                role: "CEO | Founder of Five Loaves",
                content: "Caleb was excellent to work with. I vetted a handful of freelancers, but ended up working with Caleb due to a mix of his obvious expertise and his shared passion for the work I do for my specific clients. I plan to continue using Caleb going forward as I've already seen great results from his help with my Google ads just a month into the campaign. You will be in good hands if you decide to work with Caleb.",
                image: davidG
              },
              {
                name: "Janka M.",
                role: "CEO | Founder of Brainyyack",
                content: "Caleb was great to work with, very honest and available. He set up campaigns and took the time to explain how things work. I will work with him again.",
                image: jankaM
              },
              {
                name: "Brandon R.",
                role: "CEO | Founder of Novellus",
                content: "Caleb was great! Not only does he have an incredible amount of knowledge about Google Ads, but actively makes recommendations and suggestions to keep improving the account. He was very prompt in all communication and had incredible dedication to make the project a success!",
                image: brandonR
              },
              {
                name: "Alex C.",
                role: "CEO | Founder of Bright Sport",
                content: "I highly recommend Caleb for his outstanding work as our Google Media Buyer. His expertise significantly improved our online presence, optimizing campaigns for impressive results. Caleb is not only highly skilled but also a pleasure to work with, ensuring clear communication and a positive collaboration experience. We look forward to future projects together.",
                image: alexC
              },
              {
                name: "Daniel B.",
                role: "Head of Marketing at AlumComplete",
                content: "Working with Caleb was a great experience. He's a genuinely nice guy and has the skill we need to get the job done efficiently and at a high-quality level. He's a great communicator.",
                image: danielB
              },
              {
                name: "Andy G.",
                role: "CEO | Founder of Boost Education",
                content: "From the outset, it was evident that Caleb is truly an expert in the realm of Google Ads. His communication skills are exemplary, ensuring we were always on the same page and updated every step of the way. He possesses a deep understanding and a wealth of experience which became apparent as he diligently crafted our campaigns and steered our account to generate excellent leads with a remarkable ROI. Furthermore, Caleb consistently went above and beyond in his efforts, showcasing a level of dedication that is hard to come by. Even after ending this contract, he is still fully available to me which shows how much he cares for the teams he works with.",
                image: andyG
              },
              {
                name: "Nathaniel C.",
                role: "Head of Marketing at My Front Page",
                content: "Caleb delivered well on our Google Ads optimization. He went through and explained his experiences, and walked us through by way of video. He is very informative and insightful, and he knows what he is talking about. He was also genuinely invested in helping out our business and gave constructive criticism in a way that was not demeaning. His work was very well received, and I cannot recommend him enough.",
                image: nathanielC
              }
            ].map((testimonial, index) => (
              <Card
                key={index}
                onClick={() => setSelectedTestimonial(testimonial)}
                className="p-6 bg-card/80 backdrop-blur-sm border border-transparent hover:border-[#DF7606] transition-all w-[440px] flex-shrink-0 shadow-xl cursor-pointer"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5" fill="#DF7606" color="#DF7606" />
                  ))}
                </div>
                <p className="text-lg text-foreground mb-5 leading-relaxed line-clamp-6">
                  {testimonial.content}
                </p>
                <div className="h-1 w-full bg-gradient-to-r from-primary to-accent mb-5 rounded-full"></div>
                <div className="flex items-center gap-3">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cta via-cta/80 to-accent flex items-center justify-center font-bold text-background text-sm flex-shrink-0">
                      {testimonial.name.split(' ')[0][0]}{testimonial.name.split(' ')[1][0]}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-base">{testimonial.name}</div>
                    <div className="text-sm text-white/70">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="text-center mt-8 md:mt-12">
            <MovingBorderButton duration={6000} onClick={() => openCalendlyPopup()}>
              Book a Call
            </MovingBorderButton>
          </div>
        </div>
      </section>

      {/* What I Can Promise */}
      <section className="px-4 md:px-8 lg:px-16 pt-0 md:pt-8 pb-12 md:pb-20 bg-gradient-to-b from-card/20 to-background relative">
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-0 md:gap-12 items-center">
            <div className="relative animate-fade-in flex justify-center -mt-8 md:-mt-32">
              <img
                src={promiseProfile}
                alt="Caleb Promise"
                className="w-3/4 md:w-full object-contain"
              />
            </div>

            <div className="space-y-4 md:space-y-6 animate-fade-in-up flex justify-center md:block">
              <div className="relative backdrop-blur-sm rounded-2xl p-4 md:p-7 shadow-lg" style={{ backgroundColor: '#131316' }}>
                <div className="space-y-4 md:space-y-6 max-w-[320px] md:max-w-none">
                  <div>
                    <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 text-left flex items-center flex-wrap gap-2 md:gap-3">
                      <span>What I</span> <span className="inline-block px-2 md:px-4 pb-1 md:pb-2 text-white rounded-full text-2xl md:text-5xl" style={{ backgroundColor: '#de3323' }}>Can't</span> <span>Promise</span>
                    </h2>
                    <div className="space-y-2 md:space-y-4 text-base md:text-2xl text-white text-left">
                      <p className="font-semibold flex items-center justify-start gap-2 md:gap-3"><XCircle className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0" style={{ color: '#de3323' }} />Results overnight.</p>
                      <p className="font-semibold flex items-center justify-start gap-2 md:gap-3"><XCircle className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0" style={{ color: '#de3323' }} />That every click will turn into a lead.</p>
                      <p className="font-semibold flex items-center justify-start gap-2 md:gap-3"><XCircle className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0" style={{ color: '#de3323' }} />That every single month will land high-value cases.</p>
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-4 md:pt-6">
                    <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 text-left flex items-center flex-wrap gap-2 md:gap-3">
                      <span>What I</span> <span className="inline-block px-2 md:px-4 pb-1 md:pb-2 text-white rounded-full text-2xl md:text-5xl" style={{ backgroundColor: '#385f3e' }}>Can</span> <span>Promise</span>
                    </h2>
                    <div className="space-y-2 md:space-y-4 text-base md:text-2xl text-white text-left">
                      <p className="font-semibold flex items-center justify-start gap-2 md:gap-3"><CheckCircle className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0" style={{ color: '#6bc741' }} />Always being 100% honest with you.</p>
                      <p className="font-semibold flex items-center justify-start gap-2 md:gap-3"><CheckCircle className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0" style={{ color: '#6bc741' }} />Always managing your ads myself.</p>
                      <p className="font-semibold flex items-center justify-start gap-2 md:gap-3"><CheckCircle className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0" style={{ color: '#6bc741' }} />Always being the best at what I do.</p>
                      <p className="font-semibold flex items-center justify-start gap-2 md:gap-3"><CheckCircle className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0" style={{ color: '#6bc741' }} />Always investing and treating your money like my own.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 lg:px-16 pt-12 md:pt-20 pb-0 bg-card/30 relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              Are Your Law Firm's Google Ads in The Wrong Hands?
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto mb-4 md:mb-6 rounded-full" />
            <p className="text-xl md:text-3xl text-white font-bold">
              Schedule a call with me.
            </p>
          </div>

          <div className="relative p-4 md:p-8 rounded-3xl max-w-[1200px] mx-auto" style={{ background: 'linear-gradient(135deg, #131316 0%, #385e3d 100%)' }}>
            <div className="calendly-inline-widget" data-url="https://calendly.com/googleadsbycaleb/new-meetingg" style={{ minWidth: '320px', height: '700px' }}></div>
          </div>

          <div className="flex justify-center">
            <img src={websiteLogo} alt="Logo" className="h-48 md:h-80 w-auto" />
          </div>
        </div>
      </section>

      {/* Testimonial Dialog */}
      <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedTestimonial?.image ? (
                <img
                  src={selectedTestimonial.image}
                  alt={selectedTestimonial.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
              ) : selectedTestimonial && (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cta via-cta/80 to-accent flex items-center justify-center font-bold text-background text-sm flex-shrink-0">
                  {selectedTestimonial.name.split(' ')[0][0]}{selectedTestimonial.name.split(' ')[1][0]}
                </div>
              )}
              <span>{selectedTestimonial?.name}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5" fill="#DF7606" color="#DF7606" />
              ))}
            </div>
            <p className="text-lg leading-relaxed text-foreground">
              {selectedTestimonial?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Index;
