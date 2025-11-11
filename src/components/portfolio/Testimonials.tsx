import { Quote, Plus, Trash2, Edit, Star } from "lucide-react";
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

interface Testimonial {
  name: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  avatar?: string;
}

const testimonialSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Le nom doit faire moins de 100 caractères"),
  role: z.string().trim().min(1, "Le rôle est requis").max(100, "Le rôle doit faire moins de 100 caractères"),
  company: z.string().trim().min(1, "L'entreprise est requise").max(100, "L'entreprise doit faire moins de 100 caractères"),
  message: z.string().trim().min(1, "Le message est requis").max(500, "Le message doit faire moins de 500 caractères"),
  rating: z.number().min(1, "La note minimale est 1").max(5, "La note maximale est 5"),
});

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp Inc.",
    message: "Working with this developer was an absolute pleasure. The attention to detail and commitment to delivering high-quality code exceeded our expectations. Highly recommended!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "StartupHub",
    message: "Exceptional technical skills combined with great communication. The project was delivered on time and the code quality was outstanding. Will definitely work together again.",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "Lead Designer",
    company: "Creative Studios",
    message: "Amazing collaboration! The developer understood our design vision perfectly and brought it to life with pixel-perfect implementation. A true professional.",
    rating: 5,
  },
];

const STORAGE_KEY = "portfolio-custom-testimonials";

const Testimonials = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const parallaxSlow = useParallax(0.2);
  const parallaxFast = useParallax(0.5);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  
  const [customTestimonials, setCustomTestimonials] = useState<Testimonial[]>([]);

  // Charger les témoignages personnalisés depuis localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCustomTestimonials(parsed);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des témoignages:", error);
    }
  }, []);

  // Sauvegarder les témoignages personnalisés dans localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customTestimonials));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des témoignages:", error);
    }
  }, [customTestimonials]);

  // Combiner les témoignages par défaut avec les témoignages personnalisés
  const allTestimonials = [...DEFAULT_TESTIMONIALS, ...customTestimonials];

  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    company: "",
    message: "",
    rating: 5,
  });

  const handleAddTestimonial = () => {
    try {
      const validated = testimonialSchema.parse(newTestimonial);

      const testimonial: Testimonial = {
        name: validated.name,
        role: validated.role,
        company: validated.company,
        message: validated.message,
        rating: validated.rating,
      };

      if (editingIndex !== null) {
        // Modification d'un témoignage personnalisé (index ajusté)
        const customIndex = editingIndex - DEFAULT_TESTIMONIALS.length;
        if (customIndex >= 0) {
          const updatedCustomTestimonials = [...customTestimonials];
          updatedCustomTestimonials[customIndex] = testimonial;
          setCustomTestimonials(updatedCustomTestimonials);
          toast({
            title: "Témoignage modifié !",
            description: "Le témoignage a été modifié avec succès",
          });
        }
      } else {
        // Ajout d'un nouveau témoignage
        setCustomTestimonials([...customTestimonials, testimonial]);
        toast({
          title: "Témoignage ajouté !",
          description: "Le témoignage a été ajouté avec succès",
        });
      }

      setNewTestimonial({ name: "", role: "", company: "", message: "", rating: 5 });
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

  const handleEditTestimonial = (index: number) => {
    // Seuls les témoignages personnalisés peuvent être édités
    if (index < DEFAULT_TESTIMONIALS.length) {
      toast({
        title: "Action non autorisée",
        description: "Les témoignages par défaut ne peuvent pas être modifiés",
        variant: "destructive",
      });
      return;
    }

    const testimonial = allTestimonials[index];
    setNewTestimonial({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      message: testimonial.message,
      rating: testimonial.rating,
    });
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDeleteTestimonial = (index: number) => {
    // Seuls les témoignages personnalisés peuvent être supprimés
    if (index < DEFAULT_TESTIMONIALS.length) {
      toast({
        title: "Action non autorisée",
        description: "Les témoignages par défaut ne peuvent pas être supprimés",
        variant: "destructive",
      });
      setDeleteIndex(null);
      return;
    }

    const customIndex = index - DEFAULT_TESTIMONIALS.length;
    const updatedCustomTestimonials = customTestimonials.filter((_, i) => i !== customIndex);
    setCustomTestimonials(updatedCustomTestimonials);
    setDeleteIndex(null);
    toast({
      title: "Témoignage supprimé !",
      description: "Le témoignage a été supprimé avec succès",
    });
  };

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 animate-gradient-xy" />
      
      {/* Parallax floating decorations */}
      <div 
        className="absolute top-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" 
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" 
        style={{ transform: `translateY(${parallaxFast}px)`, animationDelay: "1s" }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                Client <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Testimonials</span>
              </h2>
              <Dialog open={open} onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) {
                  setEditingIndex(null);
                  setNewTestimonial({ name: "", role: "", company: "", message: "", rating: 5 });
                }
              }}>
                <DialogTrigger asChild>
                  <Button 
                    size="icon"
                    className="bg-gradient-to-r from-accent to-primary hover:shadow-glow hover:scale-110 transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>{editingIndex !== null ? "Modifier le témoignage" : "Ajouter un témoignage"}</DialogTitle>
                    <DialogDescription>
                      {editingIndex !== null ? "Modifiez les informations du témoignage" : "Ajoutez un nouveau témoignage à votre portfolio"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nom *</Label>
                      <Input
                        id="name"
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                        placeholder="Jean Dupont"
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="role">Rôle *</Label>
                      <Input
                        id="role"
                        value={newTestimonial.role}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                        placeholder="CEO"
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company">Entreprise *</Label>
                      <Input
                        id="company"
                        value={newTestimonial.company}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                        placeholder="TechCorp Inc."
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={newTestimonial.message}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, message: e.target.value })}
                        placeholder="Votre témoignage..."
                        rows={4}
                        maxLength={500}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="rating">Note (1-5) *</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        value={newTestimonial.rating}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) || 5 })}
                        required
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddTestimonial} className="bg-gradient-to-r from-accent to-primary hover:shadow-glow">
                    {editingIndex !== null ? "Enregistrer les modifications" : "Ajouter le témoignage"}
                  </Button>
                </DialogContent>
              </Dialog>
              
              <AlertDialog open={deleteIndex !== null} onOpenChange={(isOpen) => !isOpen && setDeleteIndex(null)}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. Le témoignage sera définitivement supprimé.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => deleteIndex !== null && handleDeleteTestimonial(deleteIndex)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              What clients and colleagues say about working with me
            </p>
          </div>

          <div ref={sectionRef} className="grid md:grid-cols-3 gap-8">
            {allTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-soft hover:scale-105",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-8 space-y-6">
                  {/* Quote icon */}
                  <div className="flex justify-between items-start">
                    <Quote className="w-10 h-10 text-accent/30" />
                    {index >= DEFAULT_TESTIMONIALS.length && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                          onClick={() => handleEditTestimonial(index)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                          onClick={() => setDeleteIndex(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-5 h-5",
                          i < testimonial.rating
                            ? "fill-accent text-accent"
                            : "text-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{testimonial.message}"
                  </p>

                  {/* Author info */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
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

export default Testimonials;
