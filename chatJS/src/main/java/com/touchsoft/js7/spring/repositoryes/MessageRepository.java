package com.touchsoft.js7.spring.repositoryes;

import com.touchsoft.js7.spring.entityes.Message;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface MessageRepository extends CrudRepository<Message, Long> {

    // сообщения определённого пользователя
    List<Message> findByUserid(Long userid);

    // непрочитанные сообщения определённого пользователя
    List<Message> findByUseridAndIsRead(Long userid, boolean isRead);

    // сообщения с id > заданного у определённого пользователя
    List<Message> findByUseridAndIdGreaterThan(Long userid, Long id);



}
