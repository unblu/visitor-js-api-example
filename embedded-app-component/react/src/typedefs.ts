import * as React from "react";
import {
    UnbluEmbeddedAppElement
} from "@unblu/embedded-app-component";

/**
 * Declare the Unblu Embedded App Component as valid intrinsic element, so it can be used in react
 */
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'unblu-embedded-app': React.DetailedHTMLProps<React.HTMLAttributes<UnbluEmbeddedAppElement>, UnbluEmbeddedAppElement>;
        }
    }
}