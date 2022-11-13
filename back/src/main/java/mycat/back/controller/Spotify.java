package mycat.back.controller;

import mycat.back.repository.UserRepository;
import mycat.back.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.net.http.HttpRequest;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.*;
import mycat.back.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/api/spotify")
@CrossOrigin
    public class Spotify {

    @Autowired
    private UserRepository userRepository;
    public String client_id = "80db1bd3fc9845ad9a188627e68e774a";
    public String client_secret = "98d21d1a4b804bd68ad89bf4b17a2574";
    public String userId;

    @Autowired
    JwtUtils jwtUtils;


    @PostMapping("/login")
    public String test (HttpServletRequest request, HttpServletResponse response, @RequestBody LinkedHashMap obj) throws IOException, ServletException, InterruptedException, URISyntaxException {
        String code = obj.get("code").toString();

        Map<Object, Object> form = new HashMap<>();

        String test = new StringBuffer(this.client_id+":"+client_secret).toString();
        String encodedString = Base64.encodeBase64URLSafeString(test.getBytes());

        form.put("code", code);
        form.put("redirect_uri", "http://localhost:3000/services");
        form.put("grant_type", "authorization_code");

        HttpRequest request2 = HttpRequest.newBuilder()
                .POST(buildFormDataFromMap(form))
                .header("Authorization", "Basic "+encodedString)
                .header("Content-type", "application/x-www-form-urlencoded")
                .uri(URI.create("https://accounts.spotify.com/api/token"))
                .build();

        HttpClient httpClient = HttpClient.newBuilder().build();
        HttpResponse<String> response2 = httpClient.send(request2, HttpResponse.BodyHandlers.ofString());

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readValue(response2.body(), JsonNode.class);

        return jsonNode.toString();
    }

    private static HttpRequest.BodyPublisher buildFormDataFromMap(Map<Object, Object> data){
        var builder = new StringBuilder();
        for (Map.Entry<Object, Object> entry : data.entrySet()){
            if(builder.length()>0){
                builder.append("&");
            }
            builder.append(URLEncoder.encode(entry.getKey().toString(), StandardCharsets.UTF_8));
            builder.append("=");
            builder.append(URLEncoder.encode(entry.getValue().toString(), StandardCharsets.UTF_8));
        }
        return HttpRequest.BodyPublishers.ofString(builder.toString());
    }

    @PostMapping ("/savesearch")
    public String saveSearch(@RequestBody LinkedHashMap lastResearch, HttpServletRequest request){
        String authorizationHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
            username = jwtUtils.extractUsername(jwtToken);
        }
        mycat.back.model.UserModel user = userRepository.findByUsername(username);
        user.setLastSearchSpotify(lastResearch.get("LastSearch").toString());
        userRepository.save(user);
        return "Research Saved";
    }

    @GetMapping("/getlastresearch")
    public String getLastSearch(HttpServletRequest request){
        String authorizationHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
            username = jwtUtils.extractUsername(jwtToken);
        }
        mycat.back.model.UserModel user = userRepository.findByUsername(username);
        return user.getLastSearchSpotify();
    }
    @GetMapping("/getautoplay")
    public String getAutoPlay(HttpServletRequest request){
        String authorizationHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
            username = jwtUtils.extractUsername(jwtToken);
        }
        mycat.back.model.UserModel user = userRepository.findByUsername(username);
        return user.getDefaultSpotifyPlay();
    }

    @PostMapping ("/setautoplay")
    public String setAutoPlay(@RequestBody LinkedHashMap track, HttpServletRequest request){
        String authorizationHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
            username = jwtUtils.extractUsername(jwtToken);
        }
        mycat.back.model.UserModel user = userRepository.findByUsername(username);
        user.setDefaultSpotifyPlay(track.get("track").toString());
        userRepository.save(user);
        return "autoPlay Saved";
    }



//    public static String getBearerTokenHeader() {
//        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getHeader("Authorization");
//    }

