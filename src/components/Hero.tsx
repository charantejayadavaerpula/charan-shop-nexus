import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-product.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-20">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Electronics
                <span className="block text-muted-foreground">For Makers</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Build your next project with our curated selection of development boards, sensors, and displays. From ESP32 to Raspberry Pi.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="group"
                onClick={() => {
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse Components
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                View Projects
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="aspect-square lg:aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={heroImage}
                alt="Electronics Development Boards"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
