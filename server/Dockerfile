FROM python:3.12

WORKDIR /debt

COPY requirements.txt /debt/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /debt/

EXPOSE 8000

CMD ["python","manage.py","runserver","0.0.0.0:8000"]