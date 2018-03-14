import openSocket from 'socket.io-client';

class DrawSocket{
    constructor(Drawer){
        this.isOnline = false;
        this.ws = new openSocket(`http://${window.location.hostname}/sketch:${window.location.port}`);
        this.Drawer = Drawer;
        this.initEventHandle(this.ws,Drawer);
    }

    initEventHandle(ws,Drawer){
        this.ws.on("error",function(event){
            console.log("서버에 연결되지 못함");
        })
        
        this.ws.on("draw",function(data){
            console.log("draw",data);
            Drawer.draw(data.touch,data.colorType,true);
        })
    }

    sendDraw(touch, colorType){
        const data = {
            colorType,
            touch:{
                clientX:touch.clientX,
                clientY:touch.clientY
            }
        }

        this.ws.emit("draw",  data );

    }
}

export default DrawSocket