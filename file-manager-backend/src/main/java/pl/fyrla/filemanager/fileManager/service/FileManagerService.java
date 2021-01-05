package pl.fyrla.filemanager.fileManager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import pl.fyrla.filemanager.fileManager.exception.FileNotFoundException;
import pl.fyrla.filemanager.fileManager.exception.FileStorageException;
import pl.fyrla.filemanager.fileManager.model.FileManager;
import pl.fyrla.filemanager.fileManager.repository.FileManagerRepository;

import java.io.IOException;
import java.util.Optional;
import java.util.stream.Stream;

/**
 * @author Krzysztof
 * @project file-manager-backend
 */
@Service
public class FileManagerService {

    @Autowired
    private FileManagerRepository fileManagerRepository;

    public FileManager storeFile(MultipartFile file) {

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            FileManager file1 = new FileManager(fileName, file.getContentType(),file.getBytes());

            return fileManagerRepository.save(file1);

        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public FileManager getFile(String fileId) {
        return fileManagerRepository.findById(fileId)
                .orElseThrow(() -> new FileNotFoundException("File not found with id " + fileId));
    }

    public Optional<FileManager> findById(String fileId) {
        return fileManagerRepository.findById(fileId);
    }

    public void deleteById(String fileId) {
        fileManagerRepository.deleteById(fileId);
    }

    public Stream<FileManager> getAllFiles() {
        return fileManagerRepository.findAll().stream();
    }

    public Iterable<FileManager> getAllTest() {
        return fileManagerRepository.findAll();
    }
}
