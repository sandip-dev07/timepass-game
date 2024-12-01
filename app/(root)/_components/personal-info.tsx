import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateFormData } from "@/lib/features/forms/form-slice";
import { RootState } from "@/lib/store";
import { StepProps } from "@/types/index";

export function PersonalInfo({ goToNextStep }: StepProps) {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);
  
  // State to track which fields have been touched/submitted
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched on submit
    setTouched({
      name: true,
      email: true,
      phone: true
    });

    // Only proceed if all fields are filled
    if (formData.name && formData.email && formData.phone) {
      goToNextStep();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    // Mark the field as touched when user starts typing
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    dispatch(updateFormData({ [field]: value }));
  };

  const handleBlur = (field: string) => {
    // Mark field as touched when it loses focus
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#02295A]">Personal info</h2>
        <p className="text-gray-400">
          Please provide your name, email address, and phone number.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="name">Name</Label>
            {touched.name && !formData.name && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <Input
            id="name"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="email">Email Address</Label>
            {touched.email && !formData.email && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <Input
            id="email"
            type="email"
            placeholder="e.g. johndeo@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="phone">Phone Number</Label>
            {touched.phone && !formData.phone && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <Input
            id="phone"
            type="tel"
            placeholder="e.g. +1 234 567 890"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            required
          />
        </div>
        <div className="flex justify-end w-full absolute bottom-6 right-6">
          <Button className="bg-[#3e52a3] hover:bg-[#483EFF]" type="submit">Next Step</Button>
        </div>
      </form>
    </div>
  );
}