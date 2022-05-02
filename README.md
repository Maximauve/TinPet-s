<p align="center">
  <img
    width="300px"
    src="docs/logo.png"
    alt="TinPet's Logo" />
</p>

<h1 align="center">TinPet's</h1>

## Introduction

TinPet's est une application destiné à la SPA (Société Protectrice des Animaux).

Le but étant que chaque Organisation SPA propose ses chats à l'adoption.

L'utilisateur pourrait donc, comme le système de swipe des sites de rencontres, aimer les chats qu'il préfère,
les retrouver dans sa Bibliotheque, et pouvoir ensuite contacter l'organisation concercée.

Voici notre lien menant vers notre application Expo :
[Use it now !](https://expo.dev/@mattox40/venn-project?serviceType=classic&distribution=expo-go)

## Soucis de production

Suite à divers problèmes lors de la réalisation de cette application, elle n'est uniquement accessible via interfacce web.

Pour des raisons de fonctionnalité, les chats sont obtenus grâce à une API externe.
Il n'est donc pas possible de les ajouter directement dans l'application.
Mais dans une future production, cette fonctionnalité sera ajoutée.

## Installation

1. Installer [Yarn](https://classic.yarnpkg.com/en/docs/install)

2. Cloner le repo

```sh
git clone git@github.com:Maximauve/TinPet-s.git
cd TinPet-s
```

3. Installez les dépendences

```sh
yarn install
```

4. Lancez l'application grâce aux différents [scripts](README.md#scripts)

## Available Scripts

Une fois à l'intérieur du projet, vous pouvez lancer l'application via `yarn` suivi de :

### `start`

Démarre un serveur local de développement, voir [`expo start`](https://docs.expo.dev/workflow/expo-cli/#expo-start).

### `web`

Ouvre l'application dans un navigateur
