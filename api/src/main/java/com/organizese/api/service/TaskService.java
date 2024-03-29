package com.organizese.api.service;

import com.organizese.api.exception.BadRequestCustomException;
import com.organizese.api.exception.NotFoundCustomException;
import com.organizese.api.model.Task;
import com.organizese.api.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(String id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundCustomException("Tarefa não encontrada"));
    }

    public Task createTask(Task task) {
        if (task == null || task.getName() == null || task.getName().trim().isEmpty()) {
            throw new BadRequestCustomException("Tarefa não pode estar vazia ou conter apenas espaços em branco");
        }
        return taskRepository.save(task);
    }

    public Task updateTask(String id, Task updatedTask) {
        if (updatedTask == null) {
            throw new BadRequestCustomException("Tarefa atualizada não pode ser nula");
        }

        if (updatedTask.getName() == null || updatedTask.getName().trim().isEmpty()) {
            throw new BadRequestCustomException("O nome da tarefa atualizada não pode estar vazio ou conter apenas espaços em branco");
        }

        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundCustomException("Tarefa não encontrada"));

        existingTask.setName(updatedTask.getName());
        existingTask.setFilled(updatedTask.isFilled());

        return taskRepository.save(existingTask);
    }

    public void deleteTask(String id) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundCustomException("Tarefa não encontrada"));
        taskRepository.delete(existingTask);
    }
}

