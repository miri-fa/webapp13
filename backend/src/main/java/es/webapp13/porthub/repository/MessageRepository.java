package es.webapp13.porthub.repository;

import es.webapp13.porthub.model.Message;
import es.webapp13.porthub.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findAllBySenderAndReceiver(User sender, User receiver);

    Page<Message> findBySenderAndReceiver(User sender, User receiver, Pageable pageable);

    @Query("SELECT m.receiver.id FROM Message m WHERE m.sender.id = ?1 GROUP BY m.receiver.id")
    List<String> findSentChats(String id);

    @Query("SELECT m.sender.id FROM Message m WHERE m.receiver.id = ?1 GROUP BY m.sender.id")
    List<String> findReceivedChats(String id);

    Optional<Message> findById(long id);
}
