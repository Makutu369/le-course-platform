"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Church, BookOpen } from 'lucide-react'
import Image from "next/image"

export default function StudentInfoPage() {
  return (
    <div className="container flex flex-col md:flex-row  items-center justify-center min-h-screen py-8 ">
     <div className=" flex flex-col md:flex-row  items-center justify-center  py-12 px-6 rounded-md">

        <div className="w-full max-w-2xl hidden md:block ">
            <Image src="/learning.png" alt="Student studying" width={700} height={600} priority />
        </div>
        <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
            <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Student Information</CardTitle>
            <CardDescription className="text-center">
                Please provide your contact number and Mega Church (MC) before continuing
            </CardDescription>
            </CardHeader>
            <form >
            <CardContent className="space-y-4">
                <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="contact">Contact Number</Label>
                </div>
                <Input id="contact" name="contact" type="tel" placeholder="(123) 456-7890" required />
                </div>

                <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Church className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="megaChurch">Mega Church (MC)</Label>
                </div>
                <Select name="megaChurch" required>
                    <SelectTrigger>
                    <SelectValue placeholder="Select your Mega Church" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="proton">Proton MC</SelectItem>
                    <SelectItem value="col">Col MC</SelectItem>
                    <SelectItem value="blessed">Blessed MC</SelectItem>
                    <SelectItem value="other">Other MC</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button type="submit" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Continue to My Studies
                </Button>
            </CardFooter>
            </form>
        </Card>
        </div>
    </div>
  )
}

