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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToNextStep();
  };

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateFormData({ [field]: value }));
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
            {!formData.name && (
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
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="email">Email Address</Label>
            {!formData.email && (
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
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="phone">Phone Number</Label>
            {!formData.phone && (
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
            required
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button className="bg-[#3e52a3] hover:bg-[#483EFF]" type="submit">Next Step</Button>
        </div>
      </form>
    </div>
  );
}
