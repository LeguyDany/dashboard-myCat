package mycat.back.controller;

import com.fasterxml.jackson.databind.ser.Serializers;
import org.apache.tomcat.jni.Buffer;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedWriter;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;

import java.net.http.HttpRequest;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/spotify")
public class Spotify {
    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .build();
    public String client_id = "80db1bd3fc9845ad9a188627e68e774a";
    public String client_secret = "98d21d1a4b804bd68ad89bf4b17a2574";


    @RequestMapping("/login")
    public ModelAndView redirectWithUsingRedirectPrefix(ModelMap model){
        model.addAttribute("response_type", "code");
        model.addAttribute("client_id","80db1bd3fc9845ad9a188627e68e774a");
        model.addAttribute("scope","user-read-private user-read-email");
        model.addAttribute("redirect_uri", "http://localhost:8080/api/spotify/test");
        model.addAttribute("state", "azertyuiopqsdfgh");
        return new ModelAndView("redirect:https://accounts.spotify.com/authorize?", model);
    }

    @GetMapping("/test")
    public String test (HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException, InterruptedException, URISyntaxException {

        String code = request.getParameter("code");

        Map<Object, Object> form = new HashMap<>();

        String test = new StringBuffer(this.client_id+":"+client_secret).toString();
        //byte[] bytesEncoded = Base64.encodeBase64(test.getBytes());
        String encodedString = Base64.encodeBase64URLSafeString(test.getBytes());

        form.put("code", code);
        form.put("redirect_uri", "http://localhost:8080/api/spotify/test");
        form.put("grant_type", "authorization_code");
        //form.put("client_id", "80db1bd3fc9845ad9a188627e68e774a");
        //form.put("client_secret", "98d21d1a4b804bd68ad89bf4b17a2574");

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
        System.out.println(response2.statusCode());
        System.out.println(jsonNode.toString());
        return "test";
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
        System.out.println(builder.toString());
        return HttpRequest.BodyPublishers.ofString(builder.toString());
    }

    @RequestMapping("/getmyplaylist")
    public void getMyPlaylist(){
        String uri = "https://api.spotify.com/v1/artist/";
    }

}


