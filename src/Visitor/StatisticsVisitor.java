package Visitor;

import Entitati.Rider;
import Entitati.Driver;

import java.util.Arrays;

public class StatisticsVisitor implements Visitor {
    public void visit(Driver d) {
        System.out.println("Soferul " + d.firstName + " " + d.lastName + " are urmatoarele calitati:"
                + Arrays.toString(d.qualities) + ", o masina marca:" + d.carModel + " si " + d.experience + " ani de experienta");
    }

    public void visit(Rider r) {
        System.out.println("Calatorul " + r.firstName + " " + r.lastName + " are urmatoarele preferinte:"
                + Arrays.toString(r.ridePreferences) + ", iar bugetul sau este in valoare de:" + r.budget + " de lei");
    }
}
