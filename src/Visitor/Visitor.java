package Visitor;

import Entitati.Driver;
import Entitati.Rider;

public interface Visitor {
    public void visit(Driver d);

    public void visit(Rider r);
}
