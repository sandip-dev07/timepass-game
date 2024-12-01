import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { ADD_ONS, PLANS } from "@/constants";

export function Invoice() {
  const formData = useSelector((state: RootState) => state.form);

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

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

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-[#02295A] text-center">
          Thank you!
        </h2>
        <p className="text-gray-400">
          Thanks For confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>
      </div>

      <div className="bg-gradient-to-br from-purple-400 to-indigo-600 rounded-lg p-6 text-white shadow-lg">
        <div className="text-2xl font-bold mb-4">Subscription Invoice</div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Name:</span>
            <span>{formData.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Email:</span>
            <span>{formData.email}</span>
          </div>
          <div className="flex justify-between">
            <span>Phone:</span>
            <span>{formData.phone}</span>
          </div>
          <div className="border-t border-white/20 my-4"></div>
          <div className="flex justify-between font-semibold">
            <span>Plan:</span>
            <span>
              {formData.plan} ({formData.billingCycle})
            </span>
          </div>
          <div className="flex justify-between">
            <span>Price:</span>
            <span>
              ${PLANS[formData.billingCycle][formData.plan]}/
              {formData.billingCycle === "monthly" ? "mo" : "yr"}
            </span>
          </div>
          {Object.entries(formData.addons).map(([key, isSelected]) => {
            if (!isSelected) return null;
            return (
              <div key={key} className="flex justify-between text-sm">
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </span>
                <span>
                  +$
                  {
                    ADD_ONS[formData.billingCycle][
                      key as keyof typeof formData.addons
                    ]
                  }
                  /{formData.billingCycle === "monthly" ? "mo" : "yr"}
                </span>
              </div>
            );
          })}
          <div className="border-t border-white/20 my-4"></div>
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>
              ${calculateTotal()}/
              {formData.billingCycle === "monthly" ? "mo" : "yr"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
