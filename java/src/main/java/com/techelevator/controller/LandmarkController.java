package com.techelevator.controller;

import com.techelevator.dao.LandmarkDao;
import com.techelevator.model.Landmark;
import com.techelevator.model.LikedStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/landmarks")
@CrossOrigin
public class LandmarkController {

    @Autowired
    private LandmarkDao landmarkDao;


    public LandmarkController(LandmarkDao landmarkDao) {
        this.landmarkDao = landmarkDao;
    }

    @PostMapping
    public void createLandmark(@Valid @RequestBody Landmark landmark) {
        landmarkDao.createLandmark(landmark.getImage(), landmark.getLandmarkName(), landmark.getAddress(),
                landmark.getType(), landmark.getDescription(), landmark.getAvailability());
    }

    @GetMapping("/{id}")
    public Landmark retrieveLandmarkById(@PathVariable long id) {
        return landmarkDao.getLandmarkById(id);
    }

    @GetMapping("/itinerary/{id}")
    public List<Landmark> retrieveLandmarkByItineraryId(@PathVariable long id) {
        return landmarkDao.getLandmarksByItineraryId(id);
    }

    @GetMapping("/liked/{id}")
    public List<Landmark> retrieveLikedLandmarksById(@PathVariable long id) {
        return landmarkDao.getLandmarksWithLikedStatusTrue(id);


    } @GetMapping("/unliked/{id}")
    public List<Landmark> retrieveUnlikedLandmarksById(@PathVariable long id) {
        return landmarkDao.getLandmarksWithLikedStatusFalse(id);
    }

    @DeleteMapping("/{id}")
    public void removeLandmark(@PathVariable long id) {
        landmarkDao.removeLandmark(id);
    }

    @PutMapping(value = "/{id}")
    public void updateLandmark(@Valid @PathVariable long id, @RequestBody Landmark landmark) {
        landmarkDao.updateLandmark(landmark, id);
    }

    @PostMapping(value = "/likedStatus")
    public void createLikedStatus(@Valid @RequestBody LikedStatus likedStatus) {
        landmarkDao.createLikedStatus(likedStatus.getUserId(), likedStatus.getLandmarkId(), likedStatus.isLiked());
    }

    @PutMapping(value = "/likedStatus/{id}")
    public void updateLikedStatus(@PathVariable long id, @RequestBody LikedStatus likedStatus) {
        landmarkDao.updateLikedStatus(likedStatus, id);
    }

    @DeleteMapping("/likedStatus/{id}")
    public void removeLikedStatus(@PathVariable long id) {
        landmarkDao.removeLikedStatus(id);
    }

}
