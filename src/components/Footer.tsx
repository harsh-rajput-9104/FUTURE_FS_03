import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, Linkedin } from "lucide-react";

const footerLinks = {
  products: ["Classic", "Zero", "Cherry", "Limited Editions"],
  company: ["About", "Careers", "Press", "Sustainability"],
  support: ["Contact", "FAQ", "Shipping", "Returns"],
  legal: ["Privacy", "Terms", "Cookies", "Accessibility"],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export const Footer = () => {
  return (
    <footer id="contact" className="relative pt-24 pb-12 border-t border-border/30">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl font-semibold mb-4"
            >
              <span className="text-gradient">COLA</span>
              <span className="text-foreground/80 text-xl ml-1">neo</span>
            </motion.div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              The taste of tomorrow, available today. Experience refreshment reimagined.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="font-medium text-foreground mb-4 capitalize">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                    >
                      {link}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-2">
                Stay in the <span className="text-gradient">Loop</span>
              </h3>
              <p className="text-muted-foreground">
                Get exclusive drops, limited editions, and brand news.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            © 2026 Cola Neo. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed with <span className="text-primary">♦</span> for the future
          </p>
        </div>
      </div>
    </footer>
  );
};
