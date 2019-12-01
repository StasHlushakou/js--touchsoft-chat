package com.touchsoft.js7.spring.controller;

import com.touchsoft.js7.spring.entityes.Message;
import com.touchsoft.js7.spring.entityes.User;
import com.touchsoft.js7.spring.repositoryes.MessageRepository;
import com.touchsoft.js7.spring.repositoryes.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("messages")
public class MessagesController {

    @Autowired
    private MessageRepository messageRepository;
    private UserRepository userRepository;


    @GetMapping
    public Iterable<Message> getAllMessages() {

        return messageRepository.findAll();

    }


    @PostMapping
    public void addNewMessage (@RequestBody Message data) {

        messageRepository.save(data);

    }


    @PostMapping("/users")
    public List<Message> getAllMessagesByUserID(@RequestBody User user) {

        return  messageRepository.findByUserid(user.getId());

    }

    @PostMapping("/users/unread")
    public List<Message> getUnreadMessagesByUserID(@RequestBody User user) {

        return  messageRepository.findByUseridAndIsRead(user.getId(),false);

    }

    @PostMapping("/users/unread/num")
    public Long getNumOfUnreadMessagesByUserID(@RequestBody User user) {

        return (long)messageRepository.findByUseridAndIsRead(user.getId(),false).size();

    }


    @PostMapping("/users/{idGreatThen}")
    public List<Message> getMessagesWithIdGreaterThanByUserID(@PathVariable final Long idGreatThen, @RequestBody User user) {


        return messageRepository.findByUseridAndIdGreaterThan(user.getId(),idGreatThen);

    }



}
