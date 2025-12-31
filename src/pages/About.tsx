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
      description:
        "Every thread, every pattern, every repair is handled with deep respect for the artisans who created these masterpieces.",
    },
    {
      icon: Award,
      title: "Excellence in Service",
      description:
        "We maintain the highest standards in every aspect of our work, from initial consultation to final delivery.",
    },
    {
      icon: Users,
      title: "Community Heritage",
      description:
        "Supporting local artisan communities and preserving traditional techniques for future generations.",
    },
    {
      icon: Shield,
      title: "Trust & Integrity",
      description:
        "Building lasting relationships through honest communication, transparent pricing, and reliable service.",
    },
  ];

  return (
    <div className="bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[45vh]  min-h-[350px] lg:h-[66vh] bg-black flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Our Story"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-serif text-5xl md:text-6xl font-normal text-white mb-6 uppercase tracking-widest">
              Our Story
            </h1>
            <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed uppercase tracking-widest max-w-xl mx-auto">
              A legacy of craftsmanship, care, and dedication to preserving
              textile heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Heritage Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="animate-fade-in-left order-2 lg:order-1">
              <img
                src={aboutImage}
                alt="Traditional carpet weaving heritage"
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="animate-fade-in order-1 lg:order-2">
              <h2 className="font-serif text-3xl md:text-5xl font-normal mb-8 text-black uppercase tracking-widest leading-tight">
                Where Tradition Meets Excellence
              </h2>
              <div className="space-y-6 font-sans text-sm md:text-base text-gray-500 leading-relaxed tracking-wide">
                <p>
                  Loom Tales began with a simple belief: every carpet and shawl
                  carries within it the stories of countless hands, generations
                  of knowledge, and irreplaceable cultural heritage.
                </p>
                <p>
                  For over three decades, we've dedicated ourselves to mastering
                  the delicate art of carpet and shawl restoration, combining
                  time-honored techniques with modern conservation methods.
                </p>
                <p>
                  We understand that these textiles are more than mere
                  objects—they're family heirlooms and artistic treasures. This
                  understanding guides every decision we make.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="font-serif text-3xl md:text-5xl font-normal mb-6 text-black uppercase tracking-widest">
              Our Core Values
            </h2>
            <p className="font-sans text-xs md:text-sm text-gray-400 uppercase tracking-widest leading-relaxed">
              The principles that guide everything we do at Loom Tales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center space-y-6"
                >
                  <div className="mb-2">
                    <Icon className="w-8 h-8 text-black stroke-[1] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="font-serif text-lg font-normal text-black uppercase tracking-widest relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-px after:bg-black/20">
                    {value.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed uppercase tracking-wide px-4">
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
