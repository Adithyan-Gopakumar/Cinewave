from main import mysql


class Booking:
    def __init__(self):
        self._id = None
        self._user_id = None
        self._movie_id = None
        self._screen_id = None
        self._show_timing_id = None
        self._booking_date = None
        self._premium_seat_count = None
        self._premium_seat_cost = None
        self._executive_seat_count = None
        self._executive_seat_cost = None
        self._normal_seat_count = None
        self._normal_seat_cost = None
        self._total_cost = None
        self._payment_id = None

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, id):
        self._id = id

    @property
    def user_id(self):
        return self._user_id

    @user_id.setter
    def user_id(self, user_id):
        self._user_id = user_id

    @property
    def movie_id(self):
        return self._movie_id

    @movie_id.setter
    def movie_id(self, movie_id):
        self._movie_id = movie_id

    @property
    def screen_id(self):
        return self._screen_id

    @screen_id.setter
    def screen_id(self, screen_id):
        self._screen_id = screen_id

    @property
    def show_timing_id(self):
        return self._show_timing_id

    @show_timing_id.setter
    def show_timing_id(self, show_timing_id):
        self._show_timing_id = show_timing_id

    @property
    def booking_date(self):
        return self._booking_date

    @booking_date.setter
    def booking_date(self, booking_date):
        self._booking_date = booking_date

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

    @property
    def total_cost(self):
        return self._total_cost

    @total_cost.setter
    def total_cost(self, total_cost):
        self._total_cost = total_cost

    @property
    def payment_id(self):
        return self._payment_id

    @payment_id.setter
    def payment_id(self, payment_id):
        self._payment_id = payment_id

    def get_booking_by_id(self, id):
        con = mysql.connect()
        cur = con.cursor()

        try:
            # Get booking by id, join the users, movies, screens and show_timings tables
            # by user_id, movie_id and screen_id
            cur.execute("SELECT * FROM bookings "
                        "INNER JOIN users ON bookings.user_id=users.id "
                        "INNER JOIN movies ON bookings.movie_id=movies.id "
                        "INNER JOIN screens ON bookings.screen_id=screens.id "
                        "INNER JOIN show_timings ON bookings.show_timing_id=show_timings.id "
                        "WHERE bookings.id=%s", id)
            rows = cur.fetchall()
            row = rows[0]

            # Commit changes
            con.commit()

            return {
                "id": row[0],
                # "user_id": row[1],
                # "movie_id": row[2],
                # "screen_id": row[3],
                # "show_timing_id": row[4],
                "booking_date": str(row[5]),
                "premium_seat_count": row[6],
                "premium_seat_cost": int(row[7]),
                "executive_seat_count": row[8],
                "executive_seat_cost": int(row[9]),
                "normal_seat_count": row[10],
                "normal_seat_cost": int(row[11]),
                "total_cost": int(row[12]),
                "payment_id": row[13],
                "user": {
                    "id": row[14],
                    "first_name": row[15],
                    "last_name": row[16],
                    "email": row[17],
                    # "password": row[18],
                    "role": row[19]
                },
                "movie": {
                    "id": row[20],
                    "title": row[21],
                    "genre": row[22],
                    "release_date": str(row[23]),
                    "language": row[24],
                    "duration_minutes": row[25],
                    "rating": int(row[26]),
                    "about": row[27],
                    "cast": row[28],
                    "poster": row[29],
                    "banner": row[30]
                },
                "screen": {
                    "id": row[31],
                    "name": row[32],
                    "premium_seat_count": row[33],
                    "premium_seat_cost": int(row[34]),
                    "executive_seat_count": row[35],
                    "executive_seat_cost": int(row[36]),
                    "normal_seat_count": row[37],
                    "normal_seat_cost": int(row[38])
                },
                "show_timing": {
                    "id": row[39],
                    "movie_id": row[40],
                    "screen_id": row[41],
                    "date": str(row[42]),
                    "time": str(row[43])
                }
            }

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def get_bookings_by_user_id(self, user_id):
        con = mysql.connect()
        cur = con.cursor()

        try:
            # Get bookings by user id, join the users, movies, screens and show_timings tables
            # by user_id, movie_id and screen_id
            cur.execute("SELECT * FROM bookings "
                        "INNER JOIN users ON bookings.user_id=users.id "
                        "INNER JOIN movies ON bookings.movie_id=movies.id "
                        "INNER JOIN screens ON bookings.screen_id=screens.id "
                        "INNER JOIN show_timings ON bookings.show_timing_id=show_timings.id "
                        "WHERE bookings.user_id=%s", user_id)
            rows = cur.fetchall()

            # Commit changes
            con.commit()

            bookings = []

            for row in rows:
                bookings.append({
                    "id": row[0],
                    # "user_id": row[1],
                    # "movie_id": row[2],
                    # "screen_id": row[3],
                    # "show_timing_id": row[4],
                    "booking_date": str(row[5]),
                    "premium_seat_count": row[6],
                    "premium_seat_cost": int(row[7]),
                    "executive_seat_count": row[8],
                    "executive_seat_cost": int(row[9]),
                    "normal_seat_count": row[10],
                    "normal_seat_cost": int(row[11]),
                    "total_cost": int(row[12]),
                    "payment_id": row[13],
                    "user": {
                        "id": row[14],
                        "first_name": row[15],
                        "last_name": row[16],
                        "email": row[17],
                        # "password": row[18],
                        "role": row[19]
                    },
                    "movie": {
                        "id": row[20],
                        "title": row[21],
                        "genre": row[22],
                        "release_date": str(row[23]),
                        "language": row[24],
                        "duration_minutes": row[25],
                        "rating": int(row[26]),
                        "about": row[27],
                        "cast": row[28],
                        "poster": row[29],
                        "banner": row[30]
                    },
                    "screen": {
                        "id": row[31],
                        "name": row[32],
                        "premium_seat_count": row[33],
                        "premium_seat_cost": int(row[34]),
                        "executive_seat_count": row[35],
                        "executive_seat_cost": int(row[36]),
                        "normal_seat_count": row[37],
                        "normal_seat_cost": int(row[38])
                    },
                    "show_timing": {
                        "id": row[39],
                        "movie_id": row[40],
                        "screen_id": row[41],
                        "date": str(row[42]),
                        "time": str(row[43])
                    }
                })

            return bookings

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def get_all_bookings(self):
        con = mysql.connect()
        cur = con.cursor()

        try:
            # Get all bookings by join the users, movies, screens and show_timings tables
            cur.execute("SELECT * FROM bookings "
                        "INNER JOIN users ON bookings.user_id=users.id "
                        "INNER JOIN movies ON bookings.movie_id=movies.id "
                        "INNER JOIN screens ON bookings.screen_id=screens.id "
                        "INNER JOIN show_timings ON bookings.show_timing_id=show_timings.id")

            rows = cur.fetchall()

            # Commit changes
            con.commit()

            bookings = []

            for row in rows:
                bookings.append({
                    "id": row[0],
                    # "user_id": row[1],
                    # "movie_id": row[2],
                    # "screen_id": row[3],
                    # "show_timing_id": row[4],
                    "booking_date": str(row[5]),
                    "premium_seat_count": row[6],
                    "premium_seat_cost": int(row[7]),
                    "executive_seat_count": row[8],
                    "executive_seat_cost": int(row[9]),
                    "normal_seat_count": row[10],
                    "normal_seat_cost": int(row[11]),
                    "total_cost": int(row[12]),
                    "payment_id": row[13],
                    "user": {
                        "id": row[14],
                        "first_name": row[15],
                        "last_name": row[16],
                        "email": row[17],
                        # "password": row[18],
                        "role": row[19]
                    },
                    "movie": {
                        "id": row[20],
                        "title": row[21],
                        "genre": row[22],
                        "release_date": str(row[23]),
                        "language": row[24],
                        "duration_minutes": row[25],
                        "rating": int(row[26]),
                        "about": row[27],
                        "cast": row[28],
                        "poster": row[29],
                        "banner": row[30]
                    },
                    "screen": {
                        "id": row[31],
                        "name": row[32],
                        "premium_seat_count": row[33],
                        "premium_seat_cost": int(row[34]),
                        "executive_seat_count": row[35],
                        "executive_seat_cost": int(row[36]),
                        "normal_seat_count": row[37],
                        "normal_seat_cost": int(row[38])
                    },
                    "show_timing": {
                        "id": row[39],
                        "movie_id": row[40],
                        "screen_id": row[41],
                        "date": str(row[42]),
                        "time": str(row[43])
                    }
                })

            return bookings

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def add_booking(self):
        con = mysql.connect()
        cur = con.cursor()

        self.total_cost = (int(self.premium_seat_cost) * int(self.premium_seat_count) +
                           int(self.executive_seat_cost) * int(self.executive_seat_count) +
                           int(self.normal_seat_cost) * int(self.normal_seat_count))

        try:
            # Add booking
            cur.execute("INSERT INTO bookings "
                        "(user_id, "
                        "movie_id, "
                        "screen_id, "
                        "show_timing_id, "
                        "premium_seat_count, "
                        "premium_seat_cost, "
                        "executive_seat_count, "
                        "executive_seat_cost, "
                        "normal_seat_count, "
                        "normal_seat_cost, "
                        "total_cost,"
                        "payment_id) "
                        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                        (self.user_id,
                         self.movie_id,
                         self.screen_id,
                         self.show_timing_id,
                         self.premium_seat_count,
                         self.premium_seat_cost,
                         self.executive_seat_count,
                         self.executive_seat_cost,
                         self.normal_seat_count,
                         self.normal_seat_cost,
                         self.total_cost,
                         self.payment_id))

            # Get booking id
            cur.execute("SELECT LAST_INSERT_ID()")
            row = cur.fetchone()

            # Commit changes
            con.commit()

            return row[0]

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def update_booking(self):
        con = mysql.connect()
        cur = con.cursor()

        self.total_cost = (int(self.premium_seat_cost) * int(self.premium_seat_count) +
                           int(self.executive_seat_cost) * int(self.executive_seat_count) +
                           int(self.normal_seat_cost) * int(self.normal_seat_count))

        try:
            # Update booking
            cur.execute(
                "UPDATE bookings SET "
                "user_id=%s, "
                "movie_id=%s, "
                "screen_id=%s, "
                "show_timing_id=%s, "
                "booking_date=%s, "
                "premium_seat_count=%s, "
                "premium_seat_cost=%s,"
                "executive_seat_count=%s, "
                "executive_seat_cost=%s, "
                "normal_seat_count=%s, "
                "normal_seat_cost=%s, "
                "total_cost=%s "
                "WHERE id=%s",
                (self.user_id,
                 self.movie_id,
                 self.screen_id,
                 self.show_timing_id,
                 self.booking_date,
                 self.premium_seat_count,
                 self.premium_seat_cost,
                 self.executive_seat_count,
                 self.executive_seat_cost,
                 self.normal_seat_count,
                 self.normal_seat_cost,
                 self.total_cost,
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

    def delete_booking(self):
        con = mysql.connect()
        cur = con.cursor()

        try:
            # Delete booking
            cur.execute("DELETE FROM bookings WHERE id=%s", self.id)

            # Commit changes
            con.commit()

            return True

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()
