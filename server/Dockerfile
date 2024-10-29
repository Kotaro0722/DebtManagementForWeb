FROM python:3.12

WORKDIR /debt

COPY requirements.txt /debt/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /debt/

# wait-for-it.sh に実行権限を追加
COPY wait-for-it.sh /debt/
RUN chmod +x /debt/wait-for-it.sh

EXPOSE 8000

# wait-for-it.shを使ってDBが起動するまで待機してからDjangoを起動
CMD ["./wait-for-it.sh", "db:3306", "--", "python", "manage.py", "runserver", "0.0.0.0:8000"]
