package com.touchsoft.js7.spring.repositoryes;

import com.touchsoft.js7.spring.entityes.Message;
import org.springframework.data.repository.CrudRepository;


public interface MessageRepository extends CrudRepository<Message, Long> {


    Iterable<Message> findByUserid(Long userid);

    Iterable<Message> findByUseridAndIsRead(Long userid, boolean isRead);



}
