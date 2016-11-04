declare var Notification: any;

export class NotificationService {

  constructor() { }

  open(message: string) {
    if (!("Notification" in window)) {
      console.log("Notification not supported - aborting");
      return;
    }

    if (Notification.permission === "granted") {
      const notification = new Notification(message);

    } else if (Notification.permission !== "denied") {
      Notification.requestPermission((permission) => {
        if (permission === "granted") {
          const notification = new Notification(message);
        }
      })
    }
  }
}
