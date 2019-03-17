import * as React from "react"
import { ERTSComponent } from "../ERTS/ERTS-React"
import { Link } from "react-router-dom"
import i18n from "../i18n/i18n"

interface Props {}
interface State {}

export default class Home extends ERTSComponent<Props, State> {
    render(): JSX.Element {
        return (
            <div className="PageHome container">
                <h1>{i18n().homeTitle}</h1>
                <p>{i18n().homeAvailableImages}</p>
                <ul>
                    {[1, 2, 3].map((imageId) => (
                        <li key={imageId}>
                            <Link to={"/image/" + imageId.toString()}>
                                {i18n().homeImageX.replace("{X}", imageId.toString())}
                            </Link>

                            {imageId === 3 ? (
                                <small className="text-secondary ml-2">
                                    - {i18n().homeHandlesBadServerResponse}
                                </small>
                            ) : null}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
