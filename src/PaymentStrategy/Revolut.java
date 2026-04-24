package PaymentStrategy;

import java.util.Random;

import Entitati.Rider;
import Exceptions.RevolutException;

public class Revolut implements PaymentStrategy {
    public int revNo;
    Random random = new Random();
    int choice = random.nextInt(4);

    public Revolut(int revNo) {
        this.revNo = revNo;
    }

    public Revolut() throws RevolutException {
        this.init();
    }

    public void init() throws RevolutException {
        switch (choice) {
            case 0:
                revNo = 111;
                break;
            case 1:
                revNo = 222;
                break;
            case 2:
                revNo = 333;
                break;
            case 3:
                revNo = 444;
                break;
            default:
                throw new RevolutException("Exception: revolut choice invalid");
        }
    }


    public void pay(Rider r) {
        System.out.println("Clientul " + r.firstName + " " + r.lastName +
                " a platit cursa cu revolut-ul:" + revNo);
    }
}
