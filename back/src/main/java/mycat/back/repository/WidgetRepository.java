package mycat.back.repository;

import mycat.back.model.WidgetModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WidgetRepository extends MongoRepository<WidgetModel, String> {
  WidgetModel findByName(String name);
}