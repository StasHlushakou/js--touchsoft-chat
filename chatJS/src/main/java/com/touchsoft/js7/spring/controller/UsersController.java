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

    @PostMapping
    public void addNewUser (@RequestBody User data) {

        userRepository.save(data);

    }

    @PostMapping("/reg")
    public User returnOrCreateUser (@RequestBody User data) {

        User findUser = userRepository.findOneByNameLike(data.getName());
        if (findUser == null){
            userRepository.save(data);
            findUser = userRepository.findOneByNameLike(data.getName());
        }

        return findUser;

    }



    @GetMapping("/online")
    public Iterable<User> getOnlineUsers() {

        return userRepository.findByIsOnline(true);

    }










}

