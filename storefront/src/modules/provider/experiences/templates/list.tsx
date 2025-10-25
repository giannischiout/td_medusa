"use client"

import { Button } from "components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card"
import { paths } from "lib/paths"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ExperiencesListTemplate() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Experiences</h1>
          <p className="text-gray-600">
            Manage your travel experiences and activities
          </p>
        </div>
        <Link href={paths.provider.experiences.create.details}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Experience
          </Button>
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <Link
            href={paths.provider.experiences.index}
            className="border-b-2 border-blue-500 py-2 px-1 text-sm font-medium text-blue-600"
          >
            All Experiences
          </Link>
          <Link
            href={paths.provider.experiences.create.details}
            className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Create New
          </Link>
        </nav>
      </div>

      {/* Content */}
      <div className="grid gap-6">
        {/* List Section */}
        <Card>
          <CardHeader>
            <CardTitle>All Experiences</CardTitle>
            <CardDescription>
              View and manage all your travel experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-gray-500">
                <p className="text-lg font-medium">No experiences yet</p>
                <p className="text-sm">
                  Create your first experience to get started
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
