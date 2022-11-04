package mycat.back.controller;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/api/spotify/login")
public class Spotify {

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView redirectWithUsingRedirectPrefix(ModelMap model){
        model.addAttribute("response_type", "code");
        model.addAttribute("client_id","80db1bd3fc9845ad9a188627e68e774a");
        model.addAttribute("scope","user-read-private user-read-email");
        model.addAttribute("redirect_uri", "http://localhost:8080/sayhello");
        model.addAttribute("state", "azertyuiopqsdfgh");
        return new ModelAndView("redirect:https://accounts.spotify.com/authorize?", model);
    }
}
