package MauLine;

import Entitati.Driver;
import Entitati.Rider;
import Visitor.FinancialStatsVisitor;
import org.json.*;
import Rides.Rides;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;

public class MainJson {
    public static void main(String[] args) throws Exception {
        ArrayList<Rider> ridersArr = new ArrayList<Rider>();
        ArrayList<Driver> driversArr = new ArrayList<Driver>();
        FinancialStatsVisitor financial = new FinancialStatsVisitor();
        try {
            String content = Files.readString(Path.of("src/UberApp/Json.json"));
            JSONObject json = new JSONObject(content);
            JSONArray riders = json.getJSONArray("riders");
            JSONArray drivers = json.getJSONArray("drivers");

            for (int i = 0; i < riders.length(); i++) {
                JSONObject obj = riders.getJSONObject(i);
                String username = obj.getString("username");
                String password = obj.getString("password");
                String lastName = obj.getString("lastName");
                String firstName = obj.getString("firstName");
                int budget = obj.getInt("budget");

                JSONArray prefsJson = obj.getJSONArray("ridePreferences");
                String[] preferences = new String[prefsJson.length()];
                for (int j = 0; j < prefsJson.length(); j++) {
                    preferences[j] = prefsJson.getString(j);

                }
                Rider rider = new Rider(username, password, lastName,
                        firstName, preferences, budget);
                ridersArr.add(rider);
            }

            for (int j = 0; j < drivers.length(); j++) {
                JSONObject obj2 = drivers.getJSONObject(j);
                String username2 = obj2.getString("username");
                String password2 = obj2.getString("password");
                String lastName2 = obj2.getString("lastName");
                String firstName2 = obj2.getString("firstName");
                int expericence2 = obj2.getInt("experience");
                boolean isAvailable2 = obj2.getBoolean("isAvailable");
                String carModel2 = obj2.getString("carModel");

                JSONArray prefsJson2 = obj2.getJSONArray("qualities");
                String[] qualities = new String[prefsJson2.length()];
                for (int k = 0; k < prefsJson2.length(); k++) {
                    qualities[k] = prefsJson2.getString(k);
                }
                Driver driver = new Driver(username2, password2, lastName2,
                        firstName2, expericence2, qualities, isAvailable2, carModel2);
                driversArr.add(driver);
            }

            for (Rider rider : ridersArr) {
                for (Driver driver : driversArr) {
                    Rides.chooseRide(rider, driver);
                    rider.accept(financial);
                    driver.accept(financial);
                    System.out.println("\n");
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
