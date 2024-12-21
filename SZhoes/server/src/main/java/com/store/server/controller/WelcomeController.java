package com.store.server.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WelcomeController {
    @Autowired
    private Environment environment;


    @GetMapping("/")
    public String welcome(Model model) {
        model.addAttribute("spring_app", environment.getProperty("spring.application.name"));
        return "welcome";
    }
}