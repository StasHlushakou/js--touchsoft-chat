package com.touchsoft.js7.spring.entityes;

import javax.persistence.*;

@Entity
@Table(name = "commands")
public class Command {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private Long userID;
    private String commandText;
    private String commandParam;
    private boolean isCompleted;

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

    public String getCommandText() {
        return commandText;
    }

    public void setCommandText(String commandText) {
        this.commandText = commandText;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public String getUserResponse() {
        return userResponse;
    }

    public void setUserResponse(String userResponse) {
        this.userResponse = userResponse;
    }

    public String getCommandParam() {
        return commandParam;
    }

    public void setCommandParam(String commandParam) {
        this.commandParam = commandParam;
    }

    public Command(Long id, Long userID, String commandText, String commandParam, boolean isCompleted, String userResponse) {
        this.id = id;
        this.userID = userID;
        this.commandText = commandText;
        this.commandParam = commandParam;
        this.isCompleted = isCompleted;
        this.userResponse = userResponse;
    }
}
