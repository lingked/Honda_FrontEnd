import { time } from "console";

export class CsvItem{
  public timestamp;
  public drip_front_left;
  public drip_front_right;
  public drip_rear_left;
  public drip_rear_right;
  public dirp_symmetry_front;
  public drip_symmetry_rear;
  public drip_BPitch_front;
  public drip_BPitch_rear;
  public roof_pick_front;
  public roof_pick_rear;

  constructor(timestamp: string, drip_front_left:number, drip_front_right:number, drip_rear_left: number, drip_rear_right:number,
    dirp_symmetry_front: number, drip_symmetry_rear: number, drip_BPitch_front: number, drip_BPitch_rear: number, roof_pick_front: number,
    roof_pick_rear: number){
      this.timestamp = timestamp;
      this.drip_front_left= drip_front_left;
      this.drip_front_right=drip_front_right;
      this.drip_rear_left=drip_rear_left;
      this.drip_rear_right=drip_rear_right;
      this.dirp_symmetry_front=dirp_symmetry_front;
      this.drip_symmetry_rear=drip_symmetry_rear;
      this.drip_BPitch_front=drip_BPitch_front;
      this.drip_BPitch_rear=drip_BPitch_rear;
      this.roof_pick_front=roof_pick_front;
      this.roof_pick_rear=roof_pick_rear;
  }
}
