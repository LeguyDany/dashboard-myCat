package mycat.back.controller;

import mycat.back.model.AuthenticationRequest;
import mycat.back.model.AuthenticationResponse;
import mycat.back.model.UserModel;
import mycat.back.repository.UserRepository;
import mycat.back.services.UserService;
import mycat.back.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  UserService userService;

  @Autowired
  JwtUtils jwtUtils;

  @GetMapping("/dashboard")
  private String testingToken() {
    return "Welcome to the dashboard " + SecurityContextHolder.getContext().getAuthentication().getName();
  }

  @PostMapping("/register")
  private ResponseEntity<?> registerClient(@RequestBody AuthenticationRequest authenticationRequest) {
    String username = authenticationRequest.getUsername();
    String password = authenticationRequest.getPassword();
    UserModel userModel = new UserModel();
    userModel.setUsername(username);
    userModel.setPassword(password);
    try {
      userRepository.save(userModel);
    } catch (Exception e) {
    return ResponseEntity.badRequest().body("An error occurred while registering the user");
    }

    return ResponseEntity.ok(new AuthenticationResponse(username + " Successfully registered"));
  }

  @PostMapping("/login")
  private ResponseEntity<?> authenticateClient(@RequestBody AuthenticationRequest authenticationRequest) {

    String username = authenticationRequest.getUsername();
    String password = authenticationRequest.getPassword();

    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("An error occurred while authenticating the user");
    }

    UserDetails loadedUser = userService.loadUserByUsername(username);
    String generatedToken = jwtUtils.generateToken(loadedUser);
    return ResponseEntity.ok(new AuthenticationResponse(generatedToken));
  }
}
