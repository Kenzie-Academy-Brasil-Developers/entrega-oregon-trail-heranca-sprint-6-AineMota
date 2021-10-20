class Traveler{
    constructor(name){
        this._name = name;
        this._food = 1;
        this._isHealthy = true;
        this._huntValue = 2;
        this._hungry = 1;

        Object.defineProperties(this, {
            name:{
                set: function(value){
                    return this._name = value;
                },
                get: function(){
                    return this._name;
                }
            },
            food:{
                set: function(value){
                    return this._food = value;
                },
                get: function(){
                    return this._food;
                }
            },
            isHealthy:{
                set: function(value){
                    return this._isHealthy = value;
                },
                get: function(){
                    return this._isHealthy;
                }

            },
            huntValue:{
                set: function(value){
                    return this._huntValue = value;
                },
                get: function(){
                    return this._huntValue;
                }
            },
            hungry:{
                set: function(value){
                    return this._hungry = value;
                },
                get: function(){
                    return this._hungry;
                }
            }
        })
    }

    hunt(){
        this.food += this.huntValue;
    }

    eat(){
        if(this.food > 0){
            this.food -= this.hungry;
            if(this.food < 0){
                this.isHealthy = false
                this.food = 0;
            }
        }else{
            this.isHealthy = false;
        }
    }
}

class Doctor extends Traveler{
    heal(traveler){
        if(traveler.isHealthy === false){
            traveler.isHealthy = true
            
        }
    }
}

class Hunter extends Traveler{
    constructor(name){
        super(name)
        this.food = 2;
        this.isHealthy = true;
        this.huntValue = 5;
        this.hungry = 2;
    }

    giveFood(traveler, numOfFoodUnits){
        if(this.food > numOfFoodUnits){
            this.food -= numOfFoodUnits;
            traveler.food += numOfFoodUnits;
        }
    }
}

class Wagon{
    constructor(capacity){
        this.capacity = capacity;
        this.passageiros = [];
        this.getAvailableSeatCount();
    }

    getAvailableSeatCount(){
        let seatsOff = this.passageiros;

        let seats = this.capacity - seatsOff.length

        return seats
    }

    join(Traveler){
        if(this.passageiros.length < this.capacity){
            this.passageiros.push(Traveler);
        }
    }

    shouldQuarantine(){
        let sick = 0;

        for(let i = 0; i < this.passageiros.length; i++){
            if(this.passageiros[i]['isHealthy'] === false){
                sick++;
            }
        }

        if(sick > 0){
            sick = 0;
            return true 
        }else{
            return false
        }
    }

    totalFood(){
        const foodCount = (accumulated, obj) => {
            console.log(obj.food)
            return accumulated += obj.food
        }
        console.log(this.passageiros)
        let food = this.passageiros.reduce(foodCount, 0)

        return food
    }
}

 

    // Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
 
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
 
wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
 
sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();
 
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
 
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)
 
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
 
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
 
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente
 
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);
