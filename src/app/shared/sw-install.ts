import { NotificationService } from './notification.service';
const _Notification = new NotificationService();

declare var PushHandler: any;

export function installServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log("Service Worker not supported - aborting");
    return;
  }

  let currentVersion: string;

  navigator.serviceWorker.onmessage = function (evt) {
    if (typeof evt.data.version !== 'undefined') {
      if (currentVersion === null) {
        currentVersion = evt.data.version;
      } else {
        const newVersion = evt.data.version;
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

  navigator.serviceWorker.ready.then((registration) => {
    if (!('pushManager' in registration)) {
      return;
    }
    PushHandler.init();
  });

  navigator.serviceWorker.register('/assets/sw-caching.js').then(function (registration) {
    if (registration.active) {
      registration.active.postMessage('version');
    }

    registration.onupdatefound = function () {
      console.log('A new version has been found... Installing...');

      registration.installing.onstatechange = function () {
        if (this.state === 'installed') {
          return console.log("App updated");
        }

        if (this.state === "activated") {
          registration.active.postMessage('version');
        }

        console.log("Incoming SW state:", this.state);
      };
    };
  });
}
