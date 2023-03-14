package server.validators;

public class HitChecker {
    public boolean isHit(float x, float y, float r) {
        if (x > 0) {
            if (y > 0)
                return y <= r / 2 - x;
            if (y < 0)
                return x*x+y*y <= r*r;

            return x <= r;
        }
        if (x < 0){
            if (y < 0)
                return x > -r && y > -r/2;
            if (y == 0)
                return x > -r;

            return false;
        }

        if (x == 0)
            return y <= r/2 && y >=-r;
        return false;
    }
}
