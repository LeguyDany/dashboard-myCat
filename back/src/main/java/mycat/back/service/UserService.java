package mycat.back.service;
import mycat.back.model.User;
import mycat.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class UserService implements IUserService {
  @Autowired
  private UserRepository userRepository;
  @Override
  public User createUser(User user) {
    return userRepository.save(user);
  }
  @Override
  public List<User> findByUsername(String username) {
    return userRepository.findByUsername(username);
  }
  @Override
  public List<User> findAll() {
    return userRepository.findAll();
  }
  @Override
  public void delete(String id) {
    userRepository.deleteById(id);
  }
  @Override
  public User update(User user) {
    return userRepository.save(user);
  }
}