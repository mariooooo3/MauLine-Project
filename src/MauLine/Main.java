
package MauLine;

import Entitati.Driver;
import Entitati.Rider;
import Exceptions.*;
import Rides.Rides;
import Visitor.FinancialStatsVisitor;
import Visitor.StatisticsVisitor;
import Visitor.NotificationVisitor;


public class Main {
    public static void main(String[] args) throws RiderException, CreditCardException,
            RevolutException, VoucherException, CashException {

        FinancialStatsVisitor financial = new FinancialStatsVisitor();
        NotificationVisitor notification = new NotificationVisitor();
        StatisticsVisitor statistics = new StatisticsVisitor();

        Rider rider1 = new Rider(new String[]{"Friendly", "PetFriendly", "ElectricCar", "Fast"}, 300);
        Rider rider2 = new Rider("usr", "pas", "Boscu", "Andrei", new String[]{"Calm", "Modest", "ElectricCar"}, 70);
        rider1.signUp();
        rider1.signIn();

        Driver driver1 = new Driver(3, new String[]{"Fast", "ElectricCar", "Modern", "Calm"}, true, "Honda");
        driver1.signUp();

        Driver driver2 = new Driver(5, new String[]{"ElectricCar", "Cool", "Calm"}, false, "Tesla");
        driver2.signUp();

        System.out.println("\n");
        rider1.accept(notification);
        rider1.accept(statistics);

        System.out.println("\n");
        driver1.accept(notification);
        driver1.accept(statistics);

        Uber uber = new Uber();
        uber.addObserver(rider1);
        uber.addObserver(driver1);
        uber.addObserver(driver2);
        uber.addObserver(rider2);

        System.out.println("\nDisponibilitate:");
        uber.notifyObservers();

        System.out.println("\nCursa1:");
        Rides.chooseRide(rider1, driver2);

        System.out.println("\nCursa2:");
        Rides.chooseRide(rider1, driver1);

        System.out.println("\nCursa3:");
        Rides.chooseRide(rider2, driver1);


        System.out.println("\nSitatia financiara:");
        driver1.accept(financial);
        driver2.accept(financial);
        rider1.accept(financial);
        rider2.accept(financial);


    }
}
