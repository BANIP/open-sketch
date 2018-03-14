import { fromJS } from 'immutable';

export const pen = ({
    start: ({ context, axis, figureID: id }) => {
        //
        const { x, y } = axis;
        const { strokeStyle, strokeWidth } = context.toJS();
        return fromJS({
            type: "pen",
            x, y, id,
            strokeWidth, strokeStyle,
            d:[ ["M",0,0] ],
        })
    },
    move:(figureData, axis) => {
        const {x: centerX, y: centerY} = figureData.toJS();
        const {x, y} = axis;
        const [nextX, nextY] = [centerX - x, centerY - y];
        return figureData.update("d",d => 
            d.push(["L",nextX, nextY])
        );
    }
})

export const circle = ({
    start: ({ context, axis, figureID: id }) => {
        // is center start alt
        const { x, y } = axis;
        const { strokeStyle, strokeWidth, fillStyle } = context.toJS();
        const r = 0;

        return fromJS({
            id, type:"circle",startAxis:axis,
            x, y, width:r, height:r,
            strokeWidth, strokeStyle, fillStyle,

        })
    },
    move:(figureData, axis, context) => {
        const {startAxis: { x: centerX , y: centerY }, subKey} = figureData.toJS();
        const isCenterStart = context.getIn(["subKey","ctrl"])
        let { x, y } = axis;

        if(isCenterStart){
            const width = centerX - x;
            const height = centerY - y;
            const r = Math.hypot(centerX - x, centerY - y);
            return figureData.merge({
                x:centerX,
                y:centerY,
                width:Math.abs(width),
                height:Math.abs(height),
            });
        } else {
            const [radiusX, radiusY] = [ (centerX - x) / 2, (centerY - y) / 2];
            const radius = radiusX > radiusY ? radiusX : radiusY;

            return figureData.merge({
                x:centerX - radiusX ,
                y:centerY - radiusY,
                width:Math.abs(radiusX),
                height:Math.abs(radiusY),
            });
        }
    }
})

export const rect = ({
    start: ({ context, axis, figureID: id }) => {
        const { x, y } = axis;
        const { strokeStyle, strokeWidth, fillStyle } = context.toJS();
        return fromJS({
            id, type:"rect",
            x, y, width:0, height:0, 
            strokeWidth, strokeStyle, fillStyle
        })
    },
    move:(figureData, axis) => {
        const {x: centerX, y: centerY} = figureData.toJS();
        const {x, y} = axis;
        const [width, height] = [centerX - x, centerY - y];
        return figureData.set("width",width * -1).set("height",height * -1);
    }
})