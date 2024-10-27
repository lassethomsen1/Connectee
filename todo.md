# MVP = themes, signIn/up(authO) & image upload

# todo
- lav sign in om 
- lav image upload til connectpage i dashboard (eller i settings til connectpage) (brug supabase storage)
- gør landing page pænere - en bedre titel og en bedre beskrivelse

## småting
- måske lave formen om i createLinkInputForm.tsx til shadcn's Form hook
- lav en dev/test supabase database (supabase CLI) der skal bruges docker
- del landing page op i components
- find ud af om bruger skal kunne uploade sit eget baggrundsbillede eller brugeren skal finde url'en til billedet
- når man klikker på edit fetcher den linket men alle links er jo fetchet i dashboard.tsx
- tilføj robots.txt
- lav flere themes
- tilføj en example page til landing page som viser eksempler på connectpages
- del components op i folder så det er mere overskueligt

## done
- gør så submit knappen lukker dialog boxen i CreateLinkInputForm.tsx
- backend til delete link button -- brug alert dialog til at confirmere delete
- gør så background image altid er centreret
- edit link funktionalitet
- gør så dashboard bliver re-rendered når der sker ændringer i links -- der mangler edit(når det er lavet)
- lav landing page https://v0.dev/r/sVCfZc9fMof
- lav backend til settings i header -- det ville sige create/edit af connectpage
- lav connectpage om sådan så der er et profil billede, navn, og en beskrivelse https://v0.dev/r/xATi0mTq8Ef
- gør så 'Links' i sidebar henviser til connectpage
- gør så i edit link at der bliver sikret 'https://' foran linket
- lav ui til at selecte themes til connectpage
- lav themes til connectpage (husk at lav det i supabase)
- check om signup virker
- get favicon from url
- i login og signup skal der være github icon i stedet for gitlab
- skal der være pre-set icons til nogle links? -- det kunne være nogle icons fra react icons eller sådan noget
- gør så når en bruger bliver oprettet bliver connectpages row også oprettet
- gør landing page mere funktionel - tilføj carousel med eksempler på connectpages


