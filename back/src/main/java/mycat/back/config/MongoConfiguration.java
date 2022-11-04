/*
package mycat.back.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import lombok.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;

@Configuration
public class MongoConfiguration extends AbstractMongoClientConfiguration {

@Override
  protected String getDatabaseName() {
    return "dashboard";
  }

  @Override
  public MongoClient mongoClient() {
    return MongoClients.create();
  }

  @Override
  public MongoTemplate mongoTemplate(MongoDatabaseFactory databaseFactory, MappingMongoConverter converter){
    return new MongoTemplate(mongoClient(), getDatabaseName());
  }



}
*/
