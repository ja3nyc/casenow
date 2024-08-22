"use client";
import Depth from "@/public/images/depth.jpg";
import { motion } from "framer-motion";
import { BarChart, Globe, Zap } from "lucide-react";
import Image from "next/image";
export default function Feature02() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white py-20"
    >
      <div className="container max-w-6xl  mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h3 className="text-3xl font-bold mb-4">
              Realistic Case Simulations
            </h3>
            <p className="text-xl text-gray-600 mb-6">
              CaseNow uses advanced natural language processing to create
              lifelike case interview scenarios. Practice with a wide variety of
              industries, problem types, and difficulty levels.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Zap className="h-5 w-5 text-primary mr-2" />
                <span>Over 500+ unique case scenarios</span>
              </li>
              <li className="flex items-center">
                <Globe className="h-5 w-5 text-primary mr-2" />
                <span>Cases from various industries and regions</span>
              </li>
              <li className="flex items-center">
                <BarChart className="h-5 w-5 text-primary mr-2" />
                <span>Adjustable difficulty levels</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 max-h-72 rounded-lg shadow-lg overflow-hidden">
            <Image
              src={Depth}
              alt="CaseNow Interface"
              className="-translate-y-32"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
