package com.uniquick;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class UniquikApplication {

	public static void main(String[] args) {
		SpringApplication.run(UniquikApplication.class, args);
	}
}
