# Cinewave Flask Application

Welcome to the Cinewave Flask application! This document outlines the steps required to set up and run the application.
Please follow these instructions carefully to ensure a smooth setup process.

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.9
- PyCharm (Community or Professional Edition)
- MySQL Server
- phpMyAdmin (for database management)
- Postman

## Setting Up the Repository

1. Clone the repository to your local machine using Git:
   ```
   git clone https://github.coventry.ac.uk/nedumparam/cinewave-backend.git
   ```

2. Navigate into the project directory:
   ```
   cd cinewave-backend
   ```

## Setting Up the Virtual Environment

1. Create a virtual environment outside your project directory:
   ```
   python -m venv ../.venv/cinewave
   ```

2. Activate the virtual environment:

   On Windows:
   ```
   ..\.venv\cinewave\Scripts\activate
   ```

   On macOS/Linux:
   ```
   source ../.venv/cinewave/bin/activate
   ```

## Setting Up Virtual Environment in PyCharm

1. Open PyCharm and the project directory.

2. Go to `File` > `Settings` (or `PyCharm` > `Preferences` on macOS).

3. Navigate to `Project: cinewave` > `Python Interpreter`.

4. Click on the gear icon, then `Add`.

5. Select `Existing environment` and point it to the Python executable inside your virtual environment, typically found
   at `../.venv/cinewave/bin/python` on macOS/Linux or `..\ .venv\cinewave\Scripts\python.exe` on Windows.

6. Click `OK` to save the settings.

## Installing Requirements

With the virtual environment activated, install the required dependencies using:

```
pip install -r requirements.txt
```

## Running the Application in PyCharm

1. In PyCharm, navigate to the `Run` menu and select `Edit Configurations`.

2. Click the `+` button and select `Flask Server`.

3. In the `Script path` field, provide the path to your application's main file (e.g., `app.py`).

4. Ensure the correct Python interpreter is selected (the one from your virtual environment).

5. Click `OK` to save the configuration.

6. To run the app, select the newly created configuration from the run dropdown and click the run button.

## Restoring the MySQL Database Using phpMyAdmin

1. Open phpMyAdmin and select your MySQL server.

2. Create a new database for your project.

3. Click on the newly created database, then select the `Import` tab.

4. Click `Choose File` and select the SQL file located in the project root.

5. Click `Go` to start the import process.

## Restoring the Postman Collection

1. Open Postman.

2. Click on the `Import` button at the top left corner.

3. Select the `File` tab, then click `Choose Files`.

4. Navigate to the project root, select the Postman collection file, and click `Open`.

5. The collection should now be imported into Postman.

---

This README.md provides a comprehensive guide for setting up and running your Flask application within a PyCharm
environment, along with instructions for database and Postman setup. Adjust paths and other specifics as necessary to
match your setup.