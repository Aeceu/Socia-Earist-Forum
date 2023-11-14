import { LucideFeather, LucideHome, LucideUser } from "lucide-react";

export const links = [
  {
    name: "Home",
    href: "/",
    icon: LucideHome,
  },
  {
    name: "Account",
    href: `/profile/`,
    icon: LucideUser,
  },
  {
    name: "Write-post",
    href: `/createpost/`,
    icon: LucideFeather,
  },
];
