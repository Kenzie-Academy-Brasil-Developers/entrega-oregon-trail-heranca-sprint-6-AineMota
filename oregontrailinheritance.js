class Traveler{
    constructor(name){
        this._name = name;
        this._food = 1;
        this._isHealthy = true;


    }
        set name (value){
            this._name = value;
        }
        get name() {
            return this._name
        }


        set food (value){
            this._food = value;
        }
        get food () {
            return this._food
        }


        set isHealthy (value){
            this._isHealthy = value;
        }
        get isHealthy () {
            return this._isHealthy
        }

    hunt(){
        this.food += 2;
    }

    eat(){
        if(this.food > 0){
            this.food -= 1;
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

    hunt(){
        this.food += 5;
    }

    eat(){
        this.food -= 2;

        if(this.food <= 0){

            this.isHealthy = false
            this.food = 0;

        }
    }
}

class Wagon{
    constructor(capacity){
        this.capacity = capacity;
        this.passageiros = [];
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

            return accumulated += obj.food
        }

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
