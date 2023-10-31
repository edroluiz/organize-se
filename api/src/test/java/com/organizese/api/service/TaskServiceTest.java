package com.organizese.api.service;

import static org.junit.jupiter.api.Assertions.*;

import com.organizese.api.exception.CustomException;
import com.organizese.api.model.Task;
import com.organizese.api.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

class TaskServiceTest {

    private TaskService taskService;

    @Mock
    private TaskRepository taskRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        taskService = new TaskService(taskRepository);
    }

    @Test
    void testGetAllTasks() {
        Task task1 = new Task("1", "Task 1", false);
        Task task2 = new Task("2", "Task 2", true);
        Task task3 = new Task("3", "Task 3", false);

        Mockito.when(taskRepository.findAll()).thenReturn(List.of(task1, task2, task3));

        List<Task> tasks = taskService.getAllTasks();
        assertEquals(3, tasks.size());
        assertEquals("Task 1", tasks.get(0).getName());
        assertEquals("Task 2", tasks.get(1).getName());
        assertEquals("Task 3", tasks.get(2).getName());
    }

    @Test
    void testCreateTask() {
        Task newTask = new Task("4", "New Task", true);

        Mockito.when(taskRepository.save(newTask)).thenReturn(newTask);

        Task createdTask = taskService.createTask(newTask);
        assertNotNull(createdTask);
        assertEquals("New Task", createdTask.getName());
    }

    @Test
    void testUpdateTask() {
        Task existingTask = new Task("5", "Existing Task", false);
        Task updatedTask = new Task("5", "Updated Task", true);

        Mockito.when(taskRepository.findById("5")).thenReturn(Optional.of(existingTask));
        Mockito.when(taskRepository.save(existingTask)).thenReturn(updatedTask);

        Task updated = taskService.updateTask("5", updatedTask);
        assertNotNull(updated);
        assertEquals("Updated Task", updated.getName());
        assertTrue(updated.isFilled());
    }

    @Test
    void testUpdateTaskNotFound() {
        Mockito.when(taskRepository.findById("6")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> taskService.updateTask("6", new Task("6", "Updated Task", true)));
    }

    @Test
    void testDeleteTask() {
        Task existingTask = new Task("7", "Task to Delete", false);

        Mockito.when(taskRepository.findById("7")).thenReturn(Optional.of(existingTask));
        taskService.deleteTask("7");

        Mockito.verify(taskRepository, Mockito.times(1)).delete(existingTask);
    }

    @Test
    void testDeleteTaskNotFound() {
        Mockito.when(taskRepository.findById("8")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> taskService.deleteTask("8"));
    }

    @Test
    void testGetAllTasksEmpty() {
        Mockito.when(taskRepository.findAll()).thenReturn(Collections.emptyList());

        List<Task> tasks = taskService.getAllTasks();
        assertTrue(tasks.isEmpty());
    }

    @Test
    void testCreateTaskWithEmptyName() {
        Task taskWithEmptyName = new Task("10", "", false);

        assertThrows(CustomException.class, () -> taskService.createTask(taskWithEmptyName));
    }

    @Test
    void testCreateTaskWithBlankName() {
        Task taskWithBlankName = new Task("11", "   ", false);

        assertThrows(CustomException.class, () -> taskService.createTask(taskWithBlankName));
    }

    @Test
    void testUpdateTaskWithEmptyName() {
        Task existingTask = new Task("12", "Task with Name", false);
        Task updatedTaskWithEmptyName = new Task("12", "", true);

        Mockito.when(taskRepository.findById("12")).thenReturn(Optional.of(existingTask));

        assertThrows(CustomException.class, () -> taskService.updateTask("12", updatedTaskWithEmptyName));
    }

    @Test
    void testUpdateTaskWithBlankName() {
        Task existingTask = new Task("13", "Task with Name", false);
        Task updatedTaskWithBlankName = new Task("13", "   ", true);

        Mockito.when(taskRepository.findById("13")).thenReturn(Optional.of(existingTask));

        assertThrows(CustomException.class, () -> taskService.updateTask("13", updatedTaskWithBlankName));
    }

}