package com.touchsoft.js7.spring.controller;

import com.touchsoft.js7.spring.entityes.User;
import com.touchsoft.js7.spring.repositoryes.MessageRepository;
import com.touchsoft.js7.spring.repositoryes.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("users")
public class UsersController {


    @Autowired
    private UserRepository userRepository;
    private MessageRepository messageRepository;


    @GetMapping
    public Iterable<User> getAllUsers() {

        return userRepository.findAll();

    }

    @GetMapping("/online")
    public Iterable<User> getOnlineUsers() {

        return userRepository.findByisOnline(true);

    }

    @PostMapping("/online")
    public void setOnlineStatusFromUser(@RequestBody User data) {

        userRepository.save(data);

        //return userRepository.findByisOnline(true);

    }




    @PostMapping
    public User addNewUser (@RequestBody User data) {

        User findUser = userRepository.findOneByNameLike(data.getName());
        if (findUser == null){
            userRepository.save(data);
            findUser = userRepository.findOneByNameLike(data.getName());
        }
        return findUser;

    }




}

