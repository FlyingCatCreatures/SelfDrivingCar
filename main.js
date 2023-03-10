const carCanvas=document.getElementById("carCanvas");
carCanvas.width=1150;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=0;

const frameduration = 1000 / 300
const maxSpeed = 8.55
const TrafficDistance = 300
const movingTrafficDensity=0.75
const movingTrafficCount = movingTrafficDensity*TrafficDistance
const DoMovingTraffic = true
const stationaryTrafficDensity = 0.5
const stationaryTrafficCount = stationaryTrafficDensity*TrafficDistance
const DoStationaryTraffic = false

let KillBarrier=600
const killBarrierSpeed=4

let IterationIsDone = false

const NeuralNetworkAdaptabillityValue = 0.01
// How much new iterations differ from previous best on a scale of 0 to 1

const carCtx=carCanvas.getContext("2d");
const networkCtx=carCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.95);


const numberOfAI=50

const cars=generateCars(numberOfAI);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,NeuralNetworkAdaptabillityValue);
        }
    }
}


const traffic = [
]
if(DoMovingTraffic){
    for (let i=0;i<movingTrafficCount;i++){
        traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random()*(road.laneCount))),(Math.floor(Math.random()*(-TrafficDistance))*100)-450,78,132,"MOVINGDUMMY",Math.floor(Math.random()*(maxSpeed+1))+1))
    }
}
if(DoStationaryTraffic){
    for (let i=0;i<stationaryTrafficCount;i++){
        traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random()*(road.laneCount))),(Math.floor(Math.random()*(-TrafficDistance))*100)-450,78,132,"STATIONARYDUMMY"));
    }
}
traffic.push(new Car(road.getLaneCenter(Math.floor(road.laneCount/2)),-800,78,132,"STATIONARYDUMMY"))
const trafficimg = new Image();  
trafficimg.src = './yellow.png';

const carimg = new Image();
carimg.src = './red.png'

function checkDamage(){
    for(let i=0;i<cars.length;i++){
        if(cars[i].damaged==false){
            return false
        }
    }
    return true
}


function update(){
    KillBarrier-=killBarrierSpeed
    var then = Date.now()
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic,KillBarrier);
    }
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        )
    );
    if(
        bestCar.y<(TrafficDistance*-100-500) ||
        checkDamage()
    ){
        save();
        IterationIsDone =  true;
    }
    if(IterationIsDone){
        location.reload();
    }
    setTimeout(update, 1000/60);
}

function render(){
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;
    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.8);
    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,trafficimg)
    }
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx, carimg, traffic);
    }
    bestCar.draw(carCtx, carimg ,traffic, true)
    carCtx.restore();
    requestAnimationFrame(render);
}

function generateCars(Amount){
    const cars=[];
    for(let i=0;i<Amount;i++){
        cars.push(new Car(road.getLaneCenter(Math.floor(road.laneCount/2)),300,78,132,"AI",maxSpeed))
    }
    return cars;
}
function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain")
}

update();
render();