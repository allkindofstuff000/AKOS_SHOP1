export interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
  available: boolean;
}

// Structured to mirror future API payloads from admin-managed payment settings.
export const payments: PaymentMethod[] = [
  {
    id: "cashapp",
    name: "CashApp",
    logo: "/assets/payments/cashapp.svg",
    available: true,
  },
  {
    id: "zelle",
    name: "Zelle",
    logo: "/assets/payments/zelle.svg",
    available: true,
  },
  {
    id: "bankservas-bhd",
    name: "BankServas BHD",
    logo: "/assets/payments/bankservas.svg",
    available: true,
  },
  {
    id: "banco-popular",
    name: "Banco Popular",
    logo: "/assets/payments/bancopopular.svg",
    available: true,
  },
  {
    id: "western-union",
    name: "Western Union",
    logo: "/assets/payments/westernunion.svg",
    available: true,
  },
  {
    id: "caribbean-express",
    name: "Caribbean Express",
    logo: "/assets/payments/caribbeanexpress.svg",
    available: true,
  },
];
