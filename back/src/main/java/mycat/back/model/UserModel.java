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
}