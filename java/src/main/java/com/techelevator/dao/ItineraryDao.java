package com.techelevator.dao;

import com.techelevator.model.Itinerary;
import com.techelevator.model.Landmark;
import com.techelevator.model.LandmarkToItinerary;

import java.util.Date;
import java.util.List;

public interface ItineraryDao {


    Itinerary getItineraryByUserId(long id);
    boolean createItinerary(long userId, Date date, long startingLandmarkId);
    void deleteItinerary(long id);
    void updateItinerary (Itinerary itinerary,long id);
    boolean addLandmarkToItinerary(long itineraryId, long landmarkId );
    void updateLandmarkToItinerary(LandmarkToItinerary landmarkToItinerary, long id);
    void removeLandmarkFromItinerary(long id);

}
