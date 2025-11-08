import { Code, Palette, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const About = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  
  const features = [
    {
      icon: Code,
      title: "Full Stack Development",
      description: "Building scalable web applications with modern frameworks and best practices"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful interfaces that users love"
    },
    {
      icon: Sparkles,
      title: "Creative Solutions",
      description: "Turning complex problems into elegant and simple solutions"
    }
  ];

  return (
    <section id="about" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Passionate about creating digital experiences that make a difference
            </p>
          </div>

          <div ref={sectionRef} className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-soft hover:-translate-y-2",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ 
                  transitionDelay: `${index * 0.15}s`,
                  animationDelay: `${index * 0.1}s` 
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className={cn(
            "bg-card border border-border rounded-2xl p-8 md:p-12 transition-all duration-700",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm a <span className="text-foreground font-semibold">Full Stack Developer</span> and{" "}
              <span className="text-foreground font-semibold">UI/UX Designer</span> with a passion for
              creating seamless digital experiences. I combine technical expertise with creative
              design thinking to build applications that are not only functional but also beautiful
              and intuitive. My goal is to bridge the gap between design and development, ensuring
              every project delivers exceptional user experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
