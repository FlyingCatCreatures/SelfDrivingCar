const carCanvas=document.getElementById("carCanvas");
carCanvas.width=850;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=0;

const frameduration = 1000 / 60
const maxSpeed = 8.55
const trafficCount = 200
const trafficDistance = 205

const carCtx=carCanvas.getContext("2d");
const networkCtx=carCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);
const car=new Car(road.getLaneCenter(Math.floor(road.laneCount/2)),300,87,146,"AI",maxSpeed);

const traffic = [
    //new Car(road.getLaneCenter(Math.floor(Math.random()*(road.laneCount))),(Math.floor(Math.random()*(-101))*100),30,60,"STATIONARYDUMMY"),
]
for (let i=0;i<trafficCount;i++){
    traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random()*(road.laneCount))),(Math.floor(Math.random()*(-trafficDistance))*100),78,132,"MOVINGDUMMY",Math.floor(Math.random()*(maxSpeed+1))+1))
}
//console.log(traffic)
const trafficimg = new Image();  
trafficimg.src = './yellow.png';

const carimg = new Image();
carimg.src = './red.png'


function update(){
    var then = Date.now()
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);
    setTimeout(update, frameduration)
}

function render(){
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-car.y+carCanvas.height*0.8);
    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,trafficimg)
    }
    car.draw(carCtx, trafficimg, traffic);
    carCtx.restore();

    //Visualizer.drawNetwork(networkCtx,car.brain);
        traffic[i].draw(ctx,img)
    
    car.draw(carCtx, img, traffic);
    car.draw(carCtx, carimg, traffic);
    carCtx.restore();
    requestAnimationFrame(render);
}

function generateCars(N){
    const cars=[];
    for(let i=0;i<N;i++){
        cars.push(new Car(road.getLaneCenter(Math.floor(road.laneCount/2)),300,78,132,"AI",maxSpeed))
    }
}
update();
render();