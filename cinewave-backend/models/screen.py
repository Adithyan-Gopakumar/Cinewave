from main import mysql


class Screen:
    def __init__(self):
        self._id = None
        self._screen_name = None

        self._premium_seat_count = None
        self._premium_seat_cost = None

        self._executive_seat_count = None
        self._executive_seat_cost = None

        self._normal_seat_count = None
        self._normal_seat_cost = None

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, id):
        self._id = id

    @property
    def screen_name(self):
        return self._screen_name

    @screen_name.setter
    def screen_name(self, screen_name):
        self._screen_name = screen_name

    @property
    def premium_seat_count(self):
        return self._premium_seat_count

    @premium_seat_count.setter
    def premium_seat_count(self, premium_seat_count):
        self._premium_seat_count = premium_seat_count

    @property
    def premium_seat_cost(self):
        return self._premium_seat_cost

    @premium_seat_cost.setter
    def premium_seat_cost(self, premium_seat_cost):
        self._premium_seat_cost = premium_seat_cost

    @property
    def executive_seat_count(self):
        return self._executive_seat_count

    @executive_seat_count.setter
    def executive_seat_count(self, executive_seat_count):
        self._executive_seat_count = executive_seat_count

    @property
    def executive_seat_cost(self):
        return self._executive_seat_cost

    @executive_seat_cost.setter
    def executive_seat_cost(self, executive_seat_cost):
        self._executive_seat_cost = executive_seat_cost

    @property
    def normal_seat_count(self):
        return self._normal_seat_count

    @normal_seat_count.setter
    def normal_seat_count(self, normal_seat_count):
        self._normal_seat_count = normal_seat_count

    @property
    def normal_seat_cost(self):
        return self._normal_seat_cost

    @normal_seat_cost.setter
    def normal_seat_cost(self, normal_seat_cost):
        self._normal_seat_cost = normal_seat_cost

    def get_screen_by_id(self, id):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute("SELECT * FROM screens WHERE id=%s", id)
            rows = cur.fetchall()

            # Commit changes
            con.commit()

            return {
                "id": rows[0][0],
                "screen_name": rows[0][1],
                "premium_seat_count": rows[0][2],
                "premium_seat_cost": rows[0][3],
                "executive_seat_count": rows[0][4],
                "executive_seat_cost": rows[0][5],
                "normal_seat_count": rows[0][6],
                "normal_seat_cost": rows[0][7]
            }


        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def get_all_screens(self):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute("SELECT * FROM screens")
            rows = cur.fetchall()

            # Commit changes
            con.commit()

            screens = []

            for row in rows:
                screens.append({
                    "id": row[0],
                    "screen_name": row[1],
                    "premium_seat_count": row[2],
                    "premium_seat_cost": row[3],
                    "executive_seat_count": row[4],
                    "executive_seat_cost": row[5],
                    "normal_seat_count": row[6],
                    "normal_seat_cost": row[7]
                })

            return screens

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def add_screen(self):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute("INSERT INTO screens "
                        "(screen_name, "
                        "premium_seat_count, "
                        "premium_seat_cost, "
                        "executive_seat_count,"
                        "executive_seat_cost, "
                        "normal_seat_count, "
                        "normal_seat_cost) "
                        "VALUES (%s, %s, %s, %s, %s, %s, %s)",
                        (self.screen_name,
                         self.premium_seat_count,
                         self.premium_seat_cost,
                         self.executive_seat_count,
                         self.executive_seat_cost,
                         self.normal_seat_count,
                         self.normal_seat_cost))

            # Commit changes
            con.commit()

            return True

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def update_screen(self):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute(
                "UPDATE screens SET "
                "screen_name=%s, "
                "premium_seat_count=%s, "
                "premium_seat_cost=%s, "
                "executive_seat_count=%s, "
                "executive_seat_cost=%s, "
                "normal_seat_count=%s, "
                "normal_seat_cost=%s "
                "WHERE id=%s",
                (self.screen_name,
                 self.premium_seat_count,
                 self.premium_seat_cost,
                 self.executive_seat_count,
                 self.executive_seat_cost,
                 self.normal_seat_count,
                 self.normal_seat_cost,
                 self.id))

            # Commit changes
            con.commit()

            return True

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def delete_screen(self, id):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute("DELETE FROM screens WHERE id=%s", id)

            # Commit changes
            con.commit()

            return True

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()
