import { Registration, RegistrationStatus } from "~/types/registration";

export interface RegistrationCardProps {
  data: Registration;
  onDelete: (registration: Registration) => void;
  onUpdate: (registration: Registration, status: RegistrationStatus) => void;
}
export interface ButtonConfig {
  label: string;
  status: string;
  color: string;
}