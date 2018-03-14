import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import {Home, About} from 'shared/main/pages';
import Menu from 'shared/main/Menu';
import Sketch from 'shared/Sketch';

const Root = () => {
    const links = [
        {name:"home", path:"/", component:Home, isExact:true},
        {name:"about", path:"/about", component:About, isExact:false},
    ]

    const Routes = links.map( ( { path, component, isExact } ,i) => (
        <Route 
            exact={isExact} 
            path={path} 
            component={component} 
            key={i} />
    ))

    return (
        <BrowserRouter>
            <div>
                <Menu links={links}/>
                { Routes }
                <Route exact path={"/sketch"} component={ Sketch } />
            </div>
        </BrowserRouter>
    )
};

export default Root;