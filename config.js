/* SILONG settings for the real app (MODE 'live'). Built from silong-on-the-go/silong.

   SUPABASE_URL and SUPABASE_KEY connect real accounts, support messages and the visit counter.
   The key is Supabase's publishable key: it is meant to be public, and the database's row-level
   security (supabase/setup.sql) decides what anyone can read or write. Never put a secret or
   service_role key here.

   GOOGLE_MAPS_API_KEY is optional. Empty keeps the free OpenStreetMap map. */
window.SILONG_CONFIG = {
  MODE: 'live',
  SUPABASE_URL: 'https://tkygjgbwmhbqoaxtjqsv.supabase.co',
  SUPABASE_KEY: 'sb_publishable_7BxXVrMhFLWl2PUIa4z55g_OQZw1lJr',
  GOOGLE_MAPS_API_KEY: ''
};
