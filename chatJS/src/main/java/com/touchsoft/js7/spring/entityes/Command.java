package com.touchsoft.js7.spring.entityes;

import javax.persistence.*;

@Entity
@Table(name = "commands")
public class Command {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private Long userid;
    private String command;
    private boolean isDone;
    private String userResponse;

    public Command() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }

    public String getUserResponse() {
        return userResponse;
    }

    public void setUserResponse(String userResponse) {
        this.userResponse = userResponse;
    }

    public Command(Long id, Long userid, String command, boolean isDone, String userResponse) {
        this.id = id;
        this.userid = userid;
        this.command = command;
        this.isDone = isDone;
        this.userResponse = userResponse;
    }
}
