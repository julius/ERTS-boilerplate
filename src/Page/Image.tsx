import * as React from "react"
import { Link } from "react-router-dom"
import { ERTSComponent } from "../ERTS/ERTS-React"
import { ifReachable, DecodeJsonError } from "../ERTS/ERTS-SafeHelpers"
import { ApiImageData, ApiImage } from "../api"

interface Props {
    imageId: number
}

type StateLoading = { type: "Loading" }
type StateLoadingError = { type: "LoadingError"; errorMsg: string }
type StateShowImage = { type: "ShowImage"; imageData: ApiImageData }

type State = StateLoading | StateLoadingError | StateShowImage

export default class Image extends ERTSComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = { type: "Loading" }

        ApiImage.load(props.imageId)
            .then((imageData) => {
                this.setState({
                    type: "ShowImage",
                    imageData,
                })
            })
            .catch((error) => {
                if (error instanceof DecodeJsonError) {
                    this.setState({
                        type: "LoadingError",
                        errorMsg: "Bad Server Response: " + error.message,
                    })
                    return
                }
                if (error instanceof Error) {
                    this.setState({
                        type: "LoadingError",
                        errorMsg: "Unexpected Error: " + error.message,
                    })
                    return
                }
                this.setState({
                    type: "LoadingError",
                    errorMsg: "Unexpected Error",
                })
            })
    }

    render(): JSX.Element {
        return (
            <div className="Page-Image mt-4">
                <div className="container">
                    {(() => {
                        switch (this.state.type) {
                            case "Loading":
                                return <div>Loading...</div>
                            case "LoadingError":
                                return this.renderLoadingError(this.state)
                            case "ShowImage":
                                return this.renderShowImage(this.state)
                            default:
                                throw ifReachable(this.state)
                        }
                    })()}
                </div>
            </div>
        )
    }

    renderLoadingError(state: StateLoadingError): JSX.Element {
        return (
            <div>
                <div className="p-3 text-white bg-danger">Error Loading.</div>
                <div className="p-3 mb-3 text-white bg-dark">
                    <pre className="text-white">{state.errorMsg}</pre>
                </div>
                {this.renderNavigation()}
            </div>
        )
    }

    renderShowImage(state: StateShowImage): JSX.Element {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <div className="ImageAndNavigation">
                        <h1>{state.imageData.name}</h1>
                        {state.imageData.description !== undefined ? (
                            <p>{state.imageData.description}</p>
                        ) : null}
                        <div className="image">
                            <img src={state.imageData.url} className="img-fluid rounded" />
                        </div>
                        <div className="navigation mt-2">{this.renderNavigation()}</div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6" />
            </div>
        )
    }

    renderNavigation(): JSX.Element {
        return (
            <React.Fragment>
                <Link
                    className={
                        "btn btn-lg mr-2 btn-secondary" +
                        (this.props.imageId <= 1 ? " disabled" : "")
                    }
                    to={"/image/" + (this.props.imageId - 1).toString()}
                >
                    <i className="fa fa-chevron-left" />
                </Link>
                <Link
                    className={
                        "btn btn-lg mr-2 btn-secondary" +
                        (this.props.imageId >= 3 ? " disabled" : "")
                    }
                    to={"/image/" + (this.props.imageId + 1).toString()}
                >
                    <i className="fa fa-chevron-right" />
                </Link>
            </React.Fragment>
        )
    }
}
