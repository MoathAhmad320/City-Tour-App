package com.techelevator.dao;

import com.techelevator.model.Itinerary;
import com.techelevator.model.Landmark;
import com.techelevator.model.LandmarkToItinerary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class JdbcItineraryDao implements ItineraryDao{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public JdbcItineraryDao() {
    }

    public JdbcItineraryDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Itinerary getItineraryByUserId(long id) {
        String sql = "SELECT * FROM itineraries WHERE itinerary_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);
        if(results.next()) {
            return mapRowToItinerary(results);
        } else {
            throw new RuntimeException("ItineraryId "+id+" was not found.");
        }
    }


    @Override
    public boolean createItinerary(long userId, Date date, long startingLandmarkId) {
        String sql = "INSERT INTO itineraries (date, user_id, starting_landmark_id) VALUES ( ?, ?, ? ) RETURNING itinerary_id;";

            try {
                jdbcTemplate.queryForObject(sql, Long.class, date, userId, startingLandmarkId);
            } catch (DataAccessException e) {
                return false;
            }
            return true;
    }

    @Override
    public void deleteItinerary(long id) {
            String sql = "DELETE FROM itineraries WHERE itinerary_id = ?";
            try{
            jdbcTemplate.update(sql,id);
            } catch (DataAccessException e) {
                System.out.println("Error Attempting Deletion");
            }
    }

    @Override
    public void updateItinerary(Itinerary itinerary, long id) {
            String sql = "UPDATE itineraries SET itinerary_id = ?, date = ?, " +
                    "user_id = ?, starting_landmark_id = ? WHERE itinerary_id = ?;";
            int rowsupdated = jdbcTemplate.update(sql,itinerary.getItineraryId(), itinerary.getDate(),
                    itinerary.getUserId(), itinerary.getStartingLandmarkId(),id);
            if(rowsupdated != 1){
                System.out.println("error updating itinerary by id");
            }
    }

    @Override
    public boolean addLandmarkToItinerary(long itineraryId, long landmarkId) {
        String sql = "INSERT INTO landmarks_to_itineraries (itinerary_id, landmark_id) VALUES ( ? , ? ) RETURNING landmark_to_itinerary_id;";
        try {
            jdbcTemplate.queryForObject(sql, Long.class, itineraryId, landmarkId);
        } catch (DataAccessException e) {
            return false;
        }
        return true;
    }

    @Override
    public void updateLandmarkToItinerary(LandmarkToItinerary landmarkToItinerary, long id) {
        String sql = "UPDATE landmarks_to_itineraries SET landmark_to_itinerary_id = ?, itinerary_id = ?, " +
                "landmark_id = ? WHERE landmark_to_itinerary_id = ?;";
        int rowsupdated = jdbcTemplate.update(sql,id, landmarkToItinerary.getItineraryId(), landmarkToItinerary.getLandmarkId(),id);
        if(rowsupdated != 1){
            System.out.println("error updating landmark in itinerary by id");
        }
    }

    @Override
    public void removeLandmarkFromItinerary(long id) {
        String sql = "DELETE FROM landmarks_to_itineraries WHERE landmark_to_itinerary_id = ?";
        try {
            jdbcTemplate.update(sql, id);
        } catch (DataAccessException e) {
            System.out.println("Error Attempting Deletion");
        }
    }


    private Itinerary mapRowToItinerary(SqlRowSet rs) {
        Itinerary itinerary = new Itinerary ();
        itinerary.setItineraryId(rs.getLong("itinerary_id"));
        itinerary.setUserId(rs.getLong("user_id"));
        itinerary.setStartingLandmarkId(rs.getLong("starting_landmark_id"));
        itinerary.setDate(rs.getDate("date"));
        return itinerary;
    }
}
