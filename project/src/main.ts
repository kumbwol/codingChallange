import {IEntityData, ReadData} from "./ReadData";

export class Main
{
    constructor()
    {
        const readData = new ReadData();

        readData.readInit();

        while(true)
        {
            readData.readTick();

            let magicianID: number;
            const heroes: IEntityData[] = [];
            const entities: IEntityData[] = readData.entities;
            const targetingEnemies: IEntityData[] = [];
            for(let i=0; i<entities.length; i++)
            {
                if(entities[i].threatFor === 1)
                {
                    entities[i].distanceFromBase = this.distanceFromBase(entities[i].x, entities[i].y, readData.baseX, readData.baseY);
                    if(targetingEnemies.length > 0)
                    {
                        if(entities[i].distanceFromBase < targetingEnemies[0].distanceFromBase)
                        {
                            targetingEnemies.unshift(entities[i]);
                        }
                        else
                        {
                            targetingEnemies.push(entities[i]);
                        }
                    }
                    else
                    {
                        targetingEnemies.push(entities[i]);
                    }
                }
                else if(entities[i].type === 1)
                {
                    if(!magicianID)
                    {
                        magicianID = entities[i].id;
                    }
                    heroes.push(entities[i]);
                }
            }


            for (let i = 0; i < readData.heroesPerPlayer; i++)
            {
                if(targetingEnemies.length === 0)
                {
                    console.log("MOVE", readData.baseX, readData.baseY);
                }
                else
                {
                    if(heroes[i].id === magicianID)
                    {
                        if(this.distanceFromMagician(targetingEnemies[0].x, targetingEnemies[0].y, readData.baseX, readData.baseY) <= 1200)
                        {
                            console.log("SPELL WIND", targetingEnemies[0].x, targetingEnemies[0].y);
                        }
                        else
                        {
                            console.log("MOVE", readData.baseX, readData.baseY);
                        }
                    }
                    else
                    {
                        console.log("MOVE", targetingEnemies[0].x, targetingEnemies[0].y);
                    }
                }
            }
        }
    }

    private distanceFromMagician(x: number, y: number, magicianX: number, magicianY: number): number
    {
        let distance = Math.sqrt(Math.pow(x - magicianX, 2) + Math.pow(y - magicianY, 2));
        return distance;
    }

    private distanceFromBase(x: number, y: number, baseX: number, baseY: number): number
    {
        return Math.pow(x - baseX, 2) + Math.pow(y - baseY, 2);
    }
}

new Main();
