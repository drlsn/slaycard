import { v4 } from "uuid";
import Combat from "../entities/Combat";
import CombatRepository from "../entities/CombatRepository";
import { CommandHandler } from "../infrastructure/CommandHandler";
import Result from "../infrastructure/Result";

export class StartCombatCommandHandler extends CommandHandler<StartCombatCommand> {

  combatRepository: CombatRepository

  constructor(combatRepository: CombatRepository) {
    super()
    this.combatRepository = combatRepository
  }

  public override async handle(command: StartCombatCommand): Promise<Result> {

    const combat = new Combat(v4())
    this.combatRepository.add(combat)

    return Result.Success();
  }
}

export type StartCombatCommand = { userId: string };

export async function handleStartCombatCommand(
  combatRepository: CombatRepository, 
  command: StartCombatCommand) : Promise<Result> 
{

  return Result.Failure();
}
