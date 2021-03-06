package es.webapp13.porthub.api.user;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import java.sql.Date;

@Data
public class UserDTO {

    private String id;

    private String name;

    private String surname;

    private Date bornDate;

    private String email;

    private String password;

    private String phoneNumber;

    private String website;

    private String city;

    private String category;

    private String degree;

    private String freelance;

    private String description;

    private MultipartFile profilePhoto;

}
