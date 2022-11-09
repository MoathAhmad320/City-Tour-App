package com.techelevator.model;

import javax.validation.constraints.NotNull;
import java.util.Date;

public class Itinerary {
    private long itineraryId;
    @NotNull
    private long userId;
    @NotNull
    private Date date;
    @NotNull
    private long startingLandmarkId;

    public Itinerary() {
    }

    public Itinerary(long itineraryId, long userId, Date date, long startingLandmarkId) {
        this.itineraryId = itineraryId;
        this.userId = userId;
        this.date = date;
        this.startingLandmarkId = startingLandmarkId;
    }

    public long getItineraryId() {
        return itineraryId;
    }

    public void setItineraryId(long itineraryId) {
        this.itineraryId = itineraryId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getStartingLandmarkId() {
        return startingLandmarkId;
    }

    public void setStartingLandmarkId(long startingLandmarkId) {
        this.startingLandmarkId = startingLandmarkId;
    }
}
