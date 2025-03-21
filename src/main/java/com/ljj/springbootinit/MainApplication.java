package com.ljj.springbootinit;

import com.yupi.yuapiclientsdk.YuApiClientConfig;
import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * 主类（项目启动入口）
 *
 * @author <a href="https://github.com/180501/Ai_Bi">程序员ljj</a>
 * 
 */
// todo 如需开启 Redis，须移除 exclude 中的内容
@SpringBootApplication(exclude = {})
@MapperScan("com.ljj.springbootinit.mapper")
@EnableScheduling// 开启定时任务
@EnableAspectJAutoProxy(proxyTargetClass = true, exposeProxy = true) // 开启AOP
@EnableConfigurationProperties(YuApiClientConfig.class)
@EnableDubbo
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }

}
