import { useState } from "react";
import { motion } from "framer-motion";
import productCan from "@/assets/product-can.jpg";
import productZero from "@/assets/product-zero.jpg";
import productCherry from "@/assets/product-cherry.jpg";
import { ProductModal } from "./ProductModal";

const products = [
  {
    id: 1,
    name: "Classic",
    tagline: "The Original",
    price: "$2.49",
    image: productCan,
    description: "The timeless taste that started it all. Pure refreshment in every sip.",
    available: true,
  },
  {
    id: 2,
    name: "Zero",
    tagline: "Zero Sugar",
    price: "$2.49",
    image: productZero,
    description: "All the taste, none of the sugar. The future of refreshment.",
    available: true,
  },
  {
    id: 3,
    name: "Cherry",
    tagline: "Bold Fusion",
    price: "$2.79",
    image: productCherry,
    description: "A bold twist on a classic. Cherry-infused perfection.",
    available: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const ProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  return (
    <>
      <section id="products" className="py-32 relative">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm text-primary uppercase tracking-widest mb-4">The Collection</p>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Choose Your <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three distinct expressions of refreshment, crafted for the modern palate.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer"
              >
                <div className="relative glass rounded-3xl p-8 h-full transition-all duration-500 hover:border-primary/30">
                  {/* Availability badge */}
                  {!product.available && (
                    <span className="absolute top-3 right-3 z-10 px-3 py-1 text-xs rounded-full bg-black/70 backdrop-blur text-white border border-white/10">
                      Coming Soon
                    </span>
                  )}
                  
                  {/* Product Image */}
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>

                  {/* Product Info */}
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                      {product.tagline}
                    </p>
                    <h3 className="font-heading text-2xl font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xl text-primary font-medium">{product.price}</p>
                  </div>

                  {/* Hover CTA */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium">
                      View Details
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
};
