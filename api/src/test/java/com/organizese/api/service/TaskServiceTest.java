package com.organizese.api.service;

import static org.junit.jupiter.api.Assertions.*;

import com.organizese.api.exception.BadRequestCustomException;
import com.organizese.api.exception.NotFoundCustomException;
import com.organizese.api.model.Task;
import com.organizese.api.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

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
        // Arrange
        Task task1 = new Task("1", "Task 1", false);
        Task task2 = new Task("2", "Task 2", true);
        Task task3 = new Task("3", "Task 3", false);

        Mockito.when(taskRepository.findAll()).thenReturn(List.of(task1, task2, task3));

        // Act
        List<Task> tasks = taskService.getAllTasks();

        // Assert
        assertEquals(3, tasks.size());
        assertEquals("Task 1", tasks.get(0).getName());
        assertEquals("Task 2", tasks.get(1).getName());
        assertEquals("Task 3", tasks.get(2).getName());
    }

    @Test
    void testCreateTask() {
        // Arrange
        Task newTask = new Task("1", "Task 1", true);

        Mockito.when(taskRepository.save(newTask)).thenReturn(newTask);

        // Act
        Task createdTask = taskService.createTask(newTask);

        // Assert
        assertNotNull(createdTask);
        assertEquals("1", createdTask.getId());
        assertEquals("Task 1", createdTask.getName());
    }

    @Test
    void testUpdateTask() {
        // Arrange
        Task existingTask = new Task("1", "Task 1", false);
        Task updatedTask = new Task("1", "Task 1.1", true);

        Mockito.when(taskRepository.findById("1")).thenReturn(Optional.of(existingTask));
        Mockito.when(taskRepository.save(existingTask)).thenReturn(updatedTask);

        // Act
        Task updated = taskService.updateTask("1", updatedTask);

        // Assert
        assertEquals("Task 1.1", updated.getName());
    }

    @Test
    void testUpdateTaskNotFound() {
        // Arrange & Act
        NotFoundCustomException exception = assertThrows(NotFoundCustomException.class, () -> taskService.updateTask("6", new Task("6", "Updated Task", true)));

        // Assert
        assertEquals("Tarefa não encontrada", exception.getMessage());
    }

    @Test
    void testDeleteTask() {
        // Arrange
        Task existingTask = new Task("7", "Task to Delete", false);

        Mockito.when(taskRepository.findById("7")).thenReturn(Optional.of(existingTask));

        // Act
        taskService.deleteTask("7");

        // Assert
        Mockito.verify(taskRepository, Mockito.times(1)).delete(existingTask);
    }

    @Test
    void testDeleteTaskNotFound() {
        // Arrange & Act
        NotFoundCustomException exception = assertThrows(NotFoundCustomException.class, () -> taskService.deleteTask("8"));

        // Assert
        assertEquals("Tarefa não encontrada", exception.getMessage());
    }

    @Test
    void testCreateTaskWithEmptyName() {
        // Arrange
        Task taskWithEmptyName = new Task("1", "", false);

        // Act
        BadRequestCustomException exception = assertThrows(BadRequestCustomException.class, () -> taskService.createTask(taskWithEmptyName));

        // Assert
        assertEquals("Tarefa não pode estar vazia ou conter apenas espaços em branco", exception.getMessage());
    }

    @Test
    void testCreateTaskWithBlankName() {
        // Arrange
        Task taskWithBlankName = new Task("1", "   ", false);

        // Act
        BadRequestCustomException exception = assertThrows(BadRequestCustomException.class, () -> taskService.createTask(taskWithBlankName));

        // Assert
        assertEquals("Tarefa não pode estar vazia ou conter apenas espaços em branco", exception.getMessage());
    }

    @Test
    void testUpdateTaskWithEmptyName() {
        // Arrange
        Task existingTask = new Task("1", "Task 1", false);
        Task updatedTaskWithEmptyName = new Task("1", "", true);

        // Act
        BadRequestCustomException exception = assertThrows(BadRequestCustomException.class, () -> taskService.updateTask("1", updatedTaskWithEmptyName));

        // Assert
        assertEquals("O nome da tarefa atualizada não pode estar vazio ou conter apenas espaços em branco", exception.getMessage());
    }

    @Test
    void testUpdateTaskWithBlankName() {
        // Arrange
        Task existingTask = new Task("1", "Task 1", false);
        Task updatedTaskWithBlankName = new Task("1", "   ", true);

        // Act
        BadRequestCustomException exception = assertThrows(BadRequestCustomException.class, () -> taskService.updateTask("1", updatedTaskWithBlankName));

        // Assert
        assertEquals("O nome da tarefa atualizada não pode estar vazio ou conter apenas espaços em branco", exception.getMessage());
    }

}