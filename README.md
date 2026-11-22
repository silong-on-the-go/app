# SILONG · Shelter on the Go (the real app)

The real SILONG app, before launch: https://silong-on-the-go.github.io/app/

SILONG is a smart umbrella rental service planned for Bonifacio Global City (BGC), Taguig. Until the vending machines are installed and a payment provider is connected, the app does everything that can be real today:

- **Real accounts.** People sign up with their name and email, with a mobile number optional. Accounts work on any device and can be deleted anytime from My Account.
- **Launch news.** Sign-up asks whether to send an email at launch, and My Account can turn it on or off. The team reads the list in Supabase (see below).
- **Look around without an account.** The map of the planned Silongans, prices, how it works, rain and heat alerts, and Kuya Silong all work for guests.
- **Renting says "launching soon".** Scanning a Silongan's QR code, or any button that would start a rental, explains that renting and payments open at launch. It offers launch news and a link to the demo.
- **Customer support** messages go to the team's database.
- **A privacy-friendly visit counter** at [stats.html](https://silong-on-the-go.github.io/app/stats.html) shows totals only. There are no cookies and nothing that identifies a person.
- **English or Filipino**, offline support, and phone, tablet and PC layouts, the same as the demo.

The demo, where renting and payments are simulated end to end, stays at https://silong-on-the-go.github.io/silong/.

## How it is built

This repo is built from [silong-on-the-go/silong](https://github.com/silong-on-the-go/silong). Both sites run the same `index.html`. This repo's `config.js` sets `MODE: 'live'`, which switches on real accounts and turns renting into "launching soon". The two sites keep their stored data and offline copies apart, even though they share one address.

To update this app after changing the demo repo, run this from the demo repo's folder, then commit and push here:

```
node tools/build-app.mjs ../silong-app
```

Only `config.js` and this README belong to this repo; the build script never touches them.

## The database (Supabase)

The project is called `silong`, in Supabase's Singapore region, under the SILONG organization. [`supabase/setup.sql`](supabase/setup.sql) creates everything, and it is safe to run again.

- **Launch list:** in the Supabase dashboard, open **SQL Editor** and run `select * from team.launch_list;` (or open **Table Editor** and choose the `team` schema). It shows each account's name, email, optional mobile number, whether they want launch news, and when they signed up. The website itself can't read this list.
- **Support messages:** **Table Editor → tickets**. Each one carries the reference the sender saw (for example `SLG-4K2P9Q`).
- **Visit counter:** [stats.html](https://silong-on-the-go.github.io/app/stats.html), or **Table Editor → events**.
- **Access rules:** everyone can only add support messages and counter events. Signed-in people can read and change only their own data, and deleting an account also deletes its support messages. Supabase's security advisor reports no problems beyond the two functions meant to be callable (the totals for stats.html, and "delete my account").

`config.js` holds only the publishable key, which is designed to be public. Never put a secret or `service_role` key in it. The database password isn't stored anywhere: reset it from the dashboard (**Project Settings → Database**) if you ever need direct database access.

A free project pauses after a week with no activity. Restore it from the dashboard; the data is kept.

## Before launch

- **Email.** Supabase's built-in email only reaches your own team, so sign-ups don't need email confirmation yet, and "Forgot password?" points people to Customer support. Before launch, connect a sending service (for example Resend or Brevo) under **Authentication → Emails → SMTP**. Then turn on **Confirm email** and add a real password-reset link.
- **Payments.** Connect a provider such as PayMongo for GCash, Maya and cards. Card details must never pass through this site's own code.
- **Machines.** Replace the approximate pin positions in `KIOSKS` (in the demo repo's `index.html`) with the surveyed spots, and connect unlocking and returns.
- **Map pictures** come from OpenStreetMap's own servers, which allow light use only. Before a public launch, move to a map service with a plan.
