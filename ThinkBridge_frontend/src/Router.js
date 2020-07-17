import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';

class Router extends  React.Component {
    render(){
        return(
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={App} />
                {/* <Route path="/abc" component={SecondPage} /> */}
             </Switch>
         </BrowserRouter>

    )
}
}

export default Router