import JSZip from "jszip";

// Function to create a zip file with the project contents
export const createProjectZip = async (
  files: { path: string; content: string }[],
) => {
  const zip = new JSZip();

  // Add files to the zip
  files.forEach((file) => {
    zip.file(file.path, file.content);
  });

  // Generate the zip file
  const content = await zip.generateAsync({ type: "blob" });

  // Create a download link
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = "invoice-generator.zip";
  document.body.appendChild(link);
  link.click();

  // Clean up
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, 100);
};
