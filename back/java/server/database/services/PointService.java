package server.database.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.database.domains.Point;
import server.database.repositories.PointRepository;

import java.util.List;

@Service
public class PointService {
    private PointRepository pointRepository;
    @Autowired
    public PointService(PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }

    public List<Point> getPointsByEmail(String email){
        return pointRepository.getPointsByEmail(email);
    }

    public void deleteAllByEmail(String email){
        pointRepository.deleteAllByEmail(email);
    }

    public void save(Point point){
        pointRepository.save(point);
    }
}