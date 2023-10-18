import {Component} from 'react';
import './typedefs' // import the type defs allowing to use the Unblu web component in react
import './bootstrap.min.css';
import './style.css'
import '@unblu/embedded-app-component'; // import the Unblu web component
import {StateChangeEvent, UnbluEmbeddedAppElement, ViewModeChangeEvent} from "@unblu/embedded-app-component";

class App extends Component<any,any> {
    public unbluApiKey = "MZsy5sFESYqU7MawXZgR_w"; // Unblu API Key, replace with your key found in "Account Management Page -> API Keys".
    public unbluServerUrl = "https://unblu.cloud"; // Origin of the Unblu Collaboration Server, replace with you origin when running on premises.

    private unbluElement?: UnbluEmbeddedAppElement;

    async componentDidMount() {
        // When the component is mounted, we can add our listeners and use the API.
        // (The "unbluElement" elem is assigned in the render function.)
        this.unbluElement?.addEventListener("stateChange", this.onStateChange);
        this.unbluElement?.addEventListener("viewModeChange", this.onViewModeChange);

        // Access the API provided on the Unblu element
        const api = await this.unbluElement?.initialize();
        const availabilityState = await api?.getAgentAvailabilityState();
        console.log("Current agent availability state: ",availabilityState);
    }

    componentWillUnmount() {
        // Make sure to remove the DOM listener when the component is unmounted.
        this.unbluElement?.removeEventListener("stateChange", this.onStateChange);
        this.unbluElement?.removeEventListener("viewModeChange", this.onViewModeChange);
    }


    private onStateChange(e: StateChangeEvent) {
        console.log("Unblu Embedded Component state changed to: ", e.detail);
    }

    private onViewModeChange(e: ViewModeChangeEvent) {
        console.log("Unblu Embedded Component view mode changed to: ", e.detail);
    }

    render() {
        return (
        <main className="container flex-grow-1 d-flex flex-column mb-5">
            <div className="unblu-container card shadow-sm overflow-hidden">
                {/* Add the Unblu web component to the react app */}
                <unblu-embedded-app
                    ref={elem => this.unbluElement = elem!} // save a reference to the Unblu element, so we can use it later
                    api-key={this.unbluApiKey}
                    server-url={this.unbluServerUrl}/>
            </div>
        </main>
        );
    }
}

export default App;
