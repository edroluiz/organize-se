package com.organizese.api.controller;

import com.organizese.api.model.Tarefas;
import com.organizese.api.repository.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping({"/api"})
public class Controller {

    @Autowired
    private Repository Repository;

    public Controller() {
    }

    @GetMapping({""})
    List<Tarefas> index() {
        return this.Repository.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping({""})
    Tarefas create(@RequestBody Tarefas tarefas) {
        return (Tarefas)this.Repository.save(tarefas);
    }

    @PutMapping({"{id}"})
    Tarefas update(@PathVariable String id, @RequestBody Tarefas tarefas) {
        Tarefas tarefasFromDb = (Tarefas)this.Repository.findById(id).orElseThrow(RuntimeException::new);
        tarefasFromDb.setName(tarefas.getName());
        tarefasFromDb.setFilled(tarefas.isFilled());
        return (Tarefas)this.Repository.save(tarefasFromDb);
    }

    @DeleteMapping({"{id}"})
    void delete(@PathVariable String id) {
        Tarefas tarefas = (Tarefas)this.Repository.findById(id).orElseThrow(RuntimeException::new);
        this.Repository.delete(tarefas);
    }
}
