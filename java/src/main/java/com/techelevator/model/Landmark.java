package com.techelevator.model;

import javax.validation.constraints.NotNull;
import java.util.Date;

public class Landmark {
    private Long landmarkId;
    @NotNull
    private String image;
    @NotNull
    private String landmarkName;
    @NotNull
    private String address;
    @NotNull
    private String type;
    @NotNull
    private String description;
    private Date availability;

    public Landmark() {
    }


    public Landmark(Long landmarkId, String image, String landmarkName, String address, String type, String description, Date availability) {
        this.landmarkId = landmarkId;
        this.image = image;
        this.landmarkName = landmarkName;
        this.address = address;
        this.type = type;
        this.description = description;
        this.availability = availability;
    }

    public Long getLandmarkId() {
        return landmarkId;
    }

    public void setLandmarkId(Long landmarkId) {
        this.landmarkId = landmarkId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLandmarkName() {
        return landmarkName;
    }

    public void setLandmarkName(String landmarkName) {
        this.landmarkName = landmarkName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getAvailability() {
        return availability;
    }

    public void setAvailability(Date availability) {
        this.availability = availability;
    }

}
