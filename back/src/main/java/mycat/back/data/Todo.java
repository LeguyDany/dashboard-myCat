package mycat.back.data;

import org.springframework.data.annotation.Id;

public class Todo {
    @Id
    private String id;
    private String title;
    private Boolean completed;

    public Todo(String title, Boolean completed){
        this.title = title;
        this.completed = completed;
    }
    public String getId(){
        return this.id;
    }
    public String getTitle(){
        return this.title;
    }
    public Boolean getCompleted(){
        return completed;
    }

}
