package com.techelevator.controller;

import com.techelevator.dao.ItineraryDao;
import com.techelevator.dao.LandmarkDao;
import com.techelevator.model.Itinerary;
import com.techelevator.model.Landmark;
import com.techelevator.model.LandmarkToItinerary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/itineraries")
@CrossOrigin
public class ItineraryController {

    @Autowired
    private ItineraryDao itineraryDao;

    public ItineraryController(ItineraryDao itineraryDao) {
        this.itineraryDao = itineraryDao;
    }

    @GetMapping("/{id}")
    public Itinerary retrieveItineraryById(@PathVariable long id) {
        return itineraryDao.getItineraryByUserId(id);
    }

    @PostMapping
    public void createItinerary(@Valid @RequestBody Itinerary itinerary) {
        itineraryDao.createItinerary(itinerary.getUserId(), itinerary.getDate(), itinerary.getStartingLandmarkId());
    }

    @DeleteMapping("/{id}")
    public void removeItinerary(@PathVariable long id) {
        itineraryDao.deleteItinerary(id);
    }

    @PutMapping(value = "/{id}")
    public void updateItinerary(@Valid @PathVariable long id, @RequestBody Itinerary itinerary) {
        itineraryDao.updateItinerary(itinerary, id);
    }
    @PostMapping(value="/addLandmark")
    public void addLandmarkToItinerary(@Valid @RequestBody LandmarkToItinerary landmarkToItinerary) {
        itineraryDao.addLandmarkToItinerary(landmarkToItinerary.getItineraryId(), landmarkToItinerary.getLandmarkId());
    }

    @PutMapping(value = "updateLandmark/{id}")
    public void updateLandmarkToItinerary(@Valid @PathVariable long id, @RequestBody LandmarkToItinerary landmarkToItinerary) {
            itineraryDao.updateLandmarkToItinerary(landmarkToItinerary, id);
    }

    @DeleteMapping("/deleteLandmark/{id}")
    public void removeLandmarkFromItinerary(@PathVariable long id) {
        itineraryDao.removeLandmarkFromItinerary(id);
    }

}