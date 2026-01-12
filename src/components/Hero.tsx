import { motion } from "framer-motion";
import heroBottle from "@/assets/hero-bottle.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, hsl(0 84% 50% / 0.3) 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-breathe text-sm text-muted-foreground uppercase mb-4"
            >
              Reimagined for the Future
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6"
            >
              The Taste
              <br />
              <span className="text-gradient">Evolved</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8"
            >
              A century of refreshment, reborn for a new era. 
              Experience the iconic taste through a neo-futurist lens.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href="#products">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(0 84% 50% / 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg pulse-glow"
              >
                Explore Collection
              </motion.button>
              </a>           
              <a href="#story">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full glass border border-foreground/10 font-medium text-lg hover:border-foreground/30 transition-colors"
              >
                View Story
              </motion.button>
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="relative float">
              <img
                src={heroBottle}
                alt="Cola Neo Bottle"
                className="w-full max-w-lg mx-auto rounded-3xl"
              />
              {/* Glow behind image */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-50">
                <div className="w-full h-full bg-primary/30 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};
