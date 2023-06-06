package com.organizese.api.repository;

import com.organizese.api.model.Tarefas;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Repository extends MongoRepository<Tarefas, String> {
}
