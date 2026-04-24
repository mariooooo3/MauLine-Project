package Observer;

public interface Subject {
    public void addObserver(RidesObserver o);

    public void removeRidesObserver(RidesObserver o);

    public void notifyObservers();
}
