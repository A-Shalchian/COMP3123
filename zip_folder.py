import os
import sys
import zipfile

# Usage: py zip_folder.py <folder_path>
def zip_folder(folder_path):
    if not os.path.isdir(folder_path):
        print(f"Error: {folder_path} is not a valid directory.")
        return
    zip_filename = os.path.basename(os.path.normpath(folder_path)) + '.zip'
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, folder_path)
                zipf.write(abs_path, rel_path)
    print(f"Created {zip_filename}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python zip_folder.py <folder_path>")
    else:
        zip_folder(sys.argv[1])
