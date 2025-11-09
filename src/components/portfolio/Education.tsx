import { GraduationCap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useParallax } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";

const Education = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const parallaxSlow = useParallax(0.3);
  const parallaxFast = useParallax(0.5);
  
  const education = [
    {
      degree: "Licence Professionnelle",
      field: "Développement Mobile",
      duration: "1 an",
      year: "Bachelor FEDE",
      gradient: "from-primary to-cyan-500"
    },
    {
      degree: "Technicien Spécialisé",
      field: "Développement Informatique",
      duration: "Bac+2",
      year: "Diplôme",
      gradient: "from-accent to-orange-500"
    }
  ];

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Dynamic background layers */}
      <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-transparent to-accent/5 animate-gradient-xy" />
      
      {/* Parallax floating decorations */}
      <div 
        className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" 
        style={{ transform: `translateY(${parallaxFast}px)`, animationDelay: "0.5s" }}
      />
      <div 
        className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" 
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Education & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Formation</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Mon parcours académique en développement et technologies
            </p>
          </div>

          <div ref={sectionRef} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <div
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-soft hover:scale-105",
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0",
                  index === 0 ? "-translate-x-10" : "translate-x-10"
                )}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${edu.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-glow">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-muted text-sm font-medium">
                        {edu.duration}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {edu.year}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {edu.field}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
