import * as React from "react"
import { ERTSComponent } from "../ERTS/ERTS-React"
import { Link } from "react-router-dom"
import i18n from "../i18n/i18n"

export default class NotFound extends ERTSComponent<{}, {}> {
    render(): JSX.Element {
        return (
            <div className="container">
                <h1>{i18n().notFoundTitle}</h1>
                <p>
                    {i18n().notFoundGoto} <Link to="/">{i18n().navHome}</Link>
                </p>
                <p className="mt-5 text-secondary">
                    <small>{i18n().notFoundInfo}</small>
                </p>
            </div>
        )
    }
}
