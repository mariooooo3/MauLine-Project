
package MauLine;

import Observer.RidesObserver;
import Observer.Subject;

import java.util.ArrayList;

public class Uber implements Subject {
    ArrayList<RidesObserver> observers = new ArrayList<RidesObserver>();


    public void addObserver(RidesObserver observer) {
        observers.add(observer);
    }

    public void removeRidesObserver(RidesObserver observer) {
        observers.remove(observer);
    }

    public void notifyObservers() {
        for (RidesObserver observer : observers) {
            observer.update();
        }
    }
}
