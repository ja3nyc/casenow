"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="container max-w-6xl mx-auto px-4 py-20 text-center"
      id="pricing"
    >
      <h2 className="text-3xl font-bold mb-4 text-primary">Pricing Plans</h2>
      <h3 className="text-5xl md:text-6xl font-bold mb-12 max-w-4xl mx-auto leading-tight">
        Choose the perfect plan for your needs
      </h3>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Basic",
            price: "$9.99",
            description: "Perfect for beginners",
            features: [
              "50 practice cases",
              "Basic AI feedback",
              "Email support",
            ],
          },
          {
            title: "Pro",
            price: "$19.99",
            description: "For serious candidates",
            features: [
              "Unlimited practice cases",
              "Advanced AI feedback",
              "Priority email support",
              "Performance analytics",
            ],
          },
          {
            title: "Enterprise",
            price: "Custom",
            description: "For organizations",
            features: [
              "Custom case library",
              "Team management",
              "Dedicated account manager",
              "API access",
            ],
          },
        ].map((plan, index) => (
          <Card key={index} className={index === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-4">{plan.price}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={index === 1 ? "default" : "outline"}
              >
                Choose Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}
