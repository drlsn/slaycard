import ActionCard from "@/components/ActionCard";
import Card from "@/components/Card";

export default function () {
  return (
    <div className="flex w-full h-full justify-center p-10 select-none">
      <div className="w-full h-full flex flex-col gap-1">
        <div className="relative h-full flex gap-1 justify-center"></div>
        <div className="relative h-full flex gap-1 justify-center">
          <Card name="bandit" isOfPlayer={false} />
          <Card name="imp" isOfPlayer={false} />
          <Card name="ghul" isOfPlayer={false} />
        </div>
        <div className="relative h-full flex gap-1 justify-center"></div>
        <div className="relative h-full flex gap-1 justify-center">
          <ActionCard name="Mid Melee" />
          <ActionCard name="Big Melee" />
          <ActionCard name="Mid Blast" />
        </div>
        <div className="relative h-full flex gap-1 justify-center">
          <Card name="Cedric" isOfPlayer={true} />
          <Card name="Elessandra" isOfPlayer={true} />
          <Card name="Gurdoc" isOfPlayer={true} />
        </div>
        <div className="relative h-full flex gap-1 justify-center" />
      </div>
    </div>
  );
}
