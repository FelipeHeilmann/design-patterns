export class LotteryTicket {
    constructor(readonly draw: DrawFlyweight, 
                readonly bet1: string, 
                readonly bet2: string, 
                readonly bet3: string, 
                readonly bet4: string, 
                readonly bet5: string, 
                readonly bet6: string){}
}

export class DrawFlyweight {
    constructor(readonly draw: string, readonly date: Date){}
}

export class FlyweightFactory {
    static cache: {[index: string]: DrawFlyweight} = {}

    static getDrawFlyweight(draw: string, date: string) {
        const index = `${draw};${date}`
        if(!FlyweightFactory.cache[index]){
            FlyweightFactory.cache[index] = new DrawFlyweight(draw, new Date(date))
        }
        return FlyweightFactory.cache[index]
    }
}