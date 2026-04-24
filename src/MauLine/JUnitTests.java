package MauLine;

import Entitati.Driver;
import Entitati.Rider;
import Exceptions.*;
import Rides.*;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import Visitor.NotificationVisitor;
import Rides.Rides;

public class JUnitTests {
    Rider rider = new Rider("usr", "pass", "Chirila",
            "Robert", new String[]{"ElectricCar", "Fast"}, 300);
    Driver driver = new Driver("usr2", "pass2", "Mosneagu", "Iulian",
            3, new String[]{"ElectricCar", "Fast", "Modern"}, true, "Audi a4");
    Comfort comfort = new Comfort();
    Economic economic = new Economic();
    Regular regular = new Regular();
    NotificationVisitor notification = new NotificationVisitor();


    @Test
    public void acceptRide() throws RiderException, CreditCardException,
            RevolutException, VoucherException, CashException {
        boolean accepted = rider.orderRide(driver);
        Assertions.assertTrue(accepted);
    }

    @Test
    public void calculatePriceComfort() {
        double price = comfort.calculatePrice();
        Assertions.assertTrue(price > 50);
        System.out.println(price);
    }

    @Test
    public void calculateEconomicPrice() {
        double price = economic.calculatePrice();
        Assertions.assertTrue(price < 50);
        System.out.println(price);
    }

    @Test
    public void calculatePriceRegular() {
        double price = regular.calculatePrice();
        Assertions.assertFalse((price > 100 || price < 40));
        System.out.println(price);
    }

    @Test
    public void initRate() {
        float rate = driver.initRate();
        Assertions.assertTrue(rate > 3.0);
        System.out.println(rate);
    }

    @Test
    public void getNotification() {
        driver.accept(notification);
        Assertions.assertEquals("!!!EXCLUSIV IN ACEASTA SAPTAMANA" +
                " fiecare sofer primeste un bonus de 20%!!!", notification.getMessageDriver());
    }

    @Test
    public void notThrowingException() {
        Assertions.assertDoesNotThrow(() -> Rides.chooseRide(rider, driver));
    }

    @Test
    public void calculateTime() {
        long time = comfort.calculateTime();
        Assertions.assertTrue(time > 10);
        System.out.println(time);
    }

    @Test
    public void shareRide() {
        Economic economic = new Economic(4, true, 4, 10, 40);
        double reducere = economic.shareRide();
        Assertions.assertEquals(10, reducere);
    }

    @Test
    public void calculateLuxuryFee() {
        Comfort comfort = new Comfort(true, true, true, true, true, 6, 30, 45);
        double fee = comfort.addLuxuryFee();
        Assertions.assertEquals(30, fee);
    }

}
