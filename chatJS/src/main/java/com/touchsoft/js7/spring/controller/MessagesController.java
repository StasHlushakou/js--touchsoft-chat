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


    @GetMapping("/users/{userID}")
    public List<Message> getAllMessagesByUserID(@PathVariable final Long userID) {

        return  messageRepository.findByUserID(userID);

    }

    @GetMapping("/users/userunread/{userID}")
    public List<Message> getUserUnreadMessagesByUserID(@PathVariable final Long userID) {

        return  messageRepository.findByUserIDAndIsReadUser(userID,false);

    }

    @GetMapping("/users/adminunread/{userID}")
    public List<Message> getAdminUnreadMessagesByUserID(@PathVariable final Long userID) {

        return  messageRepository.findByUserIDAndIsReadAdmin(userID,false);

    }


    @GetMapping("/users/userunread/num/{userID}")
    public Long getNumOfUnreadMessagesByUserID(@PathVariable final Long userID) {

        return (long)messageRepository.findByUserIDAndIsReadUser(userID,false).size();

    }


    @GetMapping("/users/{userID}/{idGreatThen}")
    public List<Message> getMessagesWithIdGreaterThanByUserID(@PathVariable final Long userID, @PathVariable final Long idGreatThen) {

        return messageRepository.findByUserIDAndIdGreaterThan(userID,idGreatThen);

    }


    @GetMapping("/users/{userID}/longpolling/{idGreatThen}")
    public List<Message> getMessagesWithIdGreaterThanByUserIDLongPolling(@PathVariable final Long userID, @PathVariable final Long idGreatThen) {

        for (int i = 0; i < 20; i++){
            if (messageRepository.findByUserIDAndIdGreaterThan(userID,idGreatThen).size() == 0){
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            } else {
                break;
            }
        }
        return messageRepository.findByUserIDAndIdGreaterThan(userID,idGreatThen);
    }

}
