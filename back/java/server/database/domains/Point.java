package server.database.domains;

import javax.persistence.*;

@Entity
@Table(name = "Points")
public class Point {
    private float x;
    private float y;
    private float r;
    private boolean hit;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long point_id;

    private String email;

    public Point() {
    }

    public Point(float x, float y, float r, boolean result, String email) {
        setX(x);
        setY(y);
        setR(r);
        setHit(result);
        setEmail(email);
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setR(float r) {
        this.r = r;
    }
    public void setY(float y) {
        this.y = y;
    }
    public void setX(float x) {
        this.x = x;
    }
    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public float getR() {
        return r;
    }
    public float getX() {
        return x;
    }
    public float getY() {
        return y;
    }
    public boolean isHit(){return hit;}
    public String getEmail() {
        return email;
    }
}
