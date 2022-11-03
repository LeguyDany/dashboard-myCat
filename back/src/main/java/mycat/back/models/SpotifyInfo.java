package mycat.back.models;

import mycat.back.controller.Spotify;

import java.nio.charset.StandardCharsets;

public class SpotifyInfo {
    public static String client_id = "80db1bd3fc9845ad9a188627e68e774a";
    public static String redirect_uri = "http://localhost:8080/sayhello";
    public static String scope = "user-read-private user-read-email";
    public byte[] array = new byte[16];
    public String generatedString = new String(array, StandardCharsets.UTF_8);

    public String getClient_id(){
        return this.client_id;
    }
    public String getRedirect_uri(){
        return this.redirect_uri;
    }
    public String getScope(){
        return this.scope;
    }
    public 

}
