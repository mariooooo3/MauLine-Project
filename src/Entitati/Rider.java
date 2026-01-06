
package Entitati;

import Exceptions.*;
import PaymentStrategy.*;
import Visitor.Visitable;
import Visitor.Visitor;
import Observer.RidesObserver;

import java.util.Arrays;
import java.util.Random;

import static MauLine.Constants.*;

import static Entitati.Driver.contor;

public class Rider extends Account implements Visitable, RidesObserver {
    public int budget;
    public String[] ridePreferences;
    public double spendings = 0;
    public static int ct = 0;
    float rating = initRate();

    public Rider() {
        ct++;
    }

    public Rider(String username, String password, String lastName, String firstName,
                 String[] ridePreferences, int budget) {
        super(username, password, lastName, firstName);
        this.ridePreferences = ridePreferences;
        this.budget = budget;
        ct++;
    }

    public Rider(String[] ridePreferences, int budget) {
        this.ridePreferences = ridePreferences;
        this.budget = budget;
        ct++;
    }

    public boolean orderRide(Driver d) throws RiderException, CreditCardException,
            RevolutException, VoucherException, CashException {
        d.getRate();
        int contor = 0;
        for (int i = 0; i < ridePreferences.length; i++) {
            for (int j = 0; j < d.qualities.length; j++) {
                if (ridePreferences[i].equals(d.qualities[j]))
                    contor++;
            }
        }
        if (contor >= MIN_PREFERENCES_COUNTER) {
            d.acceptRide(this);
            return true;
        } else {
            cancelOrder(d);
            return false;
        }
    }

    public void cancelOrder(Driver d) {
        this.getRate();
        System.out.println("Calatorul " + this.firstName + " " + this.lastName +
                " a refuzat cursa soferului " + d.firstName + " " + d.lastName);
    }

    @Override
    public String toString() {
        return super.toString() + "de tipul rider, avand urmatoarele preferinte: " + Arrays.toString(this.ridePreferences);
    }

    public void getRate() {
        System.out.printf("Rating-ul calatorului %s %s este: %.2f/5%n", this.firstName, this.lastName, this.rating);

    }

    public void getPaymentMethod(Rider r) throws RiderException, CreditCardException, RevolutException, VoucherException, CashException {
        Random rand = new Random();

        int choice = rand.nextInt(4);
        PaymentStrategy pay;

        switch (choice) {
            case 0:
                pay = new Cash();
                break;
            case 1:
                pay = new CreditCard();
                break;
            case 2:
                pay = new Voucher();
                break;
            case 3:
                pay = new Revolut();
                break;
            default:
                throw new RiderException("Exception: rider payment method invalid");
        }
        pay.pay(r);

    }

    @Override
    public void accept(Visitor v) {
        v.visit(this);
    }

    @Override
    public void update() {
        System.out.println("Calatorul " + this.firstName + " " + this.lastName +
                " a fost notifcat ca sunt: " + contor + " soferi in zona");
    }


}
