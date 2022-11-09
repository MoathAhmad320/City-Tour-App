package com.techelevator.dao;

import com.techelevator.model.Landmark;
import com.techelevator.model.LikedStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class JdbcLandmarkDao implements LandmarkDao{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public JdbcLandmarkDao() {
    }

    public JdbcLandmarkDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int findIdByLandmarkName(String landmarkName) {
        return jdbcTemplate.queryForObject("select landmark_id from landmarks where name = ?", int.class, landmarkName);
    }

    @Override
    public Landmark getLandmarkById(Long landmarkId) {
        String sql = "SELECT * FROM landmarks WHERE landmark_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, landmarkId);
        if(results.next()) {
            return mapRowToLandmark(results);
        } else {
            throw new RuntimeException("landmarkId "+landmarkId+" was not found.");
        }
    }

    @Override
    public List<Landmark> getLandmarksByItineraryId(long id) {
        List<Landmark> landmarkList = new ArrayList<>();
        Landmark landmark = null;
        String sql = "SELECT * FROM landmarks JOIN landmarks_to_itineraries on landmarks.landmark_id = landmarks_to_itineraries.landmark_id " +
                "WHERE landmarks_to_itineraries.itinerary_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);
        while (results.next()){
            landmark = mapRowToLandmark(results);
            landmarkList.add(landmark);
        }
        return landmarkList;
    }


    @Override
    public List<Landmark> getLandmarksWithLikedStatusTrue(Long userId) {
        List<Landmark> landmarkList = new ArrayList<>();
        Landmark landmark = null;
        String sql = "SELECT * FROM landmarks JOIN liked_status ON landmarks.landmark_id = liked_status.landmark_id Where\n" +
                "liked_status.user_id = ? AND liked = true";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
        while (results.next()){
            landmark = mapRowToLandmark(results);
            landmarkList.add(landmark);
        }
        return landmarkList;
    }

    @Override
    public List<Landmark> getLandmarksWithLikedStatusFalse(Long userId) {
        List<Landmark> landmarkList = new ArrayList<>();
        Landmark landmark = null;
        String sql = "SELECT * FROM landmarks JOIN liked_status ON landmarks.landmark_id = liked_status.landmark_id Where\n" +
                "liked_status.user_id = ? AND liked = false";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
        while (results.next()){
            landmark = mapRowToLandmark(results);
            landmarkList.add(landmark);
        }
        return landmarkList;
    }


     @Override
    public boolean createLandmark(String image, String landmarkName, String address, String type, String description, Date availability) {

        String sql = "INSERT INTO landmarks (name, image_url, address, type, description, availability) VALUES (?, ?, ? ,? ,? ,? ) RETURNING landmark_id;";

        try {
            jdbcTemplate.queryForObject(sql, Long.class, landmarkName, image, address, type, description, availability);
        } catch (DataAccessException e) {
            return false;
        }
        return true;
    }
@Override
 public void updateLandmark (Landmark landmark,long id) {
        String sql = "UPDATE landmarks SET landmark_id = ?, name = ?, image_url = ?, address = ?, " +
                "type = ?, description = ?, availability = ? WHERE landmark_id = ?;";
        int rowsupdated = jdbcTemplate.update(sql,landmark.getLandmarkId(), landmark.getLandmarkName(),
                landmark.getImage(), landmark.getAddress(), landmark.getType(), landmark.getDescription(), landmark.getAvailability(),id);
        if(rowsupdated != 1){
            System.out.println("error updating landmark by id");
        }
    }

    @Override
    public void removeLandmark(long id) {
        String sql = "DELETE FROM landmarks WHERE landmark_id = ?";
        try{
        jdbcTemplate.update(sql,id);
        } catch (DataAccessException e) {
            System.out.println("Error Attempting Deletion");
        }
    }

    @Override
    public boolean createLikedStatus(long userId, long landmarkId, boolean liked) {
        String sql = "INSERT INTO liked_status (user_id, landmark_id, liked) VALUES (?, ?, ? ) RETURNING liked_status_id;";

        try {
            jdbcTemplate.queryForObject(sql, Long.class, userId, landmarkId, liked);
        } catch (DataAccessException e) {
            return false;
        }
        return true;
    }

    @Override
    public void updateLikedStatus (LikedStatus likedStatus, long id) {
        String sql = "UPDATE liked_status SET liked_status_id = ?, user_id = ?, landmark_id = ?, liked = ?" +
                " WHERE liked_status_id = ?;";
        int rowsupdated = jdbcTemplate.update(sql,id, likedStatus.getUserId(),
                likedStatus.getLandmarkId(), likedStatus.isLiked(),id);
        if(rowsupdated != 1){
            System.out.println("error updating liked status by id");
        }
    }

    @Override
    public void removeLikedStatus(long id) {
        String sql = "DELETE FROM liked_status WHERE liked_status_id = ?";
        try{
        jdbcTemplate.update(sql,id);
        } catch (DataAccessException e) {
            System.out.println("Error Attempting Deletion");
        }
    }




    private Landmark mapRowToLandmark(SqlRowSet rs) {
        Landmark landmark = new Landmark ();
        landmark.setLandmarkId(rs.getLong("landmark_id"));
        landmark.setLandmarkName(rs.getString("name"));
        landmark.setImage(rs.getString("image_url"));
        landmark.setAddress(rs.getString("address"));
        landmark.setType(rs.getString("type"));
        landmark.setDescription(rs.getString("description"));
        landmark.setAvailability(rs.getDate("availability"));
        return landmark;

    }
}
