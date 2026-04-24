
package Entitati;

import Exceptions.*;
import Observer.RidesObserver;
import Visitor.Visitable;
import Visitor.Visitor;

import static MauLine.Constants.*;

import static Entitati.Rider.ct;

public class Driver extends Account implements Visitable, RidesObserver {
    public int experience;
    public String[] qualities;
    public boolean isAvailable;
    public String carModel;
    public double earnings = 0;
    public static int contor = 0;
    float rating = initRate();

    public Driver() {
        contor++;
    }

    public Driver(String username, String password, String lastName,
                  String firstName, int experience, String[] qualities, boolean isAvailable) {
        super(username, password, lastName, firstName);
        this.experience = experience;
        this.qualities = qualities;
        this.isAvailable = isAvailable;
        contor++;
    }

    public Driver(String username, String password, String lastName,
                  String firstName, int experience, String[] qualities, boolean isAvailable, String carModel) {
        super(username, password, lastName, firstName);
        this.experience = experience;
        this.qualities = qualities;
        this.isAvailable = isAvailable;
        this.carModel = carModel;
        contor++;
    }

    public Driver(int experience, String[] qualities, boolean isAvailable, String carModel) {
        this.experience = experience;
        this.qualities = qualities;
        this.isAvailable = isAvailable;
        this.carModel = carModel;
        contor++;
    }

    public void acceptRide(Rider r) throws RiderException, CreditCardException,
            RevolutException, VoucherException, CashException {
        r.getRate();
        if (this.isAvailable && r.rating > MIN_ACCEPTING_RATE) {
            System.out.println("Soferul " + firstName + " " + lastName + " cu masinca marca:"
                    + carModel + " a acceptat cursa calatorului: " + r.firstName + " " + r.lastName);
            r.getPaymentMethod(r);
        } else
            declineRide(r);
    }

    public void declineRide(Rider r) {
        r.getRate();
        if (!this.isAvailable && r.rating < MIN_ACCEPTING_RATE)
            System.out.println("Soferul " + firstName + " " + lastName + " cu masinca marca:"
                    + carModel + " a refuzat cursa calatorului: " + r.firstName + " " + r.lastName);
    }

    @Override
    public String toString() {
        return super.toString() + "de tipul driver, are " +
                this.experience + " ani de experiemta si o masina marca: " + this.carModel;
    }


    public void getRate() {

        System.out.printf("Rating-ul soferului %s %s este: %.2f/5%n", this.firstName, this.lastName, this.rating);
    }

    @Override
    public void accept(Visitor v) {
        v.visit(this);
    }

    @Override
    public void update() {
        System.out.println("Soferul " + this.firstName + " " + this.lastName
                + " a fost notificat ca sunt: " + ct + " clienti in zona");
    }


}
