import { GraduationCap } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Licence Professionnelle",
      field: "Développement Mobile",
      duration: "1 an",
      year: "Bachelor",
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
    <section id="education" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Education & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Formation</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Mon parcours académique en développement et technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-soft animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${edu.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
