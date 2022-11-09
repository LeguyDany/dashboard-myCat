package mycat.back.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twitter.clientlib.ApiException;
import com.twitter.clientlib.TwitterCredentialsBearer;
import com.twitter.clientlib.TwitterCredentialsOAuth2;
import com.twitter.clientlib.api.TwitterApi;
import com.twitter.clientlib.model.CreateTweetRequest;
import com.twitter.clientlib.model.CreateTweetRequestPoll;
import com.twitter.clientlib.model.SingleTweetLookupResponse;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

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
@RequestMapping("/api/weather")
public class Weather {

    @PostMapping("/post")
    public String getWeather(HttpServletRequest request, HttpServletResponse response, @RequestBody LinkedHashMap obj) throws IOException, ServletException, InterruptedException, URISyntaxException {
        System.out.println(obj);
        return "Bonjour";
    }



}