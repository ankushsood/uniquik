package com.uniquick;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/*
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration

public class StaticResourceConfiguration extends WebMvcConfigurerAdapter {
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler(new String[] { "/**" })
				.addResourceLocations(new String[] { "file:resource/static/" });
	}

	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/index.html");
	}
}

@Configuration
public class StaticResourceConfiguration extends WebMvcConfigurerAdapter {


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
            .addResourceLocations(CLASSPATH_RESOURCE_LOCATIONS);
    }
    
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/index.html");
		registry.addViewController("/**").setViewName("forward:/index.html");
	}
	

}*/


@Configuration
public class StaticResourceConfiguration extends WebMvcConfigurerAdapter {
/*    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
            "classpath:/META-INF/resources/", "classpath:/resources/",
            "classpath:static/", "classpath:/public/" };

	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler(new String[] { "/**" })
				.addResourceLocations(CLASSPATH_RESOURCE_LOCATIONS);
	}
*/
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/index.html");
		registry.addViewController("/employerSignup").setViewName("forward:/index.html");
		registry.addViewController("/candidateSignup").setViewName("forward:/index.html");
		registry.addViewController("/login").setViewName("forward:/index.html");
		registry.addViewController("/home").setViewName("forward:/index.html");
		registry.addViewController("/admin").setViewName("forward:/index.html");
		registry.addViewController("/user").setViewName("forward:/index.html");
		registry.addViewController("/postJob").setViewName("forward:/index.html");
		registry.addViewController("/candidateList").setViewName("forward:/index.html");
		registry.addViewController("/importCandidates").setViewName("forward:/index.html");
		registry.addViewController("/admin/**").setViewName("forward:/index.html");
		registry.addViewController("/user/**").setViewName("forward:/index.html");

	}
}