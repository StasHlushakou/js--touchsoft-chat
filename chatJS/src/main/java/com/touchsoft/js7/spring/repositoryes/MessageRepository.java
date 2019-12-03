package com.touchsoft.js7.spring.repositoryes;

import com.touchsoft.js7.spring.entityes.Message;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface MessageRepository extends CrudRepository<Message, Long> {

    // сообщения определённого пользователя
    List<Message> findByUserID(Long userID);

    // непрочитанные сообщения определённого пользователя пользователем
    List<Message> findByUserIDAndIsReadUser(Long userID, boolean isReadUser);

    // непрочитанные сообщения определённого пользователя админом
    List<Message> findByUserIDAndIsReadAdmin(Long userID, boolean isReadAdmin);

    // сообщения с id > заданного у определённого пользователя
    List<Message> findByUserIDAndIdGreaterThan(Long userID, Long id);



}
