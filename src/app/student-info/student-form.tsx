"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Church, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { addUserPhone, assignUserToMC } from "@/lib/queries/queries";

type MegaCenter = {
  id: string;
  name: string;
};

export default function StudentInfoForm({
  megaCenters,
}: {
  megaCenters: MegaCenter[];
}) {
  const [contact, setContact] = useState("");
  const [megaChurch, setMegaChurch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await addUserPhone(contact);
      await assignUserToMC(megaChurch);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
      setContact("");
      setMegaChurch("");
      window.location.href = "/courses";
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    const formattedValue = value.slice(0, 10);
    setContact(formattedValue);
  };

  return (
    <div className="min-h-screen  py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
          <div className="w-full max-w-2xl hidden md:block">
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src="/learning.png"
                alt="Student studying"
                width={700}
                height={600}
                className="object-cover transition-transform hover:scale-105 duration-700"
                priority
              />
              <div className="absolute   to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h2 className="text-3xl font-bold mb-3">
                    Welcome to Your Learning Journey
                  </h2>
                  <p className="text-base opacity-90 max-w-md">
                    Complete your profile to access all courses and learning
                    resources
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="w-full max-w-md border border-slate-200 dark:border-slate-700 shadow-xs bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-xs">
            <CardHeader className="space-y-3 pb-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-3">
                <Church className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Student Information
              </CardTitle>
              <CardDescription className="text-center text-slate-500 dark:text-slate-400">
                Please provide your contact number and Mega Church (MC) before
                continuing
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-1.5">
                    <Phone className="h-4 w-4 text-primary" />
                    <Label htmlFor="contact" className="font-medium">
                      Contact Number
                    </Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="contact"
                      name="contact"
                      type="tel"
                      value={contact}
                      onChange={handlePhoneChange}
                      placeholder="0542349303"
                      className="pl-20 transition-all border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary/20"
                      required
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      +233
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your 10-digit phone number
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-1.5">
                    <Church className="h-4 w-4 text-primary" />
                    <Label htmlFor="megaChurch" className="font-medium">
                      Mega Church (MC)
                    </Label>
                  </div>
                  <Select
                    name="megaChurch"
                    value={megaChurch}
                    onValueChange={(value) => setMegaChurch(value)}
                    required
                  >
                    <SelectTrigger className="transition-all border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary/20">
                      <SelectValue placeholder="Select your Mega Church" />
                    </SelectTrigger>
                    <SelectContent>
                      {megaCenters.map((mc) => (
                        <SelectItem key={mc.id} value={mc.id}>
                          {mc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 pt-2">
                <Button
                  type="submit"
                  className="w-full group h-11 transition-all"
                  disabled={isLoading || !contact || !megaChurch}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Continue
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
