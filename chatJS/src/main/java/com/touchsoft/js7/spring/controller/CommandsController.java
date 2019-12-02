package com.touchsoft.js7.spring.controller;

import com.touchsoft.js7.spring.entityes.Command;
import com.touchsoft.js7.spring.entityes.Message;
import com.touchsoft.js7.spring.entityes.User;
import com.touchsoft.js7.spring.repositoryes.CommandRepository;
import com.touchsoft.js7.spring.repositoryes.MessageRepository;
import com.touchsoft.js7.spring.repositoryes.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("commands")
public class CommandsController {

    @Autowired
    private CommandRepository commandsRepository;
    private UserRepository userRepository;


    @GetMapping
    public Iterable<Command> getAllCommands() {

        return commandsRepository.findAll();

    }


    @PostMapping
    public void addNewCommands (@RequestBody Command data) {

        commandsRepository.save(data);

    }


    @PostMapping("/users")
    public List<Command> getAllCommandsByUserID(@RequestBody User user) {

        return  commandsRepository.findByUserid(user.getId());

    }

    @PostMapping("/users/notdone")
    public List<Command> getUnreadMessagesByUserID(@RequestBody User user) {

        return  commandsRepository.findByUseridAndIsDone(user.getId(),false);

    }






}
