import { LegacyLocationService, GeoAdapter, CurrencyAdapter } from './adapter.js';
import { BaseNotifier, TelegramNotifier, WhatsAppNotifier, PushNotifier } from './decorator.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log("=== ПР4: Тест Adapter (Геолокація) ===");

    const service = new LegacyLocationService();
    service.getRawCoordinates().forEach(raw => {
        const adapted = GeoAdapter.transform(raw);
        console.log(`Raw: ${raw} -> Result: ${JSON.stringify(adapted)}`);
    });

    console.log("\n=== ПР4: Тест Decorator (Сповіщення) ===");
    
    let myNotifier = new BaseNotifier();
    myNotifier = new TelegramNotifier(myNotifier);
    myNotifier = new WhatsAppNotifier(myNotifier);
    myNotifier = new PushNotifier(myNotifier);
    console.log(myNotifier.notify("Привіт! Це тестове повідомлення."));

    console.log("\n=== ПР4: Додаткове завдання (Динамічні Декоратори) ===");

    let base = new BaseNotifier();
    let tgNode = new TelegramNotifier(base);
    let waNode = new WhatsAppNotifier(tgNode);
    let finalNotifier = new PushNotifier(waNode);

    console.log("--- Усі канали УВІМКНЕНІ ---");
    console.log(finalNotifier.notify("Увага! Сервер падає!"));

    console.log("\n--- Вимикаємо Telegram та Push ---");
    tgNode.toggle(false); 
    finalNotifier.toggle(false);

    console.log(finalNotifier.notify("Сервер піднято!"));
});