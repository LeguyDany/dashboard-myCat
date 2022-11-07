package mycat.back.service;


import mycat.back.model.User;
import mycat.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

  @Autowired
  UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User foundedUser = userRepository.findByUsername(username);
    if (foundedUser == null) return null;

    String name = foundedUser.getUsername();
    String pwd = foundedUser.getPassword();

    return new org.springframework.security.core.userdetails.User(name, pwd, new ArrayList<>());
  }

}