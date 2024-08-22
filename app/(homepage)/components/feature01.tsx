"use client";
import { motion } from "framer-motion";
import { BarChart, Brain, Users } from "lucide-react";

export default function Feature01() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="container max-w-6xl mx-auto px-4 py-20 text-center"
      id="features"
    >
      <h2 className="text-3xl font-bold mb-4 text-primary">CaseNow Features</h2>
      <h3 className="text-5xl md:text-6xl font-bold mb-12 max-w-4xl mx-auto leading-tight">
        Practice smarter, not harder
      </h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, staggerChildren: 0.1 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >
        <motion.div className="flex flex-col items-center">
          <Brain className="h-12 w-12 text-primary mb-4" />
          <h4 className="text-xl font-semibold mb-2">AI-Powered Cases</h4>
          <p className="text-gray-600">
            Experience dynamic, realistic case scenarios generated by advanced
            AI
          </p>
        </motion.div>
        <motion.div className="flex flex-col items-center">
          <BarChart className="h-12 w-12 text-primary mb-4" />
          <h4 className="text-xl font-semibold mb-2">Instant Feedback</h4>
          <p className="text-gray-600">
            Receive immediate, detailed feedback on your performance after each
            case
          </p>
        </motion.div>
        <motion.div className="flex flex-col items-center">
          <Users className="h-12 w-12 text-primary mb-4" />
          <h4 className="text-xl font-semibold mb-2">Personalized Coaching</h4>
          <p className="text-gray-600">
            Get tailored advice and practice plans based on your strengths and
            weaknesses
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
