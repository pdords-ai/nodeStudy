package com.example.reactlearning.rest;

/**
 * 🔍 사용자가 요청한 TodoItem이 없을 때 던지는 예외입니다.
 * Spring의 @ExceptionHandler로 잡아서 예쁜 에러 응답을 내려줄 거예요.
 */
public class TodoNotFoundException extends RuntimeException {

    public TodoNotFoundException(String id) {
        super("요청한 할 일을 찾을 수 없습니다. id=" + id);
    }
}
