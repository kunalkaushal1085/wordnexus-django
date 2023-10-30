from django.core.management.base import BaseCommand
from api.views import FileProcessingView
from schedule import every, run_pending
import time


class Command(BaseCommand):
    help = 'Periodically call a function from a view'

    def handle(self, *args, **options):
        print("Custom management command is running")  # Add a debug statement
        sample_view = FileProcessingView()

        # Schedule the task to run every minute
        # every(5).seconds.do(self.call_abc, sample_view)
        # every(5).seconds.do(self.call_abc, sample_view)
        while True:
            run_pending()
            time.sleep(1)  # Sleep for 1 second

    def call_abc(self, sample_view):
        result = sample_view.abc()
        print(result, "Function call result")

