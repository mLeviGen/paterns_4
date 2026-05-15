import { LegacyLocationService, GeoAdapter, CryptoAPI, BankAPI, CryptoAdapter, BankAdapter } from './adapter.js';
import { BaseNotifier, TelegramNotifier, WhatsAppNotifier, PushNotifier } from './decorator.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log("=== ПР4: Тест Adapter (Геолокація) ===");

    const service = new LegacyLocationService();
    service.getRawCoordinates().forEach(raw => {
        const adapted = GeoAdapter.transform(raw);
        console.log(`Raw: ${raw} -> Result: ${JSON.stringify(adapted)}`);
    });

    console.log("\n=== ПР4: Тест Decorator (Динамічні сповіщення) ===");
    let base = new BaseNotifier();
    let tgNode = new TelegramNotifier(base);
    let waNode = new WhatsAppNotifier(tgNode);
    let finalNotifier = new PushNotifier(waNode);

    console.log("--- Всі канали УВІМКНЕНІ ---");
    console.log(finalNotifier.notify("Сервер падає!"));

    console.log("--- Вимикаємо Telegram та Push ---");
    tgNode.toggle(false);
    finalNotifier.toggle(false);

    console.log(finalNotifier.notify("Сервер піднято!"));

    console.log("\n=== ПР4: Додаткове завдання (OOP Валютний Адаптер) ===");
    const cryptoAdapter = new CryptoAdapter(new CryptoAPI());
    const bankAdapter = new BankAdapter(new BankAPI());

    const providers = [cryptoAdapter, bankAdapter];
    providers.forEach((provider, index) => {
        const rate = provider.getStandardRate();
        console.log(`Джерело ${index + 1}: ${JSON.stringify(rate)}`);
    });
});
