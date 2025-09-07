import { Equipment } from "@entities/equipment/equipment.entity.ts";
import { EquipmentLocation } from "@entities/equipment/equipment.location-enum.ts";
import { EquipmentStatus } from "@entities/equipment/equipment.status-enum.ts";
import { describe, it, expect, beforeAll } from "vitest";

describe("Entity > Equipment", () => {
  const equipmentData = {
    numberId: "36009",
    brand: "GTK",
    telephone: "3031-0098",
    network: "4G",
    IMEI: "1283198327198312798",
    provider: "CLARO"
  };

  let equipmentEntity: Equipment;

  beforeAll(() => {
    equipmentEntity = Equipment.create(equipmentData);
  });

  it("should be possible to successfully instantiate an object", () => {
    expect(() => Equipment.create(equipmentData)).not.toThrow();
    expect(equipmentEntity).toBeInstanceOf(Equipment);
  });

  it("should be possible to return STATUS (free) & LOCATION (branch)", () => {
    expect(equipmentEntity.getStatus()).toEqual(EquipmentStatus.FREE);
    expect(equipmentEntity.getlocation()).toEqual(EquipmentLocation.BRANCH);
  });
})