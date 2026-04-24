package Rides;

import Entitati.Driver;
import Entitati.Rider;

import static MauLine.Constants.*;

import java.util.Random;

public class Regular extends Rides {
    public boolean preferedMusic;
    public boolean airConditioner;
    public int waitTime;

    public Regular() {
        this.init();
    }

    public Regular(boolean preferedMusic, boolean airConditioner, int waitTime,
                   double price, double basePrice, int avgSpeed) {
        this.preferedMusic = preferedMusic;
        this.airConditioner = airConditioner;
        this.waitTime = waitTime;
        this.price = price;
        this.basePrice = basePrice;
        this.avgSpeed = avgSpeed;
    }

    public Regular(Driver d, Rider r, double price, double basePrice, int avgSpeed,
                   boolean preferedMusic, boolean airConditioner, int waitTime) {
        super(d, r, price, basePrice, avgSpeed);
        this.preferedMusic = preferedMusic;
        this.airConditioner = airConditioner;
        this.waitTime = waitTime;
    }

    int comfort = 0;
    int comfortFee = 0;

    public int addComfortFee() {
        calculateComfort();
        if (comfort == COMFORT_LEVEL3)
            comfortFee = THREE_STAR_REGULAR_FEE;
        else if (comfort == COMFORT_LEVEL2)
            comfortFee = TWO_STAR_REGULAR_FEE;
        else if (comfort == COMFORT_LEVEL1)
            comfortFee = ONE_STAR_REGULAR_FEE;
        else
            comfortFee = ZERO_STAR_REGULAR_FEE;

        return comfortFee;
    }

    public void calculateComfort() {
        if (preferedMusic)
            comfort++;
        if (airConditioner)
            comfort++;
        if (waitTime < MAX_ACCEPTED_WAITING_TIME)
            comfort++;

    }

    @Override
    public double calculatePrice() {
        if (addComfortFee() > 0)
            System.out.println("Se aplica regular fee");
        else
            System.out.println("NU se aplica regular fee");
        double pr = this.basePrice + (this.price * calculateDistance());
        pr = pr + addComfortFee();
        return pr;
    }

    public void init() {
        Random rand = new Random();
        this.airConditioner = rand.nextBoolean();
        this.preferedMusic = rand.nextBoolean();
        this.waitTime = rand.nextInt(WAITING_TIME_RANDOM_RANGE);
        this.price = REGULAR_PRICE_PER_KM;
        this.basePrice = REGULAR_BASE_PRICE;
        this.avgSpeed = rand.nextInt(RIDE_SPEED_RANDOM_RANGE) + RIDE_SPEED_AVG;

    }

    @Override
    public String toString() {
        return super.toString() + ", iar informatiile cursei sunt:" + calculateDistance() + " km distanta parcursa," +
                " intr un interval de " + calculateTime() + " min,";
    }
}
