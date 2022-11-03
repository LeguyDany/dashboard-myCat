package mycat.back.controller;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
// response_type=code&client_id=CLIENT_ID&scope=user-read-private%20user-read-email&redirect_uri=http%3A%2F%2Flocalhost%3A8888%2Fcallback&state=futlmxmpohocbxib
@RestController
@RequestMapping("/api/spotify/")
public class Spotify {

    @GetMapping("login")
    public ModelAndView redirectWithUsingRedirectPrefix(ModelMap model){
        model.addAttribute("response_type", "code");
        model.addAttribute("client_id","80db1bd3fc9845ad9a188627e68e774a");
        model.addAttribute("scope","user-read-private user-read-email");
        model.addAttribute("redirect_uri", "http://localhost:8080/sayhello");
        model.addAttribute("state", "azertyuiopqsdfgh");
        return new ModelAndView("redirect:/https://accounts.spotify.com/authorize?", model);
    }

}
