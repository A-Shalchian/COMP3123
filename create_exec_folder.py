#!/usr/bin/env python3
import sys
import os

def create_folder(exec_number):
    folder_name = f"101414035_COMP3123-exec{exec_number:02d}"

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

    try:
        exec_number = int(sys.argv[1])
        if exec_number < 1 or exec_number > 99:
            print("Error: exec_number must be between 1 and 99")
            sys.exit(1)

        create_folder(exec_number)

    except ValueError:
        print("Error: Please provide a valid number")
        sys.exit(1)

if __name__ == "__main__":
    main()