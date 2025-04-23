from main import mysql


class ShowTiming:
    def __init__(self):
        self._id = None
        self._movie_id = None
        self._screen_id = None
        self._date = None
        self._time = None

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, id):
        self._id = id

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
    def date(self):
        return self._date

    @date.setter
    def date(self, date):
        self._date = date

    @property
    def time(self):
        return self._time

    @time.setter
    def time(self, time):
        self._time = time

    def get_all_show_timings(self, movie_id, date):
        con = mysql.connect()
        cur = con.cursor()

        try:
            # Get show timings, join the movie and screen tables by movie_id and screen_id
            # If date is provided, filter by date
            # If movie_id is provided, filter by movie_id
            if date and movie_id:
                cur.execute("SELECT * FROM show_timings "
                            "INNER JOIN movies ON show_timings.movie_id=movies.id "
                            "INNER JOIN screens ON show_timings.screen_id=screens.id "
                            "WHERE show_timings.movie_id=%s "
                            "AND show_timings.date=%s "
                            "ORDER BY show_timings.date, show_timings.time",
                            (movie_id, date))
            elif date:
                cur.execute("SELECT * FROM show_timings "
                            "INNER JOIN movies ON show_timings.movie_id=movies.id "
                            "INNER JOIN screens ON show_timings.screen_id=screens.id "
                            "WHERE show_timings.date=%s "
                            "ORDER BY show_timings.date, show_timings.time",
                            date)
            elif movie_id:
                cur.execute("SELECT * FROM show_timings "
                            "INNER JOIN movies ON show_timings.movie_id=movies.id "
                            "INNER JOIN screens ON show_timings.screen_id=screens.id "
                            "WHERE show_timings.movie_id=%s "
                            "ORDER BY show_timings.date, show_timings.time",
                            movie_id)
            else:
                cur.execute("SELECT * FROM show_timings "
                            "INNER JOIN movies ON show_timings.movie_id=movies.id "
                            "INNER JOIN screens ON show_timings.screen_id=screens.id "
                            "ORDER BY show_timings.date, show_timings.time",)

            rows = cur.fetchall()

            # Commit changes
            con.commit()

            show_timings = []
            for row in rows:
                show_timings.append({
                    "id": row[0],
                    # "movie_id": row[1],
                    # "screen_id": row[2],
                    "date": str(row[3]),
                    "time": str(row[4]),
                    "movie": {
                        "id": row[5],
                        "title": row[6],
                        "genre": row[7],
                        "release_date": str(row[8]),
                        "language": row[9],
                        "duration_minutes": row[10],
                        "rating": row[11],
                        "about": row[12],
                        "cast": row[13],
                        # "poster": row[14],
                        # "banner": row[15]
                    },
                    "screen": {
                        "id": row[16],
                        "screen_name": row[17],
                        "premium_seat_count": row[18],
                        "premium_seat_cost": row[19],
                        "executive_seat_count": row[20],
                        "executive_seat_cost": row[21],
                        "normal_seat_count": row[22],
                        "normal_seat_cost": row[23]
                    },
                })

            return show_timings

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def get_show_timing_by_id(self, show_timing_id):
        con = mysql.connect()
        cur = con.cursor()

        try:
            # Get show timing by id, join the movie and screen tables by movie_id and screen_id
            cur.execute("SELECT * FROM show_timings "
                        "INNER JOIN movies ON show_timings.movie_id=movies.id "
                        "INNER JOIN screens ON show_timings.screen_id=screens.id "
                        "WHERE show_timings.id=%s", show_timing_id)
            rows = cur.fetchall()

            # Commit changes
            con.commit()

            return {
                "id": rows[0][0],
                # "movie_id": rows[0][1],
                # "screen_id": rows[0][2],
                "date": str(rows[0][3]),
                "time": str(rows[0][4]),
                "movie": {
                    "id": rows[0][5],
                    "title": rows[0][6],
                    "genre": rows[0][7],
                    "release_date": str(rows[0][8]),
                    "language": rows[0][9],
                    "duration_minutes": rows[0][10],
                    "rating": rows[0][11],
                    "about": rows[0][12],
                    "cast": rows[0][13],
                    # "poster": row[14],
                    # "banner": row[15]
                },
                "screen": {
                    "id": rows[0][16],
                    "screen_name": rows[0][17],
                    "premium_seat_count": rows[0][18],
                    "premium_seat_cost": rows[0][19],
                    "executive_seat_count": rows[0][20],
                    "executive_seat_cost": rows[0][21],
                    "normal_seat_count": rows[0][22],
                    "normal_seat_cost": rows[0][23]
                },
            }

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def add_show_timing(self):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute("INSERT INTO show_timings "
                        "(movie_id, "
                        "screen_id, "
                        "date, "
                        "time) "
                        "VALUES (%s, %s, %s, %s)",
                        (self.movie_id,
                         self.screen_id,
                         self.date,
                         self.time))

            # Commit changes
            con.commit()

            return True

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def delete_show_timing(self):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute("DELETE FROM show_timings WHERE id=%s", self.id)

            # Commit changes
            con.commit()

            return True

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def update_show_timing(self):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute("UPDATE show_timings SET "
                        "movie_id=%s, "
                        "screen_id=%s, "
                        "date=%s, "
                        "time=%s "
                        "WHERE id=%s",
                        (self.movie_id,
                         self.screen_id,
                         self.date,
                         self.time,
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
