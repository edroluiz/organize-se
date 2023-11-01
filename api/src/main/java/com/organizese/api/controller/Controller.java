package com.organizese.api.controller;

import com.organizese.api.model.Task;
import com.organizese.api.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/task")
public class Controller {

    private final TaskService taskService;

    @Autowired
    public Controller(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> index() {
        return new ResponseEntity<List<Task>>(taskService.getAllTasks(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        return new ResponseEntity<Task>(taskService.getTaskById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody Task task) {
        return new ResponseEntity<Task>(taskService.createTask(task), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Task> update(@PathVariable String id, @RequestBody Task task) {
        return new ResponseEntity<Task>(taskService.updateTask(id, task), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        taskService.deleteTask(id);
    }
}
