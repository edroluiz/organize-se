package com.organizese.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class OrganizeseApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrganizeseApplication.class, args);
	}

}
