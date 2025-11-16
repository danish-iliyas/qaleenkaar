import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Heart, Users, Shield } from "lucide-react";
import aboutImage from "@/assets/about-heritage.jpg";
import heroImage from "@/assets/hero-carpet.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Craft",
      description: "Every thread, every pattern, every repair is handled with deep respect for the artisans who created these masterpieces.",
    },
    {
      icon: Award,
      title: "Excellence in Service",
      description: "We maintain the highest standards in every aspect of our work, from initial consultation to final delivery.",
    },
    {
      icon: Users,
      title: "Community Heritage",
      description: "Supporting local artisan communities and preserving traditional techniques for future generations.",
    },
    {
      icon: Shield,
      title: "Trust & Integrity",
      description: "Building lasting relationships through honest communication, transparent pricing, and reliable service.",
    },
  ];

  return (
    <div className="bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[45vh]  min-h-[350px] lg:h-[66vh] bg-red-600 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Our Story"
            className="w-full h-full object-cover"
          />
          {/* MODIFIED: Gradient is more transparent for a clearer image */}
          <div className="absolute inset-0 bg-gradient-to-r from-brown/60 via-brown/50 to-brown/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
              Our Story
            </h1>
            <p className="font-body text-xl text-white/90 leading-relaxed">
              A legacy of craftsmanship, care, and dedication to preserving textile heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Heritage Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <img
                src={aboutImage}
                alt="Traditional carpet weaving heritage"
                className="w-full h-auto rounded-lg shadow-elegant"
              />
            </div>
            <div className="animate-fade-in">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-[#794299]">
                Where Tradition Meets Excellence
              </h2>
              <div className="space-y-4 font-body text-lg text-muted-foreground leading-relaxed">
                <p>
                  Loom Tales began with a simple belief: every carpet and shawl carries within it the stories 
                  of countless hands, generations of knowledge, and irreplaceable cultural heritage.
                </p>
                <p>
                  For over three decades, we've dedicated ourselves to mastering the delicate art of carpet and 
                  shawl restoration, combining time-honored techniques with modern conservation methods.
                </p>
                <p>
                  We understand that these textiles are more than mere objects—they're family heirlooms and artistic treasures. This understanding guides every decision we make.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-[#794299]">
              Our Core Values
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              The principles that guide everything we do at Loom Tales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-8 bg-card rounded-lg shadow-soft text-center border border-black/5 transition-all duration-200 ease-out transform hover:scale-[1.02]"
                >
                  {/* MODIFIED: Changed icon colors to purple */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/10 rounded-full mb-6">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-[#794299]">
                    {value.title}
                  </h3>
                  <p className="font-body text-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;