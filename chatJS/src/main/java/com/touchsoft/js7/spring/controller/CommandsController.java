package com.touchsoft.js7.spring.controller;

import com.touchsoft.js7.spring.entityes.Command;
import com.touchsoft.js7.spring.repositoryes.CommandRepository;
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


    @GetMapping("/users/{userID}")
    public List<Command> getAllCommandsByUserID(@PathVariable final Long userID) {

        return  commandsRepository.findByUserID(userID);

    }

    @GetMapping("/users/notcompleted/{userID}")
    public List<Command> getNotCompleteCommandsByUserID(@PathVariable final Long userID) {

        return  commandsRepository.findByUserIDAndIsCompleted(userID,false);

    }

    @GetMapping("/users/notcompleted/{userID}/{idGreatThen}")
    public List<Command> getCommandsWithIdGreaterThanByUserID(@PathVariable final Long userID, @PathVariable final Long idGreatThen) {

        return  commandsRepository.findByUserIDAndIsCompletedAndIdGreaterThan(userID, false, idGreatThen);

    }

}
