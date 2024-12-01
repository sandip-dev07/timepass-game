import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { updateFormData } from "@/lib/features/forms/form-slice";
import { RootState } from "@/lib/store";
import type { StepProps, Plan } from "@/types/index";
import { PLANS } from "@/constants";
import Image from "next/image";

export function SelectPlan({ goToNextStep, goToPreviousStep }: StepProps) {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);

  const handlePlanSelect = (plan: Plan) => {
    dispatch(updateFormData({ plan }));
  };

  const toggleBillingCycle = () => {
    dispatch(
      updateFormData({
        billingCycle:
          formData.billingCycle === "monthly" ? "yearly" : "monthly",
      })
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#02295A]">Select your plan</h2>
        <p className="text-gray-400">
          You have the option of monthly or yearly billing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => handlePlanSelect("arcade")}
          className={`p-4 border rounded-lg text-left space-y-8 hover:border-[#483EFF] transition-colors
            ${
              formData.plan === "arcade" ? "border-[#483EFF] bg-slate-50" : ""
            }`}
        >
          <Image src="/icon-arcade.svg" alt="Arcade" width={40} height={40} />
          <div>
            <div className="font-bold text-[#02295A]">Arcade</div>
            <div className="text-gray-400">
              ${PLANS[formData.billingCycle].arcade}/
              {formData.billingCycle === "monthly" ? "mo" : "yr"}
            </div>
            {formData.billingCycle === "yearly" && (
              <div className="text-[#02295A] text-sm">2 months free</div>
            )}
          </div>
        </button>

        <button
          onClick={() => handlePlanSelect("advanced")}
          className={`p-4 border rounded-lg text-left space-y-8 hover:border-[#483EFF] transition-colors
            ${
              formData.plan === "advanced" ? "border-[#483EFF] bg-slate-50" : ""
            }`}
        >
          <Image src="/icon-advanced.svg" alt="Arcade" width={40} height={40} />
          <div>
            <div className="font-bold text-[#02295A]">Advanced</div>
            <div className="text-gray-400">
              ${PLANS[formData.billingCycle].advanced}/
              {formData.billingCycle === "monthly" ? "mo" : "yr"}
            </div>
            {formData.billingCycle === "yearly" && (
              <div className="text-[#02295A] text-sm">2 months free</div>
            )}
          </div>
        </button>

        <button
          onClick={() => handlePlanSelect("pro")}
          className={`p-4 border rounded-lg text-left space-y-8 hover:border-[#483EFF] transition-colors
            ${formData.plan === "pro" ? "border-[#483EFF] bg-slate-50" : ""}`}
        >
          <Image src="/icon-pro.svg" alt="Arcade" width={40} height={40} />
          <div>
            <div className="font-bold text-[#02295A]">Pro</div>
            <div className="text-gray-400">
              ${PLANS[formData.billingCycle].pro}/
              {formData.billingCycle === "monthly" ? "mo" : "yr"}
            </div>
            {formData.billingCycle === "yearly" && (
              <div className="text-[#02295A] text-sm">2 months free</div>
            )}
          </div>
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 p-4 bg-slate-50 rounded-lg">
        <span
          className={
            formData.billingCycle === "monthly"
              ? "text-[#02295A]"
              : "text-gray-400"
          }
        >
          Monthly
        </span>
        <Switch
          checked={formData.billingCycle === "yearly"}
          onCheckedChange={toggleBillingCycle}
        />
        <span
          className={
            formData.billingCycle === "yearly"
              ? "text-[#02295A]"
              : "text-gray-400"
          }
        >
          Yearly
        </span>
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
