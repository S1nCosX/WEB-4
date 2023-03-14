package server.validators;

public class Validator {
    public boolean isFloat(Object x, Object y, Object r){
        try {
            float xf = Float.parseFloat(x.toString());
            float yf = Float.parseFloat(x.toString());
            float rf = Float.parseFloat(x.toString());
            return true;
        }
        catch (Exception e){
            return false;
        }
    }
}
