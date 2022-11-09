package com.techelevator.model;

public class LikedStatus {
    private long likedStatusId;
    private long userId;
    private long landmarkId;
    private boolean liked;

    public LikedStatus(long likedStatusId, long userId, long landmarkId, boolean liked) {
        this.likedStatusId = likedStatusId;
        this.userId = userId;
        this.landmarkId = landmarkId;
        this.liked = liked;
    }

    public LikedStatus() {
    }

    public long getLikedStatusId() {
        return likedStatusId;
    }

    public void setLikedStatusId(long likedStatusId) {
        this.likedStatusId = likedStatusId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getLandmarkId() {
        return landmarkId;
    }

    public void setLandmarkId(long landmarkId) {
        this.landmarkId = landmarkId;
    }

    public boolean isLiked() {
        return liked;
    }

    public void setLiked(boolean liked) {
        this.liked = liked;
    }
}