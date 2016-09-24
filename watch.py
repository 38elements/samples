from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
import smtplib
import os

DIR = '/path/to/'
ERROR_FILE_NAME = 'error.log'
LIMIT = 5
LINES = 100
ID = 'user_id'
TO = 'foo@example.com'
PASSWORD = 'password'


class ChangeHandler(FileSystemEventHandler):

    def __init__(
            self, file_name, limit, lines, user_id, to,
            password, *args, **kwd):
        super().__init__(*args, **kwd)
        self.counter = 0
        self.limit = limit
        self.file_name = file_name
        self.lines = lines * -1
        self.user_id = user_id
        self.to = to
        self.password = password

    def on_modified(self, event):
        if event.is_directory or self.counter > self.limit:
            return
        file_name = os.path.basename(event.src_path)
        if file_name != self.file_name:
            return
        with open(event.src_path, 'r') as f:
            content = ''.join(f.readlines()[self.lines:])
            self.send(content)
        self.counter += 1

    def send(self, content):
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.ehlo()
        server.login(self.user_id, self.password)
        server.sendmail(self.user_id, self.to, content)
        server.close()

handler = ChangeHandler(ERROR_FILE_NAME, LIMIT, LINES, ID, TO, PASSWORD)
observer = Observer()
observer.schedule(handler, DIR)
observer.start()
observer.join()
