import { NotificationService } from './notification.service';
const _Notification = new NotificationService();


export function installServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported - aborting');
    return;
  }

  let currentVersion: string | null;

  navigator.serviceWorker.onmessage = function (evt) {
    if (typeof evt.data.version !== 'undefined') {
      if (!currentVersion) {
        currentVersion = evt.data.version;
        console.log('currentVersion', currentVersion);
      } else {
        const newVersion = evt.data.version;
        console.log('currentVersion', currentVersion);
        console.log('newVersion', newVersion);
        const cvParts = currentVersion.split('.');
        const nvParts = newVersion.split('.');

        if (cvParts[0] === nvParts[0]) {
          console.log(`Service Worker moved from ${currentVersion} to ${newVersion}`);
        } else {
          _Notification.open('Site updated. Refresh to get the latest!');
        }
      }
    }
  };

  navigator.serviceWorker.register('service-worker.js').then(function (registration) {
    if (registration.active) {
      // noinspection TypeScriptUnresolvedFunction
      registration.active.postMessage('version');
    }

    registration.onupdatefound = function () {
      console.log('A new version has been found... Installing...');

      registration.installing.onstatechange = function () {
        if (this.state === 'installed') {
          return console.log('App updated');
        }

        if (this.state === 'activated') {
          // noinspection TypeScriptUnresolvedFunction
          registration.active.postMessage('version');
        }

        console.log('Incoming SW state:', this.state);
      };
    };
  });
}
