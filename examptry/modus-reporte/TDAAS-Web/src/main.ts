import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { defineCustomElements } from '@trimble-oss/modus-web-components/loader';

defineCustomElements()

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
