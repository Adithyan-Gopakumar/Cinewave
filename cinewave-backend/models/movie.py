from main import mysql


class Movie:
    def __init__(self):
        self._id = None
        self._title = None
        self._genre = None
        self._release_date = None
        self._language = None
        self._duration_minutes = None
        self._rating = None
        self._about = None
        self._cast = None
        self._poster = None
        self._banner = None

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, id):
        self._id = id

    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, title):
        self._title = title

    @property
    def genre(self):
        return self._genre

    @genre.setter
    def genre(self, genre):
        self._genre = genre

    @property
    def release_date(self):
        return self._release_date

    @release_date.setter
    def release_date(self, release_date):
        self._release_date = release_date

    @property
    def language(self):
        return self._language

    @language.setter
    def language(self, language):
        self._language = language

    @property
    def duration_minutes(self):
        return self._duration_minutes

    @duration_minutes.setter
    def duration_minutes(self, duration_minutes):
        self._duration_minutes = duration_minutes

    @property
    def rating(self):
        return self._rating

    @rating.setter
    def rating(self, rating):
        self._rating = rating

    @property
    def about(self):
        return self._about

    @about.setter
    def about(self, about):
        self._about = about

    @property
    def cast(self):
        return self._cast

    @cast.setter
    def cast(self, cast):
        self._cast = cast

    @property
    def poster(self):
        return self._poster

    @poster.setter
    def poster(self, poster):
        self._poster = poster

    @property
    def banner(self):
        return self._banner

    @banner.setter
    def banner(self, banner):
        self._banner = banner

    def get_movie_by_id(self, id):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute("SELECT * FROM movies WHERE id=%s", id)
            rows = cur.fetchall()

            # Commit changes
            con.commit()

            return {
                "id": rows[0][0],
                "title": rows[0][1],
                "genre": rows[0][2],
                "release_date": str(rows[0][3]),
                "language": rows[0][4],
                "duration_minutes": rows[0][5],
                "rating": rows[0][6],
                "about": rows[0][7],
                "cast": rows[0][8],
                "poster": rows[0][9],
                "banner": rows[0][10]
            }

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def get_all_movies(self, order_by, order_type):
        con = mysql.connect()
        cur = con.cursor()

        try:
            query = f"SELECT * FROM movies ORDER BY {order_by} {order_type}"
            cur.execute(query)
            rows = cur.fetchall()

            # Commit changes
            con.commit()

            # Map results
            movies = []
            for row in rows:
                movies.append({
                    "id": row[0],
                    "title": row[1],
                    "genre": row[2],
                    "release_date": str(row[3]),
                    "language": row[4],
                    "duration_minutes": row[5],
                    "rating": row[6],
                    "about": row[7],
                    "cast": row[8],
                    "poster": row[9],
                    "banner": row[10]
                })

            return movies

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def get_trending_movies(self):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute("SELECT * FROM movies ORDER BY rating DESC LIMIT 8")
            rows = cur.fetchall()

            # Commit changes
            con.commit()

            # Map results
            movies = []
            for row in rows:
                movies.append({
                    "id": row[0],
                    "title": row[1],
                    "genre": row[2],
                    "release_date": str(row[3]),
                    "language": row[4],
                    "duration_minutes": row[5],
                    "rating": row[6],
                    "about": row[7],
                    "cast": row[8],
                    "poster": row[9],
                    "banner": row[10]
                })

            return movies

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def get_upcomig_movies(self):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute("SELECT * FROM movies WHERE release_date > NOW() ORDER BY release_date DESC LIMIT 8")
            rows = cur.fetchall()

            # Commit changes
            con.commit()

            # Map results
            movies = []
            for row in rows:
                movies.append({
                    "id": row[0],
                    "title": row[1],
                    "genre": row[2],
                    "release_date": str(row[3]),
                    "language": row[4],
                    "duration_minutes": row[5],
                    "rating": row[6],
                    "about": row[7],
                    "cast": row[8],
                    "poster": row[9],
                    "banner": row[10]
                })

            return movies

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def get_movies_by_genre(self, genre):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute("SELECT * FROM movies WHERE genre LIKE '%%s%'", genre)
            rows = cur.fetchall()

            # Commit changes
            con.commit()

            # Map results
            movies = []
            for row in rows:
                movies.append({
                    "id": row[0],
                    "title": row[1],
                    "genre": row[2],
                    "release_date": str(row[3]),
                    "language": row[4],
                    "duration_minutes": row[5],
                    "rating": row[6],
                    "about": row[7],
                    "cast": row[8],
                    "poster": row[9],
                    "banner": row[10]
                })

            return movies

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def add_movie(self):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute(
                "INSERT INTO movies "
                "(title, "
                "genre, "
                "release_date, "
                "language, "
                "duration_minutes, "
                "rating, "
                "about, "
                "cast, "
                "poster, "
                "banner) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (self.title,
                 self.genre,
                 self.release_date,
                 self.language,
                 self.duration_minutes,
                 self.rating,
                 self.about,
                 self.cast,
                 self.poster,
                 self.banner))

            # Commit changes
            con.commit()

            return True

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def update_movie(self):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute(
                "UPDATE movies SET "
                "title=%s, "
                "genre=%s, "
                "release_date=%s, "
                "language=%s, "
                "duration_minutes=%s, "
                "rating=%s, "
                "about=%s, "
                "cast=%s, "
                "poster=%s, "
                "banner=%s "
                "WHERE id=%s",
                (self.title,
                 self.genre,
                 self.release_date,
                 self.language,
                 self.duration_minutes,
                 self.rating,
                 self.about,
                 self.cast,
                 self.poster,
                 self.banner,
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

    def delete_movie(self, id):
        con = mysql.connect()
        cur = con.cursor()

        try:
            cur.execute("DELETE FROM movies WHERE id=%s", id)

            # Commit changes
            con.commit()

            return True

        except Exception as e:
            print(e)

        finally:
            # Close connection
            cur.close()
            con.close()

    def validate_movie(self):
        if self.title is None or self.genre is None or self.release_date is None or \
                self.language is None or self.duration_minutes is None or \
                self.about is None or self.cast is None or self.poster is None or self.banner is None:
            return False
        else:
            return True
