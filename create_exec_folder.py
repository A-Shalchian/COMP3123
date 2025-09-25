#!/usr/bin/env python3
import sys
import os

def create_folder(exec_number):
    folder_name = f"exec{exec_number}"

    try:
        os.makedirs(folder_name, exist_ok=True)
        print(f"Created folder: {folder_name}")
    except Exception as e:
        print(f"Error creating folder: {e}")
        return False

    return True

def main():
    if len(sys.argv) != 2:
        print("Usage: python create_exec_folder.py <exec_number>")
        print("Example: python create_exec_folder.py 01")
        sys.exit(1)

    exec_number = sys.argv[1]
    create_folder(exec_number)

if __name__ == "__main__":
    main()