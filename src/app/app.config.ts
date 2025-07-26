import { ApplicationConfig, provideZonelessChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { ROUTES } from "./app-routing.module";


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(ROUTES), provideZonelessChangeDetection()],
};