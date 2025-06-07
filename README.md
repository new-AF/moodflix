# Moodflix (BETA)

Moodflix is a hobby/experimental project that recommends movies based on user mood in order to gently uplift their emotional state. It is not intended for therapeutic purposes or to provide medical advice.

## API & Algorithm

Data is powered by the [TMDB API](https://www.themoviedb.org/). The project's core recommendation logic is a straightforward **mood-to-genre mapping** defined in `api/mapping.js`. This algorithm takes a user's selected mood and, at the moment, translates it into a single corresponding movie genre.

For example:

- Happy mood 😊 → Comedy movies
- Sad mood 😢 → Drama movies
- Angry mood 😡 → Action movies
- Scared mood 😨 → Animation movies
- Thoughtful mood 🤔 → Documentary movies
- Laughing mood 🤣 → Comedy movies
- Love mood 😍 → Romance movies
- Cool mood 😎 → Action movies
- Bored mood 🥱 → Adventure movies
- Sleepy mood 😴 → Animation movies

Movies are then fetched from TMDB based on these determined genres, and subsequently sorted in descending order by revenue (as determined by TMDB).

## Tech Stack

- **Frontend:** React, React Router v7
- **Styling:** Daisy UI, Tailwind CSS
- **Data:** TMDB API
