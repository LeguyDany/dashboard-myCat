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
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/api/weather")
public class Weather {

    @PostMapping("/post")
    public String getWeather(HttpServletRequest request, HttpServletResponse response, @RequestBody LinkedHashMap obj) throws IOException, ServletException, InterruptedException, URISyntaxException {

        System.out.println( obj.get("address"));

        String geoUrl = "https://dev.virtualearth.net/REST/v1/Locations?addressLine=" + obj.get("address") + "&key=Ar-52ZP0daURxbJY6zt-9pkdluk67GmaCl6C_l6vq0UH91dnHGr5y1l8YsI2r1cI";

        HttpRequest req = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create(geoUrl))
                .header("Content-Type", "application/json")
                .build();

        HttpClient httpClient = HttpClient.newBuilder().build();
        HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readValue(res.body(), JsonNode.class);

        System.out.println(jsonNode.get("resourceSets").get("resources").get(0).get("point").get("coordinate").toString());

        /*ArrayList<JsonNode> coordinate = new ArrayList<>();
        coordinate.add(jsonNode.get("resourceSets").get("resources").get(0).get("point").get("coordinate"));*/

        String weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=";

        // https://api.open-meteo.com/v1/forecast?latitude=49.0496&longitude=2.0416&hourly=temperature_2m,precipitation,cloudcover

        return "Bonjour";
    }
}