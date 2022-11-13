package mycat.back.controller;

import mycat.back.model.WidgetModel;
import mycat.back.services.UserService;
import mycat.back.services.WidgetService;
import mycat.back.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/widget")
public class WidgetActiveController {

  @Autowired
  private WidgetService widgetService;

  @Autowired
  private UserService userService;

  @Autowired
  JwtUtils jwtUtils;

  @GetMapping("/widgets")
  private List<WidgetModel> getAllWidgets() {
    return widgetService.getAllWidgets();
  }

  @PostMapping("/create")
  private WidgetModel createWidget(@RequestBody WidgetModel widgetModel) {
    return widgetService.createWidget(widgetModel);
  }

  @PutMapping("/update/widget")
  private WidgetModel updateWidget(@RequestBody WidgetModel widgetModel) {
    return widgetService.updateWidget(widgetModel);
  }

  @DeleteMapping("delete/widgets/{id}")
  private void deleteWidget(@PathVariable String id) {
    widgetService.deleteWidget(id);
  }

  @PostMapping("/widgets/{name}/user")
  private WidgetModel addWidgetToUser(@PathVariable String name, HttpServletRequest request) {
    String authorizationHeader = request.getHeader("Authorization");
    String username = null;
    String jwtToken = null;

    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      jwtToken = authorizationHeader.substring(7);
      username = jwtUtils.extractUsername(jwtToken);
    }
    System.out.println("token: " + jwtToken);
    WidgetModel widgetModel = widgetService.getWidgetByName(name);
    return widgetService.addWidgetToUser(username, widgetModel);
  }


}