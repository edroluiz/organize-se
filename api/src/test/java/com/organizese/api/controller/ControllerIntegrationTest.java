package com.organizese.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.organizese.api.model.Task;
import com.organizese.api.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TaskRepository taskRepository;

    private String baseUrl;

    @BeforeEach
    public void setUp() {
        baseUrl = "http://localhost:" + port + "/api/task";
    }

    @Test
    public void testGetAllTasks() {
        ResponseEntity<Task[]> response = restTemplate.getForEntity(baseUrl, Task[].class);
        Task[] tasks = response.getBody();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(tasks.length > 0);
    }

    @Test
    public void testGetTaskById() {
        ResponseEntity<Task> response = restTemplate.getForEntity(baseUrl + "/" + "6541a4c5f5654e2e58c1c724", Task.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(response.getBody().getId(), "6541a4c5f5654e2e58c1c724");
    }

    @Test
    public void testGetTaskByIdNotFound() {
        ResponseEntity<Task> response = restTemplate.getForEntity(baseUrl +  "/" + "000", Task.class);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testCreateTask() {
        long countTasksBefore = taskRepository.count();

        Task task = new Task("New Task", false);
        HttpEntity<Task> request = new HttpEntity<>(task);
        ResponseEntity<Task> response = restTemplate.postForEntity(baseUrl, request, Task.class);

        long countTasksAfter = taskRepository.count();

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(response.getBody().getName(), "New Task");
        assertEquals(countTasksBefore + 1, countTasksAfter);
    }

    @Test
    public void testCreateTaskEmptyName() {
        Task task = new Task("", false);
        HttpEntity<Task> request = new HttpEntity<>(task);

        ResponseEntity<Task> response = restTemplate.postForEntity(baseUrl, request, Task.class);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    public void testUpdateTask() {
        Task updatedTask = new Task("Updated Task", true);
        HttpEntity<Task> request = new HttpEntity<>(updatedTask);

        ResponseEntity<Task> response = restTemplate.exchange(baseUrl + "/" + "6541a4c5f5654e2e58c1c724", HttpMethod.PUT, request, Task.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(response.getBody().getId(), "6541a4c5f5654e2e58c1c724");
        assertEquals(response.getBody().getName(), "Updated Task");
    }

    @Test
    public void testUpdateTaskEmptyName() {
        Task updatedTask = new Task("", true);
        HttpEntity<Task> request = new HttpEntity<>(updatedTask);

        ResponseEntity<Task> response = restTemplate.exchange(baseUrl + "/" + "6541a4c5f5654e2e58c1c724", HttpMethod.PUT, request, Task.class);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    public void testUpdateTaskNotFound() {
        Task updatedTask = new Task("Updated Task", true);
        HttpEntity<Task> request = new HttpEntity<>(updatedTask);

        ResponseEntity<Task> response = restTemplate.exchange(baseUrl +  "/" + "000", HttpMethod.PUT, request, Task.class);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testDeleteTask() {
        long countTasksBefore = taskRepository.count();
        ResponseEntity<Void> response = restTemplate.exchange(baseUrl + "/" + "6541ad5ae6be174f3ea18f2b", HttpMethod.DELETE, null, Void.class);

        long countTasksAfter = taskRepository.count();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(countTasksBefore - 1, countTasksAfter);
    }

    @Test
    public void testDeleteTaskNotFound() {
        ResponseEntity<Void> response = restTemplate.exchange(baseUrl +  "/" + "000", HttpMethod.DELETE, null, Void.class);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
