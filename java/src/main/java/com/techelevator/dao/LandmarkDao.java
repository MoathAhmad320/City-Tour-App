package com.techelevator.dao;

import com.techelevator.model.Landmark;
import com.techelevator.model.LikedStatus;

import java.util.Date;
import java.util.List;

public interface LandmarkDao {


    int findIdByLandmarkName(String username);
    Landmark getLandmarkById(Long userId);
    List<Landmark> getLandmarksByItineraryId(long id);
    boolean createLandmark(String image, String landmarkName, String address, String type, String description, Date availability);
    void removeLandmark(long id);
    void updateLandmark (Landmark landmark,long id);
    List<Landmark> getLandmarksWithLikedStatusTrue(Long userId);
    List<Landmark> getLandmarksWithLikedStatusFalse(Long userId);
    boolean createLikedStatus(long userId, long landmarkId, boolean liked);
    void updateLikedStatus (LikedStatus likedStatus, long id);
    void removeLikedStatus(long id);


}
