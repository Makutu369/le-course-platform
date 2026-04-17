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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
          <div className="w-full max-w-2xl hidden md:block">
            <div className="relative overflow-hidden border-2 border-border">
              <Image
                src="/learning.png"
                alt="Student studying"
                width={700}
                height={600}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent flex items-end">
                <div className="p-10 text-foreground">
                  <h2 className="text-3xl font-black mb-3 tracking-tight leading-tight">
                    Welcome to Your
                    <br />
                    Learning Journey
                  </h2>
                  <p className="text-sm text-muted-foreground/80 max-w-md leading-relaxed">
                    Complete your profile to access all courses and spiritual development resources.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="w-full max-w-md border-2 border-border bg-card overflow-hidden">
            <CardHeader className="space-y-4 pb-8 pt-10">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 mx-auto mb-2">
                <Church className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-black text-center tracking-tight">
                  Student Info
                </CardTitle>
                <CardDescription className="text-center text-muted-foreground/70 text-sm leading-relaxed px-4">
                  Please provide your contact details to personalize your experience.
                </CardDescription>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 px-8">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <Label htmlFor="contact" className="font-semibold text-xs uppercase tracking-wider">
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
                      className="pl-20 h-12"
                      required
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">
                      +233
                    </div>
                  </div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50 px-1">
                    10-digit ghanaian number
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Church className="h-4 w-4 text-primary" />
                    <Label htmlFor="megaChurch" className="font-semibold text-xs uppercase tracking-wider">
                      Mega Church (MC)
                    </Label>
                  </div>
                  <Select
                    name="megaChurch"
                    value={megaChurch}
                    onValueChange={(value) => setMegaChurch(value)}
                    required
                  >
                    <SelectTrigger className="h-12">
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

              <CardFooter className="px-8 pb-10 pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-sm font-bold group"
                  disabled={isLoading || !contact || !megaChurch}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Saving Profile...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Start Learning
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
