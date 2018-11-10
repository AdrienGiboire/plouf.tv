class PagesController < ApplicationController
  def home
    render layout: 'landing'
  end

  def programmation
    @programs = [
      {
        title: 'Lundi',
        content: [],
      },
      {
        title: 'Mardi',
        content: [],
      },
      {
        title: 'Mercredi',
        content: [],
      },
      {
        title: 'Jeudi',
        content: [
          '<strong>19h-23h :</strong> Vieilleries mais bonneries',
          "On remonte le temps et on joue à des jeux qui m'ont bercés même si je ne rentrais déjà plus dans un berceau quand j'ai commencé à jouer.",
        ]
      },
      {
        title: 'Vendredi',
        content: [
          '<strong>19h-23h :</strong> Diablo III - Saison 15',
          'On rush la saison 15 en saisonnier nécromancien',
        ]
      },
      {
        title: 'Samedi',
        content: [
          '<strong>15h-18h :</strong> Diablo III - Saison 15',
          'On rush la saison 15 en saisonnier nécromancien',
          '',
          '<strong>19h-23h :</strong> Diablo III - Saison 15',
          'On rush la saison 15 en saisonnier nécromancien',
        ]
      },
      {
        title: 'Dimanche',
        content: [
          '<strong>15h-18h :</strong> Diablo III - Saison 15',
          'On rush la saison 15 en saisonnier nécromancien',
          '',
          '<strong>19h-23h :</strong> Diablo III - Saison 15',
          'On rush la saison 15 en saisonnier nécromancien',
        ]
      },
    ]
  end
end
