export type EquipmentStatus = "free" | "installed" | "maintenance" | "obsolete";
export const EquipmentStatus = {
  FREE: "free" as EquipmentStatus,
  INSTALLED: "installed" as EquipmentStatus,
  MAINTENANCE: "maintenance" as EquipmentStatus,
  OBSOLETE: "obsolete" as EquipmentStatus,
} as const;