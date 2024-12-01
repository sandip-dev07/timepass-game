import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState } from "@/lib/store";
import type { StepProps } from "@/types/index";
import { ADD_ONS, PLANS } from "@/constants";

export function Summary({
  goToPreviousStep,
  goToNextStep,
  setCurrentStep,
}: StepProps & { setCurrentStep: (step: number) => void }) {
  const formData = useSelector((state: RootState) => state.form);

  // console.log(PLANS[formData.billingCycle][formData.plan]);

  const calculateTotal = () => {
    if (!formData.plan || !formData.billingCycle) return 0;

    const planCost = PLANS[formData.billingCycle][formData.plan];

    const addonsCost = Object.entries(formData.addons).reduce(
      (total, [key, isSelected]) => {
        if (isSelected) {
          return (
            total +
            ADD_ONS[formData.billingCycle][key as keyof typeof formData.addons]
          );
        }
        return total;
      },
      0
    );
    return planCost + addonsCost;
  };

  const handleBacktoStep = (value: number) => {
    setCurrentStep(value);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#02295A]">Finishing up</h2>
        <p className="text-gray-400">
          Double-check everything looks OK before confirming.
        </p>
      </div>

      <div className="bg-slate-50 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b">
          <div>
            <div className="font-bold text-[#02295A]">
              {formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1)} (
              {formData.billingCycle})
            </div>
            <Button
              onClick={() => handleBacktoStep(2)}
              variant="link"
              className="p-0 h-auto text-gray-400 hover:text-[#483EFF]"
            >
              Change
            </Button>
          </div>
          <div className="font-bold text-[#02295A]">
            ${PLANS[formData.billingCycle][formData.plan]}/
            {formData.billingCycle === "monthly" ? "mo" : "yr"}
          </div>
        </div>

        {Object.entries(formData.addons).map(([key, isSelected]) => {
          if (!isSelected) return null;
          return (
            <div key={key} className="flex items-center justify-between">
              <div className="text-gray-400">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </div>
              <div className="text-[#02295A]">
                +$
                {
                  ADD_ONS[formData.billingCycle][
                    key as keyof typeof ADD_ONS.monthly
                  ]
                }
                /{formData.billingCycle === "monthly" ? "mo" : "yr"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between px-6">
        <div className="text-gray-400">
          Total (per {formData.billingCycle === "monthly" ? "month" : "year"})
        </div>
        <div className="text-xl font-bold text-[#483EFF]">
          ${calculateTotal()}/
          {formData.billingCycle === "monthly" ? "mo" : "yr"}
        </div>
      </div>

      <div className="flex justify-between pl-12 absolute bottom-6 right-8 w-full">
        <Button variant="ghost" onClick={goToPreviousStep}>
          Go Back
        </Button>
        <Button className="bg-[#3e52a3] hover:bg-[#483EFF]" onClick={goToNextStep}>Confirm</Button>
      </div>
    </div>
  );
}
