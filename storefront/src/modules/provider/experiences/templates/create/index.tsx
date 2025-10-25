"use client"

import ExperienceForm from "@modules/admin/experiences/templates/create/form"
import { ProviderContainer } from "components/provider/provider-container"

export default function CreateExperienceTemplate() {
  return (
    <ProviderContainer>
      <div className="space-y-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Create New Experience
          </h1>
          <p className="text-gray-600">
            Add a new travel experience to your catalog
          </p>
        </div>
      </div>
      <ExperienceForm />
    </ProviderContainer>
  )
}
