export default (pathArray) => 
    pathArray.map(path => 
     `${path[0]}${path[1] * -1},${path[2] * -1}`
    ).join("")