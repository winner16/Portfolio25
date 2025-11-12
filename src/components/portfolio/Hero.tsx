import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";

const Hero = () => {
  const parallaxSlow = useParallax(0.3);
  const parallaxMedium = useParallax(0.5);
  const parallaxFast = useParallax(0.7);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Dynamic mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 dark:opacity-50 animate-mesh-move blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%),radial-gradient(circle_at_70%_50%,hsl(var(--accent)/0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.25),transparent_50%),radial-gradient(circle_at_70%_50%,hsl(var(--accent)/0.2),transparent_50%)] animate-gradient-shift bg-[length:200%_200%]" />
      
      {/* Parallax floating elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" 
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" 
        style={{ transform: `translateY(${parallaxMedium}px)`, animationDelay: "1s" }}
      />
      <div 
        className="absolute top-1/2 right-1/3 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-float" 
        style={{ transform: `translateY(${parallaxFast}px)`, animationDelay: "0.5s" }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in-up">
            <p className="text-primary text-lg font-medium">Hello, I'm</p>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              BANQOUR ATIKA
            </h1>
            <div className="flex items-center justify-center gap-2 text-xl md:text-2xl text-muted-foreground">
              <span className="animate-slide-in-left">Full Stack Developer</span>
              <span className="text-primary">•</span>
              <span className="animate-slide-in-right">UI/UX Designer</span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in leading-relaxed">
            Crafting beautiful, functional, and user-centered digital experiences
            with modern technologies and creative design solutions.
          </p>

          <div className="flex items-center justify-center gap-4 animate-scale-in">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 dark:shadow-card-glow"
            >
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20 dark:hover:shadow-border-glow transition-all duration-300"
            >
              View Projects
            </Button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
            <ArrowDown className="w-6 h-6 text-primary animate-pulse-slow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
