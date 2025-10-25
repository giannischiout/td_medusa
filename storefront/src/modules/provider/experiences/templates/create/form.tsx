"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card"
import { Input } from "components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Zod schema for form validation
const productSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
  category: z.string().min(1, "Category is required"),
  duration: z.string().min(1, "Duration is required"),
  maxParticipants: z
    .string()
    .min(1, "Max participants is required")
    .regex(/^\d+$/, "Must be a valid number"),
  location: z.string().min(1, "Location is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.string().optional(),
})

type ProductFormData = z.infer<typeof productSchema>

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      duration: "",
      maxParticipants: "",
      location: "",
      difficulty: "easy",
      tags: "",
    },
  })

  const onSubmit = async (data: ProductFormData) => {
    try {
      console.log("Form data:", data)
      // Here you would typically send the data to your API
      // await createExperience(data)

      // Reset form after successful submission
      reset()
      alert("Experience created successfully!")
    } catch (error) {
      console.error("Error creating experience:", error)
      alert("Error creating experience. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide the essential details for your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title *
            </label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter experience title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description *
            </label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Describe your experience in detail"
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category *
            </label>
            <select
              id="category"
              {...register("category")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="culinary">Culinary</option>
              <option value="nature">Nature</option>
              <option value="sports">Sports</option>
              <option value="wellness">Wellness</option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing & Details</CardTitle>
          <CardDescription>
            Set the price and basic details for your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                Price (USD) *
              </label>
              <Input
                id="price"
                type="text"
                {...register("price")}
                placeholder="0.00"
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label htmlFor="duration" className="text-sm font-medium">
                Duration *
              </label>
              <Input
                id="duration"
                {...register("duration")}
                placeholder="e.g., 2 hours, 1 day"
                className={errors.duration ? "border-red-500" : ""}
              />
              {errors.duration && (
                <p className="text-sm text-red-500">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* Max Participants */}
            <div className="space-y-2">
              <label htmlFor="maxParticipants" className="text-sm font-medium">
                Max Participants *
              </label>
              <Input
                id="maxParticipants"
                type="number"
                {...register("maxParticipants")}
                placeholder="10"
                className={errors.maxParticipants ? "border-red-500" : ""}
              />
              {errors.maxParticipants && (
                <p className="text-sm text-red-500">
                  {errors.maxParticipants.message}
                </p>
              )}
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <label htmlFor="difficulty" className="text-sm font-medium">
                Difficulty Level *
              </label>
              <select
                id="difficulty"
                {...register("difficulty")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.difficulty ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              {errors.difficulty && (
                <p className="text-sm text-red-500">
                  {errors.difficulty.message}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location *
            </label>
            <Input
              id="location"
              {...register("location")}
              placeholder="City, Country"
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">
              Tags
            </label>
            <Input
              id="tags"
              {...register("tags")}
              placeholder="outdoor, family-friendly, beginner"
              className={errors.tags ? "border-red-500" : ""}
            />
            {errors.tags && (
              <p className="text-sm text-red-500">{errors.tags.message}</p>
            )}
            <p className="text-xs text-gray-500">
              Separate multiple tags with commas
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          disabled={isSubmitting}
        >
          Reset
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Experience"}
        </Button>
      </div>
    </form>
  )
}
