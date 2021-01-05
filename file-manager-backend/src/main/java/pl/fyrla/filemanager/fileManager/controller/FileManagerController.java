package pl.fyrla.filemanager.fileManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.fyrla.filemanager.fileManager.model.FileManager;
import pl.fyrla.filemanager.fileManager.payload.FileManagerResponse;
import pl.fyrla.filemanager.fileManager.service.FileManagerService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Krzysztof
 * @project file-manager-backend
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/file")
public class FileManagerController {

    @Autowired
    private FileManagerService fileManagerService;

    @PostMapping("/upload")
    public FileManagerResponse uploadFile(@RequestParam("file") MultipartFile file) {
        FileManager file1 = fileManagerService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path((file1.getId()))
                .toUriString();

        return new FileManagerResponse(file1.getId(), file1.getFileName(), fileDownloadUri, file1.getFileType(), file.getSize());
    }

    @PostMapping("/uploadMultipleFiles")
    public List<FileManagerResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file))
                .collect(Collectors.toList());
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
        //Load file from database
        FileManager file = fileManagerService.getFile(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(file.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFileName() + "\"")
                .body(new ByteArrayResource(file.getData()));
    }

    @GetMapping("/findFile/{fileId}")
    public Optional<FileManager> getById(@PathVariable String fileId) {
        return fileManagerService.findById(fileId);
    }

    @DeleteMapping("/deleteFile/{fileId}")
    public void deleteFile(@PathVariable String fileId) {
        fileManagerService.deleteById(fileId);
    }

    @GetMapping("/all")
    public ResponseEntity<List<FileManagerResponse>> getListFiles() {
        List<FileManagerResponse> files = fileManagerService.getAllFiles().map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/file/")
                    .path(dbFile.getId())
                    .toUriString();

            return new FileManagerResponse(
                    dbFile.getId(),
                    dbFile.getFileName(),
                    fileDownloadUri,
                    dbFile.getFileType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @GetMapping("/findAll")
    public Iterable<FileManager> getAllTest() {
        return fileManagerService.getAllTest();
    }
}
