import { modules } from "./modules";

export const teamSizes = ["Under 5", "5 to 20", "21 to 100", "Over 100"] as const;

export type WalkthroughRequest = {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  interests: string[];
  notes: string;
};

export type FieldErrors = Partial<Record<keyof WalkthroughRequest, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const moduleSlugs = new Set<string>(modules.map((m) => m.slug));

// Shared by the form (instant feedback) and the API route (the check that counts).
export function validateWalkthrough(input: Partial<Record<keyof WalkthroughRequest, unknown>>): {
  data?: WalkthroughRequest;
  errors: FieldErrors;
} {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data: WalkthroughRequest = {
    name: str(input.name),
    email: str(input.email),
    company: str(input.company),
    teamSize: str(input.teamSize),
    interests: Array.isArray(input.interests) ? input.interests.filter((i): i is string => typeof i === "string") : [],
    notes: str(input.notes),
  };
  const errors: FieldErrors = {};
  if (!data.name) errors.name = "Enter your name.";
  else if (data.name.length > 120) errors.name = "Keep your name under 120 characters.";
  if (!data.email) errors.email = "Enter your work email.";
  else if (!EMAIL.test(data.email)) errors.email = "Enter an email address like name@company.com.";
  if (!data.company) errors.company = "Enter your company name.";
  else if (data.company.length > 160) errors.company = "Keep the company name under 160 characters.";
  if (!teamSizes.includes(data.teamSize as (typeof teamSizes)[number])) errors.teamSize = "Choose your security team size.";
  if (data.interests.some((i) => !moduleSlugs.has(i))) errors.interests = "Choose modules from the list.";
  if (data.notes.length > 2000) errors.notes = "Keep notes under 2,000 characters.";
  return Object.keys(errors).length ? { errors } : { data, errors };
}
