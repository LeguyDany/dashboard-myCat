/*
package mycat.back.controller;

import mycat.back.model.User;
import mycat.back.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private IUserService userService;

  @GetMapping("/")
  public List<User> getAllUsers() {
    return userService.findAll();
  }

  @PostMapping("/create")
  public User createUser(@RequestBody User user) {
    user.setId(UUID.randomUUID().toString());
    return userService.createUser(user);
  }

  @PostMapping("/update")
  public User update(@RequestBody User user) {
    return userService.update(user);
  }

  @DeleteMapping("/delete/{id}")
  @ResponseStatus(HttpStatus.OK)
  public void delete(@PathVariable String id) {
    userService.delete(id);
  }




}
*/
