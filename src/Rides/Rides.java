
package Rides;

import Entitati.Driver;
import Entitati.Rider;
import Exceptions.*;

import java.util.Random;

import static MauLine.Constants.*;

public abstract class Rides {
    Driver d;
    Rider r;
    double price;
    double basePrice;
    int avgSpeed;

    public long startTime;
    public long stopTime;

    public Rides() {

    }

    public Rides(Driver d, Rider r, double price, double basePrice, int avgSpeed) {
        this.d = d;
        this.r = r;
        this.price = price;
        this.basePrice = basePrice;
        this.avgSpeed = avgSpeed;
    }

    public abstract double calculatePrice();

    public void startRide() {
        this.startTime = System.nanoTime();
    }

    public void stopRide() {
        Random rand = new Random();
        int rideMin = RIDE_MIN_BASE_MINUTES + rand.nextInt(RIDE_DURATION_RANDOM_RANGE_MINUTES);
        long rideNano = rideMin * SECONDS_IN_MINUTE * NANOS_IN_SECOND;
        this.stopTime = this.startTime + rideNano;

    }

    public long calculateTime() {
        startRide();
        stopRide();
        long duration = this.stopTime - this.startTime;
        return duration / (SECONDS_IN_MINUTE * NANOS_IN_SECOND);
    }

    public long calculateDistance() {
        double hours = calculateTime() / MINUTES_IN_HOUR;
        double distance = this.avgSpeed * hours;
        return Math.round(distance);
    }

    public static void chooseRide(Rider r, Driver d) throws RiderException, CreditCardException,
            RevolutException, VoucherException, CashException {
        Rides ride;
        double ridePrice = 0;
        if (r.budget > COMFORT_MIN_PRICE) {
            ride = new Comfort();
            if (r.orderRide(d)) {
                ridePrice = ride.calculatePrice();
                d.earnings += ridePrice;
                r.spendings += ridePrice;
                System.out.println((Comfort) ride + " pretul este de: " + ridePrice);
            }
        } else if (r.budget <= REGULAR_MAX_PRICE && r.budget >= REGULAR_MIN_PRICE) {
            ride = new Regular();
            if (r.orderRide(d)) {
                ridePrice = ride.calculatePrice();
                d.earnings += ridePrice;
                r.spendings += ridePrice;
                System.out.println((Regular) ride + " pretul este de: " + ridePrice);
            }
        } else if (r.budget < ECONOMIC_MAX_PRICE && r.budget >= ECONOMIC_MIN_PRICE) {
            ride = new Economic();
            if (r.orderRide(d)) {
                ridePrice = ride.calculatePrice();
                d.earnings += ridePrice;
                r.spendings += ridePrice;
                System.out.println((Economic) ride + " pretul este de: " + ridePrice);
            }
        } else
            System.out.println("Fonduri insufciente pentru a comanda o cursa");


    }

    public String toString() {
        return ("Cursa este de tipul " + getClass());
    }


}
