# SILONG · Shelter on the Go (the real app)

The real SILONG app, before launch: https://silong-on-the-go.github.io/app/

SILONG is a smart umbrella rental service planned for Bonifacio Global City (BGC), Taguig. Until the vending machines are installed and a payment provider is connected, the app does everything that can be real today:

- **Real accounts.** People sign up with their name and email, with a mobile number optional. Accounts work on any device and can be deleted anytime from My Account.
- **Launch news.** Sign-up asks whether to send an email at launch, and My Account can turn it on or off. The team reads the list in Supabase (see below).
- **Look around without an account.** The map of the planned Silongans, prices, how it works, rain and heat alerts, and Kuya Silong all work for guests.
- **Renting says "launching soon".** Scanning a Silongan's QR code, or any button that would start a rental, explains that renting and payments open at launch. It offers launch news and a link to the demo.
- **SILONG credit (testing).** People top up by paying an InstaPay QR from GCash, Maya or any bank app and sending the reference number; the team approves each one. For now only approvers can see Top up (see "SILONG credit" below).
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

## SILONG credit (top-ups)

Rentals will be paid from SILONG credit. People top up by paying the InstaPay QR in `img/pay-qr.png` from GCash, Maya or any bank app, then send the reference number from their receipt. An approver checks the bank history and approves it on the **Approve top-ups** page, in the menu for approvers only. Only approvals add credit. The database refuses any other change, and the same top-up can't be approved twice.

- **Who can top up:** `TOPUPS` in `config.js`. It is set to `'team'`, so only approvers see Top up, for testing. Change it to `'all'` to open top-ups to everyone with an account, or `'off'` to hide them.
- **Make someone an approver:** they sign up in the app first. Then, in Supabase's **SQL Editor**, run:
  `insert into team.admins (user_id) select id from auth.users where email = 'their@email.com';`
- **What to check before approving:** the same amount and reference number in the bank history. Never approve from a screenshot alone, because fake receipts are common.
- **Refund unused credit:** send the money back from the bank, then record it, for example a ₱200 refund:
  `insert into public.credit_ledger (user_id, amount, kind, label) select id, -200, 'refund', 'Refund' from auth.users where email = 'their@email.com';`
- **Records:** `select * from public.topups order by created_at desc;` These are kept, without the account, even if someone deletes their account.
- **Fees:** paying a bank QR from GCash costs the customer ₱10, which is GCash's InstaPay fee. Many bank apps send for free.
- **The QR** pays a personal MariBank account, and payers see the name "BILLIE JOSH T.". When there is a business account, replace `img/pay-qr.png` and `PAY_TO` in `config.js`.

## Before launch

- **Email.** Supabase's built-in email only reaches your own team, so sign-ups don't need email confirmation yet, and "Forgot password?" points people to Customer support. Before launch, connect a sending service (for example Resend or Brevo) under **Authentication → Emails → SMTP**. Then turn on **Confirm email** and add a real password-reset link.
- **Payments.** Top-ups are approved by hand for now. For automatic, instant top-ups, connect a provider such as PayMongo for GCash, Maya, QR Ph and cards; the credit and ledger stay the same. Card details must never pass through this site's own code.
- **Machines.** Replace the approximate pin positions in `KIOSKS` (in the demo repo's `index.html`) with the surveyed spots, and connect unlocking and returns.
- **Map pictures** come from OpenStreetMap's own servers, which allow light use only. Before a public launch, move to a map service with a plan.
