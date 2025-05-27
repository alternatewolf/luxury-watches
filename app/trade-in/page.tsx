"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Upload, Check } from "lucide-react";

export default function TradeInPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brand: "",
    model: "",
    reference: "",
    hasBox: "",
    hasPapers: "",
    papersYear: "",
    deliveryCountry: "",
    condition: "",
    askingPrice: "",
    images: [] as File[],
  });

  const totalSteps = 15; // Including start and thank you (0-14)

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900">
                Trade In Your Watch
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get the best value for your luxury timepiece. Our experts will
                evaluate your watch and provide you with a competitive offer.
              </p>
            </div>
            <button
              onClick={handleNext}
              className="bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Get Started
            </button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light text-gray-900">
                What's your name?
              </h2>
              <p className="text-gray-600">Let's start with your full name</p>
            </div>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                autoFocus
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light text-gray-900">
                What's your email?
              </h2>
              <p className="text-gray-600">We'll use this to contact you</p>
            </div>
            <div className="max-w-md mx-auto">
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                autoFocus
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light text-gray-900">
                Phone number
              </h2>
              <p className="text-gray-600">
                For quick communication about your trade-in
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                autoFocus
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light text-gray-900">
                What's the brand?
              </h2>
              <p className="text-gray-600">Tell us the brand of your watch</p>
            </div>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={formData.brand || ""}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                placeholder="e.g., Rolex, Patek Philippe, Omega"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                autoFocus
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light text-gray-900">Model name</h2>
              <p className="text-gray-600">What's the specific model?</p>
            </div>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={formData.model || ""}
                onChange={(e) => handleInputChange("model", e.target.value)}
                placeholder="e.g., Submariner, Nautilus, Speedmaster"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                autoFocus
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light text-gray-900">
                Reference number
              </h2>
              <p className="text-gray-600">
                The reference number helps us identify your exact model
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={formData.reference || ""}
                onChange={(e) => handleInputChange("reference", e.target.value)}
                placeholder="e.g., 116610LN, 5711/1A-010"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                autoFocus
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light text-gray-900">
                Do you have the original box?
              </h2>
              <p className="text-gray-600">
                Original packaging adds value to your watch
              </p>
            </div>
            <div className="max-w-md mx-auto space-y-3">
              {["Yes", "No"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleInputChange("hasBox", option)}
                  className={`w-full px-6 py-4 text-lg border rounded-lg transition-colors ${
                    formData.hasBox === option
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-900 border-gray-300 hover:border-black"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light text-gray-900">
                Does it come with original papers?
              </h2>
              <p className="text-gray-600">
                Warranty cards, certificates, or documentation
              </p>
            </div>
            <div className="max-w-md mx-auto space-y-3">
              {["Yes", "No"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleInputChange("hasPapers", option)}
                  className={`w-full px-6 py-4 text-lg border rounded-lg transition-colors ${
                    formData.hasPapers === option
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-900 border-gray-300 hover:border-black"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light text-gray-900">
                What year are the papers from?
              </h2>
              <p className="text-gray-600">
                This helps us verify the watch's authenticity
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={formData.papersYear || ""}
                onChange={(e) =>
                  handleInputChange("papersYear", e.target.value)
                }
                placeholder="e.g., 2020, 2018"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                autoFocus
              />
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light text-gray-900">
                In which country was your watch originally delivered?
              </h2>
              <p className="text-gray-600">
                This affects the watch's provenance and value
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={formData.deliveryCountry || ""}
                onChange={(e) =>
                  handleInputChange("deliveryCountry", e.target.value)
                }
                placeholder="e.g., United States, Switzerland, Japan"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                autoFocus
              />
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light text-gray-900">
                What's the condition of your watch?
              </h2>
              <p className="text-gray-600">
                Be honest - it helps us provide an accurate valuation
              </p>
            </div>
            <div className="max-w-md mx-auto space-y-3">
              {[
                "Like New",
                "Excellent",
                "Very Good",
                "Good",
                "Fair",
                "Poor",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => handleInputChange("condition", option)}
                  className={`w-full px-6 py-4 text-lg border rounded-lg transition-colors ${
                    formData.condition === option
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-900 border-gray-300 hover:border-black"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 12:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light text-gray-900">
                What's your asking price?
              </h2>
              <p className="text-gray-600">
                What price are you hoping to get for your watch?
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={formData.askingPrice || ""}
                  onChange={(e) =>
                    handleInputChange("askingPrice", e.target.value)
                  }
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                  autoFocus
                />
              </div>
            </div>
          </div>
        );

      case 13:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light text-gray-900">
                Upload images of your watch
              </h2>
              <p className="text-gray-600">
                Please include photos of the front, back, and any damage
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-black transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  key={currentStep} // Force re-render when step changes
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-lg text-gray-600 hover:text-black"
                >
                  Click to upload images
                </label>
                {formData.images.length > 0 && (
                  <p className="mt-2 text-sm text-green-600">
                    {formData.images.length} image(s) selected
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 14:
        return (
          <div className="text-center space-y-12 py-8">
            <div className="space-y-8">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-light text-gray-900">
                Thank You!
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We've received your trade-in request. Our experts will review
                your submission and get back to you within 24 hours with a
                valuation.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-gray-600">
                Questions? Contact us at{" "}
                <a
                  href="mailto:luxuriouswatchesinfo@gmail.com"
                  className="text-black underline"
                >
                  luxuriouswatchesinfo@gmail.com
                </a>
              </p>
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors rounded-lg"
              >
                Return to Home
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white pt-8 md:pt-8">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        {currentStep > 0 && currentStep <= 13 && (
          <div className="mb-12 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                Step {currentStep} of {totalSteps - 2}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / (totalSteps - 2)) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-black h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(currentStep / (totalSteps - 2)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="min-h-[400px] flex items-center justify-center">
          {renderStep()}
        </div>

        {/* Navigation */}
        {currentStep > 0 && currentStep <= 13 && (
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-black transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
