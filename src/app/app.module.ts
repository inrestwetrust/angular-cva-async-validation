import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ChildControlComponent } from "./child-control/child-control.component";
import { AppService } from "./app.service";
import { AppValidator } from "./app.validator";

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [AppComponent, ChildControlComponent],
  bootstrap: [AppComponent],
  providers: [AppService, AppValidator]
})
export class AppModule {}
