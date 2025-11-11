import { ExternalLink, Github, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useParallax } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
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
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  githubUrl?: string;
  demoUrl?: string;
}

const projectSchema = z.object({
  title: z.string().trim().min(1, "Le titre est requis").max(100, "Le titre doit faire moins de 100 caractères"),
  description: z.string().trim().min(1, "La description est requise").max(500, "La description doit faire moins de 500 caractères"),
  tags: z.string().max(200, "Les tags doivent faire moins de 200 caractères"),
  githubUrl: z.string().url("URL GitHub invalide").or(z.literal("")),
  demoUrl: z.string().url("URL Demo invalide").or(z.literal("")),
});

const DEFAULT_PROJECTS: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with real-time inventory management, secure payments, and responsive design.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    gradient: "from-primary to-primary/80"
  },
  {
    title: "Portfolio Dashboard",
    description: "Analytics dashboard for tracking portfolio performance with interactive charts and data visualization.",
    tags: ["Next.js", "TypeScript", "Recharts", "Tailwind"],
    gradient: "from-accent to-accent/80"
  },
  {
    title: "Social Media App",
    description: "Full-stack social platform with real-time messaging, post sharing, and user interactions.",
    tags: ["React", "Firebase", "Redux", "Material-UI"],
    gradient: "from-primary via-accent to-primary"
  },
  {
    title: "Task Management Tool",
    description: "Collaborative task manager with drag-and-drop interface, team collaboration, and deadline tracking.",
    tags: ["Vue.js", "Express", "MongoDB", "Socket.io"],
    gradient: "from-accent via-primary to-accent"
  }
];

const STORAGE_KEY = "portfolio-custom-projects";

const Projects = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const parallaxSlow = useParallax(0.2);
  const parallaxFast = useParallax(0.5);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  
  const [customProjects, setCustomProjects] = useState<Project[]>([]);

  // Charger les projets personnalisés depuis localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCustomProjects(parsed);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
    }
  }, []);

  // Sauvegarder les projets personnalisés dans localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customProjects));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des projets:", error);
    }
  }, [customProjects]);

  // Combiner les projets par défaut avec les projets personnalisés
  const allProjects = [...DEFAULT_PROJECTS, ...customProjects];

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tags: "",
    githubUrl: "",
    demoUrl: ""
  });

  const handleAddProject = () => {
    try {
      const validated = projectSchema.parse(newProject);

      const gradients = [
        "from-primary to-primary/80",
        "from-accent to-accent/80",
        "from-primary via-accent to-primary",
        "from-accent via-primary to-accent",
        "from-primary/90 to-accent/90",
        "from-accent/90 to-primary/90",
      ];

      const project: Project = {
        title: validated.title,
        description: validated.description,
        tags: validated.tags ? validated.tags.split(",").map(tag => tag.trim()).filter(tag => tag) : [],
        gradient: gradients[Math.floor(Math.random() * gradients.length)],
        githubUrl: validated.githubUrl || undefined,
        demoUrl: validated.demoUrl || undefined,
      };

      if (editingIndex !== null) {
        // Modification d'un projet personnalisé (index ajusté)
        const customIndex = editingIndex - DEFAULT_PROJECTS.length;
        if (customIndex >= 0) {
          const updatedCustomProjects = [...customProjects];
          updatedCustomProjects[customIndex] = project;
          setCustomProjects(updatedCustomProjects);
          toast({
            title: "Projet modifié !",
            description: "Votre projet a été modifié avec succès",
          });
        }
      } else {
        // Ajout d'un nouveau projet
        setCustomProjects([...customProjects, project]);
        toast({
          title: "Projet ajouté !",
          description: "Votre projet a été ajouté avec succès",
        });
      }

      setNewProject({ title: "", description: "", tags: "", githubUrl: "", demoUrl: "" });
      setEditingIndex(null);
      setOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  const handleEditProject = (index: number) => {
    // Seuls les projets personnalisés peuvent être édités
    if (index < DEFAULT_PROJECTS.length) {
      toast({
        title: "Action non autorisée",
        description: "Les projets par défaut ne peuvent pas être modifiés",
        variant: "destructive",
      });
      return;
    }

    const project = allProjects[index];
    setNewProject({
      title: project.title,
      description: project.description,
      tags: project.tags.join(", "),
      githubUrl: project.githubUrl || "",
      demoUrl: project.demoUrl || "",
    });
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDeleteProject = (index: number) => {
    // Seuls les projets personnalisés peuvent être supprimés
    if (index < DEFAULT_PROJECTS.length) {
      toast({
        title: "Action non autorisée",
        description: "Les projets par défaut ne peuvent pas être supprimés",
        variant: "destructive",
      });
      setDeleteIndex(null);
      return;
    }

    const customIndex = index - DEFAULT_PROJECTS.length;
    const updatedCustomProjects = customProjects.filter((_, i) => i !== customIndex);
    setCustomProjects(updatedCustomProjects);
    setDeleteIndex(null);
    toast({
      title: "Projet supprimé !",
      description: "Le projet a été supprimé avec succès",
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
              <Dialog open={open} onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) {
                  setEditingIndex(null);
                  setNewProject({ title: "", description: "", tags: "", githubUrl: "", demoUrl: "" });
                }
              }}>
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
                    <DialogTitle>{editingIndex !== null ? "Modifier le projet" : "Ajouter un projet"}</DialogTitle>
                    <DialogDescription>
                      {editingIndex !== null ? "Modifiez les informations du projet" : "Ajoutez un nouveau projet à votre portfolio"}
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
                        maxLength={100}
                        required
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
                        maxLength={500}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tags">Technologies (séparées par des virgules)</Label>
                      <Input
                        id="tags"
                        value={newProject.tags}
                        onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                        placeholder="React, Node.js, MongoDB"
                        maxLength={200}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="github">URL GitHub</Label>
                      <Input
                        id="github"
                        type="url"
                        value={newProject.githubUrl}
                        onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="demo">URL Demo</Label>
                      <Input
                        id="demo"
                        type="url"
                        value={newProject.demoUrl}
                        onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddProject} className="bg-gradient-to-r from-primary to-accent hover:shadow-glow">
                    {editingIndex !== null ? "Enregistrer les modifications" : "Ajouter le projet"}
                  </Button>
                </DialogContent>
              </Dialog>
              
              <AlertDialog open={deleteIndex !== null} onOpenChange={(isOpen) => !isOpen && setDeleteIndex(null)}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. Le projet sera définitivement supprimé.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => deleteIndex !== null && handleDeleteProject(deleteIndex)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Some of my recent work showcasing my skills and creativity
            </p>
          </div>

          <div ref={sectionRef} className="grid md:grid-cols-2 gap-8">
            {allProjects.map((project, index) => (
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

                  <div className="flex justify-between items-center gap-3 pt-4">
                    <div className="flex gap-3">
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
                    {index >= DEFAULT_PROJECTS.length && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
                          onClick={() => handleEditProject(index)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                          onClick={() => setDeleteIndex(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
