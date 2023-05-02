import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './event-listener-options';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
