from decouple import config
import psycopg2


from supabase import create_client, Client

url: str = config("SUPABASE_URL")
key: str = config("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(url, key)

conn = psycopg2.connect(
    database=config("SUPABASE_DATABASE_NAME"),
    host=config("SUPABASE_DATABASE_HOST"),
    user=config("SUPABASE_DATABASE_USER"),
    password=config("SUPABASE_PASSWORD"),
    port=config("SUPABASE_DATABASE_PORT"),
)

cursor = conn.cursor()
