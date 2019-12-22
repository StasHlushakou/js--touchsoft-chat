package com.touchsoft.js7.spring.repositoryes;

import com.touchsoft.js7.spring.entityes.Command;
import com.touchsoft.js7.spring.entityes.Message;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommandRepository extends CrudRepository<Command, Long> {

    // команды определённого пользователя
    List<Command> findByUserID(Long userID);

    // невыполненные команды определённого пользователя
    List<Command> findByUserIDAndIsCompleted(Long userID, boolean isCompleted);

    // команды с id > заданного у определённого пользователя
    List<Command> findByUserIDAndIsCompletedAndIdGreaterThan(Long userID, boolean isCompleted, Long id);

}
