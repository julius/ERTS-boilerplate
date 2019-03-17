import i18n, { setUserLanguage } from "../i18n/i18n"
import * as React from "react"
import { Link } from "react-router-dom"
import { reactRouterHistory } from "../SharedData/reactRouterHistory"
import { ERTSComponent } from "../ERTS/ERTS-React"
import { UnregisterCallback } from "history"

interface Props {}
interface State {
    activePath: string
}

export class NavBar extends ERTSComponent<Props, State> {
    cleanupListener: UnregisterCallback

    constructor(props: Props) {
        super(props)
        this.state = { activePath: reactRouterHistory.location.pathname }

        this.cleanupListener = reactRouterHistory.listen((location) => {
            this.setState({ activePath: reactRouterHistory.location.pathname })
        })
    }

    componentWillUnmount(): void {
        this.cleanupListener()
    }

    render(): JSX.Element {
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
                <div className="container">
                    <ul className="navbar-nav">
                        <li
                            className={
                                "nav-item" + (this.state.activePath === "/" ? " active" : "")
                            }
                        >
                            <Link className="nav-link" to="/">
                                {i18n().navHome}
                            </Link>
                        </li>
                        <li
                            className={
                                "nav-item" +
                                (this.state.activePath === "/settings" ? " active" : "")
                            }
                        >
                            <Link className="nav-link" to="/settings">
                                {i18n().navSettings}
                            </Link>
                        </li>
                    </ul>

                    <div className="pull-right">
                        <span
                            className="flag-icon flag-icon-de mr-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => setUserLanguage("de")}
                        >
                            {" "}
                        </span>
                        <span
                            className="flag-icon flag-icon-gb"
                            style={{ cursor: "pointer" }}
                            onClick={() => setUserLanguage("en")}
                        />
                    </div>
                </div>
            </nav>
        )
    }
}
