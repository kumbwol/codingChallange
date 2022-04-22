import {ReadData} from "./ReadData";

export class Main
{
    constructor()
    {
        const readData = new ReadData();

        readData.readInit();

        while (true)
        {
            readData.readTick();
            for (let i = 0; i < readData.heroesPerPlayer; i++)
            {
                console.log('WAIT');
            }
        }
    }
}

new Main();
