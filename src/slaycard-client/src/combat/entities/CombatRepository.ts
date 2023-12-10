import Combat from "./Combat";

export default interface CombatRepository {
  add(combat: Combat) : Promise<void>;
  get(id: string): Promise<Combat>;
  delete(id: string): Promise<void>;
}
