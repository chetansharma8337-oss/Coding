import { modules } from "./modules";

export const teamSizes = ["Fewer than 5", "5 to 20", "21 to 100", "More than 100"] as const;

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
  if (!data.name) errors.name = "Enter your full name.";
  else if (data.name.length > 120) errors.name = "Full name must be 120 characters or fewer.";
  if (!data.email) errors.email = "Enter a work email address.";
  else if (!EMAIL.test(data.email)) errors.email = "Enter a valid email address, for example name@company.com.";
  if (!data.company) errors.company = "Enter an organization name.";
  else if (data.company.length > 160) errors.company = "Organization name must be 160 characters or fewer.";
  if (!teamSizes.includes(data.teamSize as (typeof teamSizes)[number])) errors.teamSize = "Select a security team size.";
  if (data.interests.some((i) => !moduleSlugs.has(i))) errors.interests = "Select modules from the list.";
  if (data.notes.length > 2000) errors.notes = "Additional context must be 2,000 characters or fewer.";
  return Object.keys(errors).length ? { errors } : { data, errors };
}

export const callAgenda = [
  "Current security tools are mapped to the ASH-V modules they overlap with.",
  "One exposure type from your environment is followed through prioritization, remediation and evidence.",
  "A written pilot scope is provided after the session.",
];
