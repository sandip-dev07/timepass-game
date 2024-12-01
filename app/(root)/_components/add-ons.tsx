import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { updateFormData } from "@/lib/features/forms/form-slice";
import { RootState } from "@/lib/store";
import type { StepProps } from "@/types/index";
import { ADD_ONS } from "@/constants";

export function AddOns({ goToNextStep, goToPreviousStep }: StepProps) {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);

  const handleAddonToggle = (addon: keyof typeof formData.addons) => {
    dispatch(
      updateFormData({
        addons: {
          ...formData.addons,
          [addon]: !formData.addons[addon],
        },
      })
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#02295A]">Pick add-ons</h2>
        <p className="text-gray-400">
          Add-ons help enhance your gaming experience.
        </p>
      </div>

      <div className="space-y-4">
        <div
          className={`flex items-center justify-between p-4 border rounded-lg hover:border-[#483EFF] transition-colors
            ${
              formData.addons.onlineService
                ? "border-[#483EFF] bg-slate-50"
                : ""
            }`}
        >
          <div className="flex items-center gap-4">
            <Checkbox
              checked={formData.addons.onlineService}
              onCheckedChange={() => handleAddonToggle("onlineService")}
            />
            <div>
              <div className="font-bold text-[#02295A]">Online service</div>
              <div className="text-gray-400">Access to multiplayer games</div>
            </div>
          </div>
          <div className="text-[#483EFF]">
            +${ADD_ONS[formData.billingCycle].onlineService}/
            {formData.billingCycle === "monthly" ? "mo" : "yr"}
          </div>
        </div>

        <div
          className={`flex items-center justify-between p-4 border rounded-lg hover:border-[#483EFF] transition-colors
            ${
              formData.addons.largerStorage
                ? "border-[#483EFF] bg-slate-50"
                : ""
            }`}
        >
          <div className="flex items-center gap-4">
            <Checkbox
              checked={formData.addons.largerStorage}
              onCheckedChange={() => handleAddonToggle("largerStorage")}
            />
            <div>
              <div className="font-bold text-[#02295A]">Larger storage</div>
              <div className="text-gray-400">Extra 1TB of cloud save</div>
            </div>
          </div>
          <div className="text-[#483EFF]">
            +${ADD_ONS[formData.billingCycle].largerStorage}/
            {formData.billingCycle === "monthly" ? "mo" : "yr"}
          </div>
        </div>

        <div
          className={`flex items-center justify-between p-4 border rounded-lg hover:border-[#483EFF] transition-colors
            ${
              formData.addons.customizableProfile
                ? "border-[#483EFF] bg-slate-50"
                : ""
            }`}
        >
          <div className="flex items-center gap-4">
            <Checkbox
              checked={formData.addons.customizableProfile}
              onCheckedChange={() => handleAddonToggle("customizableProfile")}
            />
            <div>
              <div className="font-bold text-[#02295A]">
                Customizable Profile
              </div>
              <div className="text-gray-400">Custom theme on your profile</div>
            </div>
          </div>
          <div className="text-[#483EFF]">
            +${ADD_ONS[formData.billingCycle].customizableProfile}/
            {formData.billingCycle === "monthly" ? "mo" : "yr"}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={goToPreviousStep}>
          Go Back
        </Button>
        <Button className="bg-[#3e52a3] hover:bg-[#483EFF]" onClick={goToNextStep}>Next Step</Button>
      </div>
    </div>
  );
}
