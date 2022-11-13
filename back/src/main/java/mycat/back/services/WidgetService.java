package mycat.back.services;

import mycat.back.model.UserModel;
import mycat.back.model.WidgetModel;
import mycat.back.repository.UserRepository;
import mycat.back.repository.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WidgetService {

  @Autowired
  private WidgetRepository widgetRepository;
  
  @Autowired
  private UserRepository userRepository;

  public List<WidgetModel> getAllWidgets() {
    return widgetRepository.findAll();
  }
  
  public WidgetModel getWidgetByName(String name) {
    return widgetRepository.findByName(name);
  }

  public WidgetModel createWidget(WidgetModel widgetModel) {
    return widgetRepository.save(widgetModel);
  }

  public WidgetModel updateWidget(WidgetModel widgetModel) {
    WidgetModel existingWidget = widgetRepository.findByName(widgetModel.getName());
    existingWidget.setName(widgetModel.getName());
    existingWidget.setDescription(widgetModel.getDescription());
    return widgetRepository.save(existingWidget);
  }

  public void deleteWidget(String id) {
    widgetRepository.deleteById(id);
  }

  public WidgetModel addWidgetToUser(String username, WidgetModel widgetModel) {
    UserModel userModel = userRepository.findByUsername(username);
    if (userModel != null) {
      userModel.getWidgets().add(widgetModel);
      userRepository.save(userModel);
      return widgetModel;
    }
    return null;
  }
}