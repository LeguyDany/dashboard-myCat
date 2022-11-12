package mycat.back.controller;

import com.twitter.clientlib.*;
import org.apache.tomcat.util.codec.binary.Base64;
import org.json.JSONObject;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.json.JSONArray;

// Import classes:
import com.twitter.clientlib.auth.*;
import com.twitter.clientlib.model.*;
import com.twitter.clientlib.api.TwitterApi;


import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@RestController
@CrossOrigin
@RequestMapping("/api/twitter/")
public class Twitter {

    // Instantiate library client
    TwitterApi apiInstance = new TwitterApi();

    private static String client_id = "T3ZMY1lIQkw2b2FmWmlIdmdfN1M6MTpjaQ";
    private static String client_secret = "US3Pzl0Bgni8dMXoqU-ub1yHq5sEv8zoFc9VT_W0Fzudf7vzrK";
    private static String bearer_token = "AAAAAAAAAAAAAAAAAAAAAEEfiwEAAAAA2xa2Jpd0sP04JWHUriUVClevIAM%3DwNoYySWDD1XEgRlRl6i3Dbm0I5qmvkwSdILBOXkSOdfKQNEu4s";

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

    @PostMapping("/generateToken")
    public String generateToken (HttpServletRequest request, HttpServletResponse response, @RequestBody LinkedHashMap obj) throws IOException, ServletException, InterruptedException, URISyntaxException {

        String code = obj.get("code").toString();

        Map<Object, Object> form = new HashMap<>();

        form.put("code", code);
        form.put("redirect_uri", "http://localhost:3000/twitterLogin");
        form.put("grant_type", "authorization_code");
        form.put("code_verifier", "challenge");
        form.put("client_id", this.client_id);

        HttpRequest req = HttpRequest.newBuilder()
                .POST(buildFormDataFromMap(form))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .uri(URI.create("https://api.twitter.com/2/oauth2/token"))
                .build();

        HttpClient httpClient = HttpClient.newBuilder().build();
        HttpResponse<String> res = httpClient.send(req, HttpResponse.BodyHandlers.ofString());

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readValue(res.body(), JsonNode.class);

        return jsonNode.toString();
    }

    @GetMapping("/getTweet")
    public String getTweet() {


        // Instantiate auth credentials (App-only example)
        TwitterCredentialsBearer credentials = new TwitterCredentialsBearer("AAAAAAAAAAAAAAAAAAAAAEEfiwEAAAAA2xa2Jpd0sP04JWHUriUVClevIAM%3DwNoYySWDD1XEgRlRl6i3Dbm0I5qmvkwSdILBOXkSOdfKQNEu4s");

        // Pass credentials to library client
        apiInstance.setTwitterCredentials(credentials);

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
                .uri(new URI("https://api.twitter.com/1.1/search/tweets.json?q=birds&result_type=recent"))
                .GET()
                .build();

        HttpClient httpClient = HttpClient.newBuilder().build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readValue(response.body(), JsonNode.class);

        return jsonNode.toString();
    }

    @PostMapping("/postTweet")
    public String postTweet(HttpServletRequest request, HttpServletResponse response, @RequestBody LinkedHashMap obj) throws URISyntaxException, IOException, InterruptedException{

        String client_id = this.client_id;
        String secret_client = this.client_secret;
        String refresh_token = obj.get("refresh_token_twitter").toString();
        String access_token = obj.get("access_token_twitter").toString();

        // Instantiate auth credentials (App-only example)
        TwitterCredentialsOAuth2 credentials = new TwitterCredentialsOAuth2(client_id, secret_client, access_token, refresh_token);

        credentials.setTwitterOauth2AccessToken(access_token);
        credentials.setTwitterOauth2RefreshToken(refresh_token);

        // Instantiate library client
        TwitterApi apiInstance = new TwitterApi();

        // Pass credentials to library client
        apiInstance.setTwitterCredentials(credentials);






        return "bonjour";


//        // Set the params values
//        CreateTweetRequest createTweetRequest = new CreateTweetRequest();
//        CreateTweetRequestPoll createTweetRequestPoll = new CreateTweetRequestPoll();
//
//        // The text of the Tweet
//        createTweetRequest.text("Are you excited for the weekend?");
//
//        // Options for a Tweet with a poll
//        List<String> pollOptions = Arrays.asList("Yes", "Maybe", "No");
//        createTweetRequestPoll.options(pollOptions);
//
//        // Duration of the poll in minutes
//        createTweetRequestPoll.durationMinutes(120);
//
//        createTweetRequest.poll(createTweetRequestPoll);
//
//        try {
//            TweetCreateResponse result = apiInstance.tweets().createTweet(createTweetRequest);
//            System.out.println(result);
//            return result.toString();
//        } catch (ApiException e) {
//            System.err.println("Exception when calling TweetsApi#createTweet");
//            System.err.println("Status code: " + e.getCode());
//            System.err.println("Reason: " + e.getResponseBody());
//            System.err.println("Response headers: " + e.getResponseHeaders());
//            e.printStackTrace();
//            return "error";
//        }

    }

    @PostMapping("/getProfile")
    public String getProfile(HttpServletRequest request, HttpServletResponse response, @RequestBody LinkedHashMap obj) throws URISyntaxException, IOException, InterruptedException{

        String refresh_token = obj.get("refresh_token_twitter").toString();
        String access_token = obj.get("access_token_twitter").toString();

        // Instantiate auth credentials (App-only example)
        TwitterCredentialsOAuth2 credentials = new TwitterCredentialsOAuth2(this.client_id, this.client_secret, access_token, refresh_token);
        credentials.setTwitterOauth2AccessToken(access_token);
        credentials.setTwitterOauth2RefreshToken(refresh_token);

        // Instantiate library client
        TwitterApi apiInstance = new TwitterApi();

        // Pass credentials to library client
        apiInstance.setTwitterCredentials(credentials);

        // Set<String> | A comma separated list of User fields to display.
        Set<String> userFields = new HashSet<>(Arrays.asList("profile_image_url"));

        try {
            SingleUserLookupResponse result = apiInstance.users().findMyUser(null, null, userFields);
            return result.getData().toJson();
        } catch (ApiException e) {
            System.err.println("Exception when calling UsersApi#findMyUser");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
            return "error:" + e;
        }

    }

}