//    @GetMapping("/me")
//    public String getMe() throws IOException, InterruptedException {
//        String str = (this.acces_token.substring(1, this.acces_token.lastIndexOf("\"")));
//        this.correctAccesToken = str;
//
//        HttpRequest req = HttpRequest.newBuilder()
//                .GET()
//                .uri(URI.create("https://api.spotify.com/v1/me"))
//                .header("Content-Type", "application/json")
//                .header("Authorization","Bearer "+str)
//                .build();
//
//        HttpClient httpClient = HttpClient.newBuilder().build();
//        HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode jsonNode = objectMapper.readValue(res.body(), JsonNode.class);
//        this.userId = jsonNode.get("id").toString();
//        return jsonNode.toString();
//    }
//
//    @GetMapping("/myplaylist")
//    public String getMyPlaylist() throws IOException, InterruptedException {
//        HttpRequest req = HttpRequest.newBuilder()
//                .GET()
//                .uri(URI.create("https://api.spotify.com/v1/me/playlists"))
//                .header("Content-Type", "application/json")
//                .header("Authorization","Bearer "+this.correctAccesToken)
//                .build();
//
//        HttpClient httpClient = HttpClient.newBuilder().build();
//        HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode jsonNode = objectMapper.readValue(res.body(), JsonNode.class);
//        for(Object obj : jsonNode){
//            this.playlists.add(obj);
//        }
//        System.out.println(this.playlists);
//        return jsonNode.toString();
//    }
//
//    @GetMapping("/oneplaylist")
//    public String getPlaylist() throws IOException, InterruptedException {
//        HttpRequest req = HttpRequest.newBuilder()
//                .GET()
//                .header("Content-Type", "application/json")
//                .header("Authorization","Bearer "+this.correctAccesToken)
//                .uri(URI.create("https://api.spotify.com/v1/playlists/33iUDVWaLxGW0LiN9R4MTD"))
//                .build();
//        HttpClient httpClient = HttpClient.newBuilder().build();
//        HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode jsonNode = objectMapper.readValue(res.body(), JsonNode.class);
//
//        String str = jsonNode.get("tracks").get("items").get(0).get("track").get("id").toString();
//        this.id.add(str.substring(1, str.lastIndexOf("\"")));
//
//        System.out.println(this.id);
//
//        return jsonNode.toString();
//    }
//
//    @GetMapping("/getonesong")
//    public String getOneSong() throws IOException, InterruptedException {
//        System.out.println(id.get(0));
//        HttpRequest req = HttpRequest.newBuilder()
//                .GET()
//                .header("Content-Type", "application/json")
//                .header("Authorization","Bearer "+this.correctAccesToken)
//                .uri(URI.create("https://api.spotify.com/v1/tracks/"+id.get(0)))
//                .build();
//        HttpClient httpClient = HttpClient.newBuilder().build();
//        HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode jsonNode = objectMapper.readValue(res.body(), JsonNode.class);
//
//        System.out.println(this.id);
//
//        return jsonNode.toString();
//    }

//    @GetMapping ("/getnewtoken")
//    public String getNewToken() throws IOException, InterruptedException {
//        Map<Object, Object> form = new HashMap<>();
//
//        String test = new StringBuffer(this.client_id+":"+client_secret).toString();
//        String encodedString = Base64.encodeBase64URLSafeString(test.getBytes());
//
//        System.out.println(encodedString);
//
//        form.put("grant_type", "refresh_token" );
//        String str = this.refresh_token.substring(0, this.refresh_token.lastIndexOf("\""));
//        form.put("refresh_token", str);
//        form.put("client_id", this.client_id);
//
//        System.out.println(buildFormDataFromMap(form).toString());
//        HttpRequest reqNewToken = HttpRequest.newBuilder()
//                .POST(buildFormDataFromMap(form))
//                .header("Authorization", "Basic "+encodedString)
//                .header("Content-Type", "application/x-www-form-urlencoded")
//                .uri(URI.create("https://accounts.spotify.com/api/token"))
//                .build();
//
//
//        HttpClient httpClient = HttpClient.newBuilder().build();
//        HttpResponse<String> response2 = httpClient.send(reqNewToken, HttpResponse.BodyHandlers.ofString());
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode jsonNode = objectMapper.readValue(response2.body(), JsonNode.class);
//        return jsonNode.toString();
//    }

}


