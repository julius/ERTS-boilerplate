import * as t from "io-ts"
import { decodeJson } from "./ERTS/ERTS-SafeHelpers"

const decoderApiImageData = t.type({
    url: t.string,
    name: t.string,
    description: t.union([t.undefined, t.string]),
})

export type ApiImageData = t.TypeOf<typeof decoderApiImageData>

export const ApiImage = {
    load(imageId: number): Promise<ApiImageData> {
        return fetch(`/db/${imageId}.json`)
            .then((resp) => resp.json())
            .then((json) => decodeJson(decoderApiImageData, json))
    },
}
