"use client";

import { useState } from "react";
import ImageUpload from "./ImageUpload";
import Image from "next/image";

interface ImageData {
  url: string;
  thumbImg?: string;
  hoverImg?: string;
  coverImg?: string;
  altText?: string;
  id?: string;
}

interface MultiImageUploadProps {
  onChange: (images: ImageData[]) => void;
  maxImages?: number;
}

export default function MultiImageUpload({
  onChange,
  maxImages = 10,
}: MultiImageUploadProps) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      setError(`Maximum of ${maxImages} images allowed`);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          `/api/upload?filename=${encodeURIComponent(file.name)}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const result = await response.json();
        return {
          url: result.url,
          altText: file.name,
          id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        };
      });

      const newImages = await Promise.all(uploadPromises);
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onChange(updatedImages);
    } catch (error) {
      console.error("Error uploading images:", error);
      setError(
        error instanceof Error ? error.message : "Failed to upload images"
      );
    } finally {
      setIsUploading(false);
      if (e.target) {
        e.target.value = "";
      }
    }
  };

  const handleRemoveImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);
    onChange(updatedImages);
  };

  const handleMakePrimary = (id: string) => {
    const imageToMakePrimary = images.find((img) => img.id === id);
    if (!imageToMakePrimary) return;

    const otherImages = images.filter((img) => img.id !== id);
    const updatedImages = [imageToMakePrimary, ...otherImages];

    setImages(updatedImages);
    onChange(updatedImages);
  };

  return (
    <div>
      <div className="mb-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="multi-image-upload"
          />
          <label
            htmlFor="multi-image-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-500">
              Click to upload multiple images or drag and drop
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {images.length} of {maxImages} images uploaded
            </p>
          </label>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {isUploading && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Uploading images...</p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Uploaded Images</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative group border rounded-md overflow-hidden"
              >
                <div className="relative h-32 w-full">
                  <Image
                    src={image.url}
                    alt={image.altText || `Product image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(image.id!)}
                      className="bg-red-500 text-white p-1 rounded-full mx-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleMakePrimary(image.id!)}
                        className="bg-blue-500 text-white p-1 rounded-full mx-1"
                        title="Make primary image"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {index === 0 && (
                  <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1">
                    Primary
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
