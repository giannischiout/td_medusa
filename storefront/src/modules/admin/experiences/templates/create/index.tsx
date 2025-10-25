"use client"

import { ProviderContainer } from "components/provider/provider-container"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card"
import { default as ExperienceForm, default as ProductForm } from "./form"

export default function CreateExperienceTemplate() {
  return (
    <ProviderContainer>
      {/* Content */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Experience Details</CardTitle>
            <CardDescription>
              Fill in the details for your new experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductForm />
          </CardContent>
        </Card>
      </div>
      <ExperienceForm />
    </ProviderContainer>
  )
}
