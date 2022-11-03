package mycat.back.controller;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import mycat.back.models.SpotifyInfo;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/api/spotify/")
public class Spotify {
    Spotify data = new Spotify();
    String test = data.

    @GetMapping("login")
    public ModelAndView redirectWithUsingRedirectPrefix(ModelMap model){
        model.addAttribute("attribute", "redirectWithRedirectPrefix");
        return new ModelAndView("redirect:/https://accounts.spotify.com/authorize?", model);
    }

}
