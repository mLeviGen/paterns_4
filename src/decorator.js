export class BaseNotifier {
    notify(message) {
        return `[Email] ${message}`;
    }
}


class NotifierDecorator {
    constructor(notifier) {
        this.notifier = notifier;
        this.enabled = true; 
    }

    toggle(state) {
        this.enabled = state;
    }

    notify(message) {
        return this.notifier.notify(message);
    }
}


export class TelegramNotifier extends NotifierDecorator {
    notify(message) {
        const baseResult = super.notify(message);
        if (!this.enabled) return baseResult; 
        
        return `${baseResult}\n[Telegram] Відправлено повідомлення: ${message}`;
    }
}


export class WhatsAppNotifier extends NotifierDecorator {
    notify(message) {
        const baseResult = super.notify(message);
        if (!this.enabled) return baseResult;

        return `${baseResult}\n[WhatsApp] Відправлено повідомлення: ${message}`;
    }
}


export class PushNotifier extends NotifierDecorator {
    notify(message) {
        const baseResult = super.notify(message);
        if (!this.enabled) return baseResult;

        return `${baseResult}\n[Push] Відправлено push-сповіщення: ${message}`;
    }
}