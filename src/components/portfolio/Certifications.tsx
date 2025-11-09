import { Award, CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useParallax } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";

const Certifications = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const parallaxSlow = useParallax(0.25);
  const parallaxFast = useParallax(0.45);

  const certifications = [
    {
      title: "React Developer",
      issuer: "Meta",
      year: "2024",
      color: "from-blue-500 to-cyan-500",
      verified: true
    },
    {
      title: "Full Stack Web Development",
      issuer: "FreeCodeCamp",
      year: "2023",
      color: "from-green-500 to-emerald-500",
      verified: true
    },
    {
      title: "UI/UX Design Specialization",
      issuer: "Google",
      year: "2023",
      color: "from-purple-500 to-pink-500",
      verified: true
    },
    {
      title: "JavaScript Algorithms",
      issuer: "FreeCodeCamp",
      year: "2023",
      color: "from-yellow-500 to-orange-500",
      verified: true
    },
    {
      title: "Advanced TypeScript",
      issuer: "Udemy",
      year: "2024",
      color: "from-indigo-500 to-blue-500",
      verified: true
    },
    {
      title: "Mobile App Development",
      issuer: "Coursera",
      year: "2024",
      color: "from-pink-500 to-rose-500",
      verified: true
    }
  ];

  return (
    <section id="certifications" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-primary/5 animate-gradient-xy" />
      
      {/* Parallax background decorations */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" 
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      />
      <div 
        className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" 
        style={{ transform: `translateY(${parallaxFast}px)` }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Certifications & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Diplômes</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Mes certifications professionnelles et formations continues
            </p>
          </div>

          <div ref={sectionRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-soft hover:scale-105 hover:-rotate-1",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-5 group-hover:opacity-15 transition-opacity duration-300`} />
                
                {/* Animated badge icon */}
                <div className="absolute top-4 right-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center animate-glow`}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="relative p-6 pt-20">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    
                    <div className="space-y-2">
                      <p className="text-muted-foreground font-medium">
                        {cert.issuer}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-muted text-sm font-medium">
                          {cert.year}
                        </span>
                        
                        {cert.verified && (
                          <div className="flex items-center gap-1 text-green-500">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-xs font-medium">Vérifié</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Decorative bottom accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
