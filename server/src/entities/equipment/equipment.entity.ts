import { EquipmentLocation } from "./equipment.location-enum.ts";
import { EquipmentStatus } from "./equipment.status-enum.ts";

type EquipmentProps = {
  numberId: string;
  brand: string;
  telephone: string;
  network: string;
  IMEI: string;
  provider: string;

  status: EquipmentStatus;
  location: EquipmentLocation
};

export class Equipment {
  private constructor(private props: EquipmentProps) { };
  public static create(props: Omit<EquipmentProps, "status" | "location">): Equipment {
    return new Equipment({
      ...props,
      status: EquipmentStatus.FREE,
      location: EquipmentLocation.BRANCH
    });
  };

  public toString() {
    return {
      numberId: this.props.numberId,
      brand: this.props.brand,
      telephone: this.props.telephone,
      network: this.props.network,
      IMEI: this.props.IMEI,
      provider: this.props.provider,
      status: this.props.status,
      location: this.props.location,
    }
  }

  public getBrand(): string {
    return this.props.brand;
  }

  public getNetwork(): string {
    return this.props.network;
  };

  public getStatus(): EquipmentStatus {
    return this.props.status;
  };

  public getlocation(): EquipmentLocation {
    return this.props.location;
  };
}