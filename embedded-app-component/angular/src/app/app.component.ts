import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import '@unblu/embedded-app-component' // import the Unblu web component, so it can be used in the html
import {ErrorEvent, StateChangeEvent, UnbluEmbeddedAppElement} from "@unblu/embedded-app-component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('unbluElement') unbluElement?: ElementRef<UnbluEmbeddedAppElement>; // reference to the Unblu element that we can use to call its APIs
  unbluApiKey = "MZsy5sFESYqU7MawXZgR_w"; // Unblu API Key which will be passed to the Unblu element as attribute. replace with your API Key found in "Account Management Page -> API Keys".
  unbluServerUrl = "https://unblu.cloud"; // Origin of the Unblu Collaboration Server which will be passed to the Unblu element as attribute. replace with you origin when running on premises.

  async ngAfterViewInit() {
    // Access the API provided by the Unblu element
    const api = await this.unbluElement?.nativeElement.initialize();
    const availabilityState = await api?.getAgentAvailabilityState();
    console.log("Current agent availability state: ", availabilityState);
  }

  public onStateChange(e: Event) {
    console.log("Unblu Embedded Component state changed to: ", (e as StateChangeEvent).detail);
  }

  public onError(e: Event) {
    console.error("Unblu Embedded Component Error: ", (e as ErrorEvent).detail);
  }
}
