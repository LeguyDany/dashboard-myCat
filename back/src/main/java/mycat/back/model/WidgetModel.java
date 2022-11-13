package mycat.back.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "widget")
public class WidgetModel {

    @Id
    private String id;


    private String name;


    private String description;

    public WidgetModel() {
    }

    public WidgetModel(String name, String description) {
        this.name = name;
        this.description = description;

    }

    public String getId() {
        return id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}