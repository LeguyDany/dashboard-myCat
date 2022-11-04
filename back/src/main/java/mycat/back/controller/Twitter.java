package mycat.back.controller;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

// Import classes:
import com.twitter.clientlib.ApiClient;
import com.twitter.clientlib.ApiException;
import com.twitter.clientlib.Configuration;
import com.twitter.clientlib.auth.*;
import com.twitter.clientlib.model.*;
import com.twitter.clientlib.TwitterCredentialsBearer;
import com.twitter.clientlib.api.TwitterApi;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@RestController
@RequestMapping("/api/twitter/")
public class Twitter {

    // Instantiate library client
    TwitterApi apiInstance = new TwitterApi();
    // Instantiate auth credentials (App-only example)
    TwitterCredentialsBearer credentials = new TwitterCredentialsBearer("AAAAAAAAAAAAAAAAAAAAAEEfiwEAAAAA2xa2Jpd0sP04JWHUriUVClevIAM%3DwNoYySWDD1XEgRlRl6i3Dbm0I5qmvkwSdILBOXkSOdfKQNEu4s");

    public Twitter(){
        // Pass credentials to library client
        apiInstance.setTwitterCredentials(credentials);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView redirectWithUsingRedirectPrefix(ModelMap model) {
        model.addAttribute("response_type", "code");
        model.addAttribute("client_id", "T3ZMY1lIQkw2b2FmWmlIdmdfN1M6MTpjaQ");
        model.addAttribute("redirect_uri", "http://127.0.0.1:8080/sayhello");
        model.addAttribute("scope", "tweet.read tweet.write users.read offline.access");
        model.addAttribute("state", "state");
        model.addAttribute("code_challenge", "challenge");
        model.addAttribute("code_challenge_method", "plain");
        return new ModelAndView("redirect:https://twitter.com/i/oauth2/authorize?", model);
    }

    @GetMapping("/getTweet")
    public String getTweet() {
        String id = "1511757922354663425"; // String | A single Tweet ID.
        Set<String> expansions = new HashSet<>(Arrays.asList("author_id")); // Set<String> | A comma separated list of fields to expand.
        Set<String> tweetFields = new HashSet<>(Arrays.asList("created_at", "lang", "context_annotations")); // Set<String> | A comma separated list of Tweet fields to display.
        Set<String> userFields = new HashSet<>(Arrays.asList("created_at", "description", "name")); // Set<String> | A comma separated list of User fields to display.

        try {
            SingleTweetLookupResponse result = apiInstance.tweets().findTweetById(id, expansions, tweetFields, userFields, null, null, null);
            return "bonjour";
        } catch (ApiException e) {
            System.err.println("Exception when calling TweetsApi#findTweetById");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
            return "bonjour";
        }
    }

    @GetMapping("/getByHashtag")
    public String getByHashtag() throws URISyntaxException, IOException, InterruptedException{
        HttpRequest request = HttpRequest
                .newBuilder()
                .header("Authorization", "Bearer "+"AAAAAAAAAAAAAAAAAAAAAEEfiwEAAAAA2xa2Jpd0sP04JWHUriUVClevIAM%3DwNoYySWDD1XEgRlRl6i3Dbm0I5qmvkwSdILBOXkSOdfKQNEu4s")
                .uri(new URI("https://api.twitter.com/1.1/search/tweets.json?q=nasa&result_type=popular"))
                .GET()
                .build();

        HttpClient httpClient = HttpClient.newBuilder().build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readValue(response.body(), JsonNode.class);

        System.out.println(response.statusCode());
        System.out.println(jsonNode.toString());

        return "bonjour";
    }

    @GetMapping("/getByTrends")
    public String getByTrends() throws URISyntaxException, IOException, InterruptedException{
        HttpRequest request = HttpRequest
                .newBuilder()
                .header("Authorization", "Bearer "+"AAAAAAAAAAAAAAAAAAAAAEEfiwEAAAAA2xa2Jpd0sP04JWHUriUVClevIAM%3DwNoYySWDD1XEgRlRl6i3Dbm0I5qmvkwSdILBOXkSOdfKQNEu4s")
                .uri(new URI("https://api.twitter.com/1.1/search/tweets.json?q=nasa&result_type=popular"))
                .GET()
                .build();

        HttpClient httpClient = HttpClient.newBuilder().build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readValue(response.body(), JsonNode.class);

        System.out.println(response.statusCode());
        System.out.println(jsonNode.toString());

        return "bonjour";
    }
}