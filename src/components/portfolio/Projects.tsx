import { ExternalLink, Github, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useParallax } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  githubUrl?: string;
  demoUrl?: string;
}

const Projects = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const parallaxSlow = useParallax(0.2);
  const parallaxFast = useParallax(0.5);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  const [projects, setProjects] = useState<Project[]>([
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution with real-time inventory management, secure payments, and responsive design.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Portfolio Dashboard",
      description: "Analytics dashboard for tracking portfolio performance with interactive charts and data visualization.",
      tags: ["Next.js", "TypeScript", "Recharts", "Tailwind"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Social Media App",
      description: "Full-stack social platform with real-time messaging, post sharing, and user interactions.",
      tags: ["React", "Firebase", "Redux", "Material-UI"],
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Task Management Tool",
      description: "Collaborative task manager with drag-and-drop interface, team collaboration, and deadline tracking.",
      tags: ["Vue.js", "Express", "MongoDB", "Socket.io"],
      gradient: "from-green-500 to-emerald-500"
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tags: "",
    githubUrl: "",
    demoUrl: ""
  });

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) {
      toast({
        title: "Erreur",
        description: "Le titre et la description sont requis",
        variant: "destructive",
      });
      return;
    }

    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-green-500 to-emerald-500",
      "from-indigo-500 to-violet-500",
      "from-yellow-500 to-amber-500",
    ];

    const project: Project = {
      title: newProject.title,
      description: newProject.description,
      tags: newProject.tags.split(",").map(tag => tag.trim()),
      gradient: gradients[Math.floor(Math.random() * gradients.length)],
      githubUrl: newProject.githubUrl,
      demoUrl: newProject.demoUrl,
    };

    setProjects([...projects, project]);
    setNewProject({ title: "", description: "", tags: "", githubUrl: "", demoUrl: "" });
    setOpen(false);
    
    toast({
      title: "Projet ajouté !",
      description: "Votre projet a été ajouté avec succès",
    });
  };

  return (
    <section id="projects" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-gradient-xy" />
      
      {/* Parallax floating decorations */}
      <div 
        className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" 
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" 
        style={{ transform: `translateY(${parallaxFast}px)`, animationDelay: "1s" }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                Featured <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
              </h2>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="icon"
                    className="bg-gradient-to-r from-primary to-accent hover:shadow-glow hover:scale-110 transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Ajouter un projet</DialogTitle>
                    <DialogDescription>
                      Ajoutez un nouveau projet à votre portfolio
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Titre *</Label>
                      <Input
                        id="title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        placeholder="Mon super projet"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        placeholder="Une description détaillée du projet..."
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tags">Technologies (séparées par des virgules)</Label>
                      <Input
                        id="tags"
                        value={newProject.tags}
                        onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="github">URL GitHub</Label>
                      <Input
                        id="github"
                        value={newProject.githubUrl}
                        onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="demo">URL Demo</Label>
                      <Input
                        id="demo"
                        value={newProject.demoUrl}
                        onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddProject} className="bg-gradient-to-r from-primary to-accent hover:shadow-glow">
                    Ajouter le projet
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Some of my recent work showcasing my skills and creativity
            </p>
          </div>

          <div ref={sectionRef} className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-soft hover:scale-105",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 rounded-md bg-muted text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-accent hover:shadow-glow hover:scale-105 transition-all duration-300"
                        onClick={() => window.open(project.demoUrl, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    )}
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

export default Projects;
