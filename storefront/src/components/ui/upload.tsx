"use client"

import { cn } from "@lib/util/shadcn-utils"
import { Button } from "components/ui/button"
import { File, Upload, X } from "lucide-react"
import * as React from "react"

interface UploadFile {
  file: File
  id: string
  preview?: string
}

interface UploadProps {
  value?: UploadFile[]
  onChange?: (files: UploadFile[]) => void
  accept?: string
  multiple?: boolean
  maxFiles?: number
  maxSize?: number // in bytes
  disabled?: boolean
  className?: string
  placeholder?: string
  dragActiveText?: string
}

function UploadComponent({
  value = [],
  onChange,
  accept = "*/*",
  multiple = false,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB
  disabled = false,
  className,
  placeholder = "Click to upload or drag and drop",
  dragActiveText = "Drop files here",
}: UploadProps) {
  const [dragActive, setDragActive] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFiles = React.useCallback(
    (files: FileList | null) => {
      if (!files || !onChange) return

      const newFiles: UploadFile[] = []
      const currentFiles = [...value]

      Array.from(files).forEach((file) => {
        // Check file size
        if (file.size > maxSize) {
          console.warn(
            `File ${file.name} is too large. Max size: ${maxSize} bytes`
          )
          return
        }

        // Check if we've reached max files
        if (currentFiles.length + newFiles.length >= maxFiles) {
          console.warn(`Maximum ${maxFiles} files allowed`)
          return
        }

        const uploadFile: UploadFile = {
          file,
          id: Math.random().toString(36).substr(2, 9),
        }

        // Create preview for images
        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onload = (e) => {
            uploadFile.preview = e.target?.result as string
          }
          reader.readAsDataURL(file)
        }

        newFiles.push(uploadFile)
      })

      if (newFiles.length > 0) {
        onChange([...currentFiles, ...newFiles])
      }
    },
    [value, onChange, maxFiles, maxSize]
  )

  const handleDrag = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (disabled) return

      const files = e.dataTransfer.files
      handleFiles(files)
    },
    [disabled, handleFiles]
  )

  const handleFileInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
    },
    [handleFiles]
  )

  const removeFile = React.useCallback(
    (fileId: string) => {
      if (!onChange) return
      onChange(value.filter((file) => file.id !== fileId))
    },
    [value, onChange]
  )

  const openFileDialog = React.useCallback(() => {
    if (disabled) return
    fileInputRef.current?.click()
  }, [disabled])

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-colors",
          dragActive
            ? "border-primary bg-primary/5"
            : "border-dashed border-muted-foreground/25 hover:border-muted-foreground/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
        />

        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            {dragActive ? dragActiveText : placeholder}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openFileDialog}
            disabled={disabled}
          >
            Choose Files
          </Button>
          {maxSize && (
            <p className="text-xs text-muted-foreground mt-2">
              Max size: {(maxSize / (1024 * 1024)).toFixed(1)}MB
            </p>
          )}
        </div>
      </div>

      {value.length > 0 && (
        <div className="mt-4 space-y-2">
          {value.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="h-10 w-10 object-cover rounded"
                  />
                ) : (
                  <File className="h-10 w-10 text-muted-foreground" />
                )}
                <div>
                  <p className="text-sm font-medium">{file.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(file.id)}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { UploadComponent, type UploadFile }
