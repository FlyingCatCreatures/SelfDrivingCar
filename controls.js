class Controls{
    constructor(type){
        this.forward=false;
        this.left=false;
        this.right=false;
        this.reverse=false;
  

        switch(type){
            case "KEYS":
                this.#addKeyboardListeners();
                break;
            case "STATIONARYDUMMY":
                break;
            case "MOVINGDUMMY":
                this.forward=true;
                break;

        }

    }
    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=true; 
                    break;
                case "ArrowRight":
                    this.right=true;                    
                    break;
                case "ArrowUp":
                    this.forward=true;                    
                    break;
                case "ArrowDown":
                    this.reverse=true;                    
                    break;
                case "KeyA":
                    this.left=true; 
                    break;
                case "KeyD":
                    this.right=true;                    
                    break;
                case "KeyW":
                    this.forward=true;                    
                    break;
                case "KeyS":
                    this.reverse=true;                    
                    break;
            }
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=false;                    
                    break;
                case "ArrowRight":
                    this.right=false;                    
                    break;
                case "ArrowUp":
                    this.forward=false;   
                     break;
                case "ArrowDown":
                    this.reverse=false;
                    break;
                case "KeyA":
                    this.left=false;                    
                    break;
                case "KeyD":
                    this.right=false;                    
                    break;
                case "KeyW":
                    this.forward=false;   
                     break;
                case "KeyS":
                    this.reverse=false;
                    break;
            }
        }
    }
}
