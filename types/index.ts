export type Plan = 'arcade' | 'advanced' | 'pro'
export type BillingCycle = 'monthly' | 'yearly'

export interface FormData {
  name: string
  email: string
  phone: string
  plan: Plan
  billingCycle: BillingCycle
  addons: {
    onlineService: boolean
    largerStorage: boolean
    customizableProfile: boolean
  }
}

export interface StepProps {
  goToNextStep: () => void
  goToPreviousStep: () => void
}

