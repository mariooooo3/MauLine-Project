package PaymentStrategy;

import Entitati.Rider;
import Exceptions.CashException;
import Exceptions.CreditCardException;
import Exceptions.RevolutException;
import Exceptions.VoucherException;

public interface PaymentStrategy {
    public void pay(Rider r);

    public void init() throws CreditCardException, RevolutException,
            VoucherException, CashException;
}
