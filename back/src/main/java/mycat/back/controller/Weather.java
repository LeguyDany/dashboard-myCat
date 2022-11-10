package mycat.back.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/api/weather")
public class Weather {

    @PostMapping("/post")
    public Map getWeather(HttpServletRequest request, HttpServletResponse response, @RequestBody LinkedHashMap obj) throws IOException, ServletException, InterruptedException, URISyntaxException {

        String address = URLEncoder.encode(obj.get("address").toString(), "UTF-8");

        URL geoUrl = new URL("https://dev.virtualearth.net/REST/v1/Locations?addressLine=" + address + "&key=Ar-52ZP0daURxbJY6zt-9pkdluk67GmaCl6C_l6vq0UH91dnHGr5y1l8YsI2r1cI");

        HttpRequest req = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create(geoUrl.toString()))
                .header("Content-Type", "application/json")
                .build();

        HttpClient httpClient = HttpClient.newBuilder().build();
        HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readValue(res.body(), JsonNode.class);

        JsonNode coordinates = jsonNode.get("resourceSets").get(0).get("resources").get(0).get("point").get("coordinates");

        URL weatherUrl = new URL("https://api.open-meteo.com/v1/forecast?latitude=" + coordinates.get(0) + "&longitude=" + coordinates.get(1) + "&hourly=temperature_2m,precipitation,cloudcover");

        HttpRequest req2 = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create(weatherUrl.toString()))
                .header("Content-Type", "application/json")
                .build();

        HttpResponse<String> res2 = httpClient.send(req2, HttpResponse.BodyHandlers.ofString());
        JsonNode jsonNode2 = objectMapper.readValue(res2.body(), JsonNode.class);

        Map<String, JsonNode> weather = new HashMap<>();
        weather.put("hour",jsonNode2.get("hourly").get("time"));
        weather.put("temp",jsonNode2.get("hourly").get("temperature_2m"));
        weather.put("rain",jsonNode2.get("hourly").get("precipitation"));
        weather.put("cloud",jsonNode2.get("hourly").get("cloudcover"));
        weather.put("address", jsonNode.get("resourceSets").get(0).get("resources").get(0).get("name"));

        return weather;
    }
}