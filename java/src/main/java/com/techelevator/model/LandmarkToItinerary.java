package com.techelevator.model;

public class LandmarkToItinerary {
    private long landmarkToItineraryId;
    private long itineraryId;
    private long landmarkId;

    public LandmarkToItinerary() {
    }

    public LandmarkToItinerary(long landmarkToItineraryId, long itineraryId, long landmarkId) {
        this.landmarkToItineraryId = landmarkToItineraryId;
        this.itineraryId = itineraryId;
        this.landmarkId = landmarkId;
    }

    public long getLandmarkToItineraryId() {
        return landmarkToItineraryId;
    }

    public void setLandmarkToItineraryId(long landmarkToItineraryId) {
        this.landmarkToItineraryId = landmarkToItineraryId;
    }

    public long getItineraryId() {
        return itineraryId;
    }

    public void setItineraryId(long itineraryId) {
        this.itineraryId = itineraryId;
    }

    public long getLandmarkId() {
        return landmarkId;
    }

    public void setLandmarkId(long landmarkId) {
        this.landmarkId = landmarkId;
    }
}
