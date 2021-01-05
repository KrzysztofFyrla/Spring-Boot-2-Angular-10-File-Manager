package pl.fyrla.filemanager.fileManager.payload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Krzysztof
 * @project file-manager-backend
 */
@Getter
@Setter
@NoArgsConstructor
public class FileManagerResponse {

    private String id;
    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private long size;

    public FileManagerResponse(String id, String fileName, String fileDownloadUri, String fileType, long size) {
        this.id = id;
        this.fileName = fileName;
        this.fileDownloadUri = fileDownloadUri;
        this.fileType = fileType;
        this.size = size;
    }
}
