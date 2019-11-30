package com.touchsoft.js7.spring.repositoryes;

import com.touchsoft.js7.spring.entityes.Message;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface MessageRepository extends CrudRepository<Message, Long> {


    List<Message> findByUserid(Long userid);

    List<Message> findByUseridAndIsRead(Long userid, boolean isRead);



}
