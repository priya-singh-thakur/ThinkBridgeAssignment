import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Item from './Item';
import About from './About'

class Router extends  React.Component {
    render(){
        return(
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Item} />
                <Route path="/about" component={About} />
             </Switch>
         </BrowserRouter>

    )
}
}

export default Router