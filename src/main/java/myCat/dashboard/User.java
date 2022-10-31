package myCat.dashboard;

public class User {
  private long id;
  private String email;
  private String password;

  public User(String email, String password) {
    this.email = email;
    this.password = password;
  }

  public long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }
}
