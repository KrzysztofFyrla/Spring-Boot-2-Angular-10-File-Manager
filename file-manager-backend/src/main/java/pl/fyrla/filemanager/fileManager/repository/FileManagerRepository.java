package pl.fyrla.filemanager.fileManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.fyrla.filemanager.fileManager.model.FileManager;

/**
 * @author Krzysztof
 * @project file-manager-backend
 */
@Repository
public interface FileManagerRepository extends JpaRepository<FileManager, String> {
}
