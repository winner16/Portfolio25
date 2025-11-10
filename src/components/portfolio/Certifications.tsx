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
      color: "from-primary to-primary/80",
      verified: true
    },
    {
      title: "Full Stack Web Development",
      issuer: "FreeCodeCamp",
      year: "2023",
      color: "from-accent to-accent/80",
      verified: true
    },
    {
      title: "UI/UX Design Specialization",
      issuer: "Google",
      year: "2023",
      color: "from-primary to-accent",
      verified: true
    },
    {
      title: "JavaScript Algorithms",
      issuer: "FreeCodeCamp",
      year: "2023",
      color: "from-accent to-primary",
      verified: true
    },
    {
      title: "Advanced TypeScript",
      issuer: "Udemy",
      year: "2024",
      color: "from-primary/90 to-primary",
      verified: true
    },
    {
      title: "Mobile App Development",
      issuer: "Coursera",
      year: "2024",
      color: "from-accent/90 to-accent",
      verified: true
    }
  ];

  return (
    <section id="certifications" className="py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated mesh background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 animate-mesh-move" />
      
      {/* Dynamic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-primary/5 animate-gradient-xy" />
      
      {/* Parallax background decorations */}
      <div 
        className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" 
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      />
      <div 
        className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" 
        style={{ transform: `translateY(${parallaxFast}px)` }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Certifications & <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-xy">Diplômes</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Mes certifications professionnelles et formations continues
            </p>
          </div>

          <div ref={sectionRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-colored hover:scale-[1.02] hover:-translate-y-2",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-[0.07] group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Animated badge icon */}
                <div className="absolute top-6 right-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-glow`}>
                    <Award className="w-7 h-7 text-primary-foreground" />
                  </div>
                </div>

                <div className="relative p-8 pt-24">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                      {cert.title}
                    </h3>
                    
                    <div className="space-y-3">
                      <p className="text-muted-foreground font-semibold text-base">
                        {cert.issuer}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="px-4 py-1.5 rounded-full bg-muted/80 text-sm font-semibold backdrop-blur-sm">
                          {cert.year}
                        </span>
                        
                        {cert.verified && (
                          <div className="flex items-center gap-1.5 text-primary">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-xs font-semibold">Vérifié</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Decorative bottom accent with glow */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cert.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left shadow-glow`} />
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
