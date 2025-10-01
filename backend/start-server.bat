@echo off
REM Spring Boot 서버 시작 스크립트 (Windows)
REM 이 스크립트는 Spring Boot 서버를 시작합니다

echo ========================================
echo    Spring Boot 서버 시작 중...
echo ========================================

REM Java 버전 확인
java -version
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Java가 설치되지 않았거나 PATH에 설정되지 않았습니다.
    echo Java 17 이상을 설치하고 PATH에 추가해주세요.
    echo.
    pause
    exit /b 1
)

echo.
echo Java 버전 확인 완료!
echo.

REM Gradle Wrapper를 사용하여 Spring Boot 애플리케이션 실행
echo Spring Boot 애플리케이션을 시작합니다...
echo 서버 주소: http://localhost:8080
echo API 엔드포인트: http://localhost:8080/api
echo H2 데이터베이스 콘솔: http://localhost:8080/h2-console
echo.

gradlew.bat bootRun

pause
