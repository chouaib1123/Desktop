package com.example.firstApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example.firstApp")
public class FirstAppApplication {
	public static void main(String[] args) {
		SpringApplication.run(FirstAppApplication.class, args);
	}

}
