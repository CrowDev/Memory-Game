# Memory Game

## Overview

Memory Game is a classic card-matching game implemented in Angular 17 with TailwindCSS for a customizable UI.

Check the demo here: [Memory Game](http://modyo-memory-game.s3-website-us-east-1.amazonaws.com/)

![Memory Game Screenshot](/src//assets/imgs/Screenshot.jpg)

## Features

- Facade pattern for clean component logic.
- Customizable UI with TailwindCSS.
- Vanilla CSS for specific animations.
- Difficulty selector for different game levels.
- Unit tests for application logic.

## Project Structure

- `/src`: Main source code directory.
  - `/app`: Application components and logic.
    - `/@types`: Types for the application
    -  `/components`: Components for the UI
    -  `/pages`: Components for routing
    -  `/services`: Fetching and logic for the application
    -  `/util`: Files to use through the application

## Installation

1. Clone the repository.
2. Run `npm install`.
3. Start the game with `npm start`.

## Usage

- Visit `http://localhost:4200` in your browser.
- Match cards to win the game.
- Change difficulty level mid-game.

## Code Structure

The project follows the Facade pattern to maintain clean component logic. Additional animations are handled in `animation.ts` in `app/util` folder.

## Design Choices

TailwindCSS was chosen for its flexibility in creating a highly customizable UI, offering advantages over more restrictive frameworks like Bootstrap.

## Troubleshooting

If you face issues running the project in WSL2, try changing the port using `ng serve --port=4000`.

## Future Features

Planned "Profile" section to showcase records with different difficulties and scores.

## Contact

For questions or suggestions, reach out to [Hardy Aguilar](https://www.linkedin.com/in/hardyaguilar/).