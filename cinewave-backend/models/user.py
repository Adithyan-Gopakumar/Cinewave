from main import mysql
import bcrypt  # For password hashing


class User:

    def __init__(self):
        self._id = None
        self._first_name = None
        self._last_name = None
        self._email = None
        self._role = None
        self._password = None
        self._password_repeat = None
        self._password_hash = None

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, id):
        self._id = id

    @property
    def first_name(self):
        return self._first_name

    @first_name.setter
    def first_name(self, first_name):
        self._first_name = first_name

    @property
    def last_name(self):
        return self._last_name

    @last_name.setter
    def last_name(self, last_name):
        self._last_name = last_name

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, email):
        self._email = email

    @property
    def role(self):
        return self._role

    @role.setter
    def role(self, role):
        self._role = role

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        self._password = password

    @property
    def password_repeat(self):
        return self._password_repeat

    @password_repeat.setter
    def password_repeat(self, password_repeat):
        self._password_repeat = password_repeat

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password_hash):
        self._password_hash = password_hash

    def hash_password(self):
        # Encode password into bytes
        password_encoded = self.password.encode('utf-8')
        # Hash password
        hashed_password = bcrypt.hashpw(password_encoded, bcrypt.gensalt())
        self._password_hash = hashed_password

    def validate_user(self):
        con = mysql.connect()
        cur = con.cursor()

        error = None

        try:
            # Check if email exists
            cur.execute("SELECT * FROM users WHERE email = %s", self.email)
            rows = cur.fetchall()
            if rows:
                error = "Email already exists"

            # Check if passwords match
            if self.password != self.password_repeat:
                error = "Passwords do not match"

            # Check if email is valid
            if '@' not in self.email:
                error = "Email is invalid"

            # Check if password is valid
            if len(self.password) < 8:
                error = "Password is invalid"

            # Check if first name is valid
            if len(self.first_name) < 3:
                error = "First name is invalid"

            # Commit changes
            con.commit()

            # Close connection
            cur.close()
            con.close()

            return error

        except Exception as e:
            con.rollback()
            return str(e)

    def create(self):
        con = mysql.connect()
        cur = con.cursor()

        try:
            # Hash password
            self.hash_password()

            # Insert user into database
            cur.execute("INSERT INTO users "
                        "(email, "
                        "role, "
                        "first_name, "
                        "last_name, "
                        "password)"
                        "VALUES (%s, %s, %s, %s, %s)",
                        (self.email,
                         self.role,
                         self.first_name,
                         self.last_name,
                         self.password_hash))

            # Commit changes
            con.commit()

            # Close connection
            cur.close()
            con.close()

            return True

        except Exception as e:
            con.rollback()
            return False

    def get_user(self, email):
        con = mysql.connect()
        cur = con.cursor()

        try:
            # Check if email exists
            cur.execute("SELECT * FROM users WHERE email = %s", email)
            rows = cur.fetchall()

            # Commit changes
            con.commit()

            # Close connection
            cur.close()
            con.close()

            if not rows:
                return None

            self.id = rows[0][0]
            self.first_name = rows[0][1]
            self.last_name = rows[0][2]
            self.email = rows[0][3]
            self.password_hash = rows[0][4]
            self.role = rows[0][5]

            return self

        except Exception as e:
            con.rollback()
            return None

    def login(self, email, password):
        try:

            # Check if user exists
            self.get_user(email)
            if not self.email:
                return False

            # Encode input password into bytes
            password_encoded = password.encode('utf-8')

            # Check if passwords match
            if bcrypt.checkpw(password_encoded, self.password_hash):
                # Remove password hash from user
                self.password_hash = None
                return True
            else:
                return False

        except Exception as e:
            return False
