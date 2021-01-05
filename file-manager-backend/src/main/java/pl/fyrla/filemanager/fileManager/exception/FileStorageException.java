package pl.fyrla.filemanager.fileManager.exception;

/**
 * @author Krzysztof
 * @project file-manager-backend
 */
public class FileStorageException extends RuntimeException {

    public FileStorageException(String message) {
        super(message);
    }

    public FileStorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
