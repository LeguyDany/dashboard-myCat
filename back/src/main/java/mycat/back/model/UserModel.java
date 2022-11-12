package mycat.back.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "user")
public class UserModel {

  @Id
  private String id;
  private String username;
  private String password;
  private String[] widgets;
  private String lastSearchSpotify;
  private String defaultSpotifyPlay;
  private Object[] favoriteListSpotify;
  private String weatherCity;

  public UserModel() {
  }

  public String getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String[] getWidgets() {
    return widgets;
  }

  public void setWidgets(String[] widgets) {
    this.widgets = widgets;
  }

  public String getLastSearchSpotify() {
    return lastSearchSpotify;
  }

  public void setLastSearchSpotify(String lastSearchSpotify) {
    this.lastSearchSpotify = lastSearchSpotify;
  }

  public String getDefaultSpotifyPlay() {
    return defaultSpotifyPlay;
  }

  public void setDefaultSpotifyPlay(String defaultSpotifyPlay) {
    this.defaultSpotifyPlay = defaultSpotifyPlay;
  }

  public Object[] getFavoriteListSpotify() {
    return favoriteListSpotify;
  }

  public void setFavoriteListSpotify(Object[] favoriteListSpotify) {
    this.favoriteListSpotify = favoriteListSpotify;
  }

  public String getWeatherCity() {
    return weatherCity;
  }

  public void setWeatherCity(String weatherCity) {
    this.weatherCity = weatherCity;
  }
}