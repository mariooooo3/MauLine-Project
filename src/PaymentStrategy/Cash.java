package PaymentStrategy;

import java.util.Random;

import Entitati.Rider;
import Exceptions.CashException;

public class Cash implements PaymentStrategy {
    public String currency;
    Random random = new Random();
    int choice = random.nextInt(4);

    public Cash(String currency) {
        this.currency = currency;
    }

    public Cash() throws CashException {
        this.init();
    }

    public void init() throws CashException {
        switch (choice) {
            case 0:
                currency = "dolari";
                break;
            case 1:
                currency = "euro";
                break;
            case 2:
                currency = "lei romanesti";
                break;
            case 3:
                currency = "lire";
                break;
            default:
                throw new CashException("Exception: cash choice invalid");
        }
    }

    public void pay(Rider r) {
        System.out.println("Clientul " + r.firstName + " " + r.lastName +
                " a platit cursa cash folosind:" + this.currency);

    }
}
