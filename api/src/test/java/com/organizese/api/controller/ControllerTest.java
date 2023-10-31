package com.organizese.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.organizese.api.model.Task;
import com.organizese.api.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@WebMvcTest(Controller.class)
public class ControllerTest {

//    @InjectMocks
//    private Controller controller;
//
//    @Mock
//    private TaskService taskService;
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    private ObjectMapper objectMapper = new ObjectMapper();
//
//    private List<Task> sampleTasks;
//
//    @BeforeEach
//    public void setup() {
//        sampleTasks = new ArrayList<>();
//        sampleTasks.add(new Task("1", "Task 1", false));
//        sampleTasks.add(new Task("2", "Task 2", true));
//    }
//
//    @Test
//    public void testIndex() throws Exception {
//        when(taskService.getAllTasks()).thenReturn(sampleTasks);
//
//        mockMvc.perform(MockMvcRequestBuilders.get("/api/task"))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(sampleTasks)));
//    }
//
//    @Test
//    public void testCreate() throws Exception {
//        Task newTask = new Task("3", "New Task", false);
//
//        when(taskService.createTask(newTask)).thenReturn(newTask);
//
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/task")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(newTask)))
//                .andExpect(MockMvcResultMatchers.status().isCreated())
//                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(newTask)));
//    }
//
//    @Test
//    public void testUpdate() throws Exception {
//        Task updatedTask = new Task("1", "Updated Task", true);
//
//        when(taskService.updateTask("1", updatedTask)).thenReturn(updatedTask);
//
//        mockMvc.perform(MockMvcRequestBuilders.put("/api/task/1")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(updatedTask)))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(updatedTask)));
//    }
//
//    @Test
//    public void testDelete() throws Exception {
//        doNothing().when(taskService).deleteTask("1");
//
//        mockMvc.perform(MockMvcRequestBuilders.delete("/api/task/1"))
//                .andExpect(MockMvcResultMatchers.status().isOk());
//    }
}
