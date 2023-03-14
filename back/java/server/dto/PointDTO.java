package server.dto;

public class PointDTO {
    private Object x;
    private Object y;
    private Object r;
    private String email;

    PointDTO (Object x, Object y, Object r, String email){
        setEmail(email);
        setR(r);
        setX(x);
        setY(y);
    }

    public void setX(Object x) {
        this.x = x;
    }
    public Object getX() {
        return x;
    }

    public void setY(Object y) {
        this.y = y;
    }
    public Object getY() {
        return y;
    }

    public Object getR() {
        return r;
    }
    public void setR(Object r) {
        this.r = r;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}
