import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const BrandStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          style={{ opacity, scale }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Era Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Est. 1886 • Reimagined 2026</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]"
          >
            140 Years of
            <br />
            <span className="text-gradient">Innovation</span>
          </motion.h2>

          {/* Story Text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            From a small pharmacy in Atlanta to a global symbol of refreshment. 
            We've never stopped evolving, never stopped innovating. This is our 
            boldest chapter yet—a neo-futurist vision that honors our heritage 
            while embracing tomorrow.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "200+", label: "Countries" },
              { value: "1.9B", label: "Daily Servings" },
              { value: "140", label: "Years of Legacy" },
              { value: "∞", label: "Possibilities" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <p className="font-heading text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 text-center"
        >
          <blockquote className="font-heading text-2xl md:text-3xl italic text-muted-foreground/60 max-w-2xl mx-auto">
            "The future isn't something we enter. The future is something we{" "}
            <span className="text-foreground not-italic">create</span>."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};
