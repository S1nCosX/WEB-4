package server.dto;

public class UserDTO {
    private String email;
    private String password;

    UserDTO(String email, String password){
        setEmail(email);
        setPassword(password);
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail() {
        return email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getPassword() {
        return password;
    }
}
