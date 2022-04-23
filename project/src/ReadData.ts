function readline(): string
{
    return "";
}

export interface IEntityData
{
    id: number,
    type: number,
    x: number,
    y: number,
    shieldLife: number,
    isControlled: number,
    health: number,
    vx: number,
    vy: number,
    nearBase: number,
    threatFor: number,
    distanceFromBase?: number
}

export class ReadData
{
    public baseX: number;
    public baseY: number;
    public heroesPerPlayer: number;
    public entities: IEntityData[];

    constructor()
    {

    }

    public readTick()
    {
        this.entities = [];

        for (let i = 0; i < 2; i++)
        {
            var inputs = readline().split(' ');
            const health = parseInt(inputs[0]); // Each player's base health
            const mana = parseInt(inputs[1]); // Ignore in the first league; Spend ten mana to cast a spell
        }

        const entityCount = parseInt(readline()); // Amount of heros and monsters you can see
        for (let i = 0; i < entityCount; i++)
        {
            var inputs = readline().split(' ');
            const id = parseInt(inputs[0]); // Unique identifier
            const type = parseInt(inputs[1]); // 0=monster, 1=your hero, 2=opponent hero
            const x = parseInt(inputs[2]); // Position of this entity
            const y = parseInt(inputs[3]);
            const shieldLife = parseInt(inputs[4]); // Ignore for this league; Count down until shield spell fades
            const isControlled = parseInt(inputs[5]); // Ignore for this league; Equals 1 when this entity is under a control spell
            const health = parseInt(inputs[6]); // Remaining health of this monster
            const vx = parseInt(inputs[7]); // Trajectory of this monster
            const vy = parseInt(inputs[8]);
            const nearBase = parseInt(inputs[9]); // 0=monster with no target yet, 1=monster targeting a base
            const threatFor = parseInt(inputs[10]); // Given this monster's trajectory, is it a threat to 1=your base, 2=your opponent's base, 0=neither

            const entity: IEntityData = {
                id: id,
                type: type,
                x: x,
                y: y,
                shieldLife: shieldLife,
                isControlled: isControlled,
                health: health,
                vx: vx,
                vy: vy,
                nearBase: nearBase,
                threatFor: threatFor
            }

            this.entities.push(entity);
        }
    }

    public readInit()
    {
        var inputs = readline().split(' ');
        this.baseX = parseInt(inputs[0]); // The corner of the map representing your base
        this.baseY = parseInt(inputs[1]);
        this.heroesPerPlayer = parseInt(readline()); // Always 3
    }

}