package server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.validators.HitChecker;
import server.database.domains.Point;
import server.database.services.PointService;
import server.dto.PointDTO;
import server.validators.Converter;
import server.validators.Validator;

import java.util.List;

@RestController
@CrossOrigin
@PropertySource("classpath:application.properties")
public class PointController {
    private final PointService pointService;
    @Autowired
    public PointController(PointService pointService) {
        this.pointService = pointService;
    }

    private Validator validator = new Validator();
    private Converter converter = new Converter();
    private HitChecker hitChecker = new HitChecker();

    @PostMapping("/point")
    public Point savePoint(@RequestBody PointDTO pointDTO){
        long start_time = System.currentTimeMillis();
        Point point = new Point();
        if(validator.isFloat(pointDTO.getX(), pointDTO.getY(), pointDTO.getR())){
            point.setX(converter.convertObjectToFloat(pointDTO.getX()));
            point.setY(converter.convertObjectToFloat(pointDTO.getY()));
            point.setR(converter.convertObjectToFloat(pointDTO.getR()));
        }
        else throw new NumberFormatException();
        point.setHit(hitChecker.isHit(point.getX(), point.getY(), point.getR()));
        point.setEmail(pointDTO.getEmail());
        pointService.save(point)    ;
        return point;
    }

    @PostMapping("/get")
    public List<Point> sendPoints(@RequestBody String email){
        List<Point> points = pointService.getPointsByEmail(email);
        return points;
    }

    @PostMapping("/delete")
    public void clearPoints(@RequestBody String email){
        pointService.deleteAllByEmail(email);
    }
}
