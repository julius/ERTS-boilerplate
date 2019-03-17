import * as ReactDOM from "react-dom"
import * as React from "react"
import { Switch, Route, RouteComponentProps, Router } from "react-router-dom"
import { ERTSComponent } from "./ERTS/ERTS-React"
import Home from "./Page/Home"
import Image from "./Page/Image"
import NotFound from "./Page/NotFound"
import { reactRouterHistory } from "./SharedData/reactRouterHistory"
import { NavBar } from "./Elements/NavBar"
import { eventLanguageChange } from "./SharedData/eventLanguageChange"

class App extends ERTSComponent<{}, {}> {
    constructor(props: {}) {
        super(props)

        eventLanguageChange.addListener(() => this.forceUpdate())
    }

    render(): JSX.Element {
        return (
            <Router history={reactRouterHistory}>
                <React.Fragment>
                    <NavBar />
                    <Switch>
                        <Route exact path="/" render={() => <Home />} />
                        <Route
                            path="/image/:id"
                            render={(props: RouteComponentProps<{ id: string }>) => (
                                <Image
                                    key={"image-" + props.match.params.id}
                                    imageId={parseInt(props.match.params.id, 10)}
                                />
                            )}
                        />
                        <Route render={() => <NotFound />} />
                    </Switch>
                </React.Fragment>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"))
