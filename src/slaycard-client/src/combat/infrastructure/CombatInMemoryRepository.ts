import Combat from "../entities/Combat";
import CombatRepository from "../entities/CombatRepository";

export default class CombatInMemoryRepository implements CombatRepository {

  combats: Combat[] = []

  public async add(combat: Combat): Promise<void> {
    this.combats.push(combat)
  }

  public async get(id: string): Promise<Combat> {
    return new Promise(() => this.combats.find(combat => combat.id === id))
  }

  public async delete(id: string): Promise<void> {
    this.combats.splice(
        this.combats.findIndex(combat => combat.id === id), 1)
  }
}
