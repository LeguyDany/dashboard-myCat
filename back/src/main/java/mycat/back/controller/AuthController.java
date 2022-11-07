package mycat.back.controller;

import mycat.back.model.AuthenticationRequest;
import mycat.back.model.AuthenticationResponse;
import mycat.back.model.User;
import mycat.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  AuthenticationManager authenticationManager;

  @PostMapping("/register")
  private ResponseEntity<?> registerClient(@RequestBody AuthenticationRequest authenticationRequest) {
    String username = authenticationRequest.getUsername();
    String password = authenticationRequest.getPassword();
    User user = new User();
    user.setUsername(username);
    user.setPassword(password);
    try {
      userRepository.save(user);
    } catch (Exception e) {
      return ResponseEntity.ok(new AuthenticationResponse("An error has occurred please try again"));
    }

    return ResponseEntity.ok(new AuthenticationResponse(username + " Successfully registered"));
  }

  @PostMapping("/auth")
  private ResponseEntity<?> authenticateClient(@RequestBody AuthenticationRequest authenticationRequest) {

    String username = authenticationRequest.getUsername();
    String password = authenticationRequest.getPassword();

    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    } catch (Exception e) {
      return ResponseEntity.ok(new AuthenticationResponse("An error has occurred please try again"));
    }

    return ResponseEntity.ok(new AuthenticationResponse(username + " Successfully authenticated"));


  }
}
