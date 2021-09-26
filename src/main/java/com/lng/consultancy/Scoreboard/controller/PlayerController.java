package com.lng.consultancy.Scoreboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class PlayerController {


@GetMapping("/")
    public String viewHomePage(Model model){
    return "homepage";
}
    @GetMapping("/viewGamesScoreboard")
    public String viewGamesScoreboard(Model model){
        return "games";
    }
    @GetMapping("/aboutsUS")
    public String aboutsUS(Model model){
        return "aboutus";
    }
    @GetMapping("/ttScoreboard")
    public String ttScoreboard(Model model){
        return "tt_scoreboard";
    }
    @GetMapping("/chessClock")
    public String chessScoreboard(Model model){
        return "chess_clock";
    }
    @GetMapping("/darts_501")
    public String dartCounter(Model model){
        return "darts_501";
    }

}
