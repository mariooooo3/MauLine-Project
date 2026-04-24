package Visitor;

import Entitati.Driver;
import Entitati.Rider;

public class FinancialStatsVisitor implements Visitor {
    public void visit(Driver d) {
        System.out.println("Soferul " + d.firstName + " " + d.lastName +
                " a strans:" + d.earnings + " lei din curse");
    }

    public void visit(Rider r) {
        System.out.println("Calatorul " + r.firstName + " " + r.lastName +
                " a cheltuit:" + r.spendings + " lei pe curse");
    }
}
