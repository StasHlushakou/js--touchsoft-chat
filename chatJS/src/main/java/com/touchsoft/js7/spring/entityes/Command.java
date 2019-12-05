package com.touchsoft.js7.spring.entityes;

import javax.persistence.*;

@Entity
@Table(name = "commands")
public class Command {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private Long userID;
    private boolean isCompleted;

    private String commandType;
    private String param1;
    private String param2;
    private String param3;
    private String time;

    @Column(length = 400)
    private String userResponse;


    public Command() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public String getCommandType() {
        return commandType;
    }

    public void setCommandType(String commandType) {
        this.commandType = commandType;
    }

    public String getParam1() {
        return param1;
    }

    public void setParam1(String param1) {
        this.param1 = param1;
    }

    public String getParam2() {
        return param2;
    }

    public void setParam2(String param2) {
        this.param2 = param2;
    }

    public String getParam3() {
        return param3;
    }

    public void setParam3(String param3) {
        this.param3 = param3;
    }

    public String getUserResponse() {
        return userResponse;
    }

    public void setUserResponse(String userResponse) {
        this.userResponse = userResponse;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Command(Long id, Long userID, boolean isCompleted, String commandType, String param1, String param2, String param3, String userResponse, String time) {
        this.id = id;
        this.userID = userID;
        this.isCompleted = isCompleted;
        this.commandType = commandType;
        this.param1 = param1;
        this.param2 = param2;
        this.param3 = param3;
        this.userResponse = userResponse;
        this.time = time;
    }
}
