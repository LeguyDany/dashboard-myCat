package mycat.back.configuration;

import mycat.back.services.JwtFilterRequest;
import mycat.back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;

public class SecurityConfiguration {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtFilterRequest jwtFilterRequest;

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userService);
  }
}