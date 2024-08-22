import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className=" text-white mt-4 "
    >
      <div className="container bg-gradient-to-br from-teal-300 via-primary/100 to-purple-300 rounded-3xl py-20 max-w-6xl mx-auto px-4 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">
            Ready to ace your case interviews?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of successful candidates who prepared with CaseNow
          </p>
          <Button
            variant="default"
            className="bg-white text-primary hover:bg-gray-100 text-lg py-2 px-6"
          >
            Start Practicing Now
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
