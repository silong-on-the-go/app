/* SILONG settings for the real app (MODE 'live'). Built from silong-on-the-go/silong.

   SUPABASE_URL and SUPABASE_KEY connect real accounts, support messages and the visit counter.
   The key is Supabase's publishable key: it is meant to be public, and the database's row-level
   security (supabase/setup.sql) decides what anyone can read or write. Never put a secret or
   service_role key here.

   GOOGLE_MAPS_API_KEY is optional. Empty keeps the free OpenStreetMap map.

   Top-ups (SILONG credit): people pay the InstaPay QR in PAY_QR from GCash, Maya or any bank app and
   send the reference number; an approver checks the bank history and approves (Approve top-ups page).
   TOPUPS: 'off', 'team' (only approvers see Top up, for testing) or 'all' (everyone with an account).
   Approvers are listed in the database: see supabase/setup.sql, section 7. */
window.SILONG_CONFIG = {
  MODE: 'live',
  SUPABASE_URL: 'https://tkygjgbwmhbqoaxtjqsv.supabase.co',
  SUPABASE_KEY: 'sb_publishable_7BxXVrMhFLWl2PUIa4z55g_OQZw1lJr',
  GOOGLE_MAPS_API_KEY: '',
  TOPUPS: 'team',
  PAY_QR: 'img/pay-qr.png',
  PAY_TO: 'Billie Josh T. · MariBank •••• 0884'
};